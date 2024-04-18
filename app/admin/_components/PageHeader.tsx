import { ReactNode } from "react"

type PageHeaderProps = {
  children: ReactNode
}

const PageHeader = ({children}: PageHeaderProps) => {
  return (
    <h1 className="text-3xl text-secondary-foreground mb-6">
      {children}
    </h1>
  )
}
export default PageHeader