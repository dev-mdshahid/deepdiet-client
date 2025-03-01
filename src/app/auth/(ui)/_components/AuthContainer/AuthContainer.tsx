import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function AuthContainer({
  children,
  className,
  title,
  subtitle,
}: AuthContainerProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-balance text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

// types
type AuthContainerProps = {
  children: ReactNode;
  className?: string;
  title: string;
  subtitle: string;
};
