import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";

type DashboardCardProps = {
  title: string;
  description: string;
  body: string;
}

// function wait(duration: number){
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration)
//   })
// }

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: {pricePaidInCents: true},
    _count: true
  })

  return {
    amount: (data._sum.pricePaidInCents || 0)/100,
    numberOfSales: data._count
  }
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100
  }
}

async function getProductData() {
  const [activeProductCount, inactiveProductCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  
  return {activeProductCount, inactiveProductCount}
}

const AdminDashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ])
  return (
    <div className="text-secondary-foreground grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCards
        title="Sales"
        description={`${formatNumber(salesData.numberOfSales)} orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCards
        title="Customers"
        description={`${formatCurrency(
          userData.averageValuePerUser
        )} average value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCards
        title="Products"
        description={`${formatNumber(
          productData.inactiveProductCount
        )} inactive products`}
        body={formatNumber(productData.activeProductCount)}
      />
    </div>
  );
}


const DashboardCards = ({ title, description, body }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;

