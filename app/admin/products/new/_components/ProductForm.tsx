'use client'

import { addProducts } from "@/app/admin/_actions/product"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatter"
import { useState } from "react"

const ProductForm = () => {
  const [priceInCents, setPriceInCents] = useState<number>()
  return (
    <form className="space-y-8" action={addProducts}>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-secondary-foreground">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter product name"
          autoComplete="off"
          className="text-secondary-foreground"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents" className="text-secondary-foreground">
          Price (in cents)
        </Label>
        <Input
          inputMode="numeric"
          id="priceInCents"
          name="priceInCents"
          required
          placeholder="Enter price (in cents)"
          autoComplete="off"
          className="text-secondary-foreground"
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
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
          required
          placeholder="Enter product description"
          autoComplete="off"
          className="text-secondary-foreground"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="file" className="text-secondary-foreground">
          File
        </Label>
        <Input
          type="file"
          id="file"
          name="file"
          required
          placeholder="Enter product name"
          autoComplete="off"
          className="text-secondary-foreground file:bg-secondary file:text-secondary-foreground file:mr-4 file:cursor-pointer"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image" className="text-secondary-foreground">
          Image
        </Label>
        <Input
          type="file"
          id="image"
          name="image"
          required
          placeholder="Enter product name"
          autoComplete="off"
          className="text-secondary-foreground file:bg-secondary file:text-secondary-foreground file:mr-4 file:cursor-pointer"
        />
      </div>
      <Button className="bg-primary" type="submit">
        Save
      </Button>
    </form>
  );
}
export default ProductForm