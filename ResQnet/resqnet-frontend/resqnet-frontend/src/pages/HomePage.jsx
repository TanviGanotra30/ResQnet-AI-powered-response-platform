// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import axiosInstance from "../api/axiosInstance";
// import { motion } from "framer-motion";
// import { AlertTriangle, MapPin, ListCheck, Loader2 } from "lucide-react";
// import { Link } from "react-router-dom";
// import ReportEmergencyModal from "../components/ReportEmergencyModal";

// /**
//  * HomePage.jsx — Main user dashboard
//  * Now fetches live data from backend (/admin/stats)
//  * and displays total reports, users, and verified volunteers.
//  */
// export default function HomePage() {
//   const [user, setUser] = useState(null);
//   const [isVolunteer, setIsVolunteer] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🆕 Modal state (should be inside component)
//   const [showReportModal, setShowReportModal] = useState(false);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//     setIsVolunteer(storedUser?.volunteerRegistered || false);

//     const fetchStats = async () => {
//       try {
//         const res = await axiosInstance.get("/admin/stats");
//         if (res.data.success) {
//           setStats(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 ml-64 overflow-y-auto">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="p-10 text-center text-white shadow-md bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-b-3xl"
//         >
//           <h1 className="mb-3 text-3xl font-extrabold md:text-4xl">
//             Welcome, {user?.name || "User"} 👋
//           </h1>
//           <p className="mb-6 text-base md:text-lg opacity-90">
//             Track incidents, follow responses, and manage your tasks efficiently.
//           </p>

//           <div className="flex flex-wrap justify-center gap-3">
//             {/* 🆘 Report Emergency Button */}
//             <button
//               onClick={() => setShowReportModal(true)}
//               className="flex items-center gap-2 px-5 py-2 font-semibold text-white transition bg-red-500 rounded-lg hover:bg-red-600"
//             >
//               <AlertTriangle size={18} /> Report Emergency Now
//             </button>

//             {/* 🌍 Find Resources */}
//             <Link
//               to="/find-resources"
//               className="flex inline-flex items-center gap-2 px-5 py-2 font-semibold text-gray-800 transition bg-white rounded-lg hover:bg-gray-100"
//             >
//               <MapPin size={18} /> Find Resources
//             </Link>

//             {/* 📋 Track Incidents */}
//             <Link
//               to="/track-incidents"
//               className="flex inline-flex items-center gap-2 px-5 py-2 font-semibold text-gray-800 transition bg-yellow-400 rounded-lg hover:bg-yellow-500"
//             >
//               <ListCheck size={18} /> Track your incidents
//             </Link>
//           </div>
//         </motion.div>

//         {/* Types of Emergencies */}
//         <section className="py-10 text-center">
//           <h2 className="mb-2 text-2xl font-bold text-gray-900">
//             Types of Emergencies
//           </h2>
//           <p className="mb-8 text-gray-600">
//             Quickly report this type of emergencies
//           </p>

//           <div className="grid max-w-5xl grid-cols-2 gap-5 mx-auto sm:grid-cols-3 md:grid-cols-5">
//             {[
//               { emoji: "🏥", label: "Medical" },
//               { emoji: "🔥", label: "Fire" },
//               { emoji: "🚓", label: "Crime" },
//               { emoji: "🏠", label: "Shelter" },
//               { emoji: "🌊", label: "Disaster" },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center justify-center p-4 transition duration-200 transform bg-white shadow-sm rounded-xl hover:shadow-lg hover:scale-105 sm:p-5"
//               >
//                 <div className="mb-2 text-3xl sm:text-4xl">{item.emoji}</div>
//                 <p className="text-sm font-semibold text-gray-700 sm:text-base">
//                   {item.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Our Impact Section */}
//         <section className="py-12 text-center bg-gray-50">
//           <h2 className="mb-2 text-2xl font-bold">Our Impact</h2>
//           <p className="mb-8 text-gray-600">
//             Together, we are making a difference in disaster response.
//           </p>

//           {loading ? (
//             <div className="flex items-center justify-center py-8 text-gray-500">
//               <Loader2 className="mr-2 animate-spin" /> Loading impact data...
//             </div>
//           ) : (
//             <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto sm:grid-cols-3">
//               <ImpactCard
//                 number={stats?.totalReports || 0}
//                 label="Emergencies Reported"
//                 color="text-red-600"
//               />
//               <ImpactCard
//                 number={stats?.totalUsers || 0}
//                 label="Total connected users"
//                 color="text-blue-600"
//               />
//               <ImpactCard
//                 number={stats?.verifiedVolunteers || 0}
//                 label="Verified Volunteers"
//                 color="text-green-600"
//               />
//             </div>
//           )}
//         </section>

//         {/* Volunteer CTA */}
//         {!isVolunteer ? (
//           <section className="py-12 text-center text-white bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-t-3xl">
//             <h2 className="mb-3 text-3xl font-bold">Join the Mission</h2>
//             <p className="mb-6 text-lg opacity-90">
//               Become a volunteer, save lives, and be part of a global disaster relief movement.
//             </p>
//             <button className="px-6 py-3 font-semibold text-red-600 transition bg-white rounded-lg hover:bg-gray-100">
//               🚀 Sign Up as Volunteer
//             </button>
//           </section>
//         ) : (
//           <section className="py-12 text-center bg-green-50 rounded-t-3xl">
//             <h2 className="mb-2 text-2xl font-bold text-green-700">
//               🌟 Thank you for being a ResQnet Volunteer!
//             </h2>
//             <p className="text-gray-600">
//               Together, we make every rescue faster and more effective.
//             </p>
//           </section>
//         )}
//       </div>

//       {/* 🧩 Report Emergency Modal */}
//       <ReportEmergencyModal
//         show={showReportModal}
//         onClose={() => setShowReportModal(false)}
//       />
//     </div>
//   );
// }

// /** Helper component */
// function ImpactCard({ number, label, color }) {
//   return (
//     <div className="p-6 transition bg-white shadow-md rounded-xl hover:shadow-lg">
//       <h3 className={`text-3xl font-bold ${color}`}>{number}</h3>
//       <p className="mt-2 text-gray-700">{label}</p>
//     </div>
//   );
// }




// import React from "react";
// import { Menu, Search, Bell, User } from "lucide-react";
// import videoBg from "./AI_Coordinated_Flood_Response_Video.mp4";
// import ReportEmergency from "../components/ReportEmergencyModal";

// export default function ResQNetLandingFull() {
//   const videobg="resqnet-frontend\resqnet-frontend\src\pages\AI_Coordinated_Flood_Response_Video.mp4";
//   const emergencies = [
//     { id: 1, name: "Medical", emoji: "🏥", color: "from-red-100 to-red-50" },
//     { id: 2, name: "Fire", emoji: "🔥", color: "from-orange-100 to-orange-50" },
//     { id: 3, name: "Crime", emoji: "🚓", color: "from-indigo-100 to-indigo-50" },
//     { id: 4, name: "Shelter", emoji: "🏠", color: "from-green-100 to-green-50" },
//     { id: 5, name: "Disaster", emoji: "🌊", color: "from-sky-100 to-sky-50" },
//   ];

//   const stats = [
//     { id: 1, label: "Cities Connected", value: "10+" },
//     { id: 2, label: "Volunteers", value: "5,000+" },
//     { id: 3, label: "Meals Donated", value: "20,000+" },
//     { id: 4, label: "Rescue Ops", value: "250+" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900">
//       {/* TOP NAV */}
//       <header className="fixed left-0 right-0 z-30 top-4">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-sm bg-white/60 dark:bg-black/20 rounded-2xl border-white/60">
//             <div className="flex items-center gap-4">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E63946] to-[#1D3557] flex items-center justify-center text-white font-bold shadow">RQ</div>
//               <div>
//                 <div className="font-semibold">ResQNet</div>
//                 <div className="text-xs text-slate-600">Empathy meets Intelligence</div>
//               </div>
//             </div>

//             <div className="items-center hidden gap-4 md:flex">
//               <nav className="flex items-center gap-6 text-sm text-slate-700">
//                 <a className="hover:text-slate-900">How it works</a>
//                 <a className="hover:text-slate-900">Volunteer</a>
//                 <a className="hover:text-slate-900">Dashboard</a>
//               </nav>

//               <div className="flex items-center gap-3">
//                 <button className="px-4 py-2 rounded-full bg-[#E63946] text-white font-semibold shadow-sm">Donate</button>
//                 <button className="p-2 rounded-md hover:bg-slate-100"><Bell className="w-5 h-5" /></button>
//                 <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                   <User className="w-5 h-5 text-slate-700" />
//                   <div className="text-sm">Tanvi</div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:hidden">
//               <button className="p-2 bg-white rounded-md shadow-sm"><Search className="w-5 h-5" /></button>
//               <button className="p-2 bg-white rounded-md shadow-sm"><Menu className="w-5 h-5" /></button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="pt-28">
//         {/* HERO */}
//         <section className="px-6 pb-12 mx-auto max-w-7xl">
//           <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
//             <div className="space-y-6">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E63946]/10 text-[#1D3557] font-medium text-sm">Live • Real-time Alerts</div>
//               <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Welcome, Tanvi Ganotra 👋<br /><span className="text-[#E63946]">Empowering Communities. Saving Lives.</span></h1>
//               <p className="max-w-xl text-lg text-slate-600">ResQNet coordinates volunteers, donors and rescue teams with smart alerts, optimized logistics and transparent reporting — all in one place.</p>

//               <div className="flex flex-wrap gap-4">
//                 <button className="px-6 py-3 rounded-full bg-[#E63946] text-white font-semibold shadow-lg hover:shadow-xl">Report Emergency Now</button>
//                 <button className="px-6 py-3 rounded-full border border-[#1D3557] text-[#1D3557] font-semibold hover:bg-[#1D3557]/5">Find Resources</button>
//                 <button className="px-6 py-3 font-semibold bg-white rounded-full shadow text-slate-700">Volunteer Portal</button>
//               </div>

//               <div className="flex flex-wrap gap-4 mt-6">
//                 {stats.map((s) => (
//                   <div key={s.id} className="bg-white p-4 rounded-2xl shadow-sm min-w-[140px]">
//                     <div className="text-xl font-bold">{s.value}</div>
//                     <div className="text-xs text-slate-500">{s.label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right visual card */}
//             <div className="relative">
//               <div className="p-6 bg-white border shadow-2xl rounded-2xl border-slate-100">
//                 <div className="flex items-center justify-center w-full rounded-lg h-72 md:h-80">
//                   {/* Replace with Lottie or image */}
//                   <div className="text-slate-400">
//                     <video src={videoBg}></video>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mt-4">
//                   {emergencies.slice(0, 2).map((f) => (
//                     <div key={f.id} className="flex items-start gap-3">
//                       <div className="p-2 rounded-lg bg-[#1D3557] text-white">{f.emoji}</div>
//                       <div>
//                         <div className="text-sm font-semibold">{f.name}</div>
//                         <div className="text-xs text-slate-500">Quick report & location</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="absolute -bottom-6 left-6 bg-gradient-to-r from-[#E63946] to-[#1D3557] text-white px-4 py-2 rounded-2xl shadow-xl hidden lg:flex items-center gap-3">
//                 <div className="text-xs">Quick Donate</div>
//                 <div className="text-sm font-bold">Support a relief fund</div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* TYPES OF EMERGENCIES */}
//         <section className="px-6 py-6 mx-auto max-w-7xl">
//           <div className="p-6 bg-white shadow-sm rounded-2xl">
//             <h2 className="text-2xl font-bold">Types of Emergencies</h2>
//             <p className="text-slate-600">Quickly report this type of emergency</p>

//             <div className="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3 md:grid-cols-5">
//               {emergencies.map((e) => (
//                 <button key={e.id} className="p-5 text-left transition transform shadow bg-gradient-to-br from-white to-slate-50 rounded-2xl hover:shadow-lg hover:-translate-y-1">
//                   <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${e.color} text-2xl`}>{e.emoji}</div>
//                   <div className="mt-3 font-semibold">{e.name}</div>
//                   <div className="mt-1 text-xs text-slate-500">Report {e.name.toLowerCase()}</div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* IMPACT + FEATURES */}
//         <section className="grid grid-cols-1 gap-6 px-6 py-8 mx-auto max-w-7xl lg:grid-cols-3">
//           <div className="p-6 bg-white shadow-sm lg:col-span-2 rounded-2xl">
//             <h3 className="mb-4 text-xl font-bold">Our Impact</h3>
//             <p className="mb-6 text-slate-600">Together we coordinate faster responses and deliver help where it's needed most.</p>

//             <div className="grid grid-cols-2 gap-4">
//               {stats.map((s) => (
//                 <div key={s.id} className="p-4 shadow-sm rounded-xl bg-gradient-to-br from-white to-slate-50">
//                   <div className="text-2xl font-bold">{s.value}</div>
//                   <div className="text-xs text-slate-500">{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <aside className="p-6 bg-white shadow-sm rounded-2xl">
//             <h4 className="mb-3 font-bold">Quick Actions</h4>
//             <div className="space-y-3">
//               <button className="w-full text-left px-4 py-3 rounded-xl bg-[#E63946] text-white font-semibold">Report Emergency</button>
//               <button className="w-full px-4 py-3 text-left border rounded-xl border-slate-200">Volunteer Signup</button>
//               <button className="w-full px-4 py-3 text-left rounded-xl">Donate</button>
//             </div>
//           </aside>
//         </section>

//         {/* JOIN CTA */}
//         <section className="px-6 py-12 mx-auto max-w-7xl">
//           <div className="rounded-2xl bg-gradient-to-r from-[#E63946] to-[#1D3557] text-white p-10 shadow-xl text-center">
//             <h3 className="mb-2 text-2xl font-bold">Join the Mission</h3>
//             <p className="mb-6 text-white/90">Become a volunteer, save lives, and be part of a global disaster relief movement.</p>
//             <div className="flex items-center justify-center gap-4">
//               <button className="px-6 py-3 rounded-full bg-white text-[#1D3557] font-semibold">🚀 Sign Up as Volunteer</button>
//               <button className="px-6 py-3 text-white border border-white rounded-full">Contact Us</button>
//             </div>
//           </div>
//         </section>

//         {/* FOOTER */}
//         <footer className="px-6 py-8 mx-auto text-sm max-w-7xl text-slate-500">
//           <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//             <div>© {new Date().getFullYear()} ResQNet • Built with ❤️</div>
//             <div className="flex gap-4">
//               <a className="hover:text-slate-700">Privacy</a>
//               <a className="hover:text-slate-700">Terms</a>
//               <a className="hover:text-slate-700">Contact</a>
//             </div>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { AlertTriangle, MapPin, ListCheck, Loader2, Bell, User, Search, Menu } from "lucide-react";
// import axiosInstance from "../api/axiosInstance";
// import ReportEmergencyModal from "../components/ReportEmergencyModal";

// /**
//  * HomePage.jsx — Modern Full-width Gradient UI (No Background Video)
//  * - Keeps backend logic, modal, routing, and stats functionality
//  * - Beautiful gradient hero section with soft rounded cards
//  */
// export default function HomePage() {
//   const [user, setUser] = useState(null);
//   const [isVolunteer, setIsVolunteer] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showReportModal, setShowReportModal] = useState(false);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//     setIsVolunteer(storedUser?.volunteerRegistered || false);

//     const fetchStats = async () => {
//       try {
//         const res = await axiosInstance.get("/admin/stats");
//         if (res.data.success) setStats(res.data.data);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const emergencies = [
//     { emoji: "🏥", label: "Medical", id: "medical" },
//     { emoji: "🔥", label: "Fire", id: "fire" },
//     { emoji: "🚓", label: "Crime", id: "crime" },
//     { emoji: "🏠", label: "Shelter", id: "shelter" },
//     { emoji: "🌊", label: "Disaster", id: "disaster" },
//   ];

//   return (
//     <div className="min-h-screen text-slate-900 bg-gradient-to-br from-white via-slate-50 to-slate-100">
//       {/* Top Navigation */}
//       <header className="fixed left-0 right-0 z-30 top-4">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-sm bg-white/60 rounded-2xl border-white/60">
//             <div className="flex items-center gap-4">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E63946] to-[#1D3557] flex items-center justify-center text-white font-bold shadow">RQ</div>
//               <div>
//                 <div className="font-semibold">ResQNet</div>
//                 <div className="text-xs text-slate-600">Empathy meets Intelligence</div>
//               </div>
//             </div>

//             <div className="items-center hidden gap-4 md:flex">
//               <nav className="flex items-center gap-6 text-sm text-slate-700">
//                 <a className="hover:text-slate-900">How it works</a>
//                 <a className="hover:text-slate-900">Volunteer</a>
//                 <a className="hover:text-slate-900">Dashboard</a>
//               </nav>

//               <div className="flex items-center gap-3">
//                 <button className="px-4 py-2 rounded-full bg-[#E63946] text-white font-semibold shadow-sm">Donate</button>
//                 <button className="p-2 rounded-md hover:bg-slate-100"><Bell className="w-5 h-5" /></button>
//                 <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                   <User className="w-5 h-5 text-slate-700" />
//                   <div className="text-sm">{user?.name?.split(" ")?.[0] || "User"}</div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:hidden">
//               <button className="p-2 bg-white rounded-md shadow-sm"><Search className="w-5 h-5" /></button>
//               <button className="p-2 bg-white rounded-md shadow-sm"><Menu className="w-5 h-5" /></button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* HERO SECTION (Color Gradient, No Video) */}
//       <main className="pt-28">
//         <motion.section
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-gradient-to-r from-[#E63946] via-[#E63B7A] to-[#1D3557] text-white py-20 px-6 shadow-lg rounded-b-3xl"
//         >
//           <div className="grid items-center grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-2">
//             <div className="space-y-6">
//               <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-white/20">Live • Real-time Alerts</div>
//               <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
//                 Welcome, {user?.name || "User"} 👋<br />
//                 <span className="text-[#FFDDE1]">Empowering Communities. Saving Lives.</span>
//               </h1>
//               <p className="max-w-xl text-lg text-white/90">
//                 ResQNet connects volunteers, donors, and rescue teams with smart alerts, optimized logistics, and transparent reporting.
//               </p>

//               <div className="flex flex-wrap gap-4">
//                 <button
//                   onClick={() => setShowReportModal(true)}
//                   className="px-6 py-3 rounded-full bg-white text-[#E63946] font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
//                 >
//                   <AlertTriangle size={18} /> Report Emergency Now
//                 </button>

//                 <Link to="/find-resources" className="flex items-center gap-2 px-6 py-3 font-semibold text-white border border-white rounded-full hover:bg-white/10">
//                   <MapPin size={18} /> Find Resources
//                 </Link>

//                 <Link to="/track-incidents" className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-yellow-400 rounded-full shadow hover:bg-yellow-500">
//                   <ListCheck size={18} /> Track your incidents
//                 </Link>
//               </div>

//               <div className="flex flex-wrap gap-6 mt-8">
//                 <ImpactCard number={loading ? "..." : stats?.totalReports || 0} label="Emergencies Reported" color="text-white" />
//                 <ImpactCard number={loading ? "..." : stats?.totalUsers || 0} label="Connected Users" color="text-white" />
//                 <ImpactCard number={loading ? "..." : stats?.verifiedVolunteers || 0} label="Verified Volunteers" color="text-white" />
//               </div>
//             </div>

//             <div className="p-6 bg-white border shadow-2xl text-slate-900 rounded-2xl border-slate-100">
//               <h3 className="mb-4 text-xl font-bold">Quick Access</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {emergencies.slice(0, 4).map((f) => (
//                   <div key={f.id} className="flex items-center gap-3 p-3 shadow-sm rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md">
//                     <span className="text-2xl">{f.emoji}</span>
//                     <p className="text-sm font-semibold">{f.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </motion.section>

//         {/* TYPES OF EMERGENCIES */}
//         <section className="px-6 mx-auto max-w-7xl py-14">
//           <div className="p-6 bg-white shadow-sm rounded-2xl">
//             <h2 className="text-2xl font-bold text-slate-800">Types of Emergencies</h2>
//             <p className="text-slate-600">Quickly report this type of emergency</p>

//             <div className="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3 md:grid-cols-5">
//               {emergencies.map((e) => (
//                 <Link key={e.id} to={`/report/${e.id}`} className="p-5 text-left transition transform shadow rounded-2xl bg-gradient-to-br from-white to-slate-50 hover:shadow-lg hover:-translate-y-1">
//                   <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getColorGradient(e.id)} text-2xl`}>{e.emoji}</div>
//                   <div className="mt-3 font-semibold text-slate-800">{e.label}</div>
//                   <div className="mt-1 text-xs text-slate-500">Report {e.label.toLowerCase()}</div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* IMPACT SECTION */}
//         <section className="py-14 text-center bg-gradient-to-br from-[#f9fafc] to-[#e6eef8]">
//           <h2 className="mb-2 text-3xl font-bold text-slate-800">Our Impact</h2>
//           <p className="mb-10 text-slate-600">Together, we are making a difference in disaster response.</p>

//           {loading ? (
//             <div className="flex items-center justify-center py-8 text-slate-500">
//               <Loader2 className="mr-2 animate-spin" /> Loading impact data...
//             </div>
//           ) : (
//             <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto sm:grid-cols-3">
//               <ImpactCard number={stats?.totalReports || 0} label="Emergencies Reported" color="text-red-600" />
//               <ImpactCard number={stats?.totalUsers || 0} label="Total Connected Users" color="text-blue-600" />
//               <ImpactCard number={stats?.verifiedVolunteers || 0} label="Verified Volunteers" color="text-green-600" />
//             </div>
//           )}
//         </section>

//         {/* JOIN CTA */}
//         {!isVolunteer ? (
//           <section className="py-16 text-center bg-gradient-to-r from-[#E63946] to-[#1D3557] text-white rounded-t-3xl">
//             <h2 className="mb-3 text-3xl font-bold">Join the Mission</h2>
//             <p className="mb-6 text-lg opacity-90">
//               Become a volunteer, save lives, and be part of a global disaster relief movement.
//             </p>
//             <Link to="/volunteer-register" className="px-6 py-3 bg-white text-[#E63946] rounded-full font-semibold shadow hover:scale-105 transition-transform">
//               🚀 Sign Up as Volunteer
//             </Link>
//           </section>
//         ) : (
//           <section className="py-16 text-center bg-green-50 rounded-t-3xl">
//             <h2 className="mb-2 text-2xl font-bold text-green-700">🌟 Thank you for being a ResQNet Volunteer!</h2>
//             <p className="text-slate-600">Together, we make every rescue faster and more effective.</p>
//           </section>
//         )}

//         {/* FOOTER */}
//         <footer className="px-6 py-8 mx-auto text-sm max-w-7xl text-slate-500">
//           <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//             <div>© {new Date().getFullYear()} ResQNet • Built with ❤️</div>
//             <div className="flex gap-4">
//               <a className="hover:text-slate-700">Privacy</a>
//               <a className="hover:text-slate-700">Terms</a>
//               <a className="hover:text-slate-700">Contact</a>
//             </div>
//           </div>
//         </footer>

//         {/* MODAL */}
//         <ReportEmergencyModal show={showReportModal} onClose={() => setShowReportModal(false)} />
//       </main>
//     </div>
//   );
// }

// function ImpactCard({ number, label, color }) {
//   return (
//     <div className="p-6 text-center transition bg-white shadow rounded-2xl hover:shadow-lg">
//       <h3 className={`text-3xl font-bold ${color}`}>{number}</h3>
//       <p className="mt-2 font-medium text-slate-600">{label}</p>
//     </div>
//   );
// }

// function getColorGradient(id) {
//   switch (id) {
//     case "medical":
//       return "from-red-100 to-red-50";
//     case "fire":
//       return "from-orange-100 to-orange-50";
//     case "crime":
//       return "from-indigo-100 to-indigo-50";
//     case "shelter":
//       return "from-green-100 to-green-50";
//     case "disaster":
//       return "from-sky-100 to-sky-50";
//     default:
//       return "from-slate-100 to-slate-50";
//   }
// }




// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { AlertTriangle, MapPin, ListCheck, Loader2, Bell, User, Search, Menu, LogOut } from "lucide-react";
// import axiosInstance from "../api/axiosInstance";
// import ReportEmergencyModal from "../components/ReportEmergencyModal";

// /**
//  * HomePage.jsx — Modern Full-width Gradient UI (No Background Video)
//  * - Keeps backend logic, modal, routing, and stats functionality
//  * - Adds Logout functionality
//  */
// export default function HomePage() {
//   const [user, setUser] = useState(null);
//   const [isVolunteer, setIsVolunteer] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//     setIsVolunteer(storedUser?.volunteerRegistered || false);

//     const fetchStats = async () => {
//       try {
//         const res = await axiosInstance.get("/admin/stats");
//         if (res.data.success) setStats(res.data.data);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const emergencies = [
//     { emoji: "🏥", label: "Medical", id: "medical" },
//     { emoji: "🔥", label: "Fire", id: "fire" },
//     { emoji: "🚓", label: "Crime", id: "crime" },
//     { emoji: "🏠", label: "Shelter", id: "shelter" },
//     { emoji: "🌊", label: "Disaster", id: "disaster" },
//   ];

//   return (
//     <div className="min-h-screen text-slate-900 bg-gradient-to-br from-white via-slate-50 to-slate-100">
//       {/* Top Navigation */}
//       <header className="fixed left-0 right-0 z-30 top-4">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-sm bg-white/60 rounded-2xl border-white/60">
//             <div className="flex items-center gap-4">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E63946] to-[#1D3557] flex items-center justify-center text-white font-bold shadow">RQ</div>
//               <div>
//                 <div className="font-semibold">ResQNet</div>
//                 <div className="text-xs text-slate-600">Empathy meets Intelligence</div>
//               </div>
//             </div>

//             <div className="items-center hidden gap-4 md:flex">
//               <nav className="flex items-center gap-6 text-sm text-slate-700">
//                 <a className="hover:text-slate-900">How it works</a>
//                 <a className="hover:text-slate-900">Volunteer</a>
//                 <a className="hover:text-slate-900">Dashboard</a>
//               </nav>

//               <div className="flex items-center gap-3">
//                 <button className="px-4 py-2 rounded-full bg-[#E63946] text-white font-semibold shadow-sm">Donate</button>
//                 <button className="p-2 rounded-md hover:bg-slate-100"><Bell className="w-5 h-5" /></button>
//                 <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                   <User className="w-5 h-5 text-slate-700" />
//                   <div className="text-sm">{user?.name?.split(" ")?.[0] || "User"}</div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-[#E63946] rounded-full hover:bg-red-600 transition"
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

//       {/* HERO SECTION (Color Gradient, No Video) */}
//       <main className="pt-28">
//         <motion.section
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-gradient-to-r from-[#E63946] via-[#E63B7A] to-[#1D3557] text-white py-20 px-6 shadow-lg rounded-b-3xl"
//         >
//           <div className="grid items-center grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-2">
//             <div className="space-y-6">
//               <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-white/20">Live • Real-time Alerts</div>
//               <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
//                 Welcome, {user?.name || "User"} 👋<br />
//                 <span className="text-[#FFDDE1]">Empowering Communities. Saving Lives.</span>
//               </h1>
//               <p className="max-w-xl text-lg text-white/90">
//                 ResQNet connects volunteers, donors, and rescue teams with smart alerts, optimized logistics, and transparent reporting.
//               </p>

//               <div className="flex flex-wrap gap-4">
//                 <button
//                   onClick={() => setShowReportModal(true)}
//                   className="px-6 py-3 rounded-full bg-white text-[#E63946] font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
//                 >
//                   <AlertTriangle size={18} /> Report Emergency Now
//                 </button>

//                 <Link to="/find-resources" className="flex items-center gap-2 px-6 py-3 font-semibold text-white border border-white rounded-full hover:bg-white/10">
//                   <MapPin size={18} /> Find Resources
//                 </Link>

//                 <Link to="/track-incidents" className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-yellow-400 rounded-full shadow hover:bg-yellow-500">
//                   <ListCheck size={18} /> Track your incidents
//                 </Link>
//               </div>

//               <div className="flex flex-wrap gap-6 mt-8">
//                 <ImpactCard number={loading ? "..." : stats?.totalReports || 0} label="Emergencies Reported" color="text-white" />
//                 <ImpactCard number={loading ? "..." : stats?.totalUsers || 0} label="Connected Users" color="text-white" />
//                 <ImpactCard number={loading ? "..." : stats?.verifiedVolunteers || 0} label="Verified Volunteers" color="text-white" />
//               </div>
//             </div>

//             <div className="p-6 bg-white border shadow-2xl text-slate-900 rounded-2xl border-slate-100">
//               <h3 className="mb-4 text-xl font-bold">Quick Access</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {emergencies.slice(0, 4).map((f) => (
//                   <div key={f.id} className="flex items-center gap-3 p-3 shadow-sm rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md">
//                     <span className="text-2xl">{f.emoji}</span>
//                     <p className="text-sm font-semibold">{f.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </motion.section>

//         {/* TYPES OF EMERGENCIES */}
//         <section className="px-6 mx-auto max-w-7xl py-14">
//           <div className="p-6 bg-white shadow-sm rounded-2xl">
//             <h2 className="text-2xl font-bold text-slate-800">Types of Emergencies</h2>
//             <p className="text-slate-600">Quickly report this type of emergency</p>

//             <div className="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3 md:grid-cols-5">
//               {emergencies.map((e) => (
//                 <Link key={e.id} to={`/report/${e.id}`} className="p-5 text-left transition transform shadow rounded-2xl bg-gradient-to-br from-white to-slate-50 hover:shadow-lg hover:-translate-y-1">
//                   <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getColorGradient(e.id)} text-2xl`}>{e.emoji}</div>
//                   <div className="mt-3 font-semibold text-slate-800">{e.label}</div>
//                   <div className="mt-1 text-xs text-slate-500">Report {e.label.toLowerCase()}</div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* IMPACT SECTION */}
//         <section className="py-14 text-center bg-gradient-to-br from-[#f9fafc] to-[#e6eef8]">
//           <h2 className="mb-2 text-3xl font-bold text-slate-800">Our Impact</h2>
//           <p className="mb-10 text-slate-600">Together, we are making a difference in disaster response.</p>

//           {loading ? (
//             <div className="flex items-center justify-center py-8 text-slate-500">
//               <Loader2 className="mr-2 animate-spin" /> Loading impact data...
//             </div>
//           ) : (
//             <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto sm:grid-cols-3">
//               <ImpactCard number={stats?.totalReports || 0} label="Emergencies Reported" color="text-red-600" />
//               <ImpactCard number={stats?.totalUsers || 0} label="Total Connected Users" color="text-blue-600" />
//               <ImpactCard number={stats?.verifiedVolunteers || 0} label="Verified Volunteers" color="text-green-600" />
//             </div>
//           )}
//         </section>

//         {/* JOIN CTA */}
//         {!isVolunteer ? (
//           <section className="py-16 text-center bg-gradient-to-r from-[#E63946] to-[#1D3557] text-white rounded-t-3xl">
//             <h2 className="mb-3 text-3xl font-bold">Join the Mission</h2>
//             <p className="mb-6 text-lg opacity-90">
//               Become a volunteer, save lives, and be part of a global disaster relief movement.
//             </p>
//             <Link to="/volunteer-register" className="px-6 py-3 bg-white text-[#E63946] rounded-full font-semibold shadow hover:scale-105 transition-transform">
//               🚀 Sign Up as Volunteer
//             </Link>
//           </section>
//         ) : (
//           <section className="py-16 text-center bg-green-50 rounded-t-3xl">
//             <h2 className="mb-2 text-2xl font-bold text-green-700">🌟 Thank you for being a ResQNet Volunteer!</h2>
//             <p className="text-slate-600">Together, we make every rescue faster and more effective.</p>
//           </section>
//         )}

//         {/* FOOTER */}
//         <footer className="px-6 py-8 mx-auto text-sm max-w-7xl text-slate-500">
//           <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//             <div>© {new Date().getFullYear()} ResQNet • Built with ❤️</div>
//             <div className="flex gap-4">
//               <a className="hover:text-slate-700">Privacy</a>
//               <a className="hover:text-slate-700">Terms</a>
//               <a className="hover:text-slate-700">Contact</a>
//             </div>
//           </div>
//         </footer>

//         {/* MODAL */}
//         <ReportEmergencyModal show={showReportModal} onClose={() => setShowReportModal(false)} />
//       </main>
//     </div>
//   );
// }

// function ImpactCard({ number, label, color }) {
//   return (
//     <div className="p-6 text-center transition bg-white shadow rounded-2xl hover:shadow-lg">
//       <h3 className={`text-3xl font-bold ${color}`}>{number}</h3>
//       <p className="mt-2 font-medium text-slate-600">{label}</p>
//     </div>
//   );
// }

// function getColorGradient(id) {
//   switch (id) {
//     case "medical":
//       return "from-red-100 to-red-50";
//     case "fire":
//       return "from-orange-100 to-orange-50";
//     case "crime":
//       return "from-indigo-100 to-indigo-50";
//     case "shelter":
//       return "from-green-100 to-green-50";
//     case "disaster":
//       return "from-sky-100 to-sky-50";
//     default:
//       return "from-slate-100 to-slate-50";
//   }
// }



// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { AlertTriangle, MapPin, ListCheck, Loader2, Bell, User, Search, Menu, LogOut } from "lucide-react";
// import axiosInstance from "../api/axiosInstance";
// import ReportEmergencyModal from "../components/ReportEmergencyModal";

// export default function HomePage() {
//   const [user, setUser] = useState(null);
//   const [isVolunteer, setIsVolunteer] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//     setIsVolunteer(storedUser?.volunteerRegistered || false);

//     const fetchStats = async () => {
//       try {
//         const res = await axiosInstance.get("/admin/stats");
//         if (res.data.success) setStats(res.data.data);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     alert("You have been logged out successfully!");
//     navigate("/signup", { replace: true });
//   };

//   const getUserName = () => {
//     if (!user) return "User";
//     return user.name || user.username || "User";
//   };

//   const emergencies = [
//     { emoji: "🏥", label: "Medical", id: "medical" },
//     { emoji: "🔥", label: "Fire", id: "fire" },
//     { emoji: "🚓", label: "Crime", id: "crime" },
//     { emoji: "🏠", label: "Shelter", id: "shelter" },
//     { emoji: "🌊", label: "Disaster", id: "disaster" },
//   ];

//   return (
//     <div className="min-h-screen text-slate-900 bg-gradient-to-br from-white via-slate-50 to-slate-100">
//       <header className="fixed left-0 right-0 z-30 top-4">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-sm bg-white/60 rounded-2xl border-white/60">
//             <div className="flex items-center gap-4">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E63946] to-[#1D3557] flex items-center justify-center text-white font-bold shadow">RQ</div>
//               <div>
//                 <div className="font-semibold">ResQNet</div>
//                 <div className="text-xs text-slate-600">Empathy meets Intelligence</div>
//               </div>
//             </div>

//             <div className="items-center hidden gap-4 md:flex">
//               <nav className="flex items-center gap-6 text-sm text-slate-700">
//                 <a className="hover:text-slate-900">How it works</a>
//                 <a className="hover:text-slate-900">Volunteer</a>
//                 <a className="hover:text-slate-900">Dashboard</a>
//               </nav>

//               <div className="flex items-center gap-3">
//                 <button className="px-4 py-2 rounded-full bg-[#E63946] text-white font-semibold shadow-sm">Donate</button>
//                 <button className="p-2 rounded-md hover:bg-slate-100"><Bell className="w-5 h-5" /></button>
//                 <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                   <User className="w-5 h-5 text-slate-700" />
//                   <div className="text-sm">{getUserName()}</div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-[#E63946] rounded-full hover:bg-red-600 transition"
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

//       <main className="pt-28">
//         <motion.section
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-gradient-to-r from-[#E63946] via-[#E63B7A] to-[#1D3557] text-white py-20 px-6 shadow-lg rounded-b-3xl"
//         >
//           <div className="grid items-center grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-2">
//             <div className="space-y-6">
//               <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-white/20">Live • Real-time Alerts</div>
//               <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
//                 Welcome, {getUserName()} 👋<br />
//                 <span className="text-[#FFDDE1]">Empowering Communities. Saving Lives.</span>
//               </h1>
//               <p className="max-w-xl text-lg text-white/90">
//                 ResQNet connects volunteers, donors, and rescue teams with smart alerts, optimized logistics, and transparent reporting.
//               </p>

//               <div className="flex flex-wrap gap-4">
//                 <button
//                   onClick={() => setShowReportModal(true)}
//                   className="px-6 py-3 rounded-full bg-white text-[#E63946] font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
//                 >
//                   <AlertTriangle size={18} /> Report Emergency Now
//                 </button>

//                 <Link to="/find-resources" className="flex items-center gap-2 px-6 py-3 font-semibold text-white border border-white rounded-full hover:bg-white/10">
//                   <MapPin size={18} /> Find Resources
//                 </Link>

//                 <Link to="/track-incidents" className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-yellow-400 rounded-full shadow hover:bg-yellow-500">
//                   <ListCheck size={18} /> Track your incidents
//                 </Link>
//               </div>

//               {/* <div className="flex flex-wrap gap-6 mt-8">
//                 <ImpactCard number={loading ? "..." : stats?.totalReports || 0} label="Emergencies Reported" color="text-white" />
//                 <ImpactCard number={loading ? "..." : stats?.totalUsers || 0} label="Connected Users" color="text-white" />
//                 <ImpactCard number={loading ? "..." : stats?.verifiedVolunteers || 0} label="Verified Volunteers" color="text-white" />
//               </div> */}
//             </div>

//             <div className="p-6 bg-white border shadow-2xl text-slate-900 rounded-2xl border-slate-100">
//               <h3 className="mb-4 text-xl font-bold">Quick Access</h3>
//               <div className="grid grid-cols-2 gap-4">
//                 {emergencies.slice(0, 4).map((f) => (
//                   <div key={f.id} className="flex items-center gap-3 p-3 shadow-sm rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md">
//                     <span className="text-2xl">{f.emoji}</span>
//                     <p className="text-sm font-semibold">{f.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </motion.section>

//         {/* TYPES OF EMERGENCIES */}
//         <section className="px-6 mx-auto max-w-7xl py-14">
//           <div className="p-6 bg-white shadow-sm rounded-2xl">
//             <h2 className="text-2xl font-bold text-slate-800">Types of Emergencies</h2>
//             <p className="text-slate-600">Quickly report this type of emergency</p>

//             <div className="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3 md:grid-cols-5">
//               {emergencies.map((e) => (
//                 <Link key={e.id} to={`/report/${e.id}`} className="p-5 text-left transition transform shadow rounded-2xl bg-gradient-to-br from-white to-slate-50 hover:shadow-lg hover:-translate-y-1">
//                   <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getColorGradient(e.id)} text-2xl`}>{e.emoji}</div>
//                   <div className="mt-3 font-semibold text-slate-800">{e.label}</div>
//                   <div className="mt-1 text-xs text-slate-500">Report {e.label.toLowerCase()}</div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section className="py-14 text-center bg-gradient-to-br from-[#f9fafc] to-[#e6eef8]">
//           <h2 className="mb-2 text-3xl font-bold text-slate-800">Our Impact</h2>
//           <p className="mb-10 text-slate-600">Together, we are making a difference in disaster response.</p>

//           {loading ? (
//             <div className="flex items-center justify-center py-8 text-slate-500">
//               <Loader2 className="mr-2 animate-spin" /> Loading impact data...
//             </div>
//           ) : (
//             <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto sm:grid-cols-3">
//               <ImpactCard number={stats?.totalReports || 0} label="Emergencies Reported" color="text-red-600" />
//               <ImpactCard number={stats?.totalUsers || 0} label="Total Connected Users" color="text-blue-600" />
//               <ImpactCard number={stats?.verifiedVolunteers || 0} label="Verified Volunteers" color="text-green-600" />
//             </div>
//           )}
//         </section>

//         {!isVolunteer ? (
//           <section className="py-16 text-center bg-gradient-to-r from-[#E63946] to-[#1D3557] text-white rounded-t-3xl">
//             <h2 className="mb-3 text-3xl font-bold">Join the Mission</h2>
//             <p className="mb-6 text-lg opacity-90">
//               Become a volunteer, save lives, and be part of a global disaster relief movement.
//             </p>
//             <Link to="/volunteer-register" className="px-6 py-3 bg-white text-[#E63946] rounded-full font-semibold shadow hover:scale-105 transition-transform">
//               🚀 Sign Up as Volunteer
//             </Link>
//           </section>
//         ) : (
//           <section className="py-16 text-center bg-green-50 rounded-t-3xl">
//             <h2 className="mb-2 text-2xl font-bold text-green-700">🌟 Thank you for being a ResQNet Volunteer!</h2>
//             <p className="text-slate-600">Together, we make every rescue faster and more effective.</p>
//           </section>
//         )}

//         <footer className="px-6 py-8 mx-auto text-sm max-w-7xl text-slate-500">
//           <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//             <div>© {new Date().getFullYear()} ResQNet • Built with ❤️</div>
//             <div className="flex gap-4">
//               <a className="hover:text-slate-700">Privacy</a>
//               <a className="hover:text-slate-700">Terms</a>
//               <a className="hover:text-slate-700">Contact</a>
//             </div>
//           </div>
//         </footer>

//         <ReportEmergencyModal show={showReportModal} onClose={() => setShowReportModal(false)} />
//       </main>
//     </div>
//   );
// }

// function ImpactCard({ number, label, color }) {
//   return (
//     <div className="p-6 text-center transition bg-white shadow rounded-2xl hover:shadow-lg">
//       <h3 className={`text-3xl font-bold ${color}`}>{number}</h3>
//       <p className="mt-2 font-medium text-slate-600">{label}</p>
//     </div>
//   );
// }

// function getColorGradient(id) {
//   switch (id) {
//     case "medical":
//       return "from-red-100 to-red-50";
//     case "fire":
//       return "from-orange-100 to-orange-50";
//     case "crime":
//       return "from-indigo-100 to-indigo-50";
//     case "shelter":
//       return "from-green-100 to-green-50";
//     case "disaster":
//       return "from-sky-100 to-sky-50";
//     default:
//       return "from-slate-100 to-slate-50";
//   }
// }





// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   AlertTriangle,
//   MapPin,
//   ListCheck,
//   Loader2,
//   Bell,
//   User,
//   Search,
//   Menu,
//   LogOut,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import axiosInstance from "../api/axiosInstance";
// import ReportEmergencyModal from "../components/ReportEmergencyModal";

// export default function HomePage() {
//   const [user, setUser] = useState(null);
//   const [isVolunteer, setIsVolunteer] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);
//     setIsVolunteer(storedUser?.volunteerRegistered || false);

//     const fetchStats = async () => {
//       try {
//         const res = await axiosInstance.get("/admin/stats");
//         if (res.data.success) setStats(res.data.data);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
//     await new Promise((resolve) => setTimeout(resolve, 400)); // smooth animation delay

//     Swal.fire({
//       icon: "success",
//       title: "Logged out!",
//       text: "You have been logged out successfully.",
//       timer: 1500,
//       showConfirmButton: false,
//       background: "#fff",
//       color: "#333",
//     }).then(() => {
//       localStorage.removeItem("user");
//       localStorage.removeItem("access_token");
//       sessionStorage.clear();
//       navigate("/auth", { replace: true });
//     });
//   };

//   const getUserName = () => {
//     if (!user) return "User";
//     return user.name || user.username || "User";
//   };

//   const emergencies = [
//     { emoji: "🏥", label: "Medical", id: "medical" },
//     { emoji: "🔥", label: "Fire", id: "fire" },
//     { emoji: "🚓", label: "Crime", id: "crime" },
//     { emoji: "🏠", label: "Shelter", id: "shelter" },
//     { emoji: "🌊", label: "Disaster", id: "disaster" },
//   ];

//   return (
//     <AnimatePresence>
//       {!isLoggingOut && (
//         <motion.div
//           key="homepage"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0, scale: 0.98 }}
//           transition={{ duration: 0.5 }}
//           className="min-h-screen text-slate-900 bg-gradient-to-br from-white via-slate-50 to-slate-100"
//         >
//           {/* NAVBAR */}
//           <header className="fixed left-0 right-0 z-30 top-4">
//             <div className="px-6 mx-auto max-w-7xl">
//               <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-sm bg-white/60 rounded-2xl border-white/60">
//                 <div className="flex items-center gap-4">
//                   <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] flex items-center justify-center text-white font-bold shadow">
//                     RQ
//                   </div>
//                   <div>
//                     <div className="font-semibold">ResQNet</div>
//                     <div className="text-xs text-slate-600">
//                       Empathy meets Intelligence
//                     </div>
//                   </div>
//                 </div>

//                 <div className="items-center hidden gap-4 md:flex">
//                   <nav className="flex items-center gap-6 text-sm text-slate-700">
//                     <a className="hover:text-slate-900">How it works</a>
//                     <a className="hover:text-slate-900">Volunteer</a>
//                     <a className="hover:text-slate-900">Dashboard</a>
//                   </nav>

//                   <div className="flex items-center gap-3">
//                     <button className="px-4 py-2 rounded-full bg-[#FF3D4F] text-white font-semibold shadow-sm">
//                       Donate
//                     </button>
//                     <button className="p-2 rounded-md hover:bg-slate-100">
//                       <Bell className="w-5 h-5" />
//                     </button>
//                     <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                       <User className="w-5 h-5 text-slate-700" />
//                       <div className="text-sm">{getUserName()}</div>
//                     </div>

//                     {/* Logout Button */}
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] rounded-full hover:opacity-90 transition"
//                     >
//                       <LogOut size={16} /> Logout
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 md:hidden">
//                   <button className="p-2 bg-white rounded-md shadow-sm">
//                     <Search className="w-5 h-5" />
//                   </button>
//                   <button className="p-2 bg-white rounded-md shadow-sm">
//                     <Menu className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* HERO SECTION */}
//           <main className="pt-28">
//             <motion.section
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white py-20 px-6 shadow-lg rounded-b-3xl"
//             >
//               <div className="grid items-center grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-2">
//                 <div className="space-y-6">
//                   <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-white/20">
//                     Live • Real-time Alerts
//                   </div>
//                   <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
//                     Welcome, {getUserName()} 👋
//                     <br />
//                     <span className="text-[#FFDDE1]">
//                       Empowering Communities. Saving Lives.
//                     </span>
//                   </h1>
//                   <p className="max-w-xl text-lg text-white/90">
//                     ResQNet connects volunteers, donors, and rescue teams with
//                     smart alerts, optimized logistics, and transparent
//                     reporting.
//                   </p>

//                   <div className="flex flex-wrap gap-4">
//                     <button
//                       onClick={() => setShowReportModal(true)}
//                       className="px-6 py-3 rounded-full bg-white text-[#FF3D4F] font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
//                     >
//                       <AlertTriangle size={18} /> Report Emergency Now
//                     </button>

//                     <Link
//                       to="/find-resources"
//                       className="flex items-center gap-2 px-6 py-3 font-semibold text-white border border-white rounded-full hover:bg-white/10"
//                     >
//                       <MapPin size={18} /> Find Resources
//                     </Link>

//                     <Link
//                       to="/track-incidents"
//                       className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-yellow-400 rounded-full shadow hover:bg-yellow-500"
//                     >
//                       <ListCheck size={18} /> Track your incidents
//                     </Link>
//                   </div>
//                 </div>

//                 {/* QUICK ACCESS CARD */}
//                 <div className="p-6 bg-white border shadow-2xl text-slate-900 rounded-2xl border-slate-100">
//                   <h3 className="mb-4 text-xl font-bold">Quick Access</h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     {emergencies.slice(0, 4).map((f) => (
//                       <div
//                         key={f.id}
//                         className="flex items-center gap-3 p-3 shadow-sm rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md"
//                       >
//                         <span className="text-2xl">{f.emoji}</span>
//                         <p className="text-sm font-semibold">{f.label}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </motion.section>

//             {/* TYPES OF EMERGENCIES */}
//             <section className="px-6 mx-auto max-w-7xl py-14">
//               <div className="p-6 bg-white shadow-sm rounded-2xl">
//                 <h2 className="text-2xl font-bold text-slate-800">
//                   Types of Emergencies
//                 </h2>
//                 <p className="text-slate-600">
//                   Quickly report this type of emergency
//                 </p>

//                 <div className="grid grid-cols-2 gap-6 mt-6 sm:grid-cols-3 md:grid-cols-5">
//                   {emergencies.map((e) => (
//                     <Link
//                       key={e.id}
//                       to={`/report/${e.id}`}
//                       className="p-5 text-left transition transform shadow rounded-2xl bg-gradient-to-br from-white to-slate-50 hover:shadow-lg hover:-translate-y-1"
//                     >
//                       <div
//                         className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${getColorGradient(
//                           e.id
//                         )} text-2xl`}
//                       >
//                         {e.emoji}
//                       </div>
//                       <div className="mt-3 font-semibold text-slate-800">
//                         {e.label}
//                       </div>
//                       <div className="mt-1 text-xs text-slate-500">
//                         Report {e.label.toLowerCase()}
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* IMPACT SECTION */}
//             <section className="py-14 text-center bg-gradient-to-br from-[#f9fafc] to-[#e6eef8]">
//               <h2 className="mb-2 text-3xl font-bold text-slate-800">
//                 Our Impact
//               </h2>
//               <p className="mb-10 text-slate-600">
//                 Together, we are making a difference in disaster response.
//               </p>

//               {loading ? (
//                 <div className="flex items-center justify-center py-8 text-slate-500">
//                   <Loader2 className="mr-2 animate-spin" /> Loading impact
//                   data...
//                 </div>
//               ) : (
//                 <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto sm:grid-cols-3">
//                   <ImpactCard
//                     number={stats?.totalReports || 0}
//                     label="Emergencies Reported"
//                     color="text-red-600"
//                   />
//                   <ImpactCard
//                     number={stats?.totalUsers || 0}
//                     label="Total Connected Users"
//                     color="text-blue-600"
//                   />
//                   <ImpactCard
//                     number={stats?.verifiedVolunteers || 0}
//                     label="Verified Volunteers"
//                     color="text-green-600"
//                   />
//                 </div>
//               )}
//             </section>

//             {/* VOLUNTEER CTA */}
//             {!isVolunteer ? (
//               <section className="py-16 text-center bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white rounded-t-3xl">
//                 <h2 className="mb-3 text-3xl font-bold">Join the Mission</h2>
//                 <p className="mb-6 text-lg opacity-90">
//                   Become a volunteer, save lives, and be part of a global
//                   disaster relief movement.
//                 </p>
//                 <Link
//                   to="/volunteer-register"
//                   className="px-6 py-3 bg-white text-[#FF3D4F] rounded-full font-semibold shadow hover:scale-105 transition-transform"
//                 >
//                   🚀 Sign Up as Volunteer
//                 </Link>
//               </section>
//             ) : (
//               <section className="py-16 text-center bg-green-50 rounded-t-3xl">
//                 <h2 className="mb-2 text-2xl font-bold text-green-700">
//                   🌟 Thank you for being a ResQNet Volunteer!
//                 </h2>
//                 <p className="text-slate-600">
//                   Together, we make every rescue faster and more effective.
//                 </p>
//               </section>
//             )}

//             {/* FOOTER */}
//             <footer className="px-6 py-8 mx-auto text-sm max-w-7xl text-slate-500">
//               <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//                 <div>
//                   © {new Date().getFullYear()} ResQNet • Built with ❤️
//                 </div>
//                 <div className="flex gap-4">
//                   <a className="hover:text-slate-700">Privacy</a>
//                   <a className="hover:text-slate-700">Terms</a>
//                   <a className="hover:text-slate-700">Contact</a>
//                 </div>
//               </div>
//             </footer>

//             <ReportEmergencyModal
//               show={showReportModal}
//               onClose={() => setShowReportModal(false)}
//             />
//           </main>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// // Sub-components
// function ImpactCard({ number, label, color }) {
//   return (
//     <div className="p-6 text-center transition bg-white shadow rounded-2xl hover:shadow-lg">
//       <h3 className={`text-3xl font-bold ${color}`}>{number}</h3>
//       <p className="mt-2 font-medium text-slate-600">{label}</p>
//     </div>
//   );
// }

// function getColorGradient(id) {
//   switch (id) {
//     case "medical":
//       return "from-red-100 to-red-50";
//     case "fire":
//       return "from-orange-100 to-orange-50";
//     case "crime":
//       return "from-indigo-100 to-indigo-50";
//     case "shelter":
//       return "from-green-100 to-green-50";
//     case "disaster":
//       return "from-sky-100 to-sky-50";
//     default:
//       return "from-slate-100 to-slate-50";
//   }
// }





import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  MapPin,
  ListCheck,
  Loader2,
  Bell,
  User,
  Search,
  Menu,
  LogOut,
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import ReportEmergencyModal from "../components/ReportEmergencyModal";
import resqnetImage from "../pages/resqnet img.jpg";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setIsVolunteer(storedUser?.volunteerRegistered || false);

    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/admin/stats");
        if (res.data.success) setStats(res.data.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  const imgres="resqnet-frontend\resqnet-frontend\src\pages\resqnet img.jpg";
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "You have been logged out successfully.",
      timer: 1500,
      showConfirmButton: false,
      background: "#fff",
      color: "#333",
    }).then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      sessionStorage.clear();
      navigate("/", { replace: true });
    });
  };

  const getUserName = () => {
    if (!user) return "User";
    return user.name || user.username || "User";
  };

  const emergencies = [
    { emoji: "🏥", label: "Medical", id: "medical" },
    { emoji: "🔥", label: "Fire", id: "fire" },
    { emoji: "🚓", label: "Crime", id: "crime" },
    { emoji: "🏠", label: "Shelter", id: "shelter" },
    { emoji: "🌊", label: "Disaster", id: "disaster" },
  ];

  return (
    <AnimatePresence>
      {!isLoggingOut && (
        <motion.div
          key="homepage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen text-slate-900 bg-gradient-to-br from-white via-slate-50 to-slate-100"
        >
          {/* ✅ NAVBAR */}
          {/*  */}
          <header className="fixed top-0 left-0 right-0 z-50 py-4">
  <div className="px-8 mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between p-4 rounded-3xl shadow-2xl 
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
            {getUserName()}
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

          {/* ✅ HERO SECTION */}
          <main className="pt-28">
            <motion.section
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white py-20 px-6 shadow-lg rounded-b-3xl"
            >
              <div className="grid items-center grid-cols-1 gap-8 mx-auto max-w-7xl lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-white/20">
                    Live • Real-time Alerts
                  </div>
                  <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                    Welcome, {getUserName()} 👋
                    <br />
                    <span className="text-[#FFDDE1]">
                      Empowering Communities. Saving Lives.
                    </span>
                  </h1>
                  <p className="max-w-xl text-lg text-white/90">
                    ResQNet connects volunteers, donors, and rescue teams with
                    smart alerts, optimized logistics, and transparent
                    reporting.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="px-6 py-3 rounded-full bg-white text-[#FF3D4F] font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                    >
                      <AlertTriangle size={18} /> Report Emergency Now
                    </button>

                    <Link
                      to="/find-resources"
                      className="flex items-center gap-2 px-6 py-3 font-semibold text-white border border-white rounded-full hover:bg-white/10"
                    >
                      <MapPin size={18} /> Find Resources
                    </Link>

                    <Link
                      to="/track-incidents"
                      className="flex items-center gap-2 px-6 py-3 font-semibold text-black bg-yellow-400 rounded-full shadow hover:bg-yellow-500"
                    >
                      <ListCheck size={18} /> Track your incidents
                    </Link>
                  </div>
                </div>

                {/* Quick Access Card */}
                <div className="p-6 bg-white border shadow-2xl text-slate-900 rounded-2xl border-slate-100">
                  <h3 className="mb-4 text-xl font-bold">Quick Access</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {emergencies.slice(0, 4).map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center gap-3 p-3 shadow-sm rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md"
                      >
                        <span className="text-2xl">{f.emoji}</span>
                        <p className="text-sm font-semibold">{f.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ✅ IMPACT SECTION */}
            <section className="py-14 text-center bg-gradient-to-br from-[#f9fafc] to-[#e6eef8]">
              <h2 className="mb-2 text-3xl font-bold text-slate-800">
                Our Impact
              </h2>
              <p className="mb-10 text-slate-600">
                Together, we are making a difference in disaster response.
              </p>

              {loading ? (
                <div className="flex items-center justify-center py-8 text-slate-500">
                  <Loader2 className="mr-2 animate-spin" /> Loading impact
                  data...
                </div>
              ) : (
                <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto sm:grid-cols-3">
                  <ImpactCard
                    number={stats?.totalReports || 0}
                    label="Emergencies Reported"
                    color="text-red-600"
                  />
                  <ImpactCard
                    number={stats?.totalUsers || 0}
                    label="Total Connected Users"
                    color="text-blue-600"
                  />
                  <ImpactCard
                    number={stats?.verifiedVolunteers || 0}
                    label="Verified Volunteers"
                    color="text-green-600"
                  />
                </div>
              )}
            </section>

            {/* ✅ VOLUNTEER CTA */}
            {!isVolunteer ? (
              <section className="py-16 text-center bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white rounded-t-3xl">
                <h2 className="mb-3 text-3xl font-bold">Join the Mission</h2>
                <p className="mb-6 text-lg opacity-90">
                  Become a volunteer, save lives, and be part of a global
                  disaster relief movement.
                </p>
                <Link
                  to="/volunteer-portal"
                  className="px-6 py-3 bg-white text-[#FF3D4F] rounded-full font-semibold shadow hover:scale-105 transition-transform"
                >
                  🚀 Sign Up as Volunteer
                </Link>
              </section>
            ) : (
              <section className="py-16 text-center bg-green-50 rounded-t-3xl">
                <h2 className="mb-2 text-2xl font-bold text-green-700">
                  🌟 Thank you for being a ResQNet Volunteer!
                </h2>
                <p className="text-slate-600">
                  Together, we make every rescue faster and more effective.
                </p>
              </section>
            )}

            {/* ✅ FOOTER */}
            <footer className="px-6 py-8 mx-auto text-sm max-w-7xl text-slate-500">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div>© {new Date().getFullYear()} ResQNet • Built with ❤️</div>
                <div className="flex gap-4">
                  <a className="hover:text-slate-700">Privacy</a>
                  <a className="hover:text-slate-700">Terms</a>
                  <a className="hover:text-slate-700">Contact</a>
                </div>
              </div>
            </footer>

            <ReportEmergencyModal
              show={showReportModal}
              onClose={() => setShowReportModal(false)}
            />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Sub-Components */
function ImpactCard({ number, label, color }) {
  return (
    <div className="p-6 text-center transition bg-white shadow rounded-2xl hover:shadow-lg">
      <h3 className={`text-3xl font-bold ${color}`}>{number}</h3>
      <p className="mt-2 font-medium text-slate-600">{label}</p>
    </div>
  );
}