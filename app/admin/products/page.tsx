import { Button } from "@/components/ui/button"
import PageHeader from "../_components/PageHeader"
import { Link } from "next-view-transitions"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const AdminProducts = () => {
  return (
    <>
      <div className="flex max-w-5xl justify-between items-center gap-4">
        <PageHeader>Admin Products</PageHeader>
        <Button asChild className="bg-primary">
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

const ProductsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available For Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

      </TableBody>
    </Table>
  );
}

export default AdminProducts