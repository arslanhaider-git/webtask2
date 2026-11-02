# AussiePath Education - React Web Application

## Project Overview
AussiePath Education is a modern, responsive single-page React application written in TypeScript with Vite and Tailwind CSS. It is designed to assist international students in exploring educational opportunities in Australia, choosing universities, preparing documentation, and booking free discovery consultations.

## Features & Pages
1. **Home (`/`)**:
   - Hero banner with Australian campus background and trust indicators.
   - Comprehensive service feature cards (University Selection, Admission Guidance, Visa Process Guidance).
   - 4-step interactive journey roadmaps (Discover, Prepare, Apply, Get Ready).
   - Top Australian study destinations gallery (Sydney, Melbourne, Brisbane, Perth).
   - Student testimonials from Australian institutions.
   - Interactive FAQ Accordion.
   - Consultation CTA banner.

2. **About Us (`/about`)**:
   - Mission & Vision overview.
   - End-to-end 4-stage support process.
   - Transparent advisory disclaimer regarding education counselling vs. migration agent services.
   - Team advisor profile showcase.

3. **Contact (`/contact`)**:
   - Office contact cards (Address, Phone, Email, Hours).
   - Interactive booking form with country dropdown, study level, budget selector, and validation.
   - Dynamic alert feedback and submit loading state.

4. **Sign In (`/signin`)**:
   - Split two-column authentication layout.
   - Password visibility toggle.
   - Informative authentication guidance notification.

5. **Sign Up (`/signup`)**:
   - Comprehensive registration form with academic preferences.
   - Real-time dynamic password strength meter.
   - Instant password confirmation match verification.
   - Password visibility toggle and terms acceptance.

## Technology Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6 (host `0.0.0.0`, port `3000`)
- **Styling**: Tailwind CSS v4 with custom brand color palette
- **Routing**: React Router DOM (supports `/`, `/about`, `/contact`, `/signin`, `/signup`)
- **Icons**: Lucide React

## Running the App
```bash
npm install
npm run dev
```
Dev server listens on port 3000.
