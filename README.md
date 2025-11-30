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

## Deployment to GitHub Pages

Since this project is configured with `gh-pages`, you can deploy it directly from your terminal.

1. **Initialize Git (if not done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Connect to your GitHub Repo:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy:**
   Run this command to build the game and push it to the `gh-pages` branch automatically:
   ```bash
   npm run deploy
   ```

Your game will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`!

## Controls
- **Arrow Keys / Touch Pad**: Move and Jump
- **Space / Action Button**: Interact (Enter doors, eat carrots)
