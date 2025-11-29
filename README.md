# Super Rabbit Boy Adventure

A platformer game built with React, TypeScript, and Vite.

## Features
- **5 Unique Levels**: From Animal Town to the Boom Boom Factory.
- **Physics Engine**: Custom AABB collision detection, variable jump height, momentum-based jumping, and swimming mechanics.
- **Progressive Difficulty**: New enemies and hazards introduced in each level.
- **Responsive Design**: Scales to fit different screen sizes.

## How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment

This project is configured for GitHub Pages.

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Deploy via Action:**
   The included `.github/workflows/deploy.yml` will automatically build and deploy your game to the `gh-pages` branch whenever you push to `main`.

## Controls
- **Arrow Keys / Touch Pad**: Move and Jump
- **Space / Action Button**: Interact (Enter doors, eat carrots)
