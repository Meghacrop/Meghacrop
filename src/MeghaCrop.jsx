import React, { useState, useMemo } from "react";
import {
  Home, Store, ClipboardList, User, Search, ArrowLeft, MapPin, Tractor, Sprout,
  Warehouse, Users, CloudRain, TrendingUp, Leaf, Tag, Building2,
  CheckCircle2, X, ChevronRight, Bell, SunMedium, Star, ArrowUpRight,
  SprayCan, FlaskConical, Truck, Wallet, Plus, ShoppingCart
} from "lucide-react";

// ---------- Brand tokens (from MeghaCrop logo) ----------
const C = {
  ink: "#173404", ink2: "#0E2103", green: "#3B6D11", lime: "#97C459",
  paleLime: "#EAF3DE", teal: "#1D9E75", amber: "#EF9F27", rust: "#D85A30",
  blue: "#378ADD", violet: "#533AB7", card: "#FFFFFF", bg: "#F3F7EC",
};

// ====================================================================
// REAL-DATA LAYER (Andhra Pradesh & Telangana) — edit to add products
// ====================================================================
const MANDI = [
  { crop: "Paddy (MTU-1010)", price: 2183, chg: 2.1, up: true, mandi: "Karimnagar" },
  { crop: "Cotton (Kapas)",   price: 7250, chg: 4.3, up: true, mandi: "Guntur" },
  { crop: "Red Chilli",       price: 18500, chg: -1.6, up: false, mandi: "Khammam" },
  { crop: "Maize",            price: 2090, chg: 1.2, up: true, mandi: "Nizamabad" },
  { crop: "Turmeric",         price: 14200, chg: 3.0, up: true, mandi: "Nizamabad" },
  { crop: "Groundnut",        price: 6480, chg: -0.8, up: false, mandi: "Anantapur" },
];

const SEEDS = [
  { id: "s1", name: "Paddy Seed MTU-1010", price: 48, unit: "kg", brand: "Telangana State Seeds", tag: "Certified · 130-day", cat: "Paddy", color: C.teal },
  { id: "s2", name: "BT Cotton Seed", price: 980, unit: "pack 450g", brand: "Nuziveedu", tag: "Bollgard-II · pink-resistant", cat: "Cotton", color: C.blue },
  { id: "s3", name: "Maize Hybrid DKC-9108", price: 360, unit: "kg", brand: "Dekalb", tag: "High yield · rabi", cat: "Maize", color: C.amber },
  { id: "s4", name: "Red Chilli Teja S-17", price: 1450, unit: "100g", brand: "Mahyco", tag: "High pungency · Khammam", cat: "Chilli", color: C.rust },
  { id: "s5", name: "Groundnut K-6", price: 95, unit: "kg", brand: "AP Seeds", tag: "Bold kernel · Anantapur", cat: "Groundnut", color: C.green },
  { id: "s6", name: "Turmeric Rhizome", price: 80, unit: "kg", brand: "Local certified", tag: "Armoor variety", cat: "Turmeric", color: C.violet },
];
const FERT = [
  { id: "f1", name: "Urea (46% N)", price: 266, unit: "bag 45kg", brand: "IFFCO", tag: "Subsidised rate", cat: "Nitrogen", color: C.teal },
  { id: "f2", name: "DAP 18-46-0", price: 1350, unit: "bag 50kg", brand: "Coromandel", tag: "Basal dose", cat: "Phosphate", color: C.blue },
  { id: "f3", name: "MOP (Potash)", price: 1700, unit: "bag 50kg", brand: "IPL", tag: "Potassium", cat: "Potash", color: C.violet },
  { id: "f4", name: "Vermicompost", price: 320, unit: "bag 40kg", brand: "Organic", tag: "Soil health · organic", cat: "Organic", color: C.green },
  { id: "f5", name: "20-20-0-13", price: 1180, unit: "bag 50kg", brand: "Coromandel", tag: "Complex · cotton", cat: "Complex", color: C.amber },
];
const PEST = [
  { id: "p1", name: "Neem Oil 1500ppm", price: 380, unit: "L", brand: "Bio", tag: "Organic · sucking pests", cat: "Bio", color: C.green },
  { id: "p2", name: "Imidacloprid 17.8%", price: 540, unit: "500ml", brand: "Bayer", tag: "Sucking pest control", cat: "Insecticide", color: C.blue },
  { id: "p3", name: "Mancozeb 75% WP", price: 290, unit: "kg", brand: "Indofil", tag: "Fungal · blight", cat: "Fungicide", color: C.amber },
  { id: "p4", name: "Glyphosate 41%", price: 410, unit: "L", brand: "UPL", tag: "Weed control", cat: "Herbicide", color: C.rust },
];
const EQUIP = [
  { id: "e1", name: "Tractor 60 HP", price: 800, unit: "day", brand: "Mahindra · 4WD", tag: "With operator", cat: "Tractor", color: C.teal },
  { id: "e2", name: "Paddy Harvester", price: 1500, unit: "hour", brand: "Self-propelled combine", tag: "Kharif booking", cat: "Harvester", color: C.amber },
  { id: "e3", name: "Cotton Picker", price: 1800, unit: "acre", brand: "Mechanical", tag: "Guntur belt", cat: "Harvester", color: C.blue },
  { id: "e4", name: "Rotavator 7ft", price: 650, unit: "day", brand: "Tractor mount", tag: "Land prep", cat: "Tillage", color: C.violet },
  { id: "e5", name: "Sprayer Drone 10L", price: 1200, unit: "day", brand: "GPS auto", tag: "Pesticide spray", cat: "Drone", color: C.rust },
  { id: "e6", name: "Diesel Water Pump 5HP", price: 500, unit: "day", brand: "Kirloskar", tag: "Irrigation", cat: "Irrigation", color: C.green },
];
const LAND = [
  { id: "l1", name: "10 Acre Paddy Land", price: "₹4.5 L", unit: "acre", deal: "Sale", facts: ["Canal water", "Road access"], loc: "Karimnagar, TS", color: C.teal },
  { id: "l2", name: "6 Acre Cotton Plot", price: "₹35,000", unit: "acre/yr", deal: "Lease", facts: ["Black soil", "Borewell"], loc: "Guntur, AP", color: C.rust },
  { id: "l3", name: "4 Acre Chilli Farm", price: "₹3.2 L", unit: "acre", deal: "Sale", facts: ["Drip set", "High yield"], loc: "Khammam, TS", color: C.amber },
  { id: "l4", name: "8 Acre Mango Orchard", price: "₹28,000", unit: "acre/yr", deal: "Lease", facts: ["Banginapalli", "Bore + drip"], loc: "Krishna, AP", color: C.violet },
];
const LABOUR = [
  { id: "lb1", name: "Paddy Transplant Crew (5)", price: 2000, skill: "Transplanting", avail: true, rating: 4.6 },
  { id: "lb2", name: "Cotton Picker", price: 450, skill: "Harvesting", avail: true, rating: 4.4 },
  { id: "lb3", name: "Tractor Driver", price: 600, skill: "Driving", avail: true, rating: 4.8 },
  { id: "lb4", name: "Chilli Plucking Crew (6)", price: 2400, skill: "Harvesting", avail: false, rating: 4.3 },
  { id: "lb5", name: "Pump Operator", price: 400, skill: "Irrigation", avail: true, rating: 4.5 },
];
const STORAGE = [
  { id: "st1", name: "Nizamabad Turmeric Cold", price: 0.9, unit: "kg/mo", cap: "200 MT", loc: "Nizamabad, TS", color: C.amber },
  { id: "st2", name: "Guntur Chilli Cold Store", price: 1.1, unit: "kg/mo", cap: "350 MT", loc: "Guntur, AP", color: C.rust },
  { id: "st3", name: "Karimnagar Grain Store", price: 0.7, unit: "kg/mo", cap: "500 MT", loc: "Karimnagar, TS", color: C.teal },
];
const TRANSPORT = [
  { id: "t1", name: "Mini Truck (3 T)", price: 18, unit: "km", brand: "Tata Ace", tag: "Up to 3 tons", cat: "Small", color: C.teal },
  { id: "t2", name: "Lorry (10 T)", price: 42, unit: "km", brand: "6-wheeler", tag: "Bulk grain / bales", cat: "Large", color: C.blue },
  { id: "t3", name: "Refrigerated Van", price: 55, unit: "km", brand: "Cold chain", tag: "Chilli / perishables", cat: "Cold", color: C.violet },
];
const FINANCE = [
  { id: "fn1", name: "Kisan Credit Card", price: "Up to ₹3 L", sub: "4% interest · crop loan", btn: "Apply", color: C.teal, icon: Wallet },
  { id: "fn2", name: "PM Fasal Bima", price: "Crop insurance", sub: "Kharif / Rabi · instant policy", btn: "Get quote", color: C.green, icon: Leaf },
  { id: "fn3", name: "Rythu Bharosa / Bandhu", price: "Subsidy check", sub: "AP & TS state schemes", btn: "Check", color: C.amber, icon: Sprout },
];

// ---------- ROLES: what each role can list ----------
// Each role defines the "list type" the user can post in My Listings.
const ROLES = {
  farmer:    { label: "Farmer", icon: Sprout, color: C.teal,
    listType: "produce", cta: "Sell crop", noun: "produce" },
  seller:    { label: "Seller / Supplier", icon: Store, color: C.amber,
    listType: "input", cta: "List product", noun: "seeds, fertilizer, pesticide" },
  equipowner:{ label: "Equipment Owner", icon: Tractor, color: C.blue,
    listType: "equipment", cta: "List equipment", noun: "equipment for rent" },
  storage:   { label: "Cold Storage", icon: Warehouse, color: C.violet,
    listType: "storage", cta: "List storage", noun: "storage space" },
  transport: { label: "Transporter", icon: Truck, color: C.rust,
    listType: "transport", cta: "List vehicle", noun: "transport vehicles" },
  financer:  { label: "Financer", icon: Wallet, color: C.green,
    listType: "finance", cta: "List scheme", noun: "loan / insurance products" },
};

// Sample existing listings, tagged by which role/type produced them
const SAMPLE_LISTINGS = {
  produce: [
    { id: "m1", title: "Paddy (MTU-1010)", meta: "12 tons · ₹2,183/qtl", status: "Live", extra: "84 buyer views", color: C.teal, icon: Tag },
    { id: "m2", title: "Red Chilli (Teja)", meta: "3.5 tons · ₹18,500/qtl", status: "Live", extra: "152 buyer views", color: C.rust, icon: Tag },
    { id: "m3", title: "Maize", meta: "8 tons · ₹2,090/qtl", status: "Sold", extra: "61 buyer views", color: C.amber, icon: Tag },
  ],
  input: [
    { id: "i1", title: "Urea (46% N)", meta: "500 bags · ₹266/bag", status: "Live", extra: "Coromandel dealer", color: C.teal, icon: FlaskConical },
    { id: "i2", title: "BT Cotton Seed", meta: "200 packs · ₹980/pack", status: "Live", extra: "Nuziveedu", color: C.blue, icon: Sprout },
  ],
  equipment: [
    { id: "eq1", title: "Tractor 60 HP", meta: "₹800/day · with operator", status: "Live", extra: "Booked 4 days this week", color: C.blue, icon: Tractor },
  ],
  storage: [
    { id: "sg1", title: "Karimnagar Grain Store", meta: "500 MT · ₹0.70/kg/mo", status: "Live", extra: "320 MT free", color: C.violet, icon: Warehouse },
  ],
  transport: [
    { id: "tr1", title: "Lorry (10 T)", meta: "₹42/km · 6-wheeler", status: "Live", extra: "Available now", color: C.rust, icon: Truck },
  ],
  finance: [
    { id: "ff1", title: "Crop Loan @ 7%", meta: "Up to ₹5 L · 12-month", status: "Live", extra: "28 applications", color: C.green, icon: Wallet },
  ],
};

// ---------- UI atoms ----------
const Pill = ({ children, bg, fg, onClick, active }) => (
  <button onClick={onClick} style={{
    background: active ? bg : "transparent", color: active ? (fg || "#fff") : C.ink,
    border: `1.5px solid ${bg}`, borderRadius: 999, padding: "6px 14px",
    fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s",
  }}>{children}</button>
);
const Money = ({ v, unit }) => (
  <span style={{ fontWeight: 800, color: C.ink }}>
    ₹{v}<span style={{ fontWeight: 600, color: C.green, fontSize: "0.8em" }}>/{unit}</span>
  </span>
);
const Card = ({ children, pad = 14, style }) => (
  <div style={{ background: C.card, borderRadius: 18, padding: pad,
    boxShadow: "0 1px 3px rgba(23,52,4,.06), 0 8px 24px rgba(23,52,4,.05)",
    border: "1px solid #EAF1E0", ...style }}>{children}</div>
);
const SectionHead = ({ icon: Icon, title, action, onAction }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 0 12px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: C.paleLime, display: "grid", placeItems: "center" }}>
        <Icon size={17} color={C.ink} />
      </div>
      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: C.ink }}>{title}</h3>
    </div>
    {action && (
      <button onClick={onAction} style={{ background: "none", border: "none", color: C.green, fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}>
        {action} <ChevronRight size={15} />
      </button>
    )}
  </div>
);

// ---------- Logo mark: 5 bars + dashed M-trace ----------
const LogoMark = ({ size = 26 }) => {
  const bars = [{ h: 1.0, c: C.teal }, { h: 0.72, c: C.amber }, { h: 0.5, c: C.violet }, { h: 0.72, c: C.rust }, { h: 1.0, c: C.blue }];
  const w = size * 0.18, gap = 2;
  const totalW = bars.length * w + (bars.length - 1) * gap;
  const pts = bars.map((b, i) => `${i * (w + gap) + w / 2},${size - b.h * size}`).join(" ");
  return (
    <svg width={totalW} height={size} viewBox={`0 0 ${totalW} ${size}`} style={{ display: "block" }}>
      {bars.map((b, i) => <rect key={i} x={i * (w + gap)} y={size - b.h * size} width={w} height={b.h * size} rx={1.5} fill={b.c} />)}
      <polyline points={pts} fill="none" stroke={C.paleLime} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2.5,2.5" />
    </svg>
  );
};
const Wordmark = ({ light }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
    <LogoMark size={24} />
    <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: light ? C.paleLime : C.ink }}>
      egha<span style={{ color: light ? C.lime : C.green }}>Crop</span>
    </span>
  </div>
);

// ====================================================================
// MAIN APP — 4 tabs: Hub / Market / My Listings / Profile
// ====================================================================
export default function MeghaCrop() {
  const [tab, setTab] = useState("hub");
  const [screen, setScreen] = useState(null);
  const [toast, setToast] = useState(null);
  // multi-role state — farmer on by default
  const [roles, setRoles] = useState({ farmer: true, seller: false, equipowner: true, storage: false, transport: false, financer: false });

  const fireToast = (m) => { setToast(m); setTimeout(() => setToast(null), 2200); };
  const go = (s) => setScreen(s);
  const back = () => setScreen(null);
  const toggleRole = (k) => setRoles((r) => ({ ...r, [k]: !r[k] }));

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#DDE8CE", minHeight: "100vh", display: "grid", placeItems: "center", padding: "16px 0" }}>
      <div style={{ width: "100%", maxWidth: 420, height: "min(880px, 96vh)", background: C.bg, borderRadius: 34, overflow: "hidden", position: "relative", boxShadow: "0 30px 80px rgba(14,33,3,.35)", border: "1px solid #C6D6B0", display: "flex", flexDirection: "column" }}>
        <div style={{ background: C.ink, color: C.paleLime, padding: "10px 18px 8px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, fontWeight: 600 }}>
          <span>9:41</span><span style={{ opacity: .8 }}>MeghaCrop</span><span>5G ▮▮▮</span>
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {screen ? (
            <CategoryRouter screen={screen} back={back} fireToast={fireToast} />
          ) : (
            <>
              {tab === "hub" && <HubTab go={go} fireToast={fireToast} />}
              {tab === "market" && <MarketTab go={go} />}
              {tab === "listings" && <ListingsTab roles={roles} fireToast={fireToast} />}
              {tab === "profile" && <ProfileTab roles={roles} toggleRole={toggleRole} />}
            </>
          )}
        </div>

        {toast && (
          <div style={{ position: "absolute", bottom: 84, left: 16, right: 16, background: C.ink, color: C.paleLime, padding: "12px 16px", borderRadius: 14, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 30px rgba(0,0,0,.3)", animation: "pop .2s ease" }}>
            <CheckCircle2 size={18} color={C.lime} /> <span style={{ fontSize: 14, fontWeight: 600 }}>{toast}</span>
          </div>
        )}

        <nav style={{ background: C.card, borderTop: "1px solid #E3EDD5", display: "flex", padding: "8px 2px 10px" }}>
          {[
            { k: "hub", icon: Home, label: "Hub" },
            { k: "market", icon: Store, label: "Market" },
            { k: "listings", icon: ClipboardList, label: "My Listings" },
            { k: "profile", icon: User, label: "Profile" },
          ].map(({ k, icon: Icon, label }) => {
            const on = tab === k && !screen;
            return (
              <button key={k} onClick={() => { setTab(k); setScreen(null); }}
                style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 0" }}>
                <div style={{ background: on ? C.paleLime : "transparent", borderRadius: 12, padding: "5px 14px" }}>
                  <Icon size={20} color={on ? C.ink : "#9AB07F"} strokeWidth={on ? 2.4 : 2} />
                </div>
                <span style={{ fontSize: 10.5, fontWeight: on ? 800 : 600, color: on ? C.ink : "#9AB07F" }}>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <style>{`
        @keyframes pop { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        *::-webkit-scrollbar { width: 0; height: 0 }
        button:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 2px }
      `}</style>
    </div>
  );
}

// ====================================================================
// HUB (home) — weather, mandi prices, AI advisory
// ====================================================================
function HubTab({ go, fireToast }) {
  return (
    <div style={{ padding: "0 0 24px" }}>
      <div style={{ background: C.ink, padding: "16px 18px 26px", borderRadius: "0 0 26px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Wordmark light />
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <Bell size={20} color={C.paleLime} />
              <span style={{ position: "absolute", top: -4, right: -4, background: C.rust, color: "#fff", fontSize: 9, fontWeight: 800, borderRadius: 999, width: 15, height: 15, display: "grid", placeItems: "center" }}>2</span>
            </div>
            <Leaf size={20} color={C.lime} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 12, color: C.paleLime, fontSize: 13, fontWeight: 600 }}>
          <MapPin size={14} color={C.lime} /> Warangal, Telangana
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,.08)", borderRadius: 14, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
            <SunMedium size={26} color={C.amber} />
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, lineHeight: 1 }}>32°C</div>
              <div style={{ color: C.lime, fontSize: 11 }}>Clear · Warangal</div>
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,.08)", borderRadius: 14, padding: "10px 12px" }}>
            <div style={{ color: C.lime, fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
              <TrendingUp size={12} /> Paddy · Karimnagar
            </div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, lineHeight: 1.2 }}>₹2,183<span style={{ fontSize: 11, fontWeight: 600, color: C.lime }}>/qtl</span></div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* Quick entry to market */}
        <SectionHead icon={Store} title="Market" action="Open" onAction={() => go("__market")} />
        <button onClick={() => go("__market")}
          style={{ width: "100%", textAlign: "left", background: `linear-gradient(120deg, ${C.teal}, ${C.green})`, border: "none", borderRadius: 18, padding: 16, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Buy inputs · rent · hire</div>
            <div style={{ fontSize: 12.5, color: C.paleLime, marginTop: 2 }}>Seeds, fertilizer, equipment, land, labour & more</div>
          </div>
          <ChevronRight size={24} />
        </button>

        <SectionHead icon={CloudRain} title="AI Advisory" action="Chat" onAction={() => fireToast("Connecting you to crop expert…")} />
        <Card pad={0} style={{ overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(120deg, ${C.ink}, ${C.green})`, padding: 16, color: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 800, fontSize: 15 }}>
                  <CloudRain size={18} color={C.lime} /> Light rain in 2 days
                </div>
                <p style={{ margin: "6px 0 0", fontSize: 12.5, color: C.paleLime, lineHeight: 1.45, maxWidth: 250 }}>
                  Delay pesticide spray on cotton. Good window for paddy transplant. Watch for pink bollworm in Guntur belt.
                </p>
              </div>
              <span style={{ background: C.amber, color: C.ink, fontSize: 10, fontWeight: 800, padding: "4px 8px", borderRadius: 999 }}>NEW</span>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["🌾 Paddy", "🌿 Cotton", "🌶️ Chilli"].map((c) => (
                <span key={c} style={{ background: "rgba(255,255,255,.14)", padding: "5px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 600 }}>{c}</span>
              ))}
            </div>
          </div>
        </Card>

        <SectionHead icon={TrendingUp} title="Mandi Prices" action="All mandis" onAction={() => fireToast("Opening live AP & TS mandi rates…")} />
        <Card>
          {MANDI.map((r, i) => (
            <div key={r.crop} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: i ? "1px solid #F0F4E8" : "none" }}>
              <div>
                <div style={{ fontWeight: 700, color: C.ink, fontSize: 14 }}>{r.crop}</div>
                <div style={{ fontSize: 11, color: "#9AB07F" }}>{r.mandi}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 800, color: C.ink, fontSize: 14 }}>₹{r.price.toLocaleString("en-IN")}<span style={{ fontSize: 11, color: "#9AB07F" }}>/qtl</span></span>
                <span style={{ fontSize: 12, fontWeight: 800, color: r.up ? C.teal : C.rust, display: "flex", alignItems: "center", gap: 2, minWidth: 54, justifyContent: "flex-end" }}>
                  <ArrowUpRight size={13} style={{ transform: r.up ? "none" : "rotate(90deg)" }} />{r.up ? "+" : ""}{r.chg}%
                </span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ====================================================================
// MARKET tab — the 9-icon hub grid
// ====================================================================
const HUB_ICONS = [
  { key: "seeds", label: "Seeds", emoji: "\u{1F33E}", c: C.teal },          // sheaf of rice
  { key: "fertilizer", label: "Fertilizer", emoji: "\u{1F9EA}", c: C.green }, // test tube
  { key: "pesticide", label: "Pesticide", emoji: "\u{1F41B}", c: C.violet },  // bug (pest control)
  { key: "equipment", label: "Equipment", emoji: "\u{1F69C}", c: C.amber },   // tractor
  { key: "land", label: "Land", emoji: "\u{1F3E1}", c: C.rust },             // house with garden (plot)
  { key: "labour", label: "Labour", emoji: "\u{1F468}\u200D\u{1F33E}", c: C.blue }, // farmer
  { key: "storage", label: "Cold Storage", emoji: "\u2744\uFE0F", c: C.teal }, // snowflake (cold)
  { key: "transport", label: "Transport", emoji: "\u{1F69B}", c: C.violet },  // delivery truck
  { key: "finance", label: "Finance", emoji: "\u{1F4B0}", c: C.amber },       // money bag
];

function MarketTab({ go }) {
  return (
    <div style={{ padding: "16px 16px 24px" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: C.ink }}>Market</h2>
      <p style={{ margin: "0 0 16px", color: "#7E945F", fontSize: 13 }}>Pick a category to buy, rent or hire</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {HUB_ICONS.map((q) => (
          <button key={q.key} onClick={() => go(q.key)}
            style={{ background: C.card, border: "1px solid #EAF1E0", borderRadius: 16, padding: "16px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, boxShadow: "0 4px 14px rgba(23,52,4,.04)" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: q.c + "22", display: "grid", placeItems: "center", fontSize: 26, lineHeight: 1 }}>
              <span role="img" aria-label={q.label}>{q.emoji}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.ink, textAlign: "center" }}>{q.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ====================================================================
// CATEGORY ROUTER
// ====================================================================
const CAT_CONFIG = {
  seeds:      { title: "Seeds", data: SEEDS, kind: "product", filterKey: "cat", buy: "Add to cart" },
  fertilizer: { title: "Fertilizer", data: FERT, kind: "product", filterKey: "cat", buy: "Add to cart" },
  pesticide:  { title: "Pesticide & Crop Care", data: PEST, kind: "product", filterKey: "cat", buy: "Add to cart" },
  equipment:  { title: "Equipment Rental", data: EQUIP, kind: "rental", filterKey: "cat", buy: "Book now" },
  transport:  { title: "Transport", data: TRANSPORT, kind: "rental", filterKey: "cat", buy: "Book vehicle" },
};

function CategoryRouter({ screen, back, fireToast }) {
  // special hub-link from Hub tab
  if (screen === "__market") return <BackedMarket back={back} fireToast={fireToast} />;
  const cfg = CAT_CONFIG[screen];
  const special = { land: "Land for Lease / Sale", labour: "Hire Labour", storage: "Cold Storage", finance: "Finance & Insurance" };
  const title = cfg ? cfg.title : special[screen];
  return (
    <div style={{ padding: "0 0 24px" }}>
      <TopBar title={title} back={back} />
      <div style={{ padding: 16 }}>
        {cfg && <ProductPage cfg={cfg} fireToast={fireToast} />}
        {screen === "land" && <LandScreen fireToast={fireToast} />}
        {screen === "labour" && <LabourScreen fireToast={fireToast} />}
        {screen === "storage" && <StorageScreen fireToast={fireToast} />}
        {screen === "finance" && <FinanceScreen fireToast={fireToast} />}
      </div>
    </div>
  );
}

// When opening market from Hub, show the grid with a back button
function BackedMarket({ back, fireToast }) {
  const [sub, setSub] = useState(null);
  if (sub) return <CategoryRouter screen={sub} back={() => setSub(null)} fireToast={fireToast} />;
  return (
    <div style={{ padding: "0 0 24px" }}>
      <TopBar title="Market" back={back} />
      <MarketTab go={setSub} />
    </div>
  );
}

const TopBar = ({ title, back }) => (
  <div style={{ position: "sticky", top: 0, zIndex: 5, background: C.ink, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
    <button onClick={back} style={{ background: "rgba(255,255,255,.12)", border: "none", borderRadius: 10, width: 34, height: 34, display: "grid", placeItems: "center", cursor: "pointer" }}>
      <ArrowLeft size={19} color={C.paleLime} />
    </button>
    <h2 style={{ margin: 0, color: C.paleLime, fontSize: 17, fontWeight: 800 }}>{title}</h2>
  </div>
);

function ProductPage({ cfg, fireToast }) {
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const cats = ["All", ...Array.from(new Set(cfg.data.map((d) => d[cfg.filterKey])))];
  const list = useMemo(() =>
    cfg.data.filter((d) =>
      (f === "All" || d[cfg.filterKey] === f) &&
      (d.name.toLowerCase().includes(q.toLowerCase()) || (d.tag || "").toLowerCase().includes(q.toLowerCase()))
    ), [q, f, cfg]);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.card, border: "1px solid #E3EDD5", borderRadius: 14, padding: "11px 14px" }}>
        <Search size={18} color="#9AB07F" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${cfg.title.toLowerCase()}…`}
          style={{ border: "none", outline: "none", flex: 1, fontSize: 14, background: "transparent", color: C.ink }} />
        {q && <X size={16} color="#9AB07F" style={{ cursor: "pointer" }} onClick={() => setQ("")} />}
      </div>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "14px 0 8px" }}>
        {cats.map((cName) => <Pill key={cName} bg={C.teal} active={f === cName} onClick={() => setF(cName)}>{cName}</Pill>)}
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {list.map((d) => (
          <Card key={d.id}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 58, height: 58, borderRadius: 14, background: d.color + "1F", display: "grid", placeItems: "center", flexShrink: 0, overflow: "hidden" }}>
                {d.img
                  ? <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : (cfg.kind === "rental" ? <Tractor size={27} color={d.color} /> : <Sprout size={27} color={d.color} />)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.ink, lineHeight: 1.2 }}>{d.name}</div>
                <div style={{ fontSize: 11.5, color: "#8AA06C", margin: "2px 0 1px" }}>{d.brand}</div>
                <div style={{ fontSize: 11, color: "#A6B98A" }}>{d.tag}</div>
                <div style={{ marginTop: 6 }}><Money v={d.price} unit={d.unit} /></div>
              </div>
            </div>
            <button onClick={() => fireToast(cfg.kind === "rental" ? `${d.name} booked` : `${d.name} added to cart`)}
              style={{ width: "100%", marginTop: 12, background: d.color, color: "#fff", border: "none", borderRadius: 12, padding: "11px 0", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {cfg.kind === "rental" ? <CheckCircle2 size={16} /> : <ShoppingCart size={16} />} {cfg.buy}
            </button>
          </Card>
        ))}
        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#8AA06C" }}>
            <Search size={28} style={{ opacity: .5 }} />
            <p style={{ fontWeight: 600 }}>No matches. Try another keyword.</p>
          </div>
        )}
      </div>
    </>
  );
}

function FilterBar({ options, value, set }) {
  return (
    <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 4 }}>
      {options.map((o) => <Pill key={o} bg={C.teal} active={value === o} onClick={() => set(o)}>{o}</Pill>)}
    </div>
  );
}

function LandScreen({ fireToast }) {
  const [f, setF] = useState("All");
  const list = LAND.filter((l) => f === "All" || l.deal === f);
  return (
    <>
      <FilterBar options={["All", "Sale", "Lease"]} value={f} set={setF} />
      <div style={{ display: "grid", gap: 12 }}>
        {list.map((l) => (
          <Card key={l.id} pad={0} style={{ overflow: "hidden" }}>
            <div style={{ height: 86, background: `linear-gradient(120deg, ${l.color}, ${C.green})`, position: "relative" }}>
              <span style={{ position: "absolute", top: 10, left: 12, background: "#fff", color: l.color, fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 999 }}>{l.deal}</span>
              <span style={{ position: "absolute", top: 10, right: 12, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}><MapPin size={13} />{l.loc}</span>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: C.ink }}>{l.name}</div>
                <div style={{ fontWeight: 800, color: l.color, fontSize: 15 }}>{l.price}<span style={{ fontSize: 11, color: "#8AA06C" }}>/{l.unit}</span></div>
              </div>
              <div style={{ display: "flex", gap: 8, margin: "10px 0", flexWrap: "wrap" }}>
                {l.facts.map((fa) => (
                  <span key={fa} style={{ background: C.paleLime, color: C.ink, fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 999, display: "flex", alignItems: "center", gap: 4 }}>
                    <CheckCircle2 size={12} color={C.teal} />{fa}
                  </span>
                ))}
              </div>
              <button onClick={() => fireToast(`Visit requested for ${l.name}`)}
                style={{ width: "100%", background: C.ink, color: "#fff", border: "none", borderRadius: 12, padding: "11px 0", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
                Request visit
              </button>
            </div>
          </Card>
        ))}
      </div>
      <button onClick={() => fireToast("Post your land requirement form opened")}
        style={{ width: "100%", marginTop: 14, background: "transparent", color: C.ink, border: `2px dashed ${C.green}`, borderRadius: 14, padding: "13px 0", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
        + Post a land requirement
      </button>
    </>
  );
}

function LabourScreen({ fireToast }) {
  const [f, setF] = useState("All");
  const skills = ["All", ...Array.from(new Set(LABOUR.map((l) => l.skill)))];
  const list = LABOUR.filter((l) => f === "All" || l.skill === f);
  return (
    <>
      <FilterBar options={skills} value={f} set={setF} />
      <div style={{ display: "grid", gap: 12 }}>
        {list.map((l) => (
          <Card key={l.id}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: C.blue + "1F", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Users size={24} color={C.blue} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.ink }}>{l.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                  <span style={{ fontSize: 12, color: "#8AA06C" }}>{l.skill}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 700, color: C.amber }}><Star size={12} fill={C.amber} color={C.amber} />{l.rating}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <Money v={l.price} unit="day" />
                <div style={{ fontSize: 10.5, fontWeight: 700, color: l.avail ? C.teal : "#C0392B", marginTop: 4 }}>
                  {l.avail ? "● Available" : "● Booked"}
                </div>
              </div>
            </div>
            <button disabled={!l.avail} onClick={() => fireToast(`${l.name} hired`)}
              style={{ width: "100%", marginTop: 12, background: l.avail ? C.blue : "#D9DEcf", color: "#fff", border: "none", borderRadius: 12, padding: "11px 0", fontWeight: 800, fontSize: 14, cursor: l.avail ? "pointer" : "not-allowed" }}>
              {l.avail ? "Hire now" : "Unavailable"}
            </button>
          </Card>
        ))}
      </div>
    </>
  );
}

function StorageScreen({ fireToast }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {STORAGE.map((s) => (
        <Card key={s.id}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: s.color + "1F", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <Warehouse size={26} color={s.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: C.ink }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "#8AA06C", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                <MapPin size={12} />{s.loc} · {s.cap} free
              </div>
            </div>
            <div style={{ fontWeight: 800, color: C.ink, fontSize: 15 }}>₹{s.price}<span style={{ fontSize: 11, color: "#8AA06C" }}>/{s.unit}</span></div>
          </div>
          <button onClick={() => fireToast(`Space booked at ${s.name}`)}
            style={{ width: "100%", marginTop: 12, background: s.color, color: "#fff", border: "none", borderRadius: 12, padding: "11px 0", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
            Book storage
          </button>
        </Card>
      ))}
      <Card style={{ background: C.paleLime, border: "none", textAlign: "center" }}>
        <div style={{ fontWeight: 800, color: C.ink, fontSize: 14 }}>Insure crop while stored?</div>
        <button onClick={() => fireToast("Crop insurance quote generated")}
          style={{ marginTop: 10, background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          Get instant quote
        </button>
      </Card>
    </div>
  );
}

function FinanceScreen({ fireToast }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card style={{ background: `linear-gradient(120deg, ${C.ink}, ${C.green})`, border: "none", color: "#fff" }}>
        <div style={{ fontSize: 12.5, color: C.lime, fontWeight: 600 }}>Pre-approved credit</div>
        <div style={{ fontSize: 30, fontWeight: 800, margin: "4px 0 2px" }}>₹3,00,000</div>
        <div style={{ fontSize: 12, color: C.paleLime }}>Kisan Credit Card · 4% interest</div>
      </Card>
      {FINANCE.map((it) => (
        <Card key={it.id}>
          <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: it.color + "1F", display: "grid", placeItems: "center" }}>
              <it.icon size={22} color={it.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: C.ink, fontSize: 14.5 }}>{it.name}</div>
              <div style={{ fontSize: 12, color: "#8AA06C" }}>{it.sub}</div>
            </div>
            <button onClick={() => fireToast(`${it.name}: request submitted`)}
              style={{ background: C.ink, color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>
              {it.btn}
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ====================================================================
// MY LISTINGS — role-aware
// ====================================================================
function ListingsTab({ roles, fireToast }) {
  const activeRoles = Object.keys(ROLES).filter((k) => roles[k]);

  if (activeRoles.length === 0) {
    return (
      <div style={{ padding: "16px 16px 24px" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: C.ink }}>My Listings</h2>
        <Card style={{ marginTop: 20, textAlign: "center", padding: 28 }}>
          <ClipboardList size={34} color="#B7C9A0" />
          <p style={{ fontWeight: 700, color: C.ink, margin: "12px 0 4px" }}>No role selected yet</p>
          <p style={{ fontSize: 13, color: "#8AA06C", margin: 0 }}>Add a role in Profile (Farmer, Seller, Equipment Owner…) to start listing what you offer.</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 16px 24px" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: C.ink }}>My Listings</h2>
      <p style={{ margin: "0 0 14px", color: "#7E945F", fontSize: 13 }}>What you list depends on your roles. Manage roles in Profile.</p>

      {/* Sell/List action buttons per active role */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        {activeRoles.map((k) => {
          const r = ROLES[k];
          return (
            <button key={k} onClick={() => fireToast(`New ${r.label} listing — add ${r.noun}`)}
              style={{ background: r.color, color: "#fff", border: "none", borderRadius: 12, padding: "10px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <Plus size={15} /> {r.cta}
            </button>
          );
        })}
      </div>

      {/* Existing listings grouped by role */}
      {activeRoles.map((k) => {
        const r = ROLES[k];
        const items = SAMPLE_LISTINGS[r.listType] || [];
        return (
          <div key={k} style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
              <r.icon size={16} color={r.color} />
              <span style={{ fontWeight: 800, color: C.ink, fontSize: 14.5 }}>{r.label}</span>
              <span style={{ fontSize: 11, color: "#9AB07F", fontWeight: 600 }}>· {items.length} active</span>
            </div>
            {items.length === 0 ? (
              <Card style={{ textAlign: "center", padding: 18, background: "#FAFCF6" }}>
                <span style={{ fontSize: 13, color: "#8AA06C" }}>No {r.noun} listed yet. Tap "{r.cta}" above.</span>
              </Card>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {items.map((m) => (
                  <Card key={m.id}>
                    <div style={{ display: "flex", gap: 13, alignItems: "center" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 13, background: m.color + "1F", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <m.icon size={22} color={m.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14.5, color: C.ink }}>{m.title}</div>
                        <div style={{ fontSize: 12.5, color: "#8AA06C", marginTop: 2 }}>{m.meta}</div>
                        <div style={{ fontSize: 11, color: "#A6B98A", marginTop: 1 }}>{m.extra}</div>
                      </div>
                      <span style={{ background: m.status === "Live" ? C.teal + "22" : "#E5E5E5", color: m.status === "Live" ? C.teal : "#777", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 999 }}>
                        {m.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 11 }}>
                      <button onClick={() => fireToast(`Editing ${m.title}`)}
                        style={{ flex: 1, background: C.paleLime, color: C.ink, border: "none", borderRadius: 10, padding: "8px 0", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>Edit</button>
                      <button onClick={() => fireToast(`${m.title} boosted to buyers`)}
                        style={{ flex: 1, background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "8px 0", fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>Boost</button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Auction CTA only for farmers */}
      {roles.farmer && (
        <Card style={{ background: `linear-gradient(120deg, ${C.amber}, ${C.rust})`, border: "none" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 800, color: C.ink2, fontSize: 15 }}>Sell at a better price</div>
              <div style={{ fontSize: 12, color: "#3A2A06", marginTop: 2 }}>List produce in live auction. Buyers bid for your lot.</div>
            </div>
            <button onClick={() => fireToast("Auction listing started")}
              style={{ background: C.ink, color: "#fff", border: "none", borderRadius: 12, padding: "10px 16px", fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>
              Auction
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ====================================================================
// PROFILE — with multi-role switcher
// ====================================================================
function ProfileTab({ roles, toggleRole }) {
  const activeCount = Object.values(roles).filter(Boolean).length;
  return (
    <div style={{ padding: "16px 16px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div style={{ width: 62, height: 62, borderRadius: 18, background: C.ink, display: "grid", placeItems: "center", color: C.lime, fontWeight: 800, fontSize: 24 }}>R</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: C.ink }}>Ravi Reddy</div>
          <div style={{ fontSize: 13, color: "#8AA06C", display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={13} /> Warangal, Telangana
          </div>
        </div>
      </div>

      {/* Role switcher */}
      <SectionHead icon={User} title="My Roles" />
      <p style={{ margin: "-6px 0 12px", fontSize: 12.5, color: "#8AA06C" }}>
        Turn on every role that fits you. Each role unlocks what you can list. ({activeCount} active)
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
        {Object.entries(ROLES).map(([k, r]) => {
          const on = roles[k];
          return (
            <button key={k} onClick={() => toggleRole(k)}
              style={{ textAlign: "left", background: on ? r.color + "16" : C.card, border: `1.5px solid ${on ? r.color : "#E3EDD5"}`, borderRadius: 14, padding: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: on ? r.color : "#F0F4E8", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <r.icon size={19} color={on ? "#fff" : "#9AB07F"} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.ink, lineHeight: 1.15 }}>{r.label}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: on ? r.color : "#B7C9A0", marginTop: 2 }}>{on ? "ON" : "OFF"}</div>
              </div>
            </button>
          );
        })}
      </div>

      <SectionHead icon={ClipboardList} title="Account" />
      <Card pad={6}>
        {["Order history", "Saved searches", "My land & equipment", "Payment & KYC", "Language · తెలుగు / English", "Help & support", "Settings"].map((row, i, a) => (
          <div key={row} style={{ padding: "13px 12px", borderBottom: i < a.length - 1 ? "1px solid #F0F4E8" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", color: C.ink, fontWeight: 600, fontSize: 14.5, cursor: "pointer" }}>
            {row} <ChevronRight size={18} color="#B7C9A0" />
          </div>
        ))}
      </Card>
    </div>
  );
}
