# Cargo Connect

A comprehensive logistics microservice for tracking shipments and booking orders, built with Next.js and FastAPI.

## Features

- **Tracking**: Track shipments with detailed location information and status updates
- **Order Booking**: Easy-to-use interface for booking new shipments
- **Logistics Calendar**: Drag-and-drop calendar for managing shipment schedules
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- Next.js
- shadcn/ui components
- Tailwind CSS
- Lucide React icons

### Backend
- FastAPI
- Python
- Pydantic for data validation

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker and Docker Compose (optional)

### Running with Docker Compose

The easiest way to run the application is using Docker Compose:

```bash
docker-compose up
```

This will start both the frontend and backend services.

### Manual Setup

#### Frontend

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

#### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the FastAPI server:
```bash
uvicorn main:app --reload
```

## API Documentation

Once the backend is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── booking/          # Booking page
│   ├── calendar/         # Calendar page
│   ├── tracking/         # Tracking page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── backend/              # FastAPI backend
│   ├── data/             # Data storage
│   ├── Dockerfile        # Backend Dockerfile
│   ├── main.py           # Main FastAPI application
│   └── requirements.txt  # Python dependencies
├── components/           # React components
├── lib/                  # Utility functions and API client
├── public/               # Static assets
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile.frontend   # Frontend Dockerfile
└── README.md             # Project documentation
```

## License

MIT