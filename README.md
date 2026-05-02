# Habimint — Premium Wellness & Self-Growth Journals

**From Aham to Ananta** — A complete Next.js 14 e-commerce platform for premium guided journals designed for personal transformation.

## 🎯 Project Overview

Habimint is a full-stack Next.js application featuring:
- **12 complete pages** with premium UI/UX
- **E-commerce functionality** (cart, checkout, orders)
- **User authentication** (email/password + Google OAuth ready)
- **B2B/Corporate gifting** section
- **Blog & FAQ** for content marketing
- **Responsive design** optimized for all devices
- **SEO-optimized** with meta tags and structured data

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Image Handling**: Next.js Image Optimization

### Design System
- **Colors**: Deep Forest Green (#2D5A27), Light Mint (#C8DEC8), Lavender Purple (#C084C8), Warm Cream (#F5F2E8)
- **Typography**: Poltawski Nowy (headings), Poppins (body)
- **UI Components**: shadcn/ui + custom components

### Backend (Ready for Integration)
- **Database**: MongoDB
- **Authentication**: NextAuth.js (configured, not implemented)
- **Payment Gateway**: Razorpay (ready for integration)
- **Email Service**: SMTP (configured)

## 📁 Project Structure

```
/app
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Navbar + Footer
│   ├── page.tsx                 # Homepage (10 sections)
│   ├── shop/page.tsx            # Shop page
│   ├── products/[slug]/page.tsx # Product detail pages
│   ├── cart/page.tsx            # Shopping cart
│   ├── checkout/page.tsx        # Checkout flow
│   ├── order-confirmation/page.tsx # Order success
│   ├── login/page.tsx           # Auth (Sign In + Sign Up)
│   ├── account/page.tsx         # User dashboard
│   ├── about/page.tsx           # Brand story
│   ├── b2b/page.tsx             # Corporate gifting
│   ├── blogs/page.tsx           # Blog listing
│   ├── faq/page.tsx             # FAQ with search
│   └── globals.css              # Global styles + brand variables
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── ui/                      # Button, ProductCard, Logo, etc.
│   └── sections/                # Homepage sections
├── lib/
│   ├── api.ts                   # Axios API client
│   ├── types.ts                 # TypeScript interfaces
│   └── constants.ts             # App constants
├── store/
│   ├── authStore.ts             # Zustand auth state
│   └── cartStore.ts             # Zustand cart state
├── public/
│   ├── images/                  # Product images (18 total)
│   ├── sitemap.xml              # SEO sitemap
│   └── robots.txt               # SEO robots file
├── tailwind.config.js           # Tailwind + brand colors
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies
```

## 🌐 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| **Homepage** | `/` | Hero slider, trust bar, featured products, video showcase, testimonials, FAQ, newsletter |
| **Shop** | `/shop` | Product grid with filters |
| **Product Detail** | `/products/[slug]` | Image gallery, pricing, add to cart, reviews, tabs |
| **Cart** | `/cart` | Cart items, quantity selector, coupon code, order summary |
| **Checkout** | `/checkout` | Delivery form, payment, order summary |
| **Order Confirmation** | `/order-confirmation` | Success message, order details |
| **Login/Signup** | `/login` | Email/password auth + Google OAuth ready |
| **Account** | `/account` | Profile, orders, wishlist, coupons |
| **About Us** | `/about` | Founder story, brand values, vision, product teaser |
| **B2B** | `/b2b` | Corporate gifting, pricing tiers, enquiry form |
| **Blogs** | `/blogs` | Blog grid with 6 categories |
| **FAQ** | `/faq` | Accordion-style, searchable, 4 categories |

## 🔌 API Endpoints (Backend Required)

### Authentication
- `POST /api/auth/login` — User login
- `POST /api/auth/register` — User registration
- `GET /api/auth/user` — Get current user

### Products
- `GET /api/products` — List all products
- `GET /api/products/:slug` — Get single product
- `GET /api/products/:id/reviews` — Get product reviews

### Cart
- `GET /api/cart` — Get user cart
- `POST /api/cart` — Add item to cart
- `PUT /api/cart/:id` — Update cart item quantity
- `DELETE /api/cart/:id` — Remove cart item

### Orders
- `POST /api/orders` — Create order
- `GET /api/orders/my` — Get user orders
- `GET /api/orders/:id` — Get single order

### Coupons
- `POST /api/coupon/apply` — Apply coupon code
- `GET /api/coupons/my` — Get user coupons

### User
- `PUT /api/user/profile` — Update user profile
- `GET /api/user/wishlist` — Get user wishlist

### B2B
- `POST /api/b2b/enquiry` — Submit B2B enquiry

### Content
- `GET /api/blogs` — Get blog posts
- `POST /api/newsletter` — Subscribe to newsletter

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
# Next.js
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# MongoDB
MONGO_URL=mongodb://localhost:27017/habimint

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ installed
- yarn package manager

### Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

The app will be available at `http://localhost:3000`

## 📦 Production Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

```bash
# Or deploy with Vercel CLI
npm i -g vercel
vercel --prod
```

### Deploy to AWS (EC2 + PM2)

```bash
# Install PM2 globally
npm install -g pm2

# Build the app
yarn build

# Start with PM2
pm2 start npm --name \"habimint\" -- start

# Save PM2 process list
pm2 save

# Setup PM2 startup script
pm2 startup
```

## 🖼 Image Assets

All 18 product images are in `/public/images/`:

### Fall Forward Journal
- `fall-forward-hero.jpg` — Hero/main image
- `fall-forward-cover.jpg` — Product cover
- `fall-forward-open.jpg` — Open journal
- `fall-forward-inside.jpg` — Inside pages
- `fall-forward-desk.jpg` — Lifestyle shot
- `fall-forward-spread.jpg` — Page spread
- `fall-forward-quote.jpg` — Quote page
- `fall-forward-banner.jpg` — Marketing banner
- `fall-forward-window.jpg` — Window shot
- `fall-forward-art-1.jpg` — Artwork 1
- `fall-forward-art-2.jpg` — Artwork 2

### Version 2.0 Journal
- `version2-hero.jpg` — Hero/main image
- `version2-cover.jpg` — Product cover
- `version2-open.jpg` — Open journal
- `version2-flat.jpg` — Flat lay

### Brand Assets
- `habimint-logo.svg` — Brand logo
- `hero-slide-1.jpg`, `hero-slide-2.jpg`, `hero-slide-3.jpg` — Hero slider images

## 🔧 Backend Integration Guide

### 1. Authentication

**Current State**: Uses Zustand store with localStorage (mock data)

**Integration Steps**:
1. Install NextAuth.js: `yarn add next-auth`
2. Create `/app/api/auth/[...nextauth]/route.ts`
3. Configure Google OAuth provider
4. Update `authStore.ts` to call real API endpoints
5. Replace mock login/register with actual API calls

### 2. Products & Cart

**Current State**: Static product data in components

**Integration Steps**:
1. Create MongoDB models: `Product`, `Cart`, `Order`
2. Build API routes in `/app/api/` directory
3. Update `lib/api.ts` with actual endpoints
4. Replace static data with API calls

### 3. Payment Gateway (Razorpay)

**Integration Steps**:
1. Install Razorpay: `yarn add razorpay`
2. Create `/app/api/payment/create-order/route.ts`
3. Add Razorpay checkout script to checkout page
4. Handle payment callbacks

## 🧪 Testing

```bash
# Run type checking
yarn type-check

# Run linting
yarn lint

# Run build check
yarn build
```

## 📝 Features Checklist

### ✅ Completed
- [x] 12 complete pages with premium UI
- [x] Responsive design (mobile, tablet, desktop)
- [x] SEO optimization (meta tags, sitemap, robots.txt)
- [x] Image optimization with Next.js Image
- [x] Framer Motion animations
- [x] Form validation
- [x] State management (Zustand)
- [x] Cart functionality
- [x] User authentication UI
- [x] Protected routes

### 🔲 Backend Integration Required
- [ ] Connect to MongoDB database
- [ ] Implement authentication API
- [ ] Build product/cart/order APIs
- [ ] Integrate Razorpay payment
- [ ] Setup email notifications

---

**Built with ❤️ by the Habimint team**

From Aham to Ananta 🌱
