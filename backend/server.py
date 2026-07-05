from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from fastapi.staticfiles import StaticFiles
app = FastAPI(title="Gagan Engineering Works API")
app.mount("/", StaticFiles(directory="."), name="static")



ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
BUSINESS_EMAIL = os.environ.get('BUSINESS_EMAIL', 'gaganengineerings@gmail.com')

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Gagan Engineering Works API")
api_router = APIRouter(prefix="/api")


# ----------------- Static Catalogue Data -----------------
PRODUCTS = [
    {
        "id": "double-head-electric-bra-cup-moulding-machine",
        "name": "Double Head Electric Bra Cup Moulding Machine",
        "category": "Bra Cup Moulding Machine",
        "image": "https://5.imimg.com/data5/ANDROID/Default/2025/10/550586008/TZ/II/HL/4175789/product-jpeg-500x500.jpg",
        "tagline": "Twin-station high-output cup moulding for production lines",
        "description": "A heavy-duty double-head electric press engineered for continuous moulding of seamless bra cups. Twin stations allow operator to load one side while the other moulds — doubling throughput without doubling floor area. Built with hardened steel platens, precision PID temperature control, and timer-based pneumatic clamping.",
        "specs": {
            "Drive": "Electric, dual-head",
            "Heating": "PID controlled, 0–250°C",
            "Production": "~400–600 pcs / shift",
            "Power": "3-Phase 415V",
            "Application": "Foam, fabric & moulded cups",
        },
        "featured": True,
    },
    {
        "id": "bra-cup-fabric-moulding-machine",
        "name": "Bra Cup Fabric Moulding Machine",
        "category": "Bra Cup Moulding Machine",
        "image": "https://5.imimg.com/data5/ANDROID/Default/2025/10/550584110/ET/BP/NY/4175789/product-jpeg-500x500.jpg",
        "tagline": "Precise fabric cup shaping with consistent finish",
        "description": "Designed for moulding laminated and woven fabrics into seamless cup shapes. Comes with interchangeable aluminium moulds, ensuring sharp cup definition and clean edges across runs.",
        "specs": {
            "Material": "Woven/laminated fabrics",
            "Mould": "Aluminium, interchangeable",
            "Cycle Time": "25–40 seconds",
            "Power": "Single / 3-Phase",
            "Application": "Lingerie & intimate-wear factories",
        },
        "featured": True,
    },
    {
        "id": "foam-bra-cup-moulding-machine",
        "name": "Foam Bra Cup Moulding Machine",
        "category": "Bra Cup Moulding Machine",
        "image": "https://5.imimg.com/data5/ANDROID/Default/2025/10/550586856/YP/VU/KK/4175789/product-jpeg-500x500.jpg",
        "tagline": "Polyurethane & polyester foam cup forming",
        "description": "Built for hot-press moulding of PU and polyester foam sheets into ergonomic cup shapes. Uniform heat plates and pneumatic clamping deliver repeatable shape memory.",
        "specs": {
            "Foam Type": "PU / Polyester / Memory foam",
            "Heating": "Top + Bottom Platen",
            "Pressure": "Pneumatic",
            "Output": "Up to 500 pcs/shift",
            "Application": "Bra cup production lines",
        },
        "featured": False,
    },
    {
        "id": "padded-bra-cup-moulding-machine",
        "name": "Padded Bra Cup Moulding Machine",
        "category": "Bra Cup Moulding Machine",
        "image": "https://5.imimg.com/data5/SELLER/Default/2026/5/608537665/KG/TS/VJ/4175789/padded-bra-cup-moulding-machine-500x500.png",
        "tagline": "Custom padded cup moulding with multi-layer support",
        "description": "Specialised press designed for multi-layer padded cups combining foam, fabric, and lining in a single press cycle. Ideal for premium lingerie OEMs.",
        "specs": {
            "Layers": "Multi-layer composite",
            "Heating": "Dual-side platen",
            "Cycle": "Programmable 20–60s",
            "Power": "3-Phase",
            "Application": "Premium padded bra production",
        },
        "featured": False,
    },
    {
        "id": "10-tons-hydraulic-decoiler",
        "name": "10 Tons Hydraulic Decoiler",
        "category": "Roll Forming & Sheet Metal",
        "image": "https://5.imimg.com/data5/ANDROID/Default/2026/3/590380757/WL/UR/BT/4175789/product-jpeg-500x500.jpg",
        "tagline": "Heavy-duty hydraulic decoiler — 10 ton capacity",
        "description": "10-ton capacity hydraulic decoiler built for steel/aluminium coil feeding into roll-forming lines. Hydraulic expansion mandrel, motorised rotation, and brake-controlled unwinding.",
        "specs": {
            "Capacity": "10,000 kg",
            "Coil ID": "508 mm (adjustable)",
            "Drive": "Hydraulic + Motorised",
            "Brake": "Pneumatic disc brake",
            "Application": "Roll forming, slitting, press lines",
        },
        "featured": True,
    },
    {
        "id": "automatic-roofing-sheet-crimping-machine",
        "name": "Automatic Roofing Sheet Crimping Machine",
        "category": "Roll Forming & Sheet Metal",
        "image": "https://5.imimg.com/data5/SELLER/Default/2026/4/596257189/PL/SJ/DO/4175789/456-500x500.png",
        "tagline": "Curved roof crimping — fully automatic, jobsite ready",
        "description": "Forms curved/crimped profiles in pre-painted GI, GP, or aluminium roofing sheets. Used widely on warehouse, airport, and stadium roofing jobs.",
        "specs": {
            "Sheet Width": "Up to 1250 mm",
            "Material": "GI / GP / Aluminium",
            "Drive": "Motorised + Hydraulic",
            "Operation": "Automatic feed",
            "Application": "Curved roofing on-site",
        },
        "featured": True,
    },
    {
        "id": "c-z-purlin-roll-forming-machine",
        "name": "C / Z Purlin Roll Forming Machine",
        "category": "Roll Forming & Sheet Metal",
        "image": "https://5.imimg.com/data5/ANDWEB/Default/2026/3/591020192/NG/CE/TB/4175789/product-jpeg-500x500.jpeg",
        "tagline": "Interchangeable C & Z section purlin production",
        "description": "Quick-change C and Z section roll former. Punching, cutting, and forming integrated into a single line. Used in steel building structures, warehouses, and industrial sheds.",
        "specs": {
            "Sections": "C 100–300 / Z 100–300 mm",
            "Thickness": "1.5 – 3.0 mm",
            "Speed": "10–15 m/min",
            "Control": "PLC + HMI",
            "Application": "Pre-engineered buildings",
        },
        "featured": True,
    },
    {
        "id": "automatic-ctl-machine",
        "name": "AUTOMATIC CTL MACHINE",
        "category": "Cut To Length Line",
        "image": "/automatic-ctl.png",
        "tagline": "High-speed Automatic Cut-to-Length Machine for precision sheet processing.",
        "description": "The Automatic CTL (Cut-to-Length) Machine is engineered for high-speed and accurate sheet cutting operations. It is designed to process metal coils efficiently through automatic decoiling, precision leveling, accurate length measurement, hydraulic shearing, and smooth material handling. Equipped with a PLC-based control system, touch screen interface, and premium hydraulic components, this machine ensures consistent production quality, reduced material wastage, and minimal operator intervention. It is ideal for manufacturers involved in sheet metal fabrication, roofing sheets, electrical panels, automobile components, and other precision metal processing industries.",
        "specs": {
            "Machine Type": "Automatic Cut To Length Machine",
            "Material Thickness": "6 mm",
            "Material Width": "400 mm",
            "Speed": "20 Meter / Minute",
            "Decoiler Capacity": "10 Ton",
            "Decoiler Shaft Diameter": "220 mm",
            "Cylinder Size": "125 mm Core",
            "Decoiler Motor": "7.5 HP",
            "Decoiler Operation": "Hydraulic with Sensor Control",
            "Entry Guide": "2 Up-Down Rolls, 4 Side Rolls with Screw Adjustment",
            "Leveller": "9 Roll Gear Driven Leveller",
            "Leveller Roll Diameter": "114 mm",
            "Roll Material": "EN31 / 50-52 HRC",
            "Leveller Drive": "7.5 HP Gear Drive",
            "Shear": "Mechanical Shear suitable for cutting up to 6 mm",
            "PLC Control": "Automatic Length Measuring System",
            "Display": "Touch Screen VFD",
            "PLC Brand": "Standard Company",
            "Hydraulic Pump": "50 LPM (Yuken)",
            "Hydraulic Tank": "200 Litres",
            "Hydraulic Valve": "Standard",
            "Hydraulic Motor": "7.5 HP",
            "Total Electrical Power": "18 HP",
            "Exit Conveyor": "3 HP Gear Motor",
            "Conveyor Roller": "4 Nos",
            "Conveyor Length": "10 Feet",
            "Table": "500 x 3000 mm Plain Table between Leveller and Shearing"
        },
    },
    {
        "id": "corrugated-sheets-making-machine",
        "name": "Corrugated Sheets Making Machine",
        "category": "Roll Forming & Sheet Metal",
        "image": "https://5.imimg.com/data5/SELLER/Default/2026/3/591026243/LM/XU/AK/4175789/corrugated-sheets-making-machine-500x500.jpeg",
        "tagline": "Heavy-duty corrugated profile roll former",
        "description": "Engineered for forming corrugated roofing sheets from coil stock. High strength rollers, hydraulic shearing, and programmable cut-to-length system.",
        "specs": {
            "Profile": "Corrugated",
            "Material": "GI / Colour-coated steel",
            "Speed": "12–18 m/min",
            "Cutting": "Hydraulic guillotine",
            "Application": "Industrial roofing",
        },
        "featured": False,
    },
]

CATEGORIES = [
    {"id": "bra-cup-moulding-machine", "name": "Bra Cup Moulding Machine"},
    {"id": "roll-forming-sheet-metal", "name": "Roll Forming & Sheet Metal"},
]


# ----------------- Models -----------------
class ContactLead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    product_interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactLeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    product_interest: Optional[str] = None
    message: str


# ----------------- Email -----------------
def build_lead_email_html(lead: ContactLead) -> str:
    return f"""
    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#f7f7f7;padding:24px;">
      <tr>
        <td style="background:#050505;color:#fff;padding:24px;border-left:6px solid #FF5722;">
          <div style="font-size:12px;letter-spacing:0.2em;color:#FF5722;text-transform:uppercase;">New Lead — Gagan Engineering Works</div>
          <h2 style="margin:8px 0 0 0;font-size:22px;">{lead.name}</h2>
        </td>
      </tr>
      <tr>
        <td style="background:#fff;padding:24px;color:#111;">
          <table cellpadding="8" cellspacing="0" border="0" style="width:100%;font-size:14px;">
            <tr><td style="width:160px;color:#666;">Name</td><td><strong>{lead.name}</strong></td></tr>
            <tr><td style="color:#666;">Phone</td><td><strong>{lead.phone}</strong></td></tr>
            <tr><td style="color:#666;">Email</td><td><strong>{lead.email}</strong></td></tr>
            <tr><td style="color:#666;">Product Interest</td><td><strong>{lead.product_interest or '—'}</strong></td></tr>
            <tr><td style="color:#666;vertical-align:top;">Message</td><td>{lead.message}</td></tr>
            <tr><td style="color:#666;">Received</td><td>{lead.created_at.strftime('%d %b %Y, %H:%M UTC')}</td></tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="background:#050505;color:#9CA3AF;padding:16px;font-size:12px;text-align:center;">
          Gagan Engineering Works · Khopoli, Maharashtra · +91 8329465245
        </td>
      </tr>
    </table>
    """


async def send_lead_email(lead: ContactLead) -> Optional[str]:
    if not resend.api_key:
        logger.warning("Resend API key not configured — skipping email send.")
        return None
    params = {
        "from": f"Gagan Engineering Leads <{SENDER_EMAIL}>",
        "to": [BUSINESS_EMAIL],
        "subject": f"New Enquiry from {lead.name} — {lead.product_interest or 'General'}",
        "html": build_lead_email_html(lead),
        "reply_to": lead.email,
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result.get("id") if isinstance(result, dict) else None
    except Exception as e:
        logger.error(f"Failed to send lead email: {e}")
        return None


# ----------------- Routes -----------------
@api_router.get("/")
async def root():
    return {"service": "Gagan Engineering Works API", "status": "ok"}


@api_router.get("/products")
async def list_products(category: Optional[str] = None):
    items = PRODUCTS
    if category:
        items = [p for p in PRODUCTS if p["category"].lower() == category.lower()]
    return {"products": items, "count": len(items)}


@api_router.get("/products/featured")
async def featured_products():
    return {"products": [p for p in PRODUCTS if p["featured"]]}


@api_router.get("/products/{product_id}")
async def get_product(product_id: str):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    related = [p for p in PRODUCTS if p["category"] == product["category"] and p["id"] != product_id][:3]
    return {"product": product, "related": related}


@api_router.get("/categories")
async def list_categories():
    return {"categories": CATEGORIES}


@api_router.post("/contact")
async def submit_contact(payload: ContactLeadCreate):
    lead = ContactLead(**payload.model_dump())

    email_id = await send_lead_email(lead)

    return {
        "status": "success",
        "message": "Thank you. Our team will contact you within 24 hours.",
        "lead_id": lead.id,
        "email_sent": bool(email_id),
    }


@api_router.get("/business-info")
async def business_info():
    return {
        "name": "Gagan Engineering Works",
        "tagline": "Precision Industrial Machinery · Since 2006",
        "established": 2006,
        "experience_years": 14,
        "nature": "Service Provider & Manufacturer",
        "legal": "Proprietorship",
        "employees": "11–25",
        "turnover": "₹40L – ₹1.5 Cr",
        "phone": "+91 8329465245",
        "whatsapp": "+91 8329465245",
        "email": "gaganengineerings@gmail.com",
        "address": "Mumbai - Pune Hwy, near Star Garage, Navanath Colony, Yashwant Nagar, Khopoli, Maharashtra 410203",
        "rating": 4.0,
        "review_count": 9,
        "specialties": [
            "Bra Cup Moulding Machines",
            "Roll Forming Machines",
            "Hydraulic Decoilers",
            "Sheet Metal Machinery",
        ],
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
