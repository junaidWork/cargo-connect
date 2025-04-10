from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import uuid
import json
import os
from pathlib import Path

# Create FastAPI app
app = FastAPI(title="Logistics Microservice API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create data directory if it doesn't exist
data_dir = Path("./data")
data_dir.mkdir(exist_ok=True)

# Data files
packages_file = data_dir / "packages.json"
tracking_file = data_dir / "tracking.json"

# Initialize data files if they don't exist
if not packages_file.exists():
    with open(packages_file, "w") as f:
        json.dump([], f)

if not tracking_file.exists():
    with open(tracking_file, "w") as f:
        json.dump([], f)

# Models
class Address(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: str
    state: str
    zip_code: str
    country: str

class PackageDimensions(BaseModel):
    weight: float
    length: float
    width: float
    height: float

class BookingRequest(BaseModel):
    sender: Address
    recipient: Address
    package_type: str
    dimensions: PackageDimensions
    description: Optional[str] = None
    service_type: str
    insurance: str
    pickup_date: str

class BookingResponse(BaseModel):
    tracking_number: str
    status: str
    estimated_delivery: str

class TrackingEvent(BaseModel):
    status: str
    location: str
    timestamp: str
    completed: bool
    icon: str

class TrackingLocation(BaseModel):
    city: str
    state: str
    country: str
    coordinates: dict

class ShipmentDetails(BaseModel):
    service: str
    weight: str
    dimensions: str
    sender: str
    recipient: str

class TrackingResponse(BaseModel):
    tracking_number: str
    status: str
    estimated_delivery: str
    current_location: TrackingLocation
    shipment_details: ShipmentDetails
    timeline: List[TrackingEvent]

class Package(BaseModel):
    id: str
    tracking_number: str
    description: str
    status: str
    sender: str
    recipient: str
    scheduled_date: Optional[str] = None

# Helper functions
def read_packages():
    with open(packages_file, "r") as f:
        return json.load(f)

def write_packages(packages):
    with open(packages_file, "w") as f:
        json.dump(packages, f, indent=2)

def read_tracking():
    with open(tracking_file, "r") as f:
        return json.load(f)

def write_tracking(tracking_data):
    with open(tracking_file, "w") as f:
        json.dump(tracking_data, f, indent=2)

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the Logistics Microservice API"}

@app.post("/booking", response_model=BookingResponse)
def create_booking(booking: BookingRequest):
    # Generate tracking number
    tracking_number = f"DHL-{uuid.uuid4().hex[:10].upper()}"
    
    # Calculate estimated delivery date based on service type
    pickup_date = datetime.fromisoformat(booking.pickup_date)
    if booking.service_type == "express":
        delivery_days = 2
    elif booking.service_type == "standard":
        delivery_days = 5
    else:  # economy
        delivery_days = 7
    
    estimated_delivery = (pickup_date + timedelta(days=delivery_days)).isoformat()
    
    # Create package record
    package = {
        "id": str(uuid.uuid4()),
        "tracking_number": tracking_number,
        "description": booking.description or f"{booking.package_type.capitalize()} package",
        "status": "Processing",
        "sender": booking.sender.name,
        "recipient": booking.recipient.name,
        "scheduled_date": None
    }
    
    # Create tracking record
    tracking = {
        "tracking_number": tracking_number,
        "status": "Order Created",
        "estimated_delivery": estimated_delivery,
        "current_location": {
            "city": booking.sender.city,
            "state": booking.sender.state,
            "country": booking.sender.country,
            "coordinates": {"lat": 40.7128, "lng": -74.0060}  # Example coordinates
        },
        "shipment_details": {
            "service": booking.service_type.capitalize(),
            "weight": f"{booking.dimensions.weight} kg",
            "dimensions": f"{booking.dimensions.length} × {booking.dimensions.width} × {booking.dimensions.height} cm",
            "sender": booking.sender.name,
            "recipient": booking.recipient.name
        },
        "timeline": [
            {
                "status": "Order Created",
                "location": f"{booking.sender.city}, {booking.sender.state}",
                "timestamp": datetime.now().isoformat(),
                "completed": True,
                "icon": "package"
            }
        ]
    }
    
    # Save data
    packages = read_packages()
    packages.append(package)
    write_packages(packages)
    
    tracking_data = read_tracking()
    tracking_data.append(tracking)
    write_tracking(tracking_data)
    
    return {
        "tracking_number": tracking_number,
        "status": "Order Created",
        "estimated_delivery": estimated_delivery
    }

@app.get("/tracking/{tracking_number}", response_model=TrackingResponse)
def get_tracking(tracking_number: str):
    tracking_data = read_tracking()
    
    for tracking in tracking_data:
        if tracking["tracking_number"] == tracking_number:
            return tracking
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Tracking information for {tracking_number} not found"
    )

@app.get("/packages", response_model=List[Package])
def get_packages():
    return read_packages()

@app.put("/packages/{package_id}/schedule")
def schedule_package(package_id: str, scheduled_date: str):
    packages = read_packages()
    
    for package in packages:
        if package["id"] == package_id:
            package["scheduled_date"] = scheduled_date
            write_packages(packages)
            return {"message": f"Package scheduled for {scheduled_date}"}
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Package with ID {package_id} not found"
    )

@app.put("/packages/{package_id}/unschedule")
def unschedule_package(package_id: str):
    packages = read_packages()
    
    for package in packages:
        if package["id"] == package_id:
            package["scheduled_date"] = None
            write_packages(packages)
            return {"message": "Package unscheduled"}
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Package with ID {package_id} not found"
    )

# Run the application with: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)