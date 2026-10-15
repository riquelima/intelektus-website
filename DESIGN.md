# Design System & Visual Identity

<!-- impeccable:design-schema 1 -->

## Design Direction & Core World
- **Aesthetic World**: Cybernetic Precision & Kinetic Glass. Deep void space (#04040D), layered luminous depths with tinted translucent glass, laser violet (#6C63FF), electric cyan (#00F5D4), and radiant magenta (#FF3CAC).
- **Surface Mode**: Persuade & Experience (99% Mobile-First viewport).
- **Core Stance**: Reject generic, static template cards and bland corporate monotony. Emphasize organic 3D WebGL responsive physics, thumb-ergonomic micro-interactions, silky smooth 60fps gesture handling, and magnetic tactile feedback.

## Mobile Ergonomics & Viewport Rules
- **Primary Viewport**: 375px - 430px wide, high-DPI display, single-thumb reach zone.
- **Touch Targets**: Minimum 48x48px clickable areas with visual active spring (`scale(0.96)` with rapid 150ms release).
- **Bottom Navigation Hub**: A floating quick-action pill positioned comfortably above mobile OS home indicators, offering 1-tap WhatsApp consultation, live tech status indicator, and instant section jumping.
- **Scroll Physics**: Smooth kinetic deceleration, momentum-preserved swipes, and layered parallax with hardware-accelerated transforms (`translate3d`).

## 3D WebGL Architecture (Mobile Optimized)
- **Engine**: Three.js WebGL canvas with dynamic DPR clamping (max 1.5 on mobile to conserve battery and GPU thermals).
- **Interactive 3D Quantum Orb / Geometric Core**:
  - Interactive multi-ring gyroscope polyhedron reacting to mobile device orientation / touch drag and viewport scroll progress.
  - Floating ambient cyber particles with depth-based soft alpha falloff.
  - IntersectionObserver lifecycle: render loop sleeps when 3D canvas is out of the visible viewport, zero CPU drain.

## Color Tokens & Materials
- **Void Ground**: `#04040D` (Deep cosmic black with subtle violet tint)
- **Deep Surface**: `rgba(10, 10, 24, 0.72)` with `backdrop-filter: blur(16px)`
- **Border Elevation**: `rgba(108, 99, 255, 0.16)` base, rising to `rgba(0, 245, 212, 0.45)` on active state
- **Primary Energy**: `#6C63FF` (Intelektus Royal Violet)
- **Signal Cyan**: `#00F5D4` (Electric Cyan for live statuses, key numbers and conversion accents)
- **Accent Plasma**: `#FF3CAC` (Vibrant Magenta for focal highlights)
- **Typography Colors**:
  - Primary: `#F8F9FD` (Ultra-crisp high contrast ≥ 9:1 against void ground)
  - Secondary: `#A3A2C8` (Warm lavender tint, contrast ≥ 4.8:1, never dull gray)
  - Muted: `#5D5B82` (Tertiary captions, badges)

## Typography & Rhythm
- **Primary Font**: Plus Jakarta Sans & Inter, geometric clean proportions, tight tracking on headings (`-0.03em`), generous line-height (`1.65`) on mobile body copy.
- **Scale Hierarchy**:
  - Mobile Hero H1: 2.25rem - 2.75rem (bold, tight, impactful without line-wrap orphans)
  - Section Headings: 1.75rem - 2rem
  - Subheadings & Cards: 1.125rem - 1.25rem
  - Body: 0.9375rem - 1rem
  - Badges & Microcopy: 0.75rem - 0.8125rem

## Motion & Transitions
- **Easing**: Exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)` for entrances; spring damping for interactive cards.
- **Scroll Orchestration**: Elements fade up with stagger (50ms interval) as they enter mobile viewport, avoiding sudden layout pops.
- **Haptic Visuals**: Subtle glow bloom and scale changes upon finger press.
