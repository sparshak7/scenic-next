import PageHeader from "@/app/admin/_components/PageHeader"
import ProductForm from "../../new/_components/ProductForm"
import db from "@/db/db";

type EditProductAdminProps = {
  params: {
    id: string;
  }
}

const EditProductAdmin = async ({params}: EditProductAdminProps) => {
  const product = await db.product.findUnique({where: {id: params.id}})
  return (
    <div>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </div>
  )
}
export default EditProductAdmin