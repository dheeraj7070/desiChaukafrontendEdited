"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";


export function StarRating({ name, defaultValue = 0 }: { name: string; defaultValue?: number }) {
  const [value, setValue] = useState(defaultValue);
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div>
      <input type="hidden" name={name} value={value || ""} />
      <div role="radiogroup" aria-label="Rating" className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star`}
            onClick={() => setValue(n)}
            onMouseEnter={() => setHover(n)}
            className="rounded p-1 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <Star
              className={cn(
                "size-8 transition-colors",
                n <= shown ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/40"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}


