'use client'

import { addProducts } from "@/app/admin/_actions/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatter"
import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

const ProductForm = () => {
  const [error, action] = useFormState(addProducts, {})
  const [priceInCents, setPriceInCents] = useState<number>()
  return (
    <form className="space-y-8" action={action}>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-secondary-foreground">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Enter product name"
          autoComplete="off"
          className="text-secondary-foreground"
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents" className="text-secondary-foreground">
          Price (in cents)
        </Label>
        <Input
          inputMode="numeric"
          id="priceInCents"
          name="priceInCents"
      
          placeholder="Enter price (in cents)"
          autoComplete="off"
          className="text-secondary-foreground"
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="text-secondary-foreground">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
       
          placeholder="Enter product description"
          autoComplete="off"
          className="text-secondary-foreground"
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file" className="text-secondary-foreground">
          File
        </Label>
        <Input
          type="file"
          id="file"
          name="file"
     
          placeholder="Enter product name"
          autoComplete="off"
          className="text-secondary-foreground file:bg-secondary file:text-secondary-foreground file:mr-4 file:cursor-pointer"
        />
        {error.file && <div className="text-destructive">{error.file}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image" className="text-secondary-foreground">
          Image
        </Label>
        <Input
          type="file"
          id="image"
          name="image"
     
          placeholder="Enter product name"
          autoComplete="off"
          className="text-secondary-foreground file:bg-secondary file:text-secondary-foreground file:mr-4 file:cursor-pointer"
        />
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const {pending} = useFormStatus()
  return (
    <Button className="bg-primary" type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default ProductForm