# Santa Workshop (2026)

A modern, full-stack React application for managing Secret Santa workshops, wishlists, and holiday feedback.

## Features

- **Authentication**: Secure login, registration, and password recovery.
- **Wishlist Management**: Create, view, and edit personalized holiday wishlists.
- **Recipient Matching**: View your assigned recipient and their wishlist to find the perfect gift.
- **Spin to Win**: Interactive "Spin" feature for holiday activities or matching.
- **Gift Giving Guide**: Tips and rules for traditional gift-giving etiquette.
- **Feedback System**: Post-event feedback collection to improve future workshops.
- **Dashboard**: Centralized overview of holiday preparations.

## Tech Stack

- **Framework**: React 19 (Vite)
- **Routing**: [TanStack Router](https://tanstack.com/router/v1)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/v5)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **UI & Styling**:
  - [Tailwind CSS 4](https://tailwindcss.com/) (Vite Plugin)
  - [Framer Motion](https://www.framer.com/motion/) for animations
  - [Lucide React](https://lucide.dev/) for icons
  - [Radix UI](https://www.radix-ui.com/) components
- **HTTP Client**: [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

### Build

Create a production-ready build:
```bash
npm run build
```

## Project Structure

- `src/api`: API client configuration and repository patterns.
- `src/auth`: Authentication context and provider.
- `src/components`: Shared UI components (NaviTab, etc.).
- `src/pages`: Page-level components.
- `src/routes`: TanStack Router configuration.
- `src/stores`: Zustand global state management.
- `src/utils`: Helper functions and formatting utilities.

---
*Happy Holidays!* 🎅✨

