"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface NavItem {
  title: string
  href: string
  external?: boolean
}

interface NavbarProps {
  logoText: string
  logoSubtitle: string
  items: NavItem[]
  className?: string
}

export function Navbar({ logoText, logoSubtitle, items, className }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10",
      "h-12 min-h-12 max-h-12",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col leading-none">
          <span className="text-red-500 font-bold text-lg leading-tight">
            {logoText}
          </span>
          <span className="text-yellow-400 text-xs leading-tight">
            {logoSubtitle}
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-white hover:text-yellow-400 transition-colors text-sm"
              {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {item.title}
            </a>
          ))}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 h-8 w-8"
            >
              <Menu className="h-4 w-4 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-black/95 border-white/10">
            <div className="flex flex-col space-y-4 mt-6">
              {items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-white hover:text-yellow-400 transition-colors text-base py-2"
                  onClick={() => setIsOpen(false)}
                  {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {item.title}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}