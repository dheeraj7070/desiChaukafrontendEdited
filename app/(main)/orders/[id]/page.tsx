import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getOrderAction } from "@/app/api/orders/actions";
import { AddressCard } from "@/app/(main)/section/orders/AddressCard";
import { DeliveryCard } from "@/app/(main)/section/orders/DeliveryCard";
import { OrderItems } from "@/app/(main)/section/orders/OrderItems";
import { OrderStatusBadge } from "@/app/(main)/section/orders/OrderStatusBadge";
import { OrderTimeline } from "@/app/(main)/section/orders/OrderTimeline";
import { OrdersErrorState } from "@/app/(main)/section/orders/OrdersErrorState";
import { Panel } from "@/app/(main)/section/orders/Panel";
import { PaymentCard } from "@/app/(main)/section/orders/PaymentCard";
import { PriceSummary } from "@/app/(main)/section/orders/PriceSummary";
import { formatDateTime } from "@/lib/order-format";
import { getDisplayStatus, getTimeline } from "@/lib/order-status";
import { Suspense } from "react";
import { OrderPlacedToast } from "../OrderPlacedToast";

export const dynamic = "force-dynamic";
export const metadata = { title: "Order details | Desi Chauka" };

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await getOrderAction(id);

  if (!res.ok) {
    if (res.code === "UNAUTHORIZED")
      redirect(`/login?next=/orders/${encodeURIComponent(id)}`);
    // Doosre user ka order ya galat id - dono par same 404, kuchh leak nahi hota
    if (/not[_\s-]?found/i.test(res.code)) notFound();
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
        <OrdersErrorState
          title="Order load nahi ho paya"
          message={res.message}
        />
      </main>
    );
  }

  const order = res.data.orders[0];
  const status = getDisplayStatus(order);
  const steps = getTimeline(order);
  const now = Date.now();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <Link
        href="/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden /> My orders
      </Link>

      <div className="mt-3 mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight break-all md:text-2xl">
            Order {order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed on {formatDateTime(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge
          label={status.label}
          tone={status.tone}
          className="text-sm"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Panel title="Order status">
            <OrderTimeline steps={steps} />
          </Panel>

           <Panel title="">
            <Link className="text-accent-foreground font-semibold flex justify-center hover:underline" href="/contact">Return Or Need Help? </Link>
          </Panel>

          {order.remarks && (
            <Panel title="Note from store">
              <p className="text-sm whitespace-pre-line">{order.remarks}</p>
            </Panel>
          )}

          <Panel title={`Items (${order.items.length})`}>
            <OrderItems order={order} />
          </Panel>
        </div>

        <aside className="space-y-6">
          <PriceSummary order={order} />
          <PaymentCard order={order} now={now} />
          <DeliveryCard order={order} />
          <AddressCard address={order.shippingAddress} />
        </aside>
      </div>
      <Suspense>
        <OrderPlacedToast />
      </Suspense>
    </main>
  );
}
