# 🎨 Cursor Pro AI Agent Prompt - UI Transformation

Copy and paste this entire prompt into Cursor Pro to begin the transformation:

---

## 🎯 MISSION: Complete UI Transformation

Transform the entire SyndicateIQ application UI to **exactly match** the design, animations, interactions, and layout from this GitHub repository:

**Reference Repository:**
```
https://github.com/midhunrajcharles/SyndicateIQ/tree/ab133162e2453fefc606a2dfa926f353112f1256/frontend
```

**Current Project:** React + Vite + TypeScript application in `syndicateiq-hackathon`

---

## 📋 TASK BREAKDOWN

### PHASE 1: Access & Analyze Reference Repository

1. **Use Cursor Pro's GitHub integration** to access the reference repository
2. **Clone or examine** the reference code structure
3. **Document** the key differences between reference and current project:
   - Component structures
   - CSS/styling approach
   - Animation patterns
   - Layout patterns

### PHASE 2: Design System Migration

**Extract from reference and apply to current project:**

1. **CSS Variables & Colors** (`app/globals.css` → `src/index.css`)
   - Copy all `:root` CSS variables
   - Copy OKLCH color definitions
   - Copy dark mode variables
   - Update Tailwind config to use these

2. **Typography** 
   - Font families (Google Fonts)
   - Font sizes, weights, line heights
   - Letter spacing
   - Text styles

3. **Spacing & Layout**
   - Padding/margin patterns
   - Grid layouts
   - Container widths
   - Breakpoints

4. **Animations** (`app/globals.css` → `src/index.css`)
   - Copy ALL `@keyframes` definitions
   - Copy ALL animation utility classes
   - Copy transition definitions
   - Ensure animations work

### PHASE 3: Component Migration

**For each component, match reference exactly:**

1. **Button** (`components/ui/button.tsx` → `src/components/ui/Button.tsx`)
   - Match all variants
   - Match all sizes
   - Match hover/focus/active states
   - Match animations

2. **Card** (`components/ui/card.tsx` → `src/components/ui/Card.tsx`)
   - Match structure (CardHeader, CardContent, etc.)
   - Match styling
   - Match hover effects

3. **Input & Select** (`components/ui/select.tsx` → `src/components/ui/`)
   - Match styling
   - Match focus states
   - Match error states

4. **Navigation** (`components/glassmorphism-nav.tsx` → `src/components/layout/`)
   - Match glassmorphism effects
   - Match animations
   - Match responsive behavior

### PHASE 4: Layout Updates

1. **MainLayout** (`app/layout.tsx` → `src/components/layout/MainLayout.tsx`)
   - Match structure
   - Match background patterns
   - Match responsive behavior

2. **Navbar** → Match reference navbar design
3. **Sidebar** → Match reference sidebar design

### PHASE 5: Page Updates

**Update all pages to match reference styling:**

1. **Dashboard** (`app/page.tsx` → `src/pages/Dashboard.tsx`)
2. **Document Processing** → Match reference equivalent
3. **Due Diligence** → Match reference equivalent
4. **Covenant Monitoring** → Match reference equivalent
5. **ESG Monitoring** → Match reference equivalent
6. **ESG Veritas** → Match reference equivalent

For each page:
- Match layout structure
- Match color schemes
- Match spacing
- Match typography
- Match animations
- Match interactions

### PHASE 6: Visual Effects

1. **Glassmorphism** - Apply from reference
2. **Gradients** - Match all gradient definitions
3. **Shadows** - Match shadow system
4. **Blur effects** - Match backdrop blur usage

### PHASE 7: Animations & Interactions

1. **Page Transitions** - Implement from `components/page-transition.tsx`
2. **Framer Motion** - Match all animation patterns
3. **Hover Effects** - Match all hover states
4. **Focus States** - Match all focus styles
5. **Loading States** - Match loading animations
6. **Micro-interactions** - Match all small animations

---

## 🔒 CRITICAL RULES

### ✅ PRESERVE (DO NOT CHANGE):
- All routing logic (`react-router-dom`)
- All business logic and state management
- All mock data and sample data
- All API integrations
- All file upload logic
- All calculation functions
- All type definitions (unless UI-related)
- All page functionality

### ✅ CHANGE (MATCH REFERENCE):
- Visual appearance (colors, fonts, spacing)
- Component styling
- Layout structure
- Animations
- Interactions
- Visual effects

---

## 📝 IMPLEMENTATION STEPS

1. **Start with design system** - Migrate CSS variables, colors, typography
2. **Update components** - One by one, match reference exactly
3. **Update layouts** - Navbar, Sidebar, MainLayout
4. **Update pages** - Apply reference styling to all pages
5. **Add animations** - Copy all animations from reference
6. **Test thoroughly** - Ensure everything works
7. **Fix issues** - Resolve any errors
8. **Verify match** - Compare side-by-side with reference

---

## 🧪 TESTING CHECKLIST

After transformation, verify:
- [ ] Application visually matches reference exactly
- [ ] All animations work smoothly
- [ ] All functionality preserved
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] All pages render correctly
- [ ] Responsive design works
- [ ] All interactions work

---

## 🚀 EXECUTION

**Begin transformation now. Work systematically through each phase. Test after each major change. Commit frequently to `ui-redesign-refactor` branch.**

**Priority order:**
1. Design system (CSS, colors, typography)
2. Core components (Button, Card, Input)
3. Layout components (Navbar, Sidebar)
4. Pages (one by one)
5. Animations
6. Visual effects
7. Final polish

**Start with Phase 1 and proceed sequentially.**

---

**Ready to transform! Begin with accessing the reference repository and analyzing the structure.**
