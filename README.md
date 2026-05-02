# Habimint - Premium Wellness Journals

> From Aham to Ananta

A Next.js 14 frontend project for Habimint, a premium Indian wellness and self-growth journal brand.

## Project Structure

```
/app
  /layout.tsx                     # Root layout with fonts, metadata
  /page.tsx                       # Homepage
  /shop/page.tsx                  # Shop page (TODO)
  /products/[slug]/page.tsx       # Product detail page (TODO)
  /cart/page.tsx                  # Cart page (TODO)
  /checkout/page.tsx              # Checkout page (TODO)
  /login/page.tsx                 # Login page (TODO)
  /about/page.tsx                 # About page (TODO)
  /b2b/page.tsx                   # B2B page (TODO)
  /blogs/page.tsx                 # Blog listing (TODO)
  /blogs/[slug]/page.tsx          # Blog detail page (TODO)
  /faq/page.tsx                   # FAQ page (TODO)
  /account/page.tsx               # Account page (TODO)
/components
  /layout
    Navbar.tsx                    # ✓ Complete
    Footer.tsx                    # ✓ Complete
  /ui
    Button.tsx                    # ✓ Complete
    ProductCard.tsx               # ✓ Complete
    TestimonialCard.tsx           # ✓ Complete
    SectionHeading.tsx            # ✓ Complete
    Badge.tsx                     # ✓ Complete
    Input.tsx                     # ✓ Complete
    Textarea.tsx                  # ✓ Complete
  /sections
    Hero.tsx                      # ✓ Complete
    FeaturedProducts.tsx          # ✓ Complete
    VideoShowcase.tsx             # ✓ Complete
    Testimonials.tsx              # ✓ Complete
    B2BTeaser.tsx                 # ✓ Complete
    Newsletter.tsx                # ✓ Complete
/lib
  /api.ts                         # ✓ Complete - ALL API calls centralized
  /types.ts                       # ✓ Complete - TypeScript interfaces
  /constants.ts                   # ✓ Complete - Site config, navigation
/hooks
  useCart.ts                      # TODO
  useAuth.ts                      # TODO
/store
  cartStore.ts                    # ✓ Complete - Zustand cart store
  authStore.ts                    # ✓ Complete - Zustand auth store
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Zustand** (state management)
- **Axios** (API calls)
- **NextAuth.js** (Google OAuth) - TODO: Setup
- **Lucide React** (icons)

## Brand Identity

- **Company**: Habimint
- **Slogan**: "From Aham to Ananta" (Aham = self-awareness, Ananta = limitless potential)
- **Personality**: Premium, emotional, modern, human, inspiring
- **Fonts**: 'Poltawski Nowy' (headings) + 'Poppins' (body)

## Color System

```css
--color-primary: #2D5A27          /* Deep Forest Green */
--color-primary-light: #C8DEC8    /* Light Mint/Sage */
--color-accent: #C084C8            /* Lavender Purple */
--color-accent-green: #6DC56D      /* Pen green */
--color-bg: #F5F2E8                /* Warm Cream - main background */
--color-bg-secondary: #EAE5D8      /* Warm Beige */
--color-dark: #1E2A3A              /* Dark Navy */
--color-text: #1A1A1A              /* Near black */
--color-text-light: #6B7280        /* Muted text */
--color-white: #FFFFFF
```

## Getting Started

### Prerequisites

- Node.js 18+
- yarn

### Installation

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Development

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
yarn build
```

## API Integration

All API calls are centralized in `/lib/api.ts`. The backend developer only needs to:

1. Set the `NEXT_PUBLIC_API_URL` environment variable
2. Implement the endpoints documented in `/lib/api.ts`
3. All endpoints follow the pattern: `/api/[resource]`

## Components Built

### Layout Components
- **Navbar**: Sticky navbar with logo, navigation links, cart badge, user icon, mobile menu
- **Footer**: Multi-column footer with links, social media, newsletter signup

### UI Components
- **Button**: Primary, secondary, ghost variants with loading states
- **ProductCard**: Product display with image, details, badges, add to cart
- **TestimonialCard**: Review card with star rating and author info
- **SectionHeading**: Reusable section heading with subtitle
- **Badge**: New, Bestseller, Sale badges
- **Input**: Form input with label and error states
- **Textarea**: Form textarea with label and error states

### Section Components
- **Hero**: Homepage hero with CTA buttons
- **FeaturedProducts**: Product grid with cards
- **VideoShowcase**: Video player section
- **Testimonials**: Testimonial cards grid
- **B2BTeaser**: B2B offering teaser
- **Newsletter**: Newsletter subscription form

## State Management

### Cart Store (Zustand)
- Add/remove/update items
- Get item count and subtotal
- Persists to localStorage
- Mock implementation (replace with API calls)

### Auth Store (Zustand)
- Login/register/logout
- User state management
- Token management
- Mock implementation (replace with API calls)

## TODO - Backend Integration

1. Replace mock implementations in stores with actual API calls
2. Setup NextAuth.js for Google OAuth
3. Implement remaining pages (shop, product detail, cart, checkout, etc.)
4. Add toast notifications for user feedback
5. Connect video showcase with actual video URLs
6. Implement search functionality
7. Add product filtering and sorting

## Notes

- All API calls use `NEXT_PUBLIC_API_URL` environment variable
- TypeScript interfaces defined in `/lib/types.ts`
- Design system follows brand colors strictly
- Mobile-first responsive design
- Framer Motion animations throughout
- All TODO comments mark areas needing backend integration

---

© 2025 Habimint. From Aham to Ananta.