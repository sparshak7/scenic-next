'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps, ReactNode } from "react"

type NavbarProps = {
  children: ReactNode
}

export const Navbar = ({children}: NavbarProps) => {
  return (
    <nav className="max-w-6xl mx-auto dark px-4 py-2 text-accent-foreground flex justify-center items-center gap-6 mb-6">
      {children}
    </nav>
  )
}

export const NavLinks = (props: Omit<ComponentProps<typeof Link>, "className">) => {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground hover:rounded-3xl",
        pathname === props.href && "bg-accent text-primary rounded-3xl"
      )}
    />
  );
}