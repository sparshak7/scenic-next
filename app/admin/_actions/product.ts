'use server'

import db from "@/db/db";
import {z} from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation";

const fileSchema = z.instanceof(File, {message: "Required."})
const imageSchema = fileSchema.refine((file) => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(1, { message: "Name must be at least 1 characters long." }),
  description: z
    .string({ required_error: "Name is required." })
    .min(5, { message: "Description must be at least 5 characters long." }),
  priceInCents: z.coerce
    .number()
    .int()
    .min(1, { message: "Price must be at least 1 cents." }),
  file: fileSchema.refine((file) => file.size > 0, {
    message: "File size should be more than 0.",
  }),
  image: imageSchema.refine((file) => file.size > 0, {
    message: "File size should be more than 0.",
  }),
});

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
})

export async function addProducts(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if(!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir("products", {recursive: true})
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(`public/${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

  await db.product.create({data: {
    isAvailableForPurchase: false,
    name: data.name,
    description: data.description,
    priceInCents: data.priceInCents,
    filePath,
    imagePath
  }})

  redirect("/admin/products")
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
  await db.product.update({
    where: {id}, data: {isAvailableForPurchase}
  })
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({where: {id}})
  if(product == null) {
    return notFound()
  }

  await fs.unlink(product.filePath)
  await fs.unlink(`public/${product.imagePath}`)
}

export async function updateProducts(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({where: {id}});

  if(product == null) {
    return notFound()
  }

  let filePath = product.filePath;
  if(data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath);
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public/${product.imagePath}`);
    imagePath = `products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public/${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
  }

  await db.product.update({
    where: { id },
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/products");
}