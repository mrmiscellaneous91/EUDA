# Generation Rent - Project Instructions

## Technical Stack
- **UI Framework/Components**: Shadcn
- **Internationalization (i18n)**: [Wuchale](https://wuchale.dev/)

## Brand Guidelines
Use the following Spanish-inspired color palette for all development in this workspace.

### Color Palette (Tailwind CSS 4.0 / OKLCH)
```css
@import "tailwindcss";
@import "tw-animate-css";
@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: oklch(0.98 0.008 85);
  --foreground: oklch(0.25 0.02 45);
  --card: oklch(0.995 0.005 85);
  --card-foreground: oklch(0.25 0.02 45);
  --popover: oklch(0.995 0.005 85);
  --popover-foreground: oklch(0.25 0.02 45);
  --primary: oklch(0.55 0.14 45);
  --primary-foreground: oklch(0.98 0.008 85);
  --secondary: oklch(0.92 0.03 120);
  --secondary-foreground: oklch(0.40 0.08 120);
  --muted: oklch(0.94 0.01 75);
  --muted-foreground: oklch(0.50 0.02 55);
  --accent: oklch(0.92 0.04 50);
  --accent-foreground: oklch(0.45 0.12 45);
  --destructive: oklch(0.50 0.18 20);
  --border: oklch(0.88 0.02 65);
  --input: oklch(0.90 0.015 70);
  --ring: oklch(0.55 0.14 45);
  
  /* Chart colors - Spanish palette */
  --chart-1: oklch(0.55 0.14 45);
  --chart-2: oklch(0.52 0.09 120);
  --chart-3: oklch(0.50 0.18 20);
  --chart-4: oklch(0.70 0.12 80);
  --chart-5: oklch(0.45 0.08 200);
  
  /* Severity colors */
  --warning: oklch(0.75 0.15 70);
  --warning-foreground: oklch(0.35 0.08 55);
  --info: oklch(0.60 0.10 230);
  --info-foreground: oklch(0.98 0.008 85);
  --success: oklch(0.52 0.09 120);
  --success-foreground: oklch(0.98 0.008 85);
  
  /* Sidebar */
  --sidebar: oklch(0.96 0.01 75);
  --sidebar-foreground: oklch(0.25 0.02 45);
  --sidebar-primary: oklch(0.55 0.14 45);
  --sidebar-primary-foreground: oklch(0.98 0.008 85);
  --sidebar-accent: oklch(0.92 0.04 50);
  --sidebar-accent-foreground: oklch(0.45 0.12 45);
  --sidebar-border: oklch(0.88 0.02 65);
  --sidebar-ring: oklch(0.55 0.14 45);
}

.dark {
  --background: oklch(0.18 0.02 45);
  --foreground: oklch(0.95 0.01 75);
  --card: oklch(0.22 0.025 45);
  --card-foreground: oklch(0.95 0.01 75);
  --popover: oklch(0.22 0.025 45);
  --popover-foreground: oklch(0.95 0.01 75);
  --primary: oklch(0.70 0.14 45);
  --primary-foreground: oklch(0.18 0.02 45);
  --secondary: oklch(0.28 0.03 120);
  --secondary-foreground: oklch(0.75 0.08 120);
  --muted: oklch(0.28 0.02 50);
  --muted-foreground: oklch(0.65 0.02 60);
  --accent: oklch(0.32 0.04 50);
  --accent-foreground: oklch(0.80 0.10 45);
  --destructive: oklch(0.65 0.20 20);
  --border: oklch(0.35 0.02 50);
  --input: oklch(0.30 0.02 50);
  --ring: oklch(0.70 0.14 45);
  
  --chart-1: oklch(0.70 0.14 45);
  --chart-2: oklch(0.65 0.10 120);
  --chart-3: oklch(0.65 0.20 20);
  --chart-4: oklch(0.75 0.14 80);
  --chart-5: oklch(0.60 0.12 230);
  
  --warning: oklch(0.80 0.15 70);
  --warning-foreground: oklch(0.20 0.04 55);
  --info: oklch(0.65 0.12 230);
  --info-foreground: oklch(0.18 0.02 45);
  --success: oklch(0.65 0.10 120);
  --success-foreground: oklch(0.18 0.02 45);
  
  --sidebar: oklch(0.20 0.02 45);
  --sidebar-foreground: oklch(0.95 0.01 75);
  --sidebar-primary: oklch(0.70 0.14 45);
  --sidebar-primary-foreground: oklch(0.18 0.02 45);
  --sidebar-accent: oklch(0.32 0.04 50);
  --sidebar-accent-foreground: oklch(0.80 0.10 45);
  --sidebar-border: oklch(0.35 0.02 50);
  --sidebar-ring: oklch(0.70 0.14 45);
}
```
