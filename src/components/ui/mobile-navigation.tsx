import * as React from "react"
import { cn } from "../../../lib/utils"
import { Card, CardContent } from "./card"

interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

interface MobileNavigationMenuProps {
  items: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const MobileNavigationMenu = React.forwardRef<
  HTMLDivElement,
  MobileNavigationMenuProps
>(({ items, isOpen, onClose, className }, ref) => {
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "fixed top-[70px] left-5 right-5 z-50 mx-auto max-w-xs",
        className
      )}
    >
      <Card className="bg-black/95 backdrop-blur-xl border-white/10 shadow-2xl">
        <CardContent className="p-4">
          <nav className="space-y-1">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  "text-white hover:bg-white/5 hover:text-yellow-400",
                  "border-b border-white/5 last:border-b-0"
                )}
              >
                {item.label}
                {item.external && (
                  <span className="ml-auto text-xs opacity-60">↗</span>
                )}
              </a>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  );
});

MobileNavigationMenu.displayName = "MobileNavigationMenu";

export { MobileNavigationMenu, type NavigationItem };