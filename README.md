# Tanashri — A Personal Interactive Birthday Story

A mobile-first, luxury editorial interactive story & digital scrapbook built for **Tanashri** ("Shree" / "Radha").

Crafted with a cinematic editorial aesthetic (deep black `#080808`, cream `#F5F2EC`, and muted wine `#581825` accents, Cormorant Garamond serif headings, Inter body, and Caveat handwritten notes).

---

## Quick Start

### 1. Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser (or use device mode at 390×844 px for the mobile experience).

### 2. Build for Production
```bash
npm run build
```

---

## How to Customize

All text, photos, audio paths, and hidden easter eggs are neatly centralized in:
📂 `src/data/storyData.ts`

### 1. Replacing Photos
Place your personal photos in the `public/photos/` folder (e.g. `public/photos/ganesh_utsav.jpg`), and in `src/data/storyData.ts`, update the `src` property of any photo:
```ts
photo: {
  id: 'first-time-photo',
  src: '/photos/ganesh_utsav.jpg', // <-- Put your photo path here
  alt: 'Tanashri in blue',
  orientation: 'portrait', // Supports: 'portrait' | 'landscape' | 'square'
  ...
}
```

### 2. Adding Background Music
By default, the website features a procedural warm ambient piano synthesizer using Web Audio API so it plays reliably out of the box with zero external dependencies.
If you prefer your own MP3 song:
1. Copy your audio file to `public/audio/ambient.mp3`
2. In `src/data/storyData.ts`, set:
```ts
audio: {
  filePath: '/audio/ambient.mp3',
  title: 'Your Song Title',
}
```
*Note: Audio will never autoplay. The user can toggle it on/off with the ♪ Music button at the top-right, and their choice is remembered.*

### 3. Personalizing Text & Memories
Every chapter and line from the story is configured in `src/data/storyData.ts`. You can tweak words, dates, or handwritten notes whenever you like.

---

## Features

- **13 Cinematic Screens:**
  1. `Screen 01` — Intro (Tanashri • A little story about you)
  2. `Screen 02` — The First Time (Ganesh Utsav • The girl in blue • Silver-box kurti)
  3. `Screen 03` — Atrangi (Craft & cutting • Converging lines • Handwritten survival note)
  4. `Screen 04` — Eye Contact (Minimal typography • Sequential pauses • 👀)
  5. `Screen 05` — Lohri (Warm festival ambiance • Stylized Instagram notification card)
  6. `Screen 06` — Chitra Dhoom (Interactive chat sequence • Turning point reveal • Wine glow)
  7. `Screen 07` — The Flowers (Still-life photo placeholders • Outing day • Cancelled meetings)
  8. `Screen 08` — The Canteen (Awkward conversation • Distant typography)
  9. `Screen 09` — The Silence (Monolithic 2 MONTHS • Quiet negative space)
  10. `Screen 10` — The Call (3 Months 17 Days 16 Hours • Capstone call • Color warming)
  11. `Screen 11` — What I Want You To Know (Sincere, gentle, non-pressuring message)
  12. `Screen 12` — Happy Birthday (Tanashri • Shree • Radha • Subtle floating particles)
  13. `Screen 13` — Final Message (Girl in blue signoff • Fade to black • Replay button)
- **Interactive Easter Eggs:** Subtle whisper toasts triggered by tapping the blue kurti memory, the 👀 icon, and the Instagram notification.
- **Mobile-First Responsive Design:** Optimized for 390×844 px (iPhone 12/13/14/15/16 Pro), plus 375×812, 393×873, 412×915, and centered luxury editorial canvas on desktop.
- **Deployable to Vercel:** Zero backend required. Push to GitHub and connect to Vercel with standard Vite defaults.
