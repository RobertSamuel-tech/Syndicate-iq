# Design Tokens Extracted from Reference UI

## STEP 1: EXTRACTED DESIGN TOKENS

### Color System (OKLCH - Dark Theme)
```css
--background: oklch(0.05 0 0);           /* Very dark background */
--foreground: oklch(0.98 0 0);          /* Very light text */
--card: oklch(0.08 0 0);                /* Dark card background */
--card-foreground: oklch(0.98 0 0);     /* Light card text */
--primary: oklch(0.7 0.15 142);         /* Greenish primary */
--primary-foreground: oklch(0.05 0 0);  /* Dark text on primary */
--secondary: oklch(0.15 0 0);           /* Dark secondary */
--muted: oklch(0.12 0 0);                /* Dark muted */
--muted-foreground: oklch(0.6 0 0);     /* Medium gray text */
--accent: oklch(0.15 0 0);              /* Dark accent */
--border: oklch(0.2 0 0);               /* Border color */
--input: oklch(0.15 0 0);               /* Input background */
--ring: oklch(0.7 0.15 142);           /* Focus ring */
--radius: 0.75rem;                      /* Base border radius */

/* Sidebar Colors */
--sidebar: oklch(0.08 0 0);
--sidebar-foreground: oklch(0.98 0 0);
--sidebar-primary: oklch(0.7 0.15 142);
--sidebar-accent: oklch(0.15 0 0);
--sidebar-border: oklch(0.2 0 0);
```

### Spacing System (from Card component)
- Card gap: `gap-6` (24px)
- CardHeader gap: `gap-1.5` (6px)
- Card padding: `px-6` (24px horizontal), `py-6` (24px vertical)
- CardContent padding: `px-6`

### Border Radius
- Base: `0.75rem` (12px) - `--radius`
- Card: `rounded-xl` (0.75rem)
- Button: `rounded-md` (0.375rem)
- Small: `calc(var(--radius) - 4px)` = 8px
- Medium: `calc(var(--radius) - 2px)` = 10px
- Large: `var(--radius)` = 12px
- XL: `calc(var(--radius) + 4px)` = 16px

### Shadows
- Default: `shadow-sm`
- Button: `shadow-xs`
- Card: `shadow-sm`
- Select: `shadow-xs`, `shadow-md` (content)

### Typography
- Font: Geist Sans (via Next.js)
- Base: `text-sm` (0.875rem)
- Sizes: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, etc.
- Font weights: `font-medium`, `font-semibold`, `font-bold`

### Button Specifications
- Base: `h-9 px-4 py-2` (36px height, 16px/8px padding)
- Small: `h-8 px-3` (32px height, 12px padding)
- Large: `h-10 px-6` (40px height, 24px padding)
- Icon: `size-9` (36px)
- Gap: `gap-2` (8px)
- Border radius: `rounded-md`
- Shadow: `shadow-xs`

### Card Specifications
- Structure: `flex flex-col gap-6`
- Border radius: `rounded-xl`
- Padding: `py-6` (vertical), `px-6` (horizontal in sub-components)
- Shadow: `shadow-sm`
- Border: `border` (1px)

### Select Component
- Height: `h-9` (default), `h-8` (sm)
- Padding: `px-3 py-2`
- Border radius: `rounded-md`
- Shadow: `shadow-xs` (trigger), `shadow-md` (content)
- Gap: `gap-2`

### Animation Durations
- Fast: `0.2s` (slide-in-from-top-2, etc.)
- Medium: `0.3s` (slide-in-from-bottom)
- Slow: `0.5s` (transitions)

### Glassmorphism (from navbar)
- Background: `bg-white/10`
- Backdrop: `backdrop-blur-md`
- Border: `border border-white/20`
- Border radius: `rounded-full` (navbar)

## NEXT STEPS:
1. Update tailwind.config.js with these exact values
2. Update CSS variables in index.css
3. Clone components with exact spacing
4. Apply animations with exact durations
