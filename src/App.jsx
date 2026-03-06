import { useState, useEffect, useRef } from "react";

const logoImg = "data:image/png;base64,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";


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
