import { redirect } from "next/navigation"
import { loadOrdersAction } from "@/app/api/orders/actions"
import { EmptyOrders } from "@/app/(main)/section/orders/EmptyOrders"
import { OrderList } from "@/app/(main)/section/orders/OrderList"
import { OrdersErrorState } from "@/app/(main)/section/orders/OrdersErrorState"

// User-specific data - kabhi cache nahi
export const dynamic = "force-dynamic"
export const metadata = { title: "My Orders | Desi Chauka" }

export default async function OrdersPage() {
  const res = await loadOrdersAction({ page: 1 })

  if (!res.ok && res.code === "UNAUTHORIZED") redirect("/login?next=/orders")

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-10">
      {!res.ok ? (
        <OrdersErrorState title="Orders load nahi ho paye" message={res.message} />
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
            {res.data.pagination.totalCount > 0 && (
              <p className="mt-1 text-sm text-muted-foreground">
                {res.data.pagination.totalCount}{" "}
                {res.data.pagination.totalCount === 1 ? "order" : "orders"}
              </p>
            )}
          </div>

          {res.data.orders.length === 0 ? (
            <EmptyOrders />
          ) : (
            <OrderList
              initialOrders={res.data.orders}
              initialPagination={res.data.pagination}
            />
          )}
        </>
      )}
    </main>
  )
}
