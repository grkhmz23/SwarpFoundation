# Swarp Foundation Website

A high-tech, production-ready website for Swarp Foundation featuring modern design, smooth animations, and comprehensive sections for AI, blockchain, and software development services.

## 🚀 Features

- **High-Tech Lab Vibe**: Dark theme with electric blue, purple, and cyan branding
- **10 Homepage Sections**:
  1. Hero with animated background and CTAs
  2. What We Build (AI, Web, Infrastructure, Solana, Tooling, Audits)
  3. SwarpPay Product Spotlight
  4. Capabilities Timeline (Discover → Design → Build → Deploy → Maintain)
  5. Metrics & Proof
  6. Case Studies with real outcomes
  7. Ecosystem & Partners
  8. Security by Design
  9. Careers with open roles
  10. Final CTA with contact form
- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Framer Motion animations and custom effects
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS

## 🎨 Branding Colors

- **Blue**: `#00D4FF` - Primary accent
- **Purple**: `#9D4EDD` - Secondary accent
- **Cyan**: `#00FFF0` - Highlight
- **Dark**: `#0A0E27` - Background
- **Darker**: `#050714` - Deeper background

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Open Browser**
Navigate to `http://localhost:3000`

## 🛠️ Build Commands

```bash
# Development
npm run dev

# Production Build
npm run build

# Start Production Server
npm start

# Lint Code
npm run lint
```

## 📁 Project Structure

```
swarp-foundation/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Header & Footer
│   │   ├── page.tsx             # Homepage with all sections
│   │   └── globals.css          # Global styles & Swarp branding
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── animated-background.tsx
│   │   └── sections/            # Homepage sections
│   │       ├── hero.tsx
│   │       ├── what-we-build.tsx
│   │       ├── swarppay-spotlight.tsx
│   │       ├── capabilities-timeline.tsx
│   │       ├── metrics.tsx
│   │       ├── case-studies.tsx
│   │       ├── ecosystem-partners.tsx
│   │       ├── security.tsx
│   │       ├── careers.tsx
│   │       └── final-cta.tsx
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── postcss.config.mjs
```

## 🎯 Navigation Structure

### Top Nav
- **Products**: SwarpPay, Developer Tools
- **Services**: AI Development, Web Apps, Infrastructure, Solana & Blockchain
- **Developers**: Documentation, SDKs, APIs, Status
- **Company**: About, Careers, Contact
- **Resources**: Blog, Press Kit, Security

## 🔧 Customization

### Update Branding Colors
Edit `tailwind.config.ts`:
```typescript
swarp: {
  blue: "#00D4FF",
  purple: "#9D4EDD",
  dark: "#0A0E27",
  // ...
}
```

### Modify Content
- **Hero Text**: `src/components/sections/hero.tsx`
- **Services**: `src/components/sections/what-we-build.tsx`
- **Case Studies**: `src/components/sections/case-studies.tsx`
- **Contact Info**: `src/components/sections/final-cta.tsx`

### Add New Sections
1. Create new component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`

## 📧 Contact Form

The contact form in the Final CTA section currently logs submissions to the console. To connect to a backend:

1. Update the `handleSubmit` function in `src/components/sections/final-cta.tsx`
2. Send form data to your API endpoint
3. Handle success/error states

Example:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  // Handle response
};
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## 🎨 Design Features

- **Animated Background**: Particle network in hero section
- **Grid Pattern**: Subtle tech grid throughout
- **Glow Effects**: Blue/purple/cyan glows on cards and buttons
- **Smooth Transitions**: 300ms transitions on hover states
- **Responsive**: Mobile-first design with breakpoints
- **Custom Scrollbar**: Gradient scrollbar matching brand colors

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Security Note

This is a frontend-only application. For production:
- Set up proper backend for contact form
- Add rate limiting
- Implement CAPTCHA for form submissions
- Use environment variables for sensitive data

## 📄 License

Proprietary - Swarp Foundation

## 🤝 Support

For questions or support:
- Email: hello@swarp.foundation
- Response Time: Within 24 hours
- Support: 24/7 Available

---

Built with ❤️ by Swarp Foundation
