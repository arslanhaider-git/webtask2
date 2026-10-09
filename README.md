# AussiePath Education - Web Development Project

## Project Overview
This project is a professional, modern, and fully responsive five-page website for an Australian education consultancy called "AussiePath Education". It is designed to assist international students in exploring educational opportunities in Australia.

## Technologies Used
* **HTML5**: For semantic structure and accessibility.
* **Tailwind CSS**: Used via CDN for rapid, responsive UI styling. 
  * *Note on Production Use:* Using the Tailwind CDN is excellent for development and simple static deployments, but it has limitations for large-scale production. The CDN loads the entire Tailwind library (which is large) rather than purging unused CSS, and it compiles styles in the browser, which can cause a slight delay or flash of unstyled content on slow connections.
* **Vanilla JavaScript**: For interactive functionality (mobile menus, accordions, form validation, password toggles).
* **Lucide Icons**: For clean, modern SVG icons.

## Project Folder Structure
```
aussiepath-education/
├── index.html          # Homepage
├── about.html          # About Us Page
├── contact.html        # Contact Us Page (with Formspree)
├── signin.html         # Sign In Page
├── signup.html         # Sign Up / Registration Page
├── README.md           # Project Documentation
└── assets/
    ├── css/
    │   └── styles.css  # Custom CSS overrides and base styles
    ├── js/
    │   ├── tailwind-config.js # Tailwind CDN Configuration
    │   ├── main.js     # Shared JS (Navbar, Accordion)
    │   ├── contact.js  # Form validation and submission logic
    │   └── auth.js     # Auth validation and password strength
    └── favicon.svg     # Website Favicon
```

## How to Open and Run the Website
1. This project does not require a complex build process.
2. Simply navigate to the `aussiepath-education` folder in your file explorer.
3. Double-click on `index.html` to open it in your default web browser.
4. You can navigate the entire site locally. An internet connection is required to load the Tailwind CSS CDN, Google Fonts, Lucide Icons, and Unsplash images.

## Formspree Contact Form Configuration
The Contact page (`contact.html`) is set up to work with Formspree for handling form submissions.
**To activate it:**
1. Go to [Formspree](https://formspree.io/) and create a free account.
2. Create a new form (e.g., "AussiePath Contact Form").
3. Copy the endpoint URL provided by Formspree (it looks like `https://formspree.io/f/YOUR_FORM_ID`).
4. Open `contact.html` in a text editor.
5. Locate the `<form id="contact-form" action="" method="POST"...` tag (around line 97).
6. Paste your Formspree URL into the `action` attribute: `<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST"...`
7. Save the file. The form will now securely send submissions to your email.

## Authentication Limitations (Sign In & Sign Up)
As per the assignment requirements, the `signin.html` and `signup.html` pages do not falsely claim to log a user in without a backend.
* **Sign Up:** Includes full client-side validation (matching passwords, password strength meter, length requirements). Submitting the form shows an informational alert explaining that a backend service (like Firebase or Node.js) must be connected to securely create the account.
* **Sign In:** Demonstrates form UI, password visibility toggle, and layout. Submitting shows a notice that the backend authentication is not configured.
* Passwords are not saved in local storage or transmitted anywhere.

## UI Component Checklist (10+ Per Page)

### 1. index.html (Home)
1. **Navbar** (Shared responsive navigation)
2. **Mobile Nav Menu** (Slide-down menu)
3. **Footer** (Shared footer with links)
4. **Hero Section** (Banner with background image overlay)
5. **Badge** (Small highlight label e.g., "Discover Your Potential")
6. **Feature Cards** (Services with icon and hover effects)
7. **Step-by-step Indicator** (Circular numbered badges)
8. **Image Cards** (Study destinations with hover scaling)
9. **Testimonial Panel** (Quote cards with avatars)
10. **FAQ Accordion** (Collapsible Q&A blocks)
11. **CTA Banner** (Bottom call-to-action block)

### 2. about.html (About Us)
1. **Navbar**
2. **Mobile Nav Menu**
3. **Footer**
4. **Breadcrumbs** (Navigation trail at top)
5. **Page Hero** (Simple text banner)
6. **Icon Box** (Small label with icon for Mission/Vision)
7. **Divider** (Horizontal line separator)
8. **Numbered Process Cards** (4-step grid layout)
9. **Alert / Notice Panel** (Info box regarding Immigration advice)
10. **Profile Cards** (Team members with floating images)

### 3. contact.html (Contact)
1. **Navbar**
2. **Mobile Nav Menu**
3. **Footer**
4. **Contact Info Cards** (Icon + text boxes)
5. **Form Input Group** (Label + Text/Email input)
6. **Select Dropdown Menu** (Custom styled select)
7. **Textarea Group** (Message box)
8. **Checkbox Group** (Consent checkbox with helper text)
9. **Submit Button with Spinner** (Loading state UI)
10. **Alert Message** (Dynamic Success/Error notification box)

### 4. signin.html (Sign In)
1. **Navbar** (Simplified for Auth)
2. **Footer** (Simplified for Auth)
3. **Split Two-Column Layout** (Form on left, image on right)
4. **Input Group with Icon** (Email field with left icon)
5. **Password Visibility Toggle** (Input add-on button)
6. **Checkbox** (Remember me)
7. **Alert Message** (Auth info notice)
8. **Divider with Text** ("Or continue with")
9. **Social Button** (Google/Apple buttons)
10. **Link** (Forgot password text link)

### 5. signup.html (Sign Up)
1. **Navbar** (Simplified)
2. **Footer** (Simplified)
3. **Select Dropdown Menu** (Country/Study level)
4. **Password Strength Indicator** (Dynamic progress bar)
5. **Password Visibility Toggle** (Eye icon button)
6. **Form Validation Error Text** (Dynamic "Passwords do not match" text)
7. **Checkbox** (Terms agreement)
8. **Secure Info Panel** (Bottom panel with security icons)
9. **Primary Button** (Submit action)
10. **Input Group** (Standard text input)

## Testing Performed
* [x] Verified all five HTML pages exist and link to one another correctly.
* [x] Checked unique browser `<title>` tags on all pages.
* [x] Tested responsive design on Desktop, Tablet, and Mobile sizes (no horizontal scrolling).
* [x] Verified the mobile navigation menu opens/closes properly on all pages.
* [x] Confirmed the Favicon loads correctly.
* [x] Checked the FAQ Accordion functionality in `index.html`.
* [x] Tested the Password Visibility toggle in `signin.html` and `signup.html`.
* [x] Verified Password Strength meter and matching validation in `signup.html`.
* [x] Tested contact form submission logic (demo mode alerts correctly when action is empty).
* [x] Ensured no console errors appear on page load.
* [x] Verified all 10+ UI component requirements are met per page.
