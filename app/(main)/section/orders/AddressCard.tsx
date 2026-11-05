import type { OrderAddress } from "@/types/order"
import { Panel } from "./Panel"

export function AddressCard({ address }: { address: OrderAddress }) {
  const cityLine = [address.city, address.state].filter(Boolean).join(", ")
  return (
    <Panel title="Shipping address">
      <address className="space-y-0.5 text-sm not-italic">
        <p className="font-medium">{address.fullName}</p>
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        {address.landmark && (
          <p className="text-muted-foreground">Landmark: {address.landmark}</p>
        )}
        <p>
          {cityLine} {address.postalCode}
        </p>
        <p>{address.country}</p>
        <p className="pt-1 text-muted-foreground">Phone: {address.phone}</p>
      </address>
    </Panel>
  )
}
