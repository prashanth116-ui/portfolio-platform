import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#185FA5]/20 text-[#5ba3e6]",
        success: "bg-[#EAF3DE] text-[#27500A]",
        warning: "bg-[#FAEEDA] text-[#633806]",
        destructive: "bg-[#FCEBEB] text-[#791F1F]",
        outline: "border border-[#2a2a2a] text-[#a0a0a0]",
        secondary: "bg-[#2a2a2a] text-[#a0a0a0]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
