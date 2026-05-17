# ReactBluffs

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=fff)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?logo=redux&logoColor=fff)
![Vitest](https://img.shields.io/badge/Vitest-4.1-6E9F18?logo=vitest&logoColor=fff)
![CSS](https://img.shields.io/badge/CSS-Glassmorphism_/_Neon-38BDF8)

**ReactBluffs** is a polished multi-mode quiz game built with React, TypeScript and Vite.

The app combines a cyberpunk-inspired neon interface with several quiz formats: classic bluff-style yes/no questions, multiple choice questions and open answer challenges.

## Demo

Live version:  
https://BMD63.github.io/ReactBluffs/

## Features

- Multiple quiz modes:
  - Bluff Quiz
  - Multiple Choice
  - Open Answer
- Difficulty selection per game mode
- Scoring system with bonus points
- Open answer normalization and aliases
- Mobile-first responsive UI
- Neon / glassmorphism visual style
- Animated transitions and polished interaction states
- Unit tests for core game logic
- GitHub Pages deployment via GitHub Actions

## Tech Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- Vitest
- ESLint
- Prettier
- GitHub Pages

## Project Highlights

This project focuses not only on gameplay, but also on frontend architecture and product polish:

- typed domain models for questions and game sessions;
- DTO and mapper layer for future backend integration;
- mode-specific quiz rendering;
- centralized scoring logic;
- reusable game mode and difficulty configuration;
- tested pure business logic;
- responsive mobile-first UI.

## Available Scripts

```bash
npm run dev
```
Start local development server.


```bash
npm run build
```
Create production build.

```bash
npm run test:run
```
Run unit tests once.

```bash
npm run lint
```
Run ESLint.

```bash
npm run format
```
Format project with Prettier.

```bash
npm run check
```
Run formatting check, lint, tests, typecheck and production build.

## Development Status

Current focus:

UI polish
gameplay experience
result screens
future media question support

Planned improvements:

image and audio questions;
fuzzy matching for open answers;
ad/intermission screen;
backend and content management;
installable PWA version.


## License

This project is currently developed as a personal portfolio project.
