'use client'

import { deleteProduct, toggleProductAvailability } from "@/app/admin/_actions/product";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type ActiveToggleProductAdminProps = {
  id: string;
  isAvailableForPurchase: boolean;
}

type DeleteProductAdminProps = {
  id: string;
  disabled: boolean;
};

export const ActiveToggleProductAdmin = ({id, isAvailableForPurchase}: ActiveToggleProductAdminProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem className={isAvailableForPurchase ? "text-red-600" : "text-primary"} disabled={isPending} onClick={() => startTransition(async () => {
      await toggleProductAvailability(id, !isAvailableForPurchase)
      router.refresh()
    })}>
      {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}

export const DeleteProductAdmin = ({
  id,
  disabled,
}: DeleteProductAdminProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="text-destructive"
      disabled={disabled || isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        })
      }
    >
      Delete
    </DropdownMenuItem>
  );
};
