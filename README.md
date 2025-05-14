# CarbonCorp ESG Platform

An AI-driven ESG (Environmental, Social, and Governance) platform for African SMEs. This application helps businesses track, report, and improve their sustainability metrics.

## Features

- **Analytics Dashboard**: Monitor carbon emissions, water usage, and other environmental metrics
- **Reporting Studio**: Create customizable ESG and sustainability reports
- **AI Report Generator**: Generate comprehensive reports using AI
- **Data Hub**: Centralize and manage your ESG data
- **Compliance Tools**: Stay compliant with relevant ESG regulations

## Prerequisites

- Node.js (16.x or later)
- npm or pnpm package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/CarbonCorp-ESG-App.git
cd CarbonCorp-ESG-App
```

2. Install dependencies:

Using npm:
```bash
npm install
```

Or using pnpm (recommended):
```bash
pnpm install
```

## Getting Started

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Building for Production

```bash
npm run build
# or
pnpm build
```

Start the production server:

```bash
npm start
# or
pnpm start
```

## Troubleshooting

### Layout Router Error

If you still encounter the error: `invariant expected layout router to be mounted` after rolling back to stable versions, try these solutions:

1. Delete the `.next` folder to clear the cache and restart the development server:

```bash
# Remove .next folder
rm -rf .next
# or on Windows
rmdir /s /q .next

# Restart the development server
npm run dev
# or
pnpm dev
```

2. Make sure each app route directory has a proper layout.tsx file.

## Technologies

- Next.js 13.4.19 (App Router)
- React 18.2.0
- Tailwind CSS
- Radix UI Components
- Recharts for data visualization

## Project Structure

- `/app` - Next.js application routes and pages
- `/components` - Reusable React components
- `/lib` - Utility functions and shared code
- `/public` - Static assets
- `/styles` - Global styles and CSS

## License

[MIT](LICENSE) 