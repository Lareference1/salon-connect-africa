
import * as React from "react";
import { cn } from "@/lib/utils";

interface FuturisticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "mirror" | "frost" | "glass" | "neo-glass";
  hoverEffect?: "lift" | "glow" | "scale" | "none";
  animate?: boolean;
}

const FuturisticCard = React.forwardRef<HTMLDivElement, FuturisticCardProps>(
  ({ className, variant = "default", hoverEffect = "none", animate = false, children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-card text-card-foreground shadow-sm",
      mirror: "mirror",
      frost: "frost",
      glass: "glass",
      "neo-glass": "neo-glass",
    };

    const hoverClasses = {
      lift: "hover-lift",
      glow: "hover-glow",
      scale: "hover-scale",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border transition-all duration-300",
          variantClasses[variant],
          hoverClasses[hoverEffect],
          animate && "animate-fade-in",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FuturisticCard.displayName = "FuturisticCard";

export { FuturisticCard };
