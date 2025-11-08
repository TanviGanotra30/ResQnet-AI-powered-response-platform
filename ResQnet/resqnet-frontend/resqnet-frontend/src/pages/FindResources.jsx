// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { Loader2, MapPin } from "lucide-react";

// const categories = [
//   { key: "hospital", label: "Hospitals", emoji: "🏥", gradient: "from-pink-100 to-red-300" },
//   { key: "police", label: "Police Stations", emoji: "🚓", gradient: "from-blue-100 to-indigo-400" },
//   { key: "fire_station", label: "Fire Stations", emoji: "🔥", gradient: "from-orange-100 to-red-300" },
//   { key: "ngo", label: "NGOs & Relief Centers", emoji: "🤝", gradient: "from-green-100 to-emerald-400" },
// ];

// // Map for matching emergency type names to RapidAPI input
// const EMERGENCY_MAP = {
//   hospital: "Hospital",
//   police: "Police Station",
//   fire_station: "Fire Station",
//   restaurant: "Food Shelter",
//   ngo: "NGO",
// };

// export default function FindResources() {
//   const [coords, setCoords] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [places, setPlaces] = useState({});
//   const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

//   // ✅ Get user location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setCoords({ lat: latitude, lng: longitude });
//       },
//       (err) => {
//         alert("Please enable location services to find nearby resources.");
//         console.error(err);
//         setLoading(false);
//       }
//     );
//   }, []);

//   // ✅ Fetch places using RapidAPI
//   useEffect(() => {
//     if (!coords) return;

//     const fetchPlaces = async () => {
//       setLoading(true);
//       const newPlaces = {};

//       for (const cat of categories) {
//         try {
//           const url =
//             "https://google-map-places-new-v2.p.rapidapi.com/v1/places:autocomplete";

//           const payload = {
//             input: EMERGENCY_MAP[cat.key],
//             locationBias: {
//               circle: {
//                 center: { latitude: coords.lat, longitude: coords.lng },
//                 radius: 5000,
//               },
//             },
//             includedPrimaryTypes: [],
//             includedRegionCodes: ["IN"],
//             languageCode: "en",
//             regionCode: "IN",
//             origin: { latitude: 0, longitude: 0 },
//             inputOffset: 0,
//             includeQueryPredictions: true,
//             sessionToken: "",
//           };

//           const res = await fetch(url, {
//             method: "POST",
//             headers: {
//               "content-type": "application/json",
//               "X-RapidAPI-Key": RAPIDAPI_KEY,
//               "X-RapidAPI-Host": "google-map-places-new-v2.p.rapidapi.com",
//             },
//             body: JSON.stringify(payload),
//           });

//           const data = await res.json();

//           const parsed =
//             data.suggestions
//               ?.filter((s) => s.placePrediction)
//               .slice(0, 5)
//               .map((s) => {
//                 const p = s.placePrediction;
//                 return {
//                   name: p.structuredFormat?.mainText?.text || p.text?.text || "Unknown",
//                   address: p.structuredFormat?.secondaryText?.text || "",
//                   distance: p.distanceMeters
//                     ? (p.distanceMeters / 1000000).toFixed(1) + " km"
//                     : null,
//                   mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                     (p.structuredFormat?.mainText?.text || "") +
//                       " " +
//                       (p.structuredFormat?.secondaryText?.text || "")
//                   )}`,
//                 };
//               }) || [];

//           newPlaces[cat.key] = parsed;
//         } catch (error) {
//           console.error(`Error fetching ${cat.label}:`, error);
//           newPlaces[cat.key] = [];
//         }
//       }

//       setPlaces(newPlaces);
//       setLoading(false);
//     };

//     fetchPlaces();
//   }, [coords]);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 p-8 ml-64 overflow-y-auto">
//         <h1 className="mb-6 text-3xl font-bold text-gray-800">
//           🔍 Find Nearby Resources
//         </h1>

//         {loading ? (
//           <div className="flex items-center justify-center text-gray-500 h-60">
//             <Loader2 className="mr-2 animate-spin" /> Fetching nearby places...
//           </div>
//         ) : (
//           <div className="space-y-12">
//             {categories.map((cat) => (
//               <div key={cat.key}>
//                 {/* 🏷️ Section Header */}
//                 <div className="flex items-center gap-2 mb-5">
//                   <h2 className="text-2xl font-semibold text-gray-800">
//                     {cat.emoji} {cat.label} Near You
//                   </h2>
//                   <div className="flex-1 h-[2px] bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400"></div>
//                 </div>

//                 {/* 📍 Cards Grid */}
//                 {places[cat.key]?.length ? (
//                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                     {places[cat.key].map((p, idx) => (
//                       <div
//                         key={idx}
//                         className={`bg-gradient-to-br ${cat.gradient} rounded-2xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1`}
//                       >
//                         <h3 className="mb-1 text-lg font-bold text-gray-800">
//                           {p.name}
//                         </h3>
//                         <p className="mb-1 text-sm text-gray-700">{p.address}</p>
//                         {p.distance && (
//                           <p className="mb-3 text-xs text-gray-600">
//                             📍 {p.distance} away
//                           </p>
//                         )}

//                         <a
//                           href={p.mapUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-1 text-sm bg-white text-blue-600 font-semibold px-3 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition"
//                         >
//                           <MapPin size={14} /> View on Map
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500">No results found nearby.</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Loader2, MapPin, Bell, User, Search, Menu, LogOut } from "lucide-react";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   { key: "hospital", label: "Hospitals", emoji: "", gradient: "from-pink-50 to-red-100" },
//   { key: "police", label: "Police Stations", emoji: "", gradient: "from-blue-50 to-indigo-100" },
//   { key: "fire_station", label: "Fire Stations", emoji: "", gradient: "from-orange-50 to-red-100" },
//   { key: "ngo", label: "NGOs & Relief Centers", emoji: "", gradient: "from-green-50 to-emerald-100" },
// ];

// const EMERGENCY_MAP = {
//   hospital: "Hospital",
//   police: "Police Station",
//   fire_station: "Fire Station",
//   restaurant: "Food Shelter",
//   ngo: "NGO",
// };

// export default function FindResources() {
//   const [coords, setCoords] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [places, setPlaces] = useState({});
//   const navigate = useNavigate();
//   const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       icon: "success",
//       title: "Logged out!",
//       text: "You have been logged out successfully.",
//       timer: 1500,
//       showConfirmButton: false,
//     }).then(() => {
//       localStorage.removeItem("user");
//       localStorage.removeItem("access_token");
//       navigate("/auth", { replace: true });
//     });
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setCoords({ lat: latitude, lng: longitude });
//       },
//       (err) => {
//         Swal.fire("Error", "Please enable location services to find nearby resources.", "error");
//         setLoading(false);
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (!coords) return;

//     const fetchPlaces = async () => {
//       setLoading(true);
//       const newPlaces = {};

//       for (const cat of categories) {
//         try {
//           const res = await fetch("https://google-map-places-new-v2.p.rapidapi.com/v1/places:autocomplete", {
//             method: "POST",
//             headers: {
//               "content-type": "application/json",
//               "X-RapidAPI-Key": RAPIDAPI_KEY,
//               "X-RapidAPI-Host": "google-map-places-new-v2.p.rapidapi.com",
//             },
//             body: JSON.stringify({
//               input: EMERGENCY_MAP[cat.key],
//               locationBias: {
//                 circle: {
//                   center: { latitude: coords.lat, longitude: coords.lng },
//                   radius: 5000,
//                 },
//               },
//               includedRegionCodes: ["IN"],
//               languageCode: "en",
//               regionCode: "IN",
//               includeQueryPredictions: true,
//             }),
//           });

//           const data = await res.json();
//           const parsed =
//             data.suggestions
//               ?.filter((s) => s.placePrediction)
//               .slice(0, 5)
//               .map((s) => {
//                 const p = s.placePrediction;
//                 return {
//                   name: p.structuredFormat?.mainText?.text || p.text?.text || "Unknown",
//                   address: p.structuredFormat?.secondaryText?.text || "",
//                   mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                     (p.structuredFormat?.mainText?.text || "") +
//                       " " +
//                       (p.structuredFormat?.secondaryText?.text || "")
//                   )}`,
//                 };
//               }) || [];

//           newPlaces[cat.key] = parsed;
//         } catch (error) {
//           console.error(`Error fetching ${cat.label}:`, error);
//           newPlaces[cat.key] = [];
//         }
//       }

//       setPlaces(newPlaces);
//       setLoading(false);
//     };

//     fetchPlaces();
//   }, [coords]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900">
//       {/* HEADER */}
//       <header className="fixed left-0 right-0 z-30 top-4">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-sm bg-white/60 rounded-2xl border-white/60">
//             <div className="flex items-center gap-4">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] flex items-center justify-center text-white font-bold shadow">
//                 RQ
//               </div>
//               <div>
//                 <div className="font-semibold">ResQNet</div>
//                 <div className="text-xs text-slate-600">Empathy meets Intelligence</div>
//               </div>
//             </div>

//             <div className="items-center hidden gap-4 md:flex">
//               <nav className="flex items-center gap-6 text-sm text-slate-700">
//                 <a className="hover:text-slate-900">Dashboard</a>
//                 <a className="hover:text-slate-900">Volunteer</a>
//               </nav>

//               <div className="flex items-center gap-3">
//                 <button className="px-4 py-2 rounded-full bg-[#FF3D4F] text-white font-semibold shadow-sm">Donate</button>
//                 <button className="p-2 rounded-md hover:bg-slate-100"><Bell className="w-5 h-5" /></button>
//                 <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                   <User className="w-5 h-5 text-slate-700" />
//                   <div className="text-sm">{user?.name || "User"}</div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] rounded-full hover:opacity-90 transition"
//                 >
//                   <LogOut size={16} /> Logout
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:hidden">
//               <button className="p-2 bg-white rounded-md shadow-sm"><Search className="w-5 h-5" /></button>
//               <button className="p-2 bg-white rounded-md shadow-sm"><Menu className="w-5 h-5" /></button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* HERO SECTION */}
//       <section className="pt-32 pb-16 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white text-center rounded-b-3xl shadow-md">
//         <h1 className="mb-3 text-4xl font-extrabold">Find Nearby Resources</h1>
//         <p className="text-lg text-white/90">Locate hospitals, police, fire stations, and NGOs near you instantly.</p>
//       </section>

//       {/* MAIN CONTENT */}
//       <main className="px-6 py-12 mx-auto max-w-7xl">
//         {loading ? (
//           <div className="flex items-center justify-center text-gray-500 h-60">
//             <Loader2 className="mr-2 animate-spin" /> Fetching nearby resources...
//           </div>
//         ) : (
//           <div className="space-y-16">
//             {categories.map((cat, index) => (
//               <motion.div
//                 key={cat.key}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2, duration: 0.6 }}
//                 className="p-6 border shadow-lg bg-white/80 backdrop-blur-lg rounded-2xl border-white/40"
//               >
//                 <div className="flex items-center gap-2 mb-6">
//                   <h2 className="text-2xl font-bold text-slate-800">
//                     {cat.emoji} {cat.label} Near You
//                   </h2>
//                   <div className="flex-1 h-[2px] bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78]"></div>
//                 </div>

//                 {places[cat.key]?.length ? (
//                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                     {places[cat.key].map((p, idx) => (
//                       <motion.div
//                         key={idx}
//                         whileHover={{ scale: 1.03 }}
//                         className={`p-5 rounded-2xl shadow-md hover:shadow-xl transition bg-gradient-to-br ${cat.gradient}`}
//                       >
//                         <h3 className="mb-1 text-lg font-bold text-gray-800">{p.name}</h3>
//                         <p className="mb-2 text-sm text-gray-700">{p.address}</p>
//                         <a
//                           href={p.mapUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-1 text-sm bg-white text-blue-600 font-semibold px-3 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition"
//                         >
//                           <MapPin size={14} /> View on Map
//                         </a>
//                       </motion.div>
//                     ))}
//                   </div>
//                 ) : (
//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="mt-3 text-sm italic text-center text-gray-500"
//                   >
//                     😔 No {cat.label.toLowerCase()} found nearby.
//                   </motion.p>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Loader2, MapPin, Bell, User, Search, Menu, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import resqnetImage from "../pages/resqnet img.jpg";

const categories = [
  { key: "hospital", label: "Hospitals", emoji: "🏥", gradient: "from-pink-50 to-red-100" },
  { key: "police", label: "Police Stations", emoji: "🚓", gradient: "from-blue-50 to-indigo-100" },
  { key: "fire_station", label: "Fire Stations", emoji: "🔥", gradient: "from-orange-50 to-red-100" },
  { key: "ngo", label: "NGOs & Relief Centers", emoji: "🤝", gradient: "from-green-50 to-emerald-100" },
];

const EMERGENCY_MAP = {
  hospital: "Hospital",
  police: "Police Station",
  fire_station: "Fire Station",
  restaurant: "Food Shelter",
  ngo: "NGO",
};

export default function FindResources() {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "You have been logged out successfully.",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      navigate("/auth", { replace: true });
    });
  };

  // ✅ Get User Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
      },
      (err) => {
        Swal.fire("Error", "Please enable location services to find nearby resources.", "error");
        setLoading(false);
      }
    );
  }, []);

  // ✅ Fetch Nearby Places
  useEffect(() => {
    if (!coords) return;

    const fetchPlaces = async () => {
      setLoading(true);
      const newPlaces = {};

      for (const cat of categories) {
        try {
          const res = await fetch("https://google-map-places-new-v2.p.rapidapi.com/v1/places:autocomplete", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "X-RapidAPI-Key": RAPIDAPI_KEY,
              "X-RapidAPI-Host": "google-map-places-new-v2.p.rapidapi.com",
            },
            body: JSON.stringify({
              input: EMERGENCY_MAP[cat.key],
              locationBias: {
                circle: {
                  center: { latitude: coords.lat, longitude: coords.lng },
                  radius: 5000,
                },
              },
              includedRegionCodes: ["IN"],
              languageCode: "en",
              regionCode: "IN",
              includeQueryPredictions: true,
            }),
          });

          const data = await res.json();
          const parsed =
            data.suggestions
              ?.filter((s) => s.placePrediction)
              .slice(0, 5)
              .map((s) => {
                const p = s.placePrediction;
                return {
                  name: p.structuredFormat?.mainText?.text || p.text?.text || "Unknown",
                  address: p.structuredFormat?.secondaryText?.text || "",
                  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    (p.structuredFormat?.mainText?.text || "") +
                      " " +
                      (p.structuredFormat?.secondaryText?.text || "")
                  )}`,
                };
              }) || [];

          newPlaces[cat.key] = parsed;
        } catch (error) {
          console.error(`Error fetching ${cat.label}:`, error);
          newPlaces[cat.key] = [];
        }
      }

      setPlaces(newPlaces);
      setLoading(false);
    };

    fetchPlaces();
  }, [coords]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900">
     {/* ✨ ResQNet Premium Gradient Navbar */}
<header className="fixed top-0 left-0 right-0 z-50 py-4">
  <div className="px-8 mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between p-4 rounded-3xl shadow-xl
      bg-white/30 backdrop-blur-2xl border border-white/40
      hover:shadow-[0_0_25px_rgba(255,61,79,0.4)] transition-all duration-300"
    >
      {/* 🩶 Logo & Brand Name */}
      <Link
        to="/home"
        className="flex items-center gap-4 transition-transform group hover:scale-105"
      >
        <div className="relative w-12 h-12 overflow-hidden border-2 border-white rounded-full shadow-lg">
          <img
            src={resqnetImage}
            alt="ResQNet Logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] tracking-wide">
            ResQNet
          </h1>
          <p className="text-xs text-slate-700 font-medium group-hover:text-[#FF3D4F] transition">
            Empathy meets Intelligence
          </p>
        </div>
      </Link>

      {/* 🌐 Navigation Links */}
      <nav className="items-center hidden gap-8 text-sm font-semibold md:flex">
        {[
          { name: "Dashboard", path: "/home" },
          { name: "Resources", path: "/find-resources" },
          { name: "Volunteer", path: "/volunteer-portal" },
          { name: "Track", path: "/track-incidents" },
          { name: "Donate", path: "/donate" },
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative transition-all duration-300 hover:text-[#FF3D4F] ${
              location.pathname === link.path
                ? "text-[#FF3D4F] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[#FF3D4F] after:via-[#D241A6] after:to-[#1E2A78]"
                : "text-slate-800"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* 👤 Right Section */}
      <div className="flex items-center gap-3">
        <button className="p-2 transition rounded-lg hover:bg-white/40">
          <Bell className="w-5 h-5 text-slate-800" />
        </button>

        <div className="items-center hidden gap-2 px-3 py-1 transition rounded-lg md:flex bg-white/20 hover:bg-white/30">
          <User className="w-5 h-5 text-slate-700" />
          <span className="text-sm font-medium text-slate-800">
            {user?.name || "User"}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white
          bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] rounded-full
          shadow-lg hover:shadow-[0_0_20px_rgba(255,61,79,0.4)] transition"
        >
          <LogOut size={16} /> Logout
        </motion.button>
      </div>

      {/* 📱 Mobile Menu */}
      <div className="flex items-center gap-2 md:hidden">
        <button className="p-2 bg-white rounded-md shadow-sm">
          <Search className="w-5 h-5 text-slate-700" />
        </button>
        <button className="p-2 bg-white rounded-md shadow-sm">
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
      </div>
    </motion.div>
  </div>
</header>


      {/* HERO SECTION */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white text-center rounded-b-3xl shadow-md">
        <h1 className="mb-3 text-4xl font-extrabold">Find Nearby Resources</h1>
        <p className="text-lg text-white/90">
          Locate hospitals, police, fire stations, and NGOs near you instantly.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <main className="px-6 py-12 mx-auto max-w-7xl">
        {loading ? (
          <div className="flex items-center justify-center text-gray-500 h-60">
            <Loader2 className="mr-2 animate-spin" /> Fetching nearby resources...
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="p-6 border shadow-lg bg-white/80 backdrop-blur-lg rounded-2xl border-white/40"
              >
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {cat.emoji} {cat.label} Near You
                  </h2>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78]"></div>
                </div>

                {places[cat.key]?.length ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {places[cat.key].map((p, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        className={`p-5 rounded-2xl shadow-md hover:shadow-xl transition bg-gradient-to-br ${cat.gradient}`}
                      >
                        <h3 className="mb-1 text-lg font-bold text-gray-800">{p.name}</h3>
                        <p className="mb-2 text-sm text-gray-700">{p.address}</p>
                        <a
                          href={p.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm bg-white text-blue-600 font-semibold px-3 py-1.5 rounded-md shadow-sm hover:bg-blue-50 transition"
                        >
                          <MapPin size={14} /> View on Map
                        </a>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 text-sm italic text-center text-gray-500"
                  >
                    😔 No {cat.label.toLowerCase()} found nearby.
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
