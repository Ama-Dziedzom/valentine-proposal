# Valentine's Day Interactive Proposal ❤️

A playful, interactive website designed for a fun Valentine's Day proposal. The site features progressive emotional manipulation (in a cute way!) as the user clicks the "No" button, eventually leading them to an irresistible "Yes".

## ✨ Features

- **Progressive Escalation**: The "No" button triggers 3 distinct stages of "sadness":
  1. **First Click**: A cute sad image and a pouty message.
  2. **Second Click**: Larger sad image and a more pleading message.
  3. **Third Click**: The sad image dominates the screen, the "Yes" button grows 2.5x larger, and the "No" button shrinks to 40% size.
- **Success Celebration**: Accepting the proposal triggers:
  - A happy celebration animation.
  - Interactive confetti burst.
  - A romantic success chime sound.
  - A playful success message.
- **Modern Aesthetic**: Built with glassmorphism, soft gradients, and smooth Framer Motion animations.
- **Responsive Design**: Works perfectly on both mobile and desktop.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Interactivity**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

### 2. Setup

Clone or copy the project files to your desired directory.

```bash
cd valentine-proposal
npm install
```

### 3. Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result!

## 📂 Project Structure

- `src/app/page.tsx`: Core logic and interaction flow.
- `src/app/globals.css`: Design system and custom animations.
- `src/app/layout.tsx`: Font and metadata configuration.

## 🎨 Asset Customization

- **Images**: 
  - The "sad" image is set to `/assets/sad.jpeg`.
  - The "happy" image is set to `/assets/happy.jpeg`.
  - The "initial" image is currently a cute bear GIF. You can replace this in `src/app/page.tsx`.
- **Sound**: The success chime is sourced from a public CDN. You can find it in the `handleYesClick` function.

---
Made with ❤️ for Valentine's Day.
