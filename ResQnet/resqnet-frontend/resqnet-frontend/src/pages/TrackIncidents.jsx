// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import axiosInstance from "../api/axiosInstance";
// import {
//     Loader2,
//     Calendar,
//     User,
//     Info,
//     MapPin,
//     X,
//     AlertCircle,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function TrackIncidents() {
//     const [reports, setReports] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedReport, setSelectedReport] = useState(null);

//     // 🧠 Get logged-in user from localStorage
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         const localUser = localStorage.getItem("user");
//         if (localUser) {
//             setCurrentUser(JSON.parse(localUser));
//         }
//     }, []);

//     useEffect(() => {
//         const fetchReports = async () => {
//             try {
//                 const res = await axiosInstance.get("/reports");
//                 if (res.data.success) {
//                     let allReports = res.data.data;

//                     // ✅ Fix: Only show reports created by current user
//                     if (currentUser?._id) {
//                         allReports = allReports.filter(
//                             (r) => r.reporter?._id === currentUser._id
//                         );
//                     }

//                     setReports(allReports);
//                 }
//             } catch (err) {
//                 console.error("Error fetching reports:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (currentUser) fetchReports();
//     }, [currentUser]);

//     // 🎨 Styling helpers (same as before)
//     const getPriorityStyle = (priority) => {
//         switch (priority?.toLowerCase()) {
//             case "high":
//                 return "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md";
//             case "medium":
//                 return "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md";
//             case "low":
//                 return "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md";
//             default:
//                 return "bg-gray-200 text-gray-700";
//         }
//     };

//     const getStatusStyle = (status) => {
//         switch (status?.toLowerCase()) {
//             case "pending":
//                 return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md";
//             case "assigned":
//                 return "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md";
//             case "resolved":
//                 return "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md";
//             default:
//                 return "bg-gray-200 text-gray-700";
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             <Sidebar />

//             <div className="flex-1 p-8 ml-64 overflow-y-auto">
//                 <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
//                     🧾 Track Your Incidents
//                 </h1>
//                 <p className="mb-10 text-base text-gray-600">
//                     View and monitor the progress of your reported emergencies.
//                 </p>

//                 {/* Loader */}
//                 {loading ? (
//                     <div className="flex items-center justify-center text-gray-500 h-60">
//                         <Loader2 className="mr-2 animate-spin" /> Loading your reports...
//                     </div>
//                 ) : reports.length === 0 ? (
//                     <div className="flex flex-col items-center mt-10 text-center text-gray-500">
//                         <AlertCircle className="mb-2 text-gray-400" size={32} />
//                         No reports found yet.
//                     </div>
//                 ) : (
//                     <div className="space-y-6">
//                         {reports.map((report) => (
//                             <motion.div
//                                 key={report._id}
//                                 initial={{ opacity: 0, y: 15 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3 }}
//                                 className="p-6 transition-all duration-300 border border-gray-200 shadow-lg rounded-2xl bg-gradient-to-r from-rose-100 via-purple-100 to-blue-100 hover:shadow-xl backdrop-blur-md"
//                             >
//                                 <div className="flex items-start justify-between mb-4">
//                                     <div>
//                                         <h2 className="text-2xl font-semibold leading-tight text-gray-900 capitalize">
//                                             {report.emergencyType || "Unknown Incident"}
//                                         </h2>
//                                         <p className="max-w-2xl mt-1 text-sm font-medium text-gray-700">
//                                             {report.text || "No description provided."}
//                                         </p>
//                                     </div>

//                                     <div className="flex flex-col items-end gap-2">
//                                         <span
//                                             className={`text-xs px-3 py-1 rounded-full font-semibold ${getPriorityStyle(
//                                                 report.priorityLevel
//                                             )}`}
//                                         >
//                                             Priority: {report.priorityLevel}
//                                         </span>
//                                         <span
//                                             className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(
//                                                 report.status
//                                             )}`}
//                                         >
//                                             {report.status}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {report.address && (
//                                     <p className="flex items-center gap-1 mb-2 text-sm font-medium text-gray-800">
//                                         <MapPin size={14} className="text-blue-500" />
//                                         {report.address}
//                                     </p>
//                                 )}
//                                 <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
//                                     <User size={16} className="text-gray-500" />
//                                     {report.assignedVolunteer
//                                         ? `Assigned to ${report.assignedVolunteer.name}`
//                                         : "Not assigned yet"}
//                                 </div>

//                                 <div className="flex items-center justify-between mt-4">
//                                     <div className="flex items-center gap-2 text-xs text-gray-600">
//                                         <Calendar size={14} />
//                                         {new Date(report.createdAt).toLocaleString()}
//                                     </div>

//                                     <button
//                                         onClick={() => setSelectedReport(report)}
//                                         className="flex items-center gap-1 text-sm bg-white text-blue-600 border border-blue-300 font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:bg-blue-50 transition-all duration-200"
//                                     >
//                                         <Info size={14} /> View Details
//                                     </button>
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Modal unchanged */}
//             <AnimatePresence>
//                 {selectedReport && (
//                     <motion.div
//                         className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                     >
//                         <motion.div
//                             initial={{ y: 60, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             exit={{ y: 60, opacity: 0 }}
//                             transition={{ duration: 0.35, type: "spring" }}
//                             className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative border border-gray-200"
//                         >
//                             <button
//                                 className="absolute text-gray-500 transition top-3 right-3 hover:text-red-500"
//                                 onClick={() => setSelectedReport(null)}
//                             >
//                                 <X size={22} />
//                             </button>

//                             <h2 className="mb-5 text-2xl font-bold tracking-tight text-center text-gray-800">
//                                 Report Details
//                             </h2>

//                             <div className="space-y-3 text-sm font-medium leading-relaxed text-gray-800">
//                                 <p>
//                                     <strong>Reporter:</strong> {selectedReport.reporter?.name} (
//                                     {selectedReport.reporter?.email})
//                                 </p>
//                                 <p>
//                                     <strong>Emergency Type:</strong>{" "}
//                                     {selectedReport.emergencyType}
//                                 </p>
//                                 <p>
//                                     <strong>Priority:</strong>{" "}
//                                     <span
//                                         className={`px-2 py-0.5 rounded ${getPriorityStyle(
//                                             selectedReport.priorityLevel
//                                         )}`}
//                                     >
//                                         {selectedReport.priorityLevel}
//                                     </span>
//                                 </p>
//                                 <p>
//                                     <strong>Status:</strong>{" "}
//                                     <span
//                                         className={`px-2 py-0.5 rounded ${getStatusStyle(
//                                             selectedReport.status
//                                         )}`}
//                                     >
//                                         {selectedReport.status}
//                                     </span>
//                                 </p>
//                                 <p>
//                                     <strong>Address:</strong> {selectedReport.address}
//                                 </p>

//                                 {selectedReport.requiredSupplies?.length > 0 && (
//                                     <p>
//                                         <strong>Supplies Needed:</strong>{" "}
//                                         {selectedReport.requiredSupplies.join(", ")}
//                                     </p>
//                                 )}

//                                 {selectedReport.assignedVolunteer && (
//                                     <p>
//                                         <strong>Assigned Volunteer:</strong>{" "}
//                                         {selectedReport.assignedVolunteer.name} (
//                                         {selectedReport.assignedVolunteer.email}
//                                         {selectedReport.assignedVolunteer.phone
//                                             ? `, ${selectedReport.assignedVolunteer.phone}`
//                                             : ""}
//                                         )
//                                     </p>
//                                 )}
//                             </div>

//                             <div className="mt-6 text-center">
//                                 <motion.button
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     className="px-5 py-2 font-semibold text-white transition rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg"
//                                     onClick={() => setSelectedReport(null)}
//                                 >
//                                     Close
//                                 </motion.button>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// }





// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import axiosInstance from "../api/axiosInstance";
// import {
//   Loader2,
//   Calendar,
//   User,
//   Info,
//   MapPin,
//   X,
//   AlertCircle,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function TrackIncidents() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const localUser = localStorage.getItem("user");
//     if (localUser) {
//       setCurrentUser(JSON.parse(localUser));
//     }
//   }, []);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const res = await axiosInstance.get("/reports");
//         if (res.data.success) {
//           let allReports = res.data.data;
//           if (currentUser?._id) {
//             allReports = allReports.filter(
//               (r) => r.reporter?._id === currentUser._id
//             );
//           }
//           setReports(allReports);
//         }
//       } catch (err) {
//         console.error("Error fetching reports:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (currentUser) fetchReports();
//   }, [currentUser]);

//   const getPriorityStyle = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case "high":
//         return "from-red-500 to-red-600";
//       case "medium":
//         return "from-orange-400 to-orange-500";
//       case "low":
//         return "from-green-500 to-green-600";
//       default:
//         return "from-gray-300 to-gray-400";
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "from-yellow-400 to-yellow-500";
//       case "assigned":
//         return "from-blue-500 to-blue-600";
//       case "resolved":
//         return "from-emerald-500 to-emerald-600";
//       default:
//         return "from-gray-300 to-gray-400";
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-[#E63946] via-[#E63B7A] to-[#1D3557] text-white">
//       <Sidebar />

//       <div className="flex-1 p-8 ml-64 overflow-y-auto">
//         <div className="mb-12 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl font-extrabold"
//           >
//             🧾 Track Your Incidents
//           </motion.h1>
//           <p className="mt-2 text-white/90">
//             View and monitor the progress of your reported emergencies.
//           </p>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center h-60 text-white/80">
//             <Loader2 className="mr-2 animate-spin" /> Loading your reports...
//           </div>
//         ) : reports.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex flex-col items-center mt-10 text-center text-white/80"
//           >
//             <AlertCircle className="mb-2 text-white/60" size={32} />
//             No reports found yet.
//           </motion.div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {reports.map((report) => (
//               <motion.div
//                 key={report._id}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:scale-[1.02] transition-transform"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h2 className="text-xl font-bold capitalize">
//                       {report.emergencyType || "Unknown Incident"}
//                     </h2>
//                     <p className="mt-1 text-sm text-white/80">
//                       {report.text || "No description provided."}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityStyle(
//                         report.priorityLevel
//                       )} text-white font-semibold`}
//                     >
//                       Priority: {report.priorityLevel}
//                     </span>
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getStatusStyle(
//                         report.status
//                       )} text-white font-semibold`}
//                     >
//                       {report.status}
//                     </span>
//                   </div>
//                 </div>

//                 {report.address && (
//                   <p className="flex items-center gap-1 mb-2 text-sm font-medium text-white/90">
//                     <MapPin size={14} className="text-yellow-300" />
//                     {report.address}
//                   </p>
//                 )}
//                 <div className="flex items-center gap-2 mb-2 text-sm text-white/80">
//                   <User size={16} className="text-white/70" />
//                   {report.assignedVolunteer
//                     ? `Assigned to ${report.assignedVolunteer.name}`
//                     : "Not assigned yet"}
//                 </div>

//                 <div className="flex items-center justify-between mt-4 text-sm">
//                   <div className="flex items-center gap-2 text-white/60">
//                     <Calendar size={14} />
//                     {new Date(report.createdAt).toLocaleString()}
//                   </div>

//                   <button
//                     onClick={() => setSelectedReport(report)}
//                     className="flex items-center gap-1 text-sm bg-white text-[#1D3557] font-semibold px-3 py-1.5 rounded-lg shadow hover:bg-gray-100 transition-all"
//                   >
//                     <Info size={14} /> View Details
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedReport && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-gradient-to-br from-white via-slate-50 to-slate-100 text-gray-800 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative border border-slate-200"
//             >
//               <button
//                 className="absolute text-gray-500 transition top-3 right-3 hover:text-red-600"
//                 onClick={() => setSelectedReport(null)}
//               >
//                 <X size={22} />
//               </button>

//               <h2 className="text-2xl font-bold text-center mb-6 text-[#1D3557]">
//                 Report Details
//               </h2>

//               <div className="space-y-3 text-sm font-medium">
//                 <p>
//                   <strong>Reporter:</strong> {selectedReport.reporter?.name} (
//                   {selectedReport.reporter?.email})
//                 </p>
//                 <p>
//                   <strong>Emergency Type:</strong>{" "}
//                   {selectedReport.emergencyType}
//                 </p>
//                 <p>
//                   <strong>Priority:</strong>{" "}
//                   <span
//                     className={`px-2 py-0.5 rounded text-white bg-gradient-to-r ${getPriorityStyle(
//                       selectedReport.priorityLevel
//                     )}`}
//                   >
//                     {selectedReport.priorityLevel}
//                   </span>
//                 </p>
//                 <p>
//                   <strong>Status:</strong>{" "}
//                   <span
//                     className={`px-2 py-0.5 rounded text-white bg-gradient-to-r ${getStatusStyle(
//                       selectedReport.status
//                     )}`}
//                   >
//                     {selectedReport.status}
//                   </span>
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {selectedReport.address}
//                 </p>

//                 {selectedReport.requiredSupplies?.length > 0 && (
//                   <p>
//                     <strong>Supplies Needed:</strong>{" "}
//                     {selectedReport.requiredSupplies.join(", ")}
//                   </p>
//                 )}

//                 {selectedReport.assignedVolunteer && (
//                   <p>
//                     <strong>Assigned Volunteer:</strong>{" "}
//                     {selectedReport.assignedVolunteer.name} (
//                     {selectedReport.assignedVolunteer.email}
//                     {selectedReport.assignedVolunteer.phone
//                       ? `, ${selectedReport.assignedVolunteer.phone}`
//                       : ""}
//                     )
//                   </p>
//                 )}
//               </div>

//               <div className="mt-6 text-center">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-6 py-2 bg-gradient-to-r from-[#E63946] to-[#1D3557] text-white rounded-lg shadow-md hover:shadow-lg transition"
//                   onClick={() => setSelectedReport(null)}
//                 >
//                   Close
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import {
//   Loader2,
//   Calendar,
//   User,
//   Info,
//   MapPin,
//   X,
//   AlertCircle,
//   Bell,
//   Search,
//   Menu,
//   LogOut,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function TrackIncidents() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const localUser = localStorage.getItem("user");
//     if (localUser) setCurrentUser(JSON.parse(localUser));
//   }, []);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const res = await axiosInstance.get("/reports");
//         if (res.data.success) {
//           let allReports = res.data.data;
//           if (currentUser?._id) {
//             allReports = allReports.filter(
//               (r) => r.reporter?._id === currentUser._id
//             );
//           }
//           setReports(allReports);
//         }
//       } catch (err) {
//         console.error("Error fetching reports:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (currentUser) fetchReports();
//   }, [currentUser]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     alert("You have been logged out successfully!");
//     navigate("/signup", { replace: true });
//   };

//   const getUserName = () => {
//     if (!currentUser) return "User";
//     return currentUser.name || currentUser.username || "User";
//   };

//   const getPriorityStyle = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case "high":
//         return "from-red-400 to-red-500";
//       case "medium":
//         return "from-orange-300 to-orange-400";
//       case "low":
//         return "from-green-400 to-green-500";
//       default:
//         return "from-gray-200 to-gray-300";
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "from-yellow-300 to-yellow-400";
//       case "assigned":
//         return "from-blue-400 to-blue-500";
//       case "resolved":
//         return "from-emerald-400 to-emerald-500";
//       default:
//         return "from-gray-300 to-gray-400";
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden text-gray-800 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
//       {/* Floating Gradient Orbs */}
//       <div className="absolute inset-0 overflow-hidden -z-10">
//         <div className="orb orb1"></div>
//         <div className="orb orb2"></div>
//         <div className="orb orb3"></div>
//       </div>

//       {/* HEADER */}
//       <header className="fixed left-0 right-0 z-30 top-4">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-lg bg-white/70 rounded-2xl border-white/40">
//             <div className="flex items-center gap-4">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E63946] to-[#1D3557] flex items-center justify-center text-white font-bold shadow">
//                 RQ
//               </div>
//               <div>
//                 <div className="font-semibold text-slate-800">ResQNet</div>
//                 <div className="text-xs text-slate-600">
//                   Empathy meets Intelligence
//                 </div>
//               </div>
//             </div>

//             <div className="items-center hidden gap-4 md:flex">
//               <nav className="flex items-center gap-6 text-sm text-slate-700">
//                 <a className="cursor-pointer hover:text-slate-900">How it works</a>
//                 <a className="cursor-pointer hover:text-slate-900">Volunteer</a>
//                 <a className="cursor-pointer hover:text-slate-900">Dashboard</a>
//               </nav>

//               <div className="flex items-center gap-3">
//                 <button className="px-4 py-2 rounded-full bg-[#E63946] text-white font-semibold shadow-sm">
//                   Donate
//                 </button>
//                 <button className="p-2 rounded-md hover:bg-slate-100">
//                   <Bell className="w-5 h-5" />
//                 </button>
//                 <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                   <User className="w-5 h-5 text-slate-700" />
//                   <div className="text-sm text-slate-800">{getUserName()}</div>
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
//               <button className="p-2 bg-white rounded-md shadow-sm">
//                 <Search className="w-5 h-5" />
//               </button>
//               <button className="p-2 bg-white rounded-md shadow-sm">
//                 <Menu className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main className="px-6 mx-auto pt-28 max-w-7xl">
//         <div className="mb-10 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl font-extrabold text-slate-800"
//           >
//             🧾 Track Your Incidents
//           </motion.h1>
//           <p className="mt-2 text-slate-600">
//             View and monitor the progress of your reported emergencies.
//           </p>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center h-60 text-slate-500">
//             <Loader2 className="mr-2 animate-spin" /> Loading your reports...
//           </div>
//         ) : reports.length === 0 ? (
//           <div className="flex flex-col items-center mt-10 text-center text-slate-500">
//             <AlertCircle className="mb-2 text-slate-400" size={32} />
//             No reports found yet.
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {reports.map((report) => (
//               <motion.div
//                 key={report._id}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-6 transition border shadow-lg rounded-2xl bg-white/60 backdrop-blur-lg border-white/30 hover:shadow-xl hover:-translate-y-1"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h2 className="text-xl font-bold capitalize text-slate-800">
//                       {report.emergencyType || "Unknown Incident"}
//                     </h2>
//                     <p className="mt-1 text-sm text-slate-600">
//                       {report.text || "No description provided."}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityStyle(
//                         report.priorityLevel
//                       )} text-white font-semibold`}
//                     >
//                       Priority: {report.priorityLevel}
//                     </span>
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getStatusStyle(
//                         report.status
//                       )} text-white font-semibold`}
//                     >
//                       {report.status}
//                     </span>
//                   </div>
//                 </div>

//                 {report.address && (
//                   <p className="flex items-center gap-1 mb-2 text-sm font-medium text-slate-700">
//                     <MapPin size={14} className="text-blue-500" />
//                     {report.address}
//                   </p>
//                 )}
//                 <div className="flex items-center gap-2 mb-2 text-sm text-slate-700">
//                   <User size={16} className="text-slate-500" />
//                   {report.assignedVolunteer
//                     ? `Assigned to ${report.assignedVolunteer.name}`
//                     : "Not assigned yet"}
//                 </div>

//                 <div className="flex items-center justify-between mt-4 text-sm">
//                   <div className="flex items-center gap-2 text-slate-500">
//                     <Calendar size={14} />
//                     {new Date(report.createdAt).toLocaleString()}
//                   </div>

//                   <button
//                     onClick={() => setSelectedReport(report)}
//                     className="flex items-center gap-1 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-3 py-1.5 rounded-lg shadow hover:opacity-90 transition"
//                   >
//                     <Info size={14} /> View Details
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Floating Orbs Animation */}
//       <style jsx>{`
//         .orb {
//           position: absolute;
//           width: 400px;
//           height: 400px;
//           border-radius: 50%;
//           filter: blur(100px);
//           opacity: 0.4;
//           animation: floatOrb 15s ease-in-out infinite alternate;
//         }
//         .orb1 {
//           background: radial-gradient(circle, #93c5fd, transparent 60%);
//           top: 10%;
//           left: 5%;
//           animation-delay: 0s;
//         }
//         .orb2 {
//           background: radial-gradient(circle, #e9d5ff, transparent 60%);
//           top: 40%;
//           left: 60%;
//           animation-delay: 3s;
//         }
//         .orb3 {
//           background: radial-gradient(circle, #c7d2fe, transparent 60%);
//           bottom: 10%;
//           right: 10%;
//           animation-delay: 6s;
//         }
//         @keyframes floatOrb {
//           0% {
//             transform: translateY(0px) translateX(0px);
//           }
//           100% {
//             transform: translateY(-40px) translateX(40px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import {
//   Loader2,
//   Calendar,
//   User,
//   Info,
//   MapPin,
//   AlertCircle,
//   Bell,
//   Search,
//   Menu,
//   LogOut,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import resqnetImage from "../pages/resqnet img.jpg";

// export default function TrackIncidents() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const localUser = localStorage.getItem("user");
//     if (localUser) setCurrentUser(JSON.parse(localUser));
//   }, []);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const res = await axiosInstance.get("/reports");
//         if (res.data.success) {
//           let allReports = res.data.data;
//           if (currentUser?._id) {
//             allReports = allReports.filter(
//               (r) => r.reporter?._id === currentUser._id
//             );
//           }
//           setReports(allReports);
//         }
//       } catch (err) {
//         console.error("Error fetching reports:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (currentUser) fetchReports();
//   }, [currentUser]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     navigate("/auth", { replace: true });
//   };

//   const getUserName = () => {
//     if (!currentUser) return "User";
//     return currentUser.name || currentUser.username || "User";
//   };

//   const getPriorityStyle = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case "high":
//         return "from-red-400 to-red-500";
//       case "medium":
//         return "from-orange-300 to-orange-400";
//       case "low":
//         return "from-green-400 to-green-500";
//       default:
//         return "from-gray-200 to-gray-300";
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "from-yellow-300 to-yellow-400";
//       case "assigned":
//         return "from-blue-400 to-blue-500";
//       case "resolved":
//         return "from-emerald-400 to-emerald-500";
//       default:
//         return "from-gray-300 to-gray-400";
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden text-gray-800 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
//       {/* Floating Gradient Orbs */}
//       <div className="absolute inset-0 overflow-hidden -z-10">
//         <div className="orb orb1"></div>
//         <div className="orb orb2"></div>
//         <div className="orb orb3"></div>
//       </div>

//       {/* HEADER */}
//       <header className="fixed left-0 right-0 z-30 top-4">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-lg bg-white/70 rounded-2xl border-white/40">
//             {/* Logo */}
//             <div className="flex items-center gap-4">
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] flex items-center justify-center text-white font-bold shadow">
//                 <img className="rounded-full"src={resqnetImage} alt="" />
//               </div>
//               <div>
//                 <div className="font-semibold text-slate-800">ResQNet</div>
//                 <div className="text-xs text-slate-600">
//                   Empathy meets Intelligence
//                 </div>
//               </div>
//             </div>

//             {/* ✅ Navigation Links */}
//             <div className="items-center hidden gap-4 md:flex">
//               <nav className="flex items-center gap-6 text-sm text-slate-700">
//                 <Link
//                   to="/how-it-works"
//                   className={`hover:text-slate-900 ${
//                     location.pathname === "/how-it-works"
//                       ? "text-[#FF3D4F] font-semibold"
//                       : ""
//                   }`}
//                 >
//                   How it works
//                 </Link>
//                 <Link
//                   to="/volunteer-portal"
//                   className={`hover:text-slate-900 ${
//                     location.pathname === "/volunteer-portal"
//                       ? "text-[#FF3D4F] font-semibold"
//                       : ""
//                   }`}
//                 >
//                   Volunteer
//                 </Link>
//                 <Link
//                   to="/home"
//                   className={`hover:text-slate-900 ${
//                     location.pathname === "/home"
//                       ? "text-[#FF3D4F] font-semibold"
//                       : ""
//                   }`}
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/donate"
//                   className={`hover:text-slate-900 ${
//                     location.pathname === "/donate"
//                       ? "text-[#FF3D4F] font-semibold"
//                       : ""
//                   }`}
//                 >
//                   Donate
//                 </Link>
//               </nav>

//               {/* Right Icons */}
//               <div className="flex items-center gap-3">
//                 <button className="p-2 rounded-md hover:bg-slate-100">
//                   <Bell className="w-5 h-5" />
//                 </button>
//                 <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                   <User className="w-5 h-5 text-slate-700" />
//                   <div className="text-sm text-slate-800">{getUserName()}</div>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] rounded-full hover:opacity-90 transition"
//                 >
//                   <LogOut size={16} /> Logout
//                 </button>
//               </div>
//             </div>

//             {/* Mobile menu */}
//             <div className="flex items-center gap-2 md:hidden">
//               <button className="p-2 bg-white rounded-md shadow-sm">
//                 <Search className="w-5 h-5" />
//               </button>
//               <button className="p-2 bg-white rounded-md shadow-sm">
//                 <Menu className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main className="px-6 mx-auto pt-28 max-w-7xl">
//         <div className="mb-10 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl font-extrabold text-slate-800"
//           >
//             🧾 Track Your Incidents
//           </motion.h1>
//           <p className="mt-2 text-slate-600">
//             View and monitor the progress of your reported emergencies.
//           </p>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center h-60 text-slate-500">
//             <Loader2 className="mr-2 animate-spin" /> Loading your reports...
//           </div>
//         ) : reports.length === 0 ? (
//           <div className="flex flex-col items-center mt-10 text-center text-slate-500">
//             <AlertCircle className="mb-2 text-slate-400" size={32} />
//             No reports found yet.
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {reports.map((report) => (
//               <motion.div
//                 key={report._id}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-6 transition border shadow-lg rounded-2xl bg-white/60 backdrop-blur-lg border-white/30 hover:shadow-xl hover:-translate-y-1"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h2 className="text-xl font-bold capitalize text-slate-800">
//                       {report.emergencyType || "Unknown Incident"}
//                     </h2>
//                     <p className="mt-1 text-sm text-slate-600">
//                       {report.text || "No description provided."}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityStyle(
//                         report.priorityLevel
//                       )} text-white font-semibold`}
//                     >
//                       Priority: {report.priorityLevel}
//                     </span>
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getStatusStyle(
//                         report.status
//                       )} text-white font-semibold`}
//                     >
//                       {report.status}
//                     </span>
//                   </div>
//                 </div>

//                 {report.address && (
//                   <p className="flex items-center gap-1 mb-2 text-sm font-medium text-slate-700">
//                     <MapPin size={14} className="text-blue-500" />
//                     {report.address}
//                   </p>
//                 )}
//                 <div className="flex items-center gap-2 mb-2 text-sm text-slate-700">
//                   <User size={16} className="text-slate-500" />
//                   {report.assignedVolunteer
//                     ? `Assigned to ${report.assignedVolunteer.name}`
//                     : "Not assigned yet"}
//                 </div>

//                 <div className="flex items-center justify-between mt-4 text-sm">
//                   <div className="flex items-center gap-2 text-slate-500">
//                     <Calendar size={14} />
//                     {new Date(report.createdAt).toLocaleString()}
//                   </div>

//                   <button
//                     onClick={() => setSelectedReport(report)}
//                     className="flex items-center gap-1 text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-3 py-1.5 rounded-lg shadow hover:opacity-90 transition"
//                   >
//                     <Info size={14} /> View Details
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Floating Orbs Animation */}
//       <style jsx>{`
//         .orb {
//           position: absolute;
//           width: 400px;
//           height: 400px;
//           border-radius: 50%;
//           filter: blur(100px);
//           opacity: 0.4;
//           animation: floatOrb 15s ease-in-out infinite alternate;
//         }
//         .orb1 {
//           background: radial-gradient(circle, #93c5fd, transparent 60%);
//           top: 10%;
//           left: 5%;
//           animation-delay: 0s;
//         }
//         .orb2 {
//           background: radial-gradient(circle, #e9d5ff, transparent 60%);
//           top: 40%;
//           left: 60%;
//           animation-delay: 3s;
//         }
//         .orb3 {
//           background: radial-gradient(circle, #c7d2fe, transparent 60%);
//           bottom: 10%;
//           right: 10%;
//           animation-delay: 6s;
//         }
//         @keyframes floatOrb {
//           0% {
//             transform: translateY(0px) translateX(0px);
//           }
//           100% {
//             transform: translateY(-40px) translateX(40px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }










// import React, { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import {
//   Loader2,
//   Calendar,
//   User,
//   Info,
//   MapPin,
//   AlertCircle,
//   Bell,
//   LogOut,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import resqnetImage from "../pages/resqnet img.jpg";

// export default function TrackIncidents() {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const localUser = localStorage.getItem("user");
//     if (localUser) setCurrentUser(JSON.parse(localUser));
//   }, []);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const res = await axiosInstance.get("/reports");
//         if (res.data.success) {
//           let allReports = res.data.data;
//           if (currentUser?._id) {
//             allReports = allReports.filter(
//               (r) => r.reporter?._id === currentUser._id
//             );
//           }
//           setReports(allReports);
//         }
//       } catch (err) {
//         console.error("Error fetching reports:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (currentUser) fetchReports();
//   }, [currentUser]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     navigate("/auth", { replace: true });
//   };

//   const getUserName = () => currentUser?.name || "User";

//   const getPriorityStyle = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case "high":
//         return "from-red-400 to-red-500";
//       case "medium":
//         return "from-orange-300 to-orange-400";
//       case "low":
//         return "from-green-400 to-green-500";
//       default:
//         return "from-gray-200 to-gray-300";
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "from-yellow-300 to-yellow-400";
//       case "assigned":
//         return "from-blue-400 to-blue-500";
//       case "resolved":
//         return "from-emerald-400 to-emerald-500";
//       default:
//         return "from-gray-300 to-gray-400";
//     }
//   };

//   return (
//     <div className="min-h-screen text-gray-800 bg-gradient-to-b from-white via-slate-50 to-slate-100">
//       {/* ✅ Navbar */}
//       <header className="fixed left-0 right-0 z-30 top-4">
//         <div className="px-6 mx-auto max-w-7xl">
//           <div className="flex items-center justify-between p-3 border shadow-md backdrop-blur-md bg-white/70 rounded-2xl border-white/60">
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <div className="w-11 h-11 p-[2px] rounded-full">
//                 <img
//                   src={resqnetImage}
//                   alt="ResQNet"
//                   className="object-cover w-full h-full border rounded-full"
//                 />
//               </div>
//               <div>
//                 <div className="font-semibold text-slate-800">ResQNet</div>
//                 <div className="text-xs text-slate-600">
//                   Empathy meets Intelligence
//                 </div>
//               </div>
//             </div>

//             {/* Nav Links */}
//             <div className="items-center hidden gap-6 text-sm md:flex text-slate-700">
//               <Link
//                 to="/home"
//                 className={`hover:text-slate-900 ${
//                   location.pathname === "/home"
//                     ? "text-[#FF3D4F] font-semibold"
//                     : ""
//                 }`}
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 to="/volunteer-portal"
//                 className={`hover:text-slate-900 ${
//                   location.pathname === "/volunteer-portal"
//                     ? "text-[#FF3D4F] font-semibold"
//                     : ""
//                 }`}
//               >
//                 Volunteer
//               </Link>
//               <Link
//                 to="/find-resources"
//                 className={`hover:text-slate-900 ${
//                   location.pathname === "/find-resources"
//                     ? "text-[#FF3D4F] font-semibold"
//                     : ""
//                 }`}
//               >
//                 Resources
//               </Link>
//               <Link
//                 to="/donate"
//                 className={`hover:text-slate-900 ${
//                   location.pathname === "/donate"
//                     ? "text-[#FF3D4F] font-semibold"
//                     : ""
//                 }`}
//               >
//                 Donate
//               </Link>
//               <Bell className="w-5 h-5 text-slate-600 hover:text-slate-900" />
//               <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
//                 <User className="w-5 h-5 text-slate-700" />
//                 <span className="text-sm">{getUserName()}</span>
//               </div>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] rounded-full hover:opacity-90 transition"
//               >
//                 <LogOut size={16} /> Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ✅ HERO SECTION */}
//       <section className="pt-28 pb-16 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white text-center rounded-b-3xl shadow-md">
//         <motion.h1
//           initial={{ opacity: 0, y: -15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-3 text-4xl font-extrabold"
//         >
//           Track Your Reported Incidents 🔍
//         </motion.h1>
//         <p className="text-lg text-white/90">
//           Stay updated on the status of your emergency reports in real-time.
//         </p>
//       </section>

//       {/* ✅ INCIDENT LIST SECTION */}
//       <main className="px-6 py-12 mx-auto max-w-7xl">
//         {loading ? (
//           <div className="flex items-center justify-center h-60 text-slate-500">
//             <Loader2 className="mr-2 animate-spin" /> Loading your reports...
//           </div>
//         ) : reports.length === 0 ? (
//           <div className="flex flex-col items-center mt-10 text-center text-slate-500">
//             <AlertCircle className="mb-2 text-slate-400" size={32} />
//             No reports found yet.
//           </div>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {reports.map((report, i) => (
//               <motion.div
//                 key={report._id || i}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1, duration: 0.4 }}
//                 className="p-6 transition border shadow-lg bg-white/80 backdrop-blur-lg border-white/40 rounded-2xl hover:shadow-2xl hover:-translate-y-1"
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <h2 className="text-xl font-semibold capitalize">
//                       {report.emergencyType || "Unknown Incident"}
//                     </h2>
//                     <p className="text-sm text-slate-600">
//                       {report.text || "No description provided."}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityStyle(
//                         report.priorityLevel
//                       )} text-white font-semibold`}
//                     >
//                       {report.priorityLevel}
//                     </span>
//                     <span
//                       className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getStatusStyle(
//                         report.status
//                       )} text-white font-semibold`}
//                     >
//                       {report.status}
//                     </span>
//                   </div>
//                 </div>

//                 {report.address && (
//                   <p className="flex items-center gap-1 mb-1 text-sm font-medium text-slate-700">
//                     <MapPin size={14} className="text-blue-500" />{" "}
//                     {report.address}
//                   </p>
//                 )}

//                 <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
//                   <User size={15} className="text-slate-500" />
//                   {report.assignedVolunteer
//                     ? `Assigned to ${report.assignedVolunteer.name}`
//                     : "Not assigned yet"}
//                 </div>

//                 <div className="flex items-center justify-between mt-4 text-sm">
//                   <div className="flex items-center gap-2 text-slate-500">
//                     <Calendar size={14} />
//                     {new Date(report.createdAt).toLocaleString()}
//                   </div>
//                   <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow hover:opacity-90 transition">
//                     <Info size={13} /> View Details
//                   </button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {
  Loader2,
  Calendar,
  User,
  Info,
  MapPin,
  AlertCircle,
  Bell,
  LogOut,
  MessageSquare,
  Star,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import resqnetImage from "../pages/resqnet img.jpg";

export default function TrackIncidents() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    incidentId: "",
    volunteerId: "",
    rating: 0,
    remarks: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) setCurrentUser(JSON.parse(localUser));
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.get("/reports");
        if (res.data.success) {
          let allReports = res.data.data;
          if (currentUser?._id) {
            allReports = allReports.filter(
              (r) => r.reporter?._id === currentUser._id
            );
          }
          setReports(allReports);
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) fetchReports();
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/auth", { replace: true });
  };

  const getUserName = () => currentUser?.name || "User";

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "from-red-400 to-red-500";
      case "medium":
        return "from-orange-300 to-orange-400";
      case "low":
        return "from-green-400 to-green-500";
      default:
        return "from-gray-200 to-gray-300";
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "from-yellow-300 to-yellow-400";
      case "assigned":
        return "from-blue-400 to-blue-500";
      case "resolved":
        return "from-emerald-400 to-emerald-500";
      default:
        return "from-gray-300 to-gray-400";
    }
  };

  const openFeedbackForm = (incidentId) => {

    // Find the matching report
    const report = reports.find((r) => r._id === incidentId);

    // Extract volunteer ID safely
    const volunteerId = report?.assignedVolunteer?._id || "";

    // Set feedback data
    setFeedbackData({
      incidentId,
      volunteerId,
      rating: 0,
      remarks: "",
    });

    setShowFeedback(true);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for backend
    const dataToSend = {
      incidentId: feedbackData.incidentId,
      volunteerId: feedbackData.volunteerId || "",
      rating: Number(feedbackData.rating),
      remarks: feedbackData.remarks.trim(),
    };

    try {
      const res = await axiosInstance.post("/feedback", dataToSend);

      if (res.data.success) {
        alert("✅ Feedback submitted successfully!");
        setShowFeedback(false);
        setFeedbackData({ incidentId: "", volunteerId: "", rating: 0, remarks: "" });
      } else {
        alert("⚠️ Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("❌ Something went wrong while submitting feedback.");
    }
  };


  return (
    <div className="min-h-screen text-gray-800 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      {/* ✨ ResQNet Premium Navbar */}
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
            {/* 🌟 Brand Logo */}
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

            {/* 🧭 Navigation Links */}
            <nav className="items-center hidden gap-8 text-sm font-semibold md:flex">
              {[
                { name: "Dashboard", path: "/home" },
                { name: "Volunteer", path: "/volunteer-portal" },
                { name: "Resources", path: "/find-resources" },
                { name: "Donate", path: "/donate" },
                { name: "Track", path: "/track-incidents" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative transition-all duration-300 hover:text-[#FF3D4F] ${location.pathname === link.path
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
                <Bell className="w-5 h-5 text-slate-700" />
              </button>
              <button className="p-2 bg-white rounded-md shadow-sm">
                <MessageSquare className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </motion.div>
        </div>
      </header>


      {/* ✅ HERO SECTION */}
      <section className="pt-28 pb-16 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white text-center rounded-b-3xl shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-4xl font-extrabold"
        >
          Track Your Reported Incidents 🔍
        </motion.h1>
        <p className="text-lg text-white/90">
          Stay updated on the status of your emergency reports in real-time.
        </p>
      </section>

      {/* ✅ INCIDENT LIST SECTION */}
      <main className="px-6 py-12 mx-auto max-w-7xl">
        {loading ? (
          <div className="flex items-center justify-center h-60 text-slate-500">
            <Loader2 className="mr-2 animate-spin" /> Loading your reports...
          </div>
        ) : reports.length === 0 ? (
          <div className="flex flex-col items-center mt-10 text-center text-slate-500">
            <AlertCircle className="mb-2 text-slate-400" size={32} />
            No reports found yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report, i) => (
              <motion.div
                key={report._id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-6 transition border shadow-lg bg-white/80 backdrop-blur-lg border-white/40 rounded-2xl hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-semibold capitalize">
                      {report.emergencyType || "Unknown Incident"}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {report.text || "No description provided."}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getPriorityStyle(
                        report.priorityLevel
                      )} text-white font-semibold`}
                    >
                      {report.priorityLevel}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getStatusStyle(
                        report.status
                      )} text-white font-semibold`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>

                {report.address && (
                  <p className="flex items-center gap-1 mb-1 text-sm font-medium text-slate-700">
                    <MapPin size={14} className="text-blue-500" />{" "}
                    {report.address}
                  </p>
                )}

                <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
                  <User size={15} className="text-slate-500" />
                  {report.assignedVolunteer
                    ? `Assigned to ${report.assignedVolunteer.name}`
                    : "Not assigned yet"}
                </div>

                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} />
                    {new Date(report.createdAt).toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow hover:opacity-90 transition">
                      <Info size={13} /> View Details
                    </button>
                    <button
                      onClick={() =>
                        openFeedbackForm(report._id, report.assignedVolunteer?._id || "")
                      }
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg shadow hover:opacity-90 transition"
                    >
                      <MessageSquare size={13} /> Feedback
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* ✅ FEEDBACK FORM MODAL */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800">
                  Incident Feedback
                </h2>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="text-slate-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={handleFeedbackSubmit}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Incident ID
                  </label>
                  <input
                    type="text"
                    value={feedbackData.incidentId}
                    readOnly
                    className="w-full px-3 py-2 border rounded-lg bg-slate-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Rating
                  </label>
                  <div className="flex gap-2 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() =>
                          setFeedbackData({ ...feedbackData, rating: star })
                        }
                        className={`cursor-pointer ${star <= feedbackData.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Remarks
                  </label>
                  <textarea
                    rows="3"
                    value={feedbackData.remarks}
                    onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        remarks: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                    placeholder="Write your feedback here..."
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowFeedback(false)}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                  >
                    Submit
                  </button>
                </div>
              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
