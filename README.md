# Cargo Connect

A comprehensive logistics application for tracking shipments and booking orders, built with Next.js.

## Features

- **Tracking**: Track shipments with detailed location information and status updates
- **Order Booking**: Easy-to-use interface for booking new shipments
- **Logistics Calendar**: Drag-and-drop calendar for managing shipment schedules
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- Next.js
- shadcn/ui components
- Tailwind CSS
- Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (optional)

### Running with Docker

```bash
docker build -t cargo-connect-client .
docker run -p 3000:3000 cargo-connect-client
```

### Manual Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── booking/          # Booking page
│   ├── calendar/         # Calendar page
│   ├── tracking/         # Tracking page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
├── features/             # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── Dockerfile            # Docker configuration
└── README.md             # Project documentation
```

## License

MIT
