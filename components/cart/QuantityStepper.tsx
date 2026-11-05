"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  quantity: number;
  pending: boolean;
  onChange: (next: number) => void;
  max?: number;
  /** Size aur shape yahan se do, jaise "h-11 w-full rounded-md" */
  className?: string;
};

export function QuantityStepper({
  quantity,
  pending,
  onChange,
  max = 99,
  className,
}: Props) {
  return (
    <div
      role="group"
      aria-label="Change quantity"
      className={cn(
        "flex items-center justify-between overflow-hidden border border-accent bg-background",
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        disabled={pending}
        onClick={() => onChange(quantity - 1)}
        aria-label={quantity === 1 ? "Remove from cart" : "Decrease quantity"}
        className="h-full rounded-none px-4"
      >
        {quantity === 1 ? (
          <Trash2 className="size-4" />
        ) : (
          <Minus className="size-4" />
        )}
      </Button>

      <span
        aria-live="polite"
        className="min-w-8 text-center font-semibold tabular-nums"
      >
        {quantity}
      </span>

      <Button
        type="button"
        variant="ghost"
        disabled={pending || quantity >= max}
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className="h-full rounded-none px-4"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
