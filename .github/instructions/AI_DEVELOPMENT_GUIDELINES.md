# AI Development Guidelines for SFTi Web Templates

## 🎯 Core Principles

**Every AI assistant working on this codebase must follow these strict guidelines to maintain consistency, quality, and the established design system.**

### Primary Rules
1. **Always use shadcn/ui components** instead of custom UI components
2. **Tailwind CSS only** - no custom CSS classes unless absolutely necessary
3. **Maintain semantic color system** using CSS custom properties
4. **TypeScript for all React components** with proper type definitions
5. **Responsive-first design** with mobile optimization
6. **Accessibility compliance** (WCAG 2.1 AA standards)

---

## 🎨 Design System Standards

### Color Usage
```typescript
// ✅ ALWAYS USE - Semantic color variables
className="bg-neutral-1 text-neutral-12 border-neutral-6"
className="bg-accent-9 text-accent-contrast"
className="bg-accent-secondary-9 hover:bg-accent-secondary-10"

// ❌ NEVER USE - Hardcoded colors
className="bg-red-500 text-white border-gray-300"
className="bg-blue-600 hover:bg-blue-700"
```

### Brand Colors (Use These Specific Values)
- **Primary Red**: `accent-9` (maps to #DC2626 variants)
- **Secondary Gold**: `accent-secondary-9` (maps to #F59E0B variants)
- **Matrix Green**: `#00FF00` (only for dev environment)
- **Tech Blue**: `#3B82F6` (only for accent elements)

### Spacing & Layout
```typescript
// ✅ Use consistent spacing scale
className="p-6 m-4 gap-4 space-y-6"
className="px-4 py-2 mx-auto my-8"

// ✅ Responsive patterns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
className="flex flex-col md:flex-row items-center justify-between"
```

---

## 🧩 Component Architecture

### shadcn/ui Component Usage

#### Button Components
```typescript
import { Button } from '@/components/ui/button';

// ✅ Correct usage with variants
<Button variant="default" size="lg">Primary Action</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="outline" size="default">Secondary</Button>
<Button variant="ghost" size="icon">👍</Button>
```

#### Card Components
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// ✅ Semantic card structure
<Card className="w-full max-w-md">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

#### Dialog/Modal Components
```typescript
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// ✅ Accessible dialog pattern
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description for accessibility</DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### TypeScript Requirements

#### Component Props Interface
```typescript
// ✅ Always define proper interfaces
interface ComponentProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'outline';
  isLoading?: boolean;
  onAction?: () => void;
  children?: React.ReactNode;
}

export function MyComponent({ 
  title, 
  description, 
  variant = 'default', 
  isLoading = false,
  onAction,
  children 
}: ComponentProps) {
  // Component implementation
}
```

#### State Management
```typescript
// ✅ Proper TypeScript state definitions
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [errors, setErrors] = useState<string[]>([]);
```

---

## 📱 Responsive Design Patterns

### Breakpoint Usage
```typescript
// ✅ Standard responsive patterns
className="text-sm md:text-base lg:text-lg"
className="hidden md:block" // Hide on mobile, show on desktop
className="block md:hidden" // Show on mobile, hide on desktop
className="w-full md:w-1/2 lg:w-1/3"
```

### Grid Layouts
```typescript
// ✅ Responsive grid patterns
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
```

### Flexbox Patterns
```typescript
// ✅ Common flex layouts
className="flex flex-col md:flex-row items-center justify-between"
className="flex items-center space-x-4"
className="flex justify-center items-center min-h-screen"
```

---

## ♿ Accessibility Requirements

### Required ARIA Attributes
```typescript
// ✅ Always include proper ARIA labels
<Button aria-label="Close dialog" onClick={closeDialog}>
  <X className="h-4 w-4" />
</Button>

<input 
  type="email" 
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
```

### Keyboard Navigation
```typescript
// ✅ Proper focus management
className="focus:ring-2 focus:ring-accent-9 focus:outline-none"
className="focus-visible:ring-2 focus-visible:ring-offset-2"

// ✅ Tab index management
tabIndex={0} // Focusable
tabIndex={-1} // Programmatically focusable only
```

### Screen Reader Support
```typescript
// ✅ Semantic HTML structure
<main role="main">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Section Title</h2>
    {/* Section content */}
  </section>
</main>
```

---

## 🎭 Animation & Interactions

### Tailwind Animation Classes
```typescript
// ✅ Use built-in animations
className="animate-pulse" // Loading states
className="animate-bounce" // Attention grabbing
className="animate-spin" // Loading spinners
className="transition-all duration-200" // Smooth transitions
```

### Hover & Focus States
```typescript
// ✅ Consistent interaction patterns
className="hover:bg-neutral-2 focus:bg-neutral-3 transition-colors"
className="hover:scale-105 transform transition-transform duration-200"
```

---

## 📁 File Organization

### Component Structure
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (auto-generated)
│   ├── common/          # Shared components
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components
├── lib/
│   ├── utils.ts         # Utility functions
│   └── constants.ts     # App constants
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

### Naming Conventions
```typescript
// ✅ Component names - PascalCase
export function UserProfileCard() {}

// ✅ File names - kebab-case
user-profile-card.tsx
api-client.ts
form-validation.ts

// ✅ Constants - SCREAMING_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com';
export const DEFAULT_TIMEOUT = 5000;
```

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T DO THESE:

1. **Creating custom UI components when shadcn/ui exists**
   ```typescript
   // ❌ WRONG
   function CustomButton({ children, onClick }) {
     return <button className="custom-btn" onClick={onClick}>{children}</button>;
   }
   
   // ✅ CORRECT
   import { Button } from '@/components/ui/button';
   <Button onClick={onClick}>{children}</Button>
   ```

2. **Using hardcoded colors**
   ```typescript
   // ❌ WRONG
   className="bg-red-500 text-white"
   
   // ✅ CORRECT
   className="bg-accent-9 text-accent-contrast"
   ```

3. **Ignoring TypeScript types**
   ```typescript
   // ❌ WRONG
   function MyComponent(props: any) {}
   
   // ✅ CORRECT
   interface MyComponentProps {
     title: string;
     isVisible: boolean;
   }
   function MyComponent({ title, isVisible }: MyComponentProps) {}
   ```

4. **Non-responsive design**
   ```typescript
   // ❌ WRONG
   className="w-96 h-64"
   
   // ✅ CORRECT
   className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
   ```

---

## 📋 Pre-Commit Checklist

Before submitting any code changes, verify:

- [ ] ✅ All components use shadcn/ui where applicable
- [ ] ✅ Tailwind classes follow semantic color system
- [ ] ✅ TypeScript interfaces are properly defined
- [ ] ✅ Responsive design works on mobile and desktop
- [ ] ✅ Accessibility attributes are included
- [ ] ✅ Proper focus management implemented
- [ ] ✅ No custom CSS classes unless documented
- [ ] ✅ Animation transitions are smooth and consistent
- [ ] ✅ Error states and loading states are handled
- [ ] ✅ Component follows established naming conventions

---

## 🔧 Development Tools

### Required VS Code Extensions
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **TypeScript and JavaScript Language Features** - Enhanced TS support
- **ES7+ React/Redux/React-Native snippets** - React development shortcuts
- **Auto Rename Tag** - HTML/JSX tag management
- **Prettier** - Code formatting

### Recommended Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 🆘 Emergency Protocols

### If You're Unsure:
1. **Check existing components** in the codebase first
2. **Refer to shadcn/ui documentation**: https://ui.shadcn.com/
3. **Follow Tailwind best practices**: https://tailwindcss.com/docs
4. **Ask for clarification** rather than guessing
5. **Test on mobile and desktop** before submitting

### Critical Errors to Report:
- Breaking changes to the design system
- Accessibility violations
- Performance regressions
- TypeScript compilation errors
- Build failures

---

**Remember: Consistency is key. When in doubt, follow the patterns established in existing code.**