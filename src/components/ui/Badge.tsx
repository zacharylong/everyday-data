import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "topic" | "number" | "new";
  className?: string;
  onClick?: () => void;
}

export default function Badge({ children, variant = "topic", className, onClick }: BadgeProps) {
  const base = "inline-flex items-center font-mono text-xs font-medium rounded-md px-2.5 py-1 transition-colors duration-150";
  const variants = {
    topic: "bg-violet/10 text-cyan border border-violet/20 hover:bg-violet/20",
    number: "bg-surface text-text-muted border border-border",
    new: "bg-cyan/10 text-cyan border border-cyan/30",
  };

  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      className={clsx(base, variants[variant], onClick && "cursor-pointer", className)}
      onClick={onClick}
      {...(onClick ? { type: "button" } : {})}
    >
      {children}
    </Tag>
  );
}
