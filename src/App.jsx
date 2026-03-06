import { useState, useEffect, useRef } from "react";
import logoImg from "/logo.png";

const MENU = {
  Sandwiches: [
    { id: 1, name: "Paneer Sandwich", desc: "Veg · Classic paneer filling", price: 70, emoji: "🥪", tag: "🟢 Veg", popular: false },
    { id: 2, name: "Mixed Veg Sandwich", desc: "Veg · Fresh mixed vegetables", price: 70, emoji: "🥪", tag: "🟢 Veg", popular: false },
    { id: 3, name: "Sweet Corn Sandwich", desc: "Veg · Sweet corn filling", price: 70, emoji: "🥪", tag: "🟢 Veg", popular: false },
    { id: 4, name: "Nutella Sandwich", desc: "Chocolate · Nutella spread", price: 80, emoji: "🍫", tag: "🟢 Veg", popular: false },
    { id: 5, name: "Ferroro Rocher Sandwich", desc: "Chocolate · Ferroro Rocher filling", price: 80, emoji: "🍫", tag: "🟢 Veg", popular: true },
    { id: 6, name: "Chicken Tikka Sandwich", desc: "Non-Veg · Spiced chicken tikka", price: 80, emoji: "🥪", tag: "🔴 Non-Veg", popular: true },
    { id: 7, name: "Minced Chicken Sandwich", desc: "Non-Veg · Minced chicken filling", price: 80, emoji: "🥪", tag: "🔴 Non-Veg", popular: false },
    { id: 8, name: "Chicken Masala Sandwich", desc: "Non-Veg · Spicy chicken masala", price: 80, emoji: "🥪", tag: "🔴 Non-Veg", popular: false },
    { id: 9, name: "Tandoori Chicken Sandwich", desc: "Non-Veg · Smoky tandoori chicken", price: 80, emoji: "🥪", tag: "🔴 Non-Veg", popular: false },
    { id: 10, name: "Golden Chicken Sandwich", desc: "Non-Veg · Crispy golden chicken", price: 80, emoji: "🥪", tag: "🔴 Non-Veg", popular: false },
    { id: 11, name: "Tuna Sandwich", desc: "Seafood · Fresh tuna", price: 100, emoji: "🐟", tag: "🔴 Non-Veg", popular: false },
    { id: 12, name: "Fish Sandwich", desc: "Seafood · Fish fillet", price: 100, emoji: "🐟", tag: "🔴 Non-Veg", popular: false },
    { id: 13, name: "Prawn Sandwich", desc: "Seafood · Juicy prawns", price: 100, emoji: "🦐", tag: "🔴 Non-Veg", popular: false },
    { id: 14, name: "Fried Egg Sandwich", desc: "Egg · Fried egg filling", price: 70, emoji: "🍳", tag: "🥚 Egg", popular: false },
    { id: 15, name: "Boiled Egg Sandwich", desc: "Egg · Boiled egg filling", price: 70, emoji: "🥚", tag: "🥚 Egg", popular: false },
  ],
  Burgers: [
    { id: 16, name: "Veg Delight", desc: "Veg Patty & Vegetables", price: 80, emoji: "🍔", tag: "🟢 Veg", popular: true },
    { id: 17, name: "Special Veg", desc: "Veg Patty with Delightful Vegetables", price: 95, emoji: "🍔", tag: "🟢 Veg", popular: false },
    { id: 18, name: "Paneer Burger", desc: "Roasted Paneer & Delightful Vegetables", price: 85, emoji: "🍔", tag: "🟢 Veg", popular: false },
    { id: 19, name: "Veg Double Decker", desc: "Veg Patty, Roasted Paneer & Vegetables", price: 125, emoji: "🍔", tag: "🟢 Veg", popular: false },
    { id: 20, name: "Classic Chicken", desc: "Chicken Patty & Vegetables", price: 90, emoji: "🍔", tag: "🔴 Non-Veg", popular: true },
    { id: 21, name: "Roasted Chicken (Zinger)", desc: "Fried Chicken & Vegetables", price: 110, emoji: "🍔", tag: "🔴 Non-Veg", popular: true },
    { id: 22, name: "Chicken Gaze", desc: "Grilled Chicken & Patty", price: 130, emoji: "🍔", tag: "🔴 Non-Veg", popular: false },
    { id: 23, name: "Sea Shell", desc: "Fish Fillets & Vegetables", price: 110, emoji: "🍔", tag: "🔴 Non-Veg", popular: false },
    { id: 24, name: "Double Decker", desc: "Chicken Patty & Cheese", price: 145, emoji: "🍔", tag: "🔴 Non-Veg", popular: false },
    { id: 25, name: "Sea Lord", desc: "Grilled Fish, Prawns & Crab", price: 145, emoji: "🍔", tag: "🔴 Non-Veg", popular: false },
  ],
  Wraps: [
    { id: 26, name: "Paneer Wrap", desc: "Veg · Roasted paneer", price: 80, emoji: "🌯", tag: "🟢 Veg", popular: false },
    { id: 27, name: "Mixed Veg Wrap", desc: "Veg · Fresh vegetables", price: 80, emoji: "🌯", tag: "🟢 Veg", popular: false },
    { id: 28, name: "Sweet Corn Wrap", desc: "Veg · Sweet corn filling", price: 80, emoji: "🌯", tag: "🟢 Veg", popular: false },
    { id: 29, name: "Chicken Tikka Wrap", desc: "Non-Veg · Spiced chicken tikka", price: 100, emoji: "🌯", tag: "🔴 Non-Veg", popular: false },
    { id: 30, name: "Minced Chicken Wrap", desc: "Non-Veg · Minced chicken", price: 100, emoji: "🌯", tag: "🔴 Non-Veg", popular: false },
    { id: 31, name: "Chicken Masala Wrap", desc: "Non-Veg · Spicy chicken masala", price: 100, emoji: "🌯", tag: "🔴 Non-Veg", popular: false },
    { id: 32, name: "Roasted (Zinger) Wrap", desc: "Special · Crispy zinger", price: 100, emoji: "🌯", tag: "🔴 Non-Veg", popular: true },
    { id: 33, name: "Mexican Wrap", desc: "Special · Mexican style", price: 110, emoji: "🌯", tag: "🔴 Non-Veg", popular: false },
    { id: 34, name: "Tandoori Wrap", desc: "Special · Tandoori flavour", price: 120, emoji: "🌯", tag: "🔴 Non-Veg", popular: false },
    { id: 35, name: "Lebanese Wrap", desc: "Special · Lebanese style", price: 110, emoji: "🌯", tag: "🔴 Non-Veg", popular: false },
    { id: 36, name: "Fish Wrap", desc: "Seafood · Fish fillet", price: 120, emoji: "🌯", tag: "🔴 Non-Veg", popular: false },
    { id: 37, name: "Prawn Wrap", desc: "Seafood · Juicy prawns", price: 130, emoji: "🌯", tag: "🔴 Non-Veg", popular: false },
  ],
  Pizza: [
    { id: 38, name: "Margherita", desc: "Veg · Loaded with Cheese (8\")", price: 120, emoji: "🍕", tag: "🟢 Veg", popular: false },
    { id: 39, name: "Garden Veg", desc: "Veg · Tomatoes, Onions & Capsicums (8\")", price: 130, emoji: "🍕", tag: "🟢 Veg", popular: false },
    { id: 40, name: "Farmoline", desc: "Veg · Corn, Onions & Capsicum (8\")", price: 140, emoji: "🍕", tag: "🟢 Veg", popular: false },
    { id: 41, name: "Misty Mushroom", desc: "Veg · Mushroom, Onions & Capsicum (8\")", price: 150, emoji: "🍕", tag: "🟢 Veg", popular: false },
    { id: 42, name: "Pan Paneer", desc: "Veg · Paneer, Corn & Onion (8\")", price: 150, emoji: "🍕", tag: "🟢 Veg", popular: true },
    { id: 43, name: "Paneer Delight", desc: "Veg · Loaded with Paneer & Cheese (8\")", price: 160, emoji: "🍕", tag: "🟢 Veg", popular: false },
    { id: 44, name: "Veg Delight Pizza", desc: "Veg · Corn, Olives, Jalapeño & Bell peppers (8\")", price: 160, emoji: "🍕", tag: "🟢 Veg", popular: false },
    { id: 45, name: "Chicken Tikka Pizza", desc: "Non-Veg · Marinated Chicken pieces (8\")", price: 150, emoji: "🍕", tag: "🔴 Non-Veg", popular: true },
    { id: 46, name: "Chicken Supreme", desc: "Non-Veg · Chicken Tikka & Corn (8\")", price: 160, emoji: "🍕", tag: "🔴 Non-Veg", popular: false },
    { id: 47, name: "Golden Chicken Pizza", desc: "Non-Veg · Topped with Fried Chicken (8\")", price: 170, emoji: "🍕", tag: "🔴 Non-Veg", popular: false },
    { id: 48, name: "Chicken Pepper Crunch", desc: "Non-Veg · Chicken, Onion, Green & Red Capsicum (8\")", price: 180, emoji: "🍕", tag: "🔴 Non-Veg", popular: false },
    { id: 49, name: "BBQ Chicken Pizza", desc: "Non-Veg · Tangy BBQ Sauce (8\")", price: 190, emoji: "🍕", tag: "🔴 Non-Veg", popular: false },
    { id: 50, name: "Chicken Mediterranean", desc: "Non-Veg · Chicken, Onion, Olives (8\")", price: 190, emoji: "🍕", tag: "🔴 Non-Veg", popular: false },
    { id: 51, name: "Chick's Love", desc: "Non-Veg · Tandoori Sauce & Paneer (8\")", price: 200, emoji: "🍕", tag: "🔴 Non-Veg", popular: false },
  ],
  "Fried Treats": [
    { id: 52, name: "Fried Chicken 2 pcs", desc: "Hot & Juicy fried chicken", price: 150, emoji: "🍗", tag: "🔴 Non-Veg", popular: false },
    { id: 53, name: "Fried Chicken 4 pcs", desc: "Hot & Juicy fried chicken", price: 270, emoji: "🍗", tag: "🔴 Non-Veg", popular: true },
    { id: 54, name: "Strips 3 pcs", desc: "Crispy chicken strips", price: 90, emoji: "🍗", tag: "🔴 Non-Veg", popular: false },
    { id: 55, name: "Strips 6 pcs", desc: "Crispy chicken strips", price: 170, emoji: "🍗", tag: "🔴 Non-Veg", popular: false },
    { id: 56, name: "Drum Sticks 3 pcs", desc: "Juicy drum sticks", price: 180, emoji: "🍖", tag: "🔴 Non-Veg", popular: false },
    { id: 57, name: "Wings 3 pcs", desc: "Spicy chicken wings", price: 90, emoji: "🍗", tag: "🔴 Non-Veg", popular: false },
    { id: 58, name: "Wings 6 pcs", desc: "Spicy chicken wings", price: 150, emoji: "🍗", tag: "🔴 Non-Veg", popular: false },
    { id: 59, name: "Fish Fingers 3 pcs", desc: "Crispy fish fingers", price: 90, emoji: "🐟", tag: "🔴 Non-Veg", popular: false },
    { id: 60, name: "Prawn 5 pcs", desc: "Juicy fried prawns", price: 110, emoji: "🦐", tag: "🔴 Non-Veg", popular: false },
    { id: 61, name: "Fillet Whole (Half)", desc: "Crispy fish fillet", price: 170, emoji: "🐟", tag: "🔴 Non-Veg", popular: false },
  ],
  "Lip Smackers": [
    { id: 62, name: "French Fries (Small)", desc: "Veg · Golden shoestring fries", price: 70, emoji: "🍟", tag: "🟢 Veg", popular: true },
    { id: 63, name: "French Fries (Medium)", desc: "Veg · Golden shoestring fries", price: 100, emoji: "🍟", tag: "🟢 Veg", popular: false },
    { id: 64, name: "Peri Peri Fries (Small)", desc: "Veg · Spicy peri peri seasoning", price: 80, emoji: "🍟", tag: "🟢 Veg", popular: false },
    { id: 65, name: "Masala French Fries (Small)", desc: "Veg · Indian masala spiced", price: 90, emoji: "🍟", tag: "🟢 Veg", popular: false },
    { id: 66, name: "Cheesy Fries (Small)", desc: "Veg · Loaded with cheese", price: 100, emoji: "🍟", tag: "🟢 Veg", popular: false },
    { id: 67, name: "Smileys (Small)", desc: "Veg · Smiley potato faces", price: 80, emoji: "😊", tag: "🟢 Veg", popular: false },
    { id: 68, name: "Potato Wedges (Small)", desc: "Veg · Thick cut wedges", price: 80, emoji: "🥔", tag: "🟢 Veg", popular: false },
    { id: 69, name: "Veg Nuggets (Small)", desc: "Veg · Crispy veg nuggets", price: 90, emoji: "🟡", tag: "🟢 Veg", popular: false },
    { id: 70, name: "Chicken Cheese Balls (Small)", desc: "Non-Veg · Cheesy chicken balls", price: 100, emoji: "🧀", tag: "🔴 Non-Veg", popular: false },
    { id: 71, name: "Chicken Popcorn (Small)", desc: "Non-Veg · Bite-sized crispy chicken", price: 120, emoji: "🍗", tag: "🔴 Non-Veg", popular: true },
    { id: 72, name: "Chicken Nuggets (Small)", desc: "Non-Veg · Classic chicken nuggets", price: 100, emoji: "🍗", tag: "🔴 Non-Veg", popular: false },
    { id: 73, name: "Loaded Fries (Small)", desc: "Non-Veg · Loaded with toppings", price: 150, emoji: "🍟", tag: "🔴 Non-Veg", popular: false },
  ],
  Milkshakes: [
    { id: 74, name: "Chocolate Shake", desc: "Rich chocolate milkshake", price: 80, emoji: "🥤", tag: "🟢 Veg", popular: false },
    { id: 75, name: "Mango Shake", desc: "Fresh mango milkshake", price: 80, emoji: "🥭", tag: "🟢 Veg", popular: true },
    { id: 76, name: "Oreo Shake", desc: "Creamy Oreo milkshake", price: 90, emoji: "🥤", tag: "🟢 Veg", popular: false },
    { id: 77, name: "Mango Magic", desc: "Special mango magic shake", price: 90, emoji: "🥭", tag: "🟢 Veg", popular: false },
    { id: 78, name: "Strawberry Shake", desc: "Fresh strawberry milkshake", price: 100, emoji: "🍓", tag: "🟢 Veg", popular: false },
    { id: 79, name: "Dates Shake", desc: "Healthy dates milkshake", price: 110, emoji: "🥤", tag: "🟢 Veg", popular: false },
    { id: 80, name: "Dry Fruits Shake", desc: "Premium dry fruits shake", price: 135, emoji: "🥤", tag: "🟢 Veg", popular: false },
    { id: 81, name: "Ferrero Rocher Shake", desc: "Indulgent Ferrero Rocher shake", price: 110, emoji: "🍫", tag: "🟢 Veg", popular: false },
    { id: 82, name: "Cold Coffee", desc: "Chilled cold coffee", price: 140, emoji: "☕", tag: "🟢 Veg", popular: false },
    { id: 83, name: "Brownie Shake", desc: "Brownie milkshake", price: 140, emoji: "🍫", tag: "🟢 Veg", popular: false },
  ],
  Beverages: [
    { id: 84, name: "Virgin Mojito", desc: "Classic fresh mojito", price: 70, emoji: "🍹", tag: "🟢 Veg", popular: true },
    { id: 85, name: "Green Apple Refresher", desc: "Fresh green apple mojito", price: 70, emoji: "🍏", tag: "🟢 Veg", popular: false },
    { id: 86, name: "Honey Dew Melon", desc: "Sweet melon refresher", price: 80, emoji: "🍈", tag: "🟢 Veg", popular: false },
    { id: 87, name: "Mango Magic Mojito", desc: "Mango twist mojito", price: 70, emoji: "🥭", tag: "🟢 Veg", popular: false },
    { id: 88, name: "Strawberry Spa", desc: "Strawberry mojito", price: 80, emoji: "🍓", tag: "🟢 Veg", popular: false },
    { id: 89, name: "Blue Lagoon", desc: "Tropical blue lagoon", price: 70, emoji: "🫐", tag: "🟢 Veg", popular: false },
    { id: 90, name: "Pomegranate", desc: "Fresh pomegranate refresher", price: 70, emoji: "🍹", tag: "🟢 Veg", popular: false },
    { id: 91, name: "Litchi", desc: "Litchi flavoured drink", price: 70, emoji: "🍹", tag: "🟢 Veg", popular: false },
    { id: 92, name: "Brownie", desc: "Classic chocolate brownie", price: 80, emoji: "🍫", tag: "🟢 Veg", popular: false },
    { id: 93, name: "Brownie with Ice Cream", desc: "Warm brownie + vanilla ice cream", price: 150, emoji: "🍨", tag: "🟢 Veg", popular: true },
    { id: 94, name: "Choco Lava", desc: "Molten chocolate lava cake", price: 80, emoji: "🍮", tag: "🟢 Veg", popular: false },
  ],
  Combos: [
    { id: 95, name: "Veg Burger Combo", desc: "2 Veg Delight Burgers + 2 Mojitos + 1 French Fries", price: 300, emoji: "🎉", tag: "🟢 Veg", popular: true },
    { id: 96, name: "Zinger Burger Combo", desc: "2 Zinger Burgers + 2 Mojitos + 1 French Fries", price: 380, emoji: "🎉", tag: "🔴 Non-Veg", popular: true },
    { id: 97, name: "Wrap Combo", desc: "2 Roasted (Zinger) Wraps + 2 Mojitos + 1 French Fries", price: 360, emoji: "🎉", tag: "🔴 Non-Veg", popular: false },
  ],
};

const OFFERS = [
  { id: 1, title: "🚴 Free Home Delivery!", desc: "Free delivery within 2km. Order now and get it hot!", color: "#00B4C8", bg: "#E8F9FC" },
  { id: 2, title: "🍔 Make It a Meal!", desc: "Add just ₹65 to any order for a Mojito & Fries!", color: "#F5A623", bg: "#FFF8EE" },
  { id: 3, title: "🌯 Wrap Combo Deal", desc: "2 Zinger Wraps + 2 Mojitos + Fries for just ₹360!", color: "#E63946", bg: "#FFF0F1" },
  { id: 4, title: "🧀 Add-On Cheese!", desc: "Add extra cheese to any item for just ₹20!", color: "#2A9D8F", bg: "#EEF9F7" },
];

const NOTIFICATIONS = [
  "🔥 Free delivery within 2km — order now!",
  "🍔 Try our Zinger Burger Combo — only ₹380!",
  "🍕 Hot & Cheezy Pizzas from just ₹120!",
  "🥤 Refreshing Mojitos from ₹70 — beat the heat!",
  "🌯 New wrap combos available — don't miss out!",
];

export default function FoodTrackApp() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Burgers");
  const [notif, setNotif] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [offerIndex, setOfferIndex] = useState(0);
  const notifTimer = useRef(null);

  const TEAL = "#00B4C8";
  const ORANGE = "#F5A623";
  const DARK = "#1A1A2E";

  useEffect(() => {
    const t = setInterval(() => setOfferIndex(i => (i + 1) % OFFERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const showNotif = (idx) => {
      setNotif(NOTIFICATIONS[idx % NOTIFICATIONS.length]);
      clearTimeout(notifTimer.current);
      notifTimer.current = setTimeout(() => setNotif(null), 4000);
    };
    let count = 0;
    setTimeout(() => showNotif(count++), 2000);
    const t = setInterval(() => showNotif(count++), 14000);
    return () => clearInterval(t);
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id));
  const updateQty = (id, delta) => setCart(prev =>
    prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
  );

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setCartOpen(false);
    setTimeout(() => setOrderPlaced(false), 5000);
  };

  const offer = OFFERS[offerIndex];
  const allPopular = Object.values(MENU).flat().filter(i => i.popular);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#F7FDFE", minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Boogaloo&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        .btn-pop { transition: transform 0.12s; }
        .btn-pop:active { transform: scale(0.92); }
        @keyframes slideDown { from { transform: translateY(-70px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes offerIn { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes badgePop { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        .card-enter { animation: fadeUp 0.3s ease both; }
        .notif-bar { animation: slideDown 0.4s cubic-bezier(.22,1,.36,1); }
        .offer-slide { animation: offerIn 0.4s ease; }
        .badge-pop { animation: badgePop 0.3s ease; }
        .nav-tab { background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 7px 12px; border-radius: 14px; transition: background 0.2s; }
        .nav-tab.active { background: #00B4C8; }
        .nav-tab.active .nav-label { color: white; }
        .nav-label { font-size: 10px; font-weight: 800; color: #aaa; letter-spacing: 0.4px; text-transform: uppercase; font-family: 'Nunito', sans-serif; }
        .cat-pill { border: none; cursor: pointer; padding: 7px 16px; border-radius: 30px; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 12px; transition: all 0.18s; white-space: nowrap; }
      `}</style>

      {/* Notification */}
      {notif && (
        <div className="notif-bar" style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, zIndex: 999, background: DARK, color: "white", padding: "11px 18px", fontSize: 12.5, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1000 }}>
          <span>{notif}</span>
          <button onClick={() => setNotif(null)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* Order Placed */}
      {orderPlaced && (
        <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, zIndex: 1000, background: "#2A9D8F", color: "white", padding: "14px 20px", fontSize: 14, fontWeight: 800, textAlign: "center", animation: "slideDown 0.4s ease" }}>
          ✅ Order placed! Ready in ~20 mins. Thank you!
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 900, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <div onClick={() => setCartOpen(false)} style={{ flex: 1, background: "rgba(0,0,0,0.45)" }} />
          <div style={{ background: "white", borderRadius: "24px 24px 0 0", padding: "22px 18px 36px", maxHeight: "78vh", overflowY: "auto", animation: "fadeUp 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: DARK }}>Your Order</div>
                <div style={{ fontSize: 11, color: "#aaa", fontWeight: 600 }}>Food Track · Travel with Taste</div>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: "#f0f0f0", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>×</button>
            </div>
            {cart.length === 0 ? (
              <p style={{ color: "#bbb", textAlign: "center", padding: "30px 0", fontWeight: 700 }}>Your cart is empty 🛒</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <span style={{ fontSize: 26 }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 13 }}>{item.name}</div>
                      <div style={{ color: TEAL, fontWeight: 800, fontSize: 13 }}>₹{(item.price * item.qty)}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ background: "#f0f0f0", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", fontWeight: 900, fontSize: 14 }}>−</button>
                      <span style={{ fontWeight: 900, minWidth: 16, textAlign: "center" }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ background: TEAL, border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", fontWeight: 900, color: "white", fontSize: 14 }}>+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 15 }}>🗑</button>
                  </div>
                ))}
                <div style={{ margin: "16px 0 4px", padding: "12px 14px", background: "#F7FDFE", borderRadius: 12, border: `1.5px solid ${TEAL}33` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 16 }}>
                    <span>Total</span>
                    <span style={{ color: TEAL }}>₹{total}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 4, fontWeight: 600 }}>*Free delivery within 2km</div>
                </div>
                <button onClick={placeOrder} className="btn-pop" style={{ width: "100%", marginTop: 12, background: TEAL, color: "white", border: "none", borderRadius: 14, padding: "15px", fontSize: 15, fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', sans-serif", letterSpacing: 0.3 }}>
                  Place Order 🍔
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${TEAL}, #009ab0)`, padding: "18px 18px 14px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <img src={logoImg} alt="Food Track" style={{ height: 52, objectFit: "contain" }} />
          </div>
          <button onClick={() => setCartOpen(true)} className="btn-pop" style={{ position: "relative", background: "white", border: "none", borderRadius: 14, width: 44, height: 44, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            🛒
            {cartCount > 0 && (
              <span className="badge-pop" key={cartCount} style={{ position: "absolute", top: -5, right: -5, background: ORANGE, color: "white", fontSize: 10, fontWeight: 900, borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Pages */}
      <div style={{ paddingBottom: 88 }}>

        {/* HOME */}
        {page === "home" && (
          <div className="card-enter">
            {/* Hero */}
            <div style={{ margin: "14px", borderRadius: 20, background: `linear-gradient(135deg, ${DARK} 55%, #16213E)`, padding: "22px 20px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -8, top: -8, fontSize: 100, opacity: 0.1 }}>🍔</div>
              <div style={{ fontSize: 10, color: ORANGE, fontWeight: 900, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Hyderabad's Favourite</div>
              <div style={{ fontSize: 28, fontFamily: "'Boogaloo', cursive", color: "white", lineHeight: 1.25 }}>Hot & Fresh.<br/><span style={{ color: TEAL }}>Delivered to you.</span></div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontWeight: 600, marginTop: 6 }}>Free delivery within 2km 🚴</div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button onClick={() => setPage("menu")} className="btn-pop" style={{ background: TEAL, color: "white", border: "none", borderRadius: 12, padding: "10px 18px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 900, cursor: "pointer" }}>
                  Order Now →
                </button>
                <button onClick={() => setPage("offers")} className="btn-pop" style={{ background: "rgba(245,166,35,0.2)", color: ORANGE, border: `1.5px solid ${ORANGE}`, borderRadius: 12, padding: "10px 18px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 900, cursor: "pointer" }}>
                  View Offers
                </button>
              </div>
            </div>

            {/* Contact Strip */}
            <div style={{ margin: "0 14px 14px", background: `${TEAL}15`, borderRadius: 14, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid ${TEAL}33` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>📞 +91 9966 079 000</div>
              <div style={{ width: 1, height: 20, background: "#ddd" }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: DARK }}>📞 +91 8497 979 000</div>
            </div>

            {/* Offer Banner */}
            <div style={{ margin: "0 14px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1.5, textTransform: "uppercase", color: "#aaa", marginBottom: 8 }}>🔥 Hot Offers</div>
              <div key={offerIndex} className="offer-slide" style={{ background: offer.bg, border: `2px solid ${offer.color}33`, borderRadius: 16, padding: "14px 16px" }}>
                <div style={{ fontSize: 17, fontWeight: 900, color: offer.color }}>{offer.title}</div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 4, fontWeight: 600 }}>{offer.desc}</div>
              </div>
              <div style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 9 }}>
                {OFFERS.map((_, i) => (
                  <div key={i} onClick={() => setOfferIndex(i)} style={{ width: i === offerIndex ? 18 : 6, height: 6, borderRadius: 6, background: i === offerIndex ? TEAL : "#ddd", transition: "all 0.3s", cursor: "pointer" }} />
                ))}
              </div>
            </div>

            {/* Popular Items */}
            <div style={{ margin: "0 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1.5, textTransform: "uppercase", color: "#aaa", marginBottom: 12 }}>⭐ Popular Items</div>
              {allPopular.slice(0, 6).map((item, idx) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "white", borderRadius: 16, padding: "13px", marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", animation: `fadeUp 0.3s ${idx * 0.06}s both` }}>
                  <div style={{ fontSize: 36 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginTop: 1 }}>{item.tag}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: TEAL, fontWeight: 900, fontSize: 15, marginBottom: 6 }}>₹{item.price}</div>
                    <button onClick={() => addToCart(item)} className="btn-pop" style={{ background: TEAL, color: "white", border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>+ Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MENU */}
        {page === "menu" && (
          <div className="card-enter">
            <div style={{ padding: "12px 14px 0", overflowX: "auto", display: "flex", gap: 7 }}>
              {Object.keys(MENU).map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="cat-pill" style={{ background: activeCategory === cat ? TEAL : "white", color: activeCategory === cat ? "white" : "#555", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ padding: "12px 14px" }}>
              {MENU[activeCategory].map((item, idx) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, background: "white", borderRadius: 16, padding: "13px", marginBottom: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", animation: `fadeUp 0.25s ${idx * 0.04}s both` }}>
                  <div style={{ fontSize: 38, lineHeight: 1 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#aaa", fontWeight: 600, marginTop: 1 }}>{item.tag}</div>
                    <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginTop: 2, lineHeight: 1.3 }}>{item.desc}</div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 70 }}>
                    <div style={{ color: TEAL, fontWeight: 900, fontSize: 15, marginBottom: 6 }}>₹{item.price}</div>
                    <button onClick={() => addToCart(item)} className="btn-pop" style={{ background: TEAL, color: "white", border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>+ Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OFFERS */}
        {page === "offers" && (
          <div className="card-enter" style={{ padding: "14px" }}>
            <div style={{ fontWeight: 900, fontSize: 22, color: DARK, marginBottom: 4 }}>Current Deals 🔥</div>
            <div style={{ color: "#aaa", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Limited time — grab them while they last!</div>
            {OFFERS.map((o, idx) => (
              <div key={o.id} style={{ background: o.bg, border: `2px solid ${o.color}44`, borderRadius: 18, padding: "18px", marginBottom: 12, animation: `fadeUp 0.3s ${idx * 0.08}s both` }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: o.color }}>{o.title}</div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 5, fontWeight: 600, lineHeight: 1.5 }}>{o.desc}</div>
                <button onClick={() => setPage("menu")} className="btn-pop" style={{ marginTop: 12, background: o.color, color: "white", border: "none", borderRadius: 10, padding: "9px 16px", fontSize: 12, fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                  Order Now →
                </button>
              </div>
            ))}
            <div style={{ background: DARK, borderRadius: 18, padding: "18px", marginTop: 4 }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: ORANGE }}>🔔 Get Notified First!</div>
              <div style={{ fontSize: 13, color: "#aaa", marginTop: 5, fontWeight: 600, lineHeight: 1.5 }}>Enable notifications and never miss a deal, happy hour, or new menu item.</div>
              <button className="btn-pop" style={{ marginTop: 12, background: TEAL, color: "white", border: "none", borderRadius: 10, padding: "9px 16px", fontSize: 12, fontWeight: 900, cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
                Enable Notifications 🔔
              </button>
            </div>
          </div>
        )}

        {/* CONTACT */}
        {page === "contact" && (
          <div className="card-enter" style={{ padding: "14px" }}>
            <div style={{ fontWeight: 900, fontSize: 22, color: DARK, marginBottom: 16 }}>Find Us 📍</div>

            <div style={{ borderRadius: 18, height: 160, background: `linear-gradient(135deg, ${TEAL}22, ${TEAL}44)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, border: `2px solid ${TEAL}33`, marginBottom: 12 }}>
              <span style={{ fontSize: 44 }}>📍</span>
              <span style={{ fontWeight: 800, color: DARK, fontSize: 13 }}>Hyderabad, Telangana</span>
              <span style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>Tap to open in Maps</span>
            </div>

            {[
              { icon: "📞", label: "Phone 1", value: "+91 9966 079 000" },
              { icon: "📞", label: "Phone 2", value: "+91 8497 979 000" },
              { icon: "📧", label: "Email", value: "foodtrack.hyd@gmail.com" },
              { icon: "🚴", label: "Delivery", value: "Free delivery within 2km!" },
              { icon: "📸", label: "Instagram", value: "@FOODTRACK_HYD" },
            ].map(({ icon, label, value }, idx) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, background: "white", borderRadius: 14, padding: "14px", marginBottom: 9, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", animation: `fadeUp 0.3s ${idx * 0.07}s both` }}>
                <div style={{ fontSize: 22 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase", color: TEAL, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: DARK }}>{value}</div>
                </div>
              </div>
            ))}

            <div style={{ background: `linear-gradient(135deg, ${TEAL}, #009ab0)`, borderRadius: 18, padding: "18px", marginTop: 4, textAlign: "center", display: "flex", justifyContent: "center" }}>
              <img src={logoImg} alt="Food Track" style={{ height: 80, objectFit: "contain" }} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "white", borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around", padding: "8px 0 18px", zIndex: 200, boxShadow: "0 -4px 20px rgba(0,0,0,0.07)" }}>
        {[
          { id: "home", icon: "🏠", label: "Home" },
          { id: "menu", icon: "🍔", label: "Menu" },
          { id: "offers", icon: "🎁", label: "Offers" },
          { id: "contact", icon: "📍", label: "Contact" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setPage(tab.id)} className={`nav-tab ${page === tab.id ? "active" : ""}`}>
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
