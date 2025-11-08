// // // src/pages/VolunteerPortal.jsx
// // import React, { useEffect, useState, useRef } from "react";
// // import Sidebar from "../components/Sidebar";
// // import { motion } from "framer-motion";
// // import Swal from "sweetalert2";
// // import axiosInstance from "../api/axiosInstance";
// // import { Loader2, Camera, CheckCircle, Clock } from "lucide-react";
// // import { format } from "date-fns";

// // export default function VolunteerPortal() {
// //     const [user, setUser] = useState(null);
// //     const [loadingUser, setLoadingUser] = useState(true);

// //     // Registration form state (for users who are not volunteers)
// //     const [skills, setSkills] = useState("");
// //     const [radiusKm, setRadiusKm] = useState(10);
// //     const [availability, setAvailability] = useState(true);
// //     const [idProofType, setIdProofType] = useState("Adhaar");
// //     const [idProofFile, setIdProofFile] = useState(null);
// //     const [registering, setRegistering] = useState(false);

// //     // Profile update state (for volunteers)
// //     const [updatingAvailability, setUpdatingAvailability] = useState(false);

// //     const fileRef = useRef(null);

// //     // 🧠 Fetch latest user data on page load
// //     useEffect(() => {
// //         const fetchUser = async () => {
// //             try {
// //                 const res = await axiosInstance.get("/auth/me");

// //                 if (res.data?.success) {
// //                     // 👇 handle both backend response shapes:
// //                     // { data: { user: {...} } } or { data: {...} }
// //                     const fetchedUser = res.data.data.user || res.data.data;
// //                     setUser(fetchedUser);
// //                     localStorage.setItem("user", JSON.stringify(fetchedUser));
// //                 } else {
// //                     // fallback: if backend fails, load from localStorage
// //                     const local = localStorage.getItem("user");
// //                     if (local) setUser(JSON.parse(local));
// //                 }
// //             } catch (err) {
// //                 console.error("Error fetching user:", err);
// //                 const local = localStorage.getItem("user");
// //                 if (local) setUser(JSON.parse(local));
// //             } finally {
// //                 setLoadingUser(false);
// //             }
// //         };

// //         fetchUser();
// //     }, []);

// //     // 🧩 Refresh user after registration or availability update
// //     const refreshUserFromServer = async () => {
// //         try {
// //             const res = await axiosInstance.get("/auth/me");
// //             if (res.data?.success) {
// //                 // 👇 again, handle nested 'user' object safely
// //                 const fetchedUser = res.data.data.user || res.data.data;
// //                 setUser(fetchedUser);
// //                 localStorage.setItem("user", JSON.stringify(fetchedUser));
// //             } else {
// //                 const local = localStorage.getItem("user");
// //                 if (local) setUser(JSON.parse(local));
// //             }
// //         } catch (err) {
// //             console.error("Failed to refresh user:", err);
// //             const local = localStorage.getItem("user");
// //             if (local) setUser(JSON.parse(local));
// //         }
// //     };


// //     /* ----------------------------
// //        Registration (user -> volunteer)
// //        ---------------------------- */
// //     const handleRegister = async (e) => {
// //         e.preventDefault();

// //         if (!skills.trim() || !radiusKm || !idProofType || !idProofFile) {
// //             Swal.fire("Missing fields", "Please fill all required fields and attach ID proof.", "warning");
// //             return;
// //         }

// //         setRegistering(true);

// //         try {
// //             // 🌍 Step 1: Fetch user location
// //             const getLocation = () =>
// //                 new Promise((resolve, reject) => {
// //                     if (!navigator.geolocation) {
// //                         return reject(new Error("Geolocation not supported"));
// //                     }
// //                     navigator.geolocation.getCurrentPosition(
// //                         (pos) => resolve({
// //                             latitude: pos.coords.latitude,
// //                             longitude: pos.coords.longitude,
// //                         }),
// //                         (err) => reject(err),
// //                         { enableHighAccuracy: true, timeout: 10000 }
// //                     );
// //                 });

// //             let latitude = null;
// //             let longitude = null;

// //             try {
// //                 const loc = await getLocation();
// //                 latitude = loc.latitude;
// //                 longitude = loc.longitude;
// //             } catch (locErr) {
// //                 console.warn("Location fetch failed:", locErr);
// //                 Swal.fire(
// //                     "Location not available",
// //                     "Couldn't fetch your location automatically. Proceeding without location.",
// //                     "info"
// //                 );
// //             }

// //             // 📦 Step 2: Prepare form data
// //             const formData = new FormData();
// //             formData.append("skills", skills);
// //             formData.append("radiusKm", radiusKm);
// //             formData.append("availability", availability ? "true" : "false");
// //             formData.append("idProofType", idProofType);
// //             formData.append("idProof", idProofFile);

// //             if (latitude && longitude) {
// //                 formData.append("latitude", latitude);
// //                 formData.append("longitude", longitude);
// //             }

// //             // 📤 Step 3: Send to backend
// //             const res = await axiosInstance.post("/volunteers/register", formData, {
// //                 headers: { "Content-Type": "multipart/form-data" },
// //             });

// //             // ✅ Step 4: Handle response
// //             if (res.data?.success) {
// //                 Swal.fire("Welcome!", "You are now registered as a volunteer. Pending verification.", "success");

// //                 if (res.data.data) {
// //                     localStorage.setItem("user", JSON.stringify(res.data.data));
// //                     setUser(res.data.data);
// //                 } else {
// //                     await refreshUserFromServer();
// //                 }

// //                 // Reset form
// //                 setSkills("");
// //                 setRadiusKm(10);
// //                 setAvailability(true);
// //                 setIdProofFile(null);
// //                 if (fileRef.current) fileRef.current.value = "";
// //             } else {
// //                 Swal.fire("Error", res.data?.message || "Registration failed", "error");
// //             }
// //         } catch (err) {
// //             console.error("Register error:", err);
// //             Swal.fire("Error", "Failed to register as volunteer. See console.", "error");
// //         } finally {
// //             setRegistering(false);
// //         }
// //     };


// //     /* ----------------------------
// //        Update availability (volunteer)
// //        ---------------------------- */
// //     const toggleAvailability = async () => {
// //         if (!user) return;
// //         setUpdatingAvailability(true);
// //         try {
// //             // PATCH request — adjust endpoint to your API if different
// //             const res = await axiosInstance.patch("/volunteers/update", {
// //                 availability: !user.volunteerProfile?.availability,
// //             });

// //             if (res.data?.success) {
// //                 Swal.fire("Updated", "Your availability has been updated.", "success");
// //                 // update local copy — prefer backend response if present
// //                 if (res.data.data) {
// //                     localStorage.setItem("user", JSON.stringify(res.data.data));
// //                     setUser(res.data.data);
// //                 } else {
// //                     await refreshUserFromServer();
// //                 }
// //             } else {
// //                 Swal.fire("Error", "Could not update availability.", "error");
// //             }
// //         } catch (err) {
// //             console.error("Availability update error:", err);
// //             Swal.fire("Error", "Failed to update availability.", "error");
// //         } finally {
// //             setUpdatingAvailability(false);
// //         }
// //     };

// //     /* ----------------------------
// //        UI helpers
// //        ---------------------------- */
// //     const volunteerProfile = user?.volunteerProfile || null;

// //     return (
// //         <div className="flex min-h-screen bg-gray-50">
// //             <Sidebar />

// //             <div className="flex-1 p-8 ml-64">
// //                 <motion.div
// //                     initial={{ opacity: 0, y: -8 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.35 }}
// //                     className="p-8 mb-8 text-white shadow-md bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-b-3xl"
// //                 >
// //                     <h1 className="text-3xl font-extrabold md:text-4xl">
// //                         {user?.role === "volunteer" ? `Welcome back, ${user.name}` : "Join the ResQNet Volunteer Force"}
// //                     </h1>
// //                     <p className="mt-2 opacity-90">
// //                         {user?.role === "volunteer"
// //                             ? "Manage your profile and availability here."
// //                             : "Respond faster. Save lives. Become a verified volunteer."}
// //                     </p>
// //                 </motion.div>

// //                 {/* Loading initial user */}
// //                 {loadingUser ? (
// //                     <div className="flex items-center justify-center py-20">
// //                         <Loader2 className="mr-2 animate-spin" /> Loading...
// //                     </div>
// //                 ) : (
// //                     <>
// //                         {/* If user is volunteer → show profile */}
// //                         {user?.role === "volunteer" && volunteerProfile ? (
// //                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
// //                                 <div className="flex items-center gap-6 p-6 mb-6 bg-white shadow-md rounded-xl">
// //                                     <div className="flex items-center justify-center overflow-hidden bg-gray-100 border rounded-full w-28 h-28">
// //                                         {user.profileImage ? (
// //                                             <img src={user.profileImage} alt="profile" className="object-cover w-full h-full" />
// //                                         ) : (
// //                                             <div className="text-3xl">👤</div>
// //                                         )}
// //                                     </div>

// //                                     <div className="flex-1">
// //                                         <div className="flex items-center justify-between">
// //                                             <div>
// //                                                 <h2 className="text-2xl font-semibold">{user.name}</h2>
// //                                                 <p className="text-sm text-gray-600">{user.email}</p>
// //                                             </div>

// //                                             <div className="text-right">
// //                                                 <div className="inline-flex items-center gap-2">
// //                                                     {volunteerProfile.verified ? (
// //                                                         <span className="flex items-center gap-1 text-sm font-semibold text-green-700">
// //                                                             <CheckCircle size={16} /> Verified
// //                                                         </span>
// //                                                     ) : (
// //                                                         <span className="flex items-center gap-1 text-sm font-medium text-yellow-700">
// //                                                             <Clock size={14} /> Pending verification
// //                                                         </span>
// //                                                     )}
// //                                                 </div>
// //                                             </div>
// //                                         </div>

// //                                         <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">
// //                                             <div className="p-3 border rounded-lg bg-gray-50">
// //                                                 <div className="text-sm text-gray-500">Skills</div>
// //                                                 <div className="mt-1 font-medium">{(volunteerProfile.skills || []).join(", ") || "—"}</div>
// //                                             </div>

// //                                             <div className="p-3 border rounded-lg bg-gray-50">
// //                                                 <div className="text-sm text-gray-500">Radius (km)</div>
// //                                                 <div className="mt-1 font-medium">{volunteerProfile.radiusKm ?? "—"} km</div>
// //                                             </div>

// //                                             <div className="p-3 border rounded-lg bg-gray-50">
// //                                                 <div className="text-sm text-gray-500">Total Cases Resolved</div>
// //                                                 <div className="mt-1 font-medium">{volunteerProfile.totalCasesResolved ?? 0}</div>
// //                                             </div>

// //                                             <div className="p-3 border rounded-lg bg-gray-50">
// //                                                 <div className="text-sm text-gray-500">Average Rating</div>
// //                                                 <div className="mt-1 font-medium">{(volunteerProfile.averageRating ?? 0).toFixed(1)}</div>
// //                                             </div>
// //                                         </div>

// //                                         <div className="flex items-center gap-4 mt-4">
// //                                             <button
// //                                                 onClick={toggleAvailability}
// //                                                 disabled={updatingAvailability}
// //                                                 className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition ${volunteerProfile.availability ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
// //                                             >
// //                                                 {updatingAvailability ? "Updating..." : volunteerProfile.availability ? "Available" : "Not Available"}
// //                                             </button>

// //                                             <div className="text-sm text-gray-500">
// //                                                 Joined:{" "}
// //                                                 {volunteerProfile.joinedDate ? format(new Date(volunteerProfile.joinedDate), "dd/MM/yyyy") : "—"}
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 {/* ID Proof card */}
// //                                 <div className="max-w-3xl p-6 bg-white shadow-md rounded-xl">
// //                                     <h3 className="mb-3 text-lg font-semibold">ID Proof</h3>
// //                                     {volunteerProfile.idProof ? (
// //                                         <div className="flex items-start gap-4">
// //                                             <div className="flex items-center justify-center h-24 overflow-hidden bg-gray-100 border rounded-md w-36">
// //                                                 {volunteerProfile.idProof.documentUrl ? (
// //                                                     <img src={volunteerProfile.idProof.documentUrl} alt="id" className="object-cover w-full h-full" />
// //                                                 ) : (
// //                                                     <div className="text-sm text-gray-500">No document</div>
// //                                                 )}
// //                                             </div>

// //                                             <div className="flex-1">
// //                                                 <div><b>Type:</b> {volunteerProfile.idProof.type}</div>
// //                                                 <div><b>Verified:</b> {volunteerProfile.idProof.verified ? "Yes" : "No"}</div>
// //                                             </div>
// //                                         </div>
// //                                     ) : (
// //                                         <div className="text-sm text-gray-500">No ID proof uploaded.</div>
// //                                     )}
// //                                 </div>
// //                             </motion.div>
// //                         ) : (
// //                             /* If user is not a volunteer → show registration form */
// //                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
// //                                 <div className="p-6 bg-white shadow-md rounded-xl">
// //                                     <h2 className="mb-2 text-2xl font-semibold">Become a ResQNet Volunteer</h2>
// //                                     <p className="mb-4 text-gray-600">
// //                                         Join the volunteer network — sign up, upload an ID proof, and start responding to nearby emergencies.
// //                                     </p>

// //                                     <form onSubmit={handleRegister} className="space-y-4">
// //                                         <div>
// //                                             <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
// //                                             <textarea
// //                                                 value={skills}
// //                                                 onChange={(e) => setSkills(e.target.value)}
// //                                                 placeholder="e.g. first aid, rescue operations, basic triage"
// //                                                 className="w-full p-3 mt-1 border rounded-lg resize-none bg-gray-50"
// //                                                 rows={3}
// //                                                 required
// //                                             />
// //                                         </div>

// //                                         <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
// //                                             <div>
// //                                                 <label className="block text-sm font-medium text-gray-700">Radius (km)</label>
// //                                                 <input
// //                                                     type="number"
// //                                                     min={1}
// //                                                     value={radiusKm}
// //                                                     onChange={(e) => setRadiusKm(Number(e.target.value))}
// //                                                     className="w-full p-2 mt-1 bg-white border rounded-lg"
// //                                                     required
// //                                                 />
// //                                             </div>

// //                                             <div>
// //                                                 <label className="block text-sm font-medium text-gray-700">Availability</label>
// //                                                 <div className="mt-1">
// //                                                     <label className="inline-flex items-center gap-2 cursor-pointer">
// //                                                         <input
// //                                                             type="checkbox"
// //                                                             checked={availability}
// //                                                             onChange={(e) => setAvailability(e.target.checked)}
// //                                                             className="w-5 h-5 form-checkbox text-rose-500"
// //                                                         />
// //                                                         <span className="text-sm">Available for duty</span>
// //                                                     </label>
// //                                                 </div>
// //                                             </div>

// //                                             <div>
// //                                                 <label className="block text-sm font-medium text-gray-700">ID Proof Type</label>
// //                                                 <select
// //                                                     value={idProofType}
// //                                                     onChange={(e) => setIdProofType(e.target.value)}
// //                                                     className="w-full p-2 mt-1 bg-white border rounded-lg"
// //                                                     required
// //                                                 >
// //                                                     <option>Adhaar</option>
// //                                                     <option>PAN</option>
// //                                                     <option>Driving License</option>
// //                                                     <option>Passport</option>
// //                                                 </select>
// //                                             </div>
// //                                         </div>

// //                                         <div>
// //                                             <label className="block text-sm font-medium text-gray-700">Upload ID Proof</label>
// //                                             <div className="flex items-center gap-3 mt-2">
// //                                                 <input
// //                                                     ref={fileRef}
// //                                                     type="file"
// //                                                     accept="image/*,application/pdf"
// //                                                     onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
// //                                                     className="text-sm"
// //                                                     required
// //                                                 />
// //                                                 <div className="text-sm text-gray-500">
// //                                                     {idProofFile ? idProofFile.name : "No file chosen"}
// //                                                 </div>
// //                                             </div>
// //                                         </div>

// //                                         <div className="flex items-center justify-end gap-3 mt-4">
// //                                             <button
// //                                                 type="button"
// //                                                 onClick={() => {
// //                                                     setSkills("");
// //                                                     setRadiusKm(10);
// //                                                     setAvailability(true);
// //                                                     setIdProofType("Adhaar");
// //                                                     setIdProofFile(null);
// //                                                     if (fileRef.current) fileRef.current.value = "";
// //                                                 }}
// //                                                 className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
// //                                             >
// //                                                 Reset
// //                                             </button>

// //                                             <button
// //                                                 type="submit"
// //                                                 disabled={registering}
// //                                                 className="flex items-center gap-2 px-5 py-2 font-semibold text-white transition rounded-lg bg-rose-600 hover:bg-rose-700"
// //                                             >
// //                                                 {registering ? <Loader2 className="animate-spin" size={16} /> : <Camera size={16} />}
// //                                                 {registering ? "Registering..." : "Register as Volunteer"}
// //                                             </button>
// //                                         </div>
// //                                     </form>
// //                                 </div>
// //                             </motion.div>
// //                         )}
// //                     </>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }







// import React, { useEffect, useState, useRef } from "react";
// import Sidebar from "../components/Sidebar";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import axiosInstance from "../api/axiosInstance";
// import MyTasks from "../components/VolunteerTasks";

// import {
//     Loader2,
//     Camera,
//     CheckCircle,
//     Clock,
//     ClipboardList,
//     Gift,
//     Users,
// } from "lucide-react";
// import { format } from "date-fns";

// export default function VolunteerPortal() {
//     const [user, setUser] = useState(null);
//     const [loadingUser, setLoadingUser] = useState(true);
//     const [activeTab, setActiveTab] = useState("profile");

//     // Registration form state
//     const [skills, setSkills] = useState("");
//     const [radiusKm, setRadiusKm] = useState(10);
//     const [availability, setAvailability] = useState(true);
//     const [idProofType, setIdProofType] = useState("Adhaar");
//     const [idProofFile, setIdProofFile] = useState(null);
//     const [registering, setRegistering] = useState(false);
//     const [updatingAvailability, setUpdatingAvailability] = useState(false);

//     const fileRef = useRef(null);

//     // 🧠 Fetch user
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await axiosInstance.get("/auth/me");
//                 if (res.data?.success) {
//                     const fetchedUser = res.data.data.user || res.data.data;
//                     setUser(fetchedUser);
//                     localStorage.setItem("user", JSON.stringify(fetchedUser));
//                 } else {
//                     const local = localStorage.getItem("user");
//                     if (local) setUser(JSON.parse(local));
//                 }
//             } catch (err) {
//                 console.error("Error fetching user:", err);
//                 const local = localStorage.getItem("user");
//                 if (local) setUser(JSON.parse(local));
//             } finally {
//                 setLoadingUser(false);
//             }
//         };
//         fetchUser();
//     }, []);

//     const refreshUserFromServer = async () => {
//         try {
//             const res = await axiosInstance.get("/auth/me");
//             if (res.data?.success) {
//                 const fetchedUser = res.data.data.user || res.data.data;
//                 setUser(fetchedUser);
//                 localStorage.setItem("user", JSON.stringify(fetchedUser));
//             }
//         } catch (err) {
//             console.error("Failed to refresh user:", err);
//         }
//     };

//     /* ----------------------------
//        Registration (user -> volunteer)
//        ---------------------------- */
//     const handleRegister = async (e) => {
//         e.preventDefault();

//         if (!skills.trim() || !radiusKm || !idProofType || !idProofFile) {
//             Swal.fire(
//                 "Missing fields",
//                 "Please fill all required fields and attach ID proof.",
//                 "warning"
//             );
//             return;
//         }

//         setRegistering(true);

//         try {
//             // 🌍 Fetch user location
//             const getLocation = () =>
//                 new Promise((resolve, reject) => {
//                     if (!navigator.geolocation) {
//                         return reject(new Error("Geolocation not supported"));
//                     }
//                     navigator.geolocation.getCurrentPosition(
//                         (pos) =>
//                             resolve({
//                                 latitude: pos.coords.latitude,
//                                 longitude: pos.coords.longitude,
//                             }),
//                         (err) => reject(err),
//                         { enableHighAccuracy: true, timeout: 10000 }
//                     );
//                 });

//             let latitude = null;
//             let longitude = null;
//             try {
//                 const loc = await getLocation();
//                 latitude = loc.latitude;
//                 longitude = loc.longitude;
//             } catch (locErr) {
//                 console.warn("Location fetch failed:", locErr);
//                 Swal.fire(
//                     "Location not available",
//                     "Couldn't fetch your location automatically. Proceeding without location.",
//                     "info"
//                 );
//             }

//             const formData = new FormData();
//             formData.append("skills", skills);
//             formData.append("radiusKm", radiusKm);
//             formData.append("availability", availability ? "true" : "false");
//             formData.append("idProofType", idProofType);
//             formData.append("idProof", idProofFile);
//             if (latitude && longitude) {
//                 formData.append("latitude", latitude);
//                 formData.append("longitude", longitude);
//             }

//             const res = await axiosInstance.post("/volunteers/register", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             if (res.data?.success) {
//                 Swal.fire(
//                     "Welcome!",
//                     "You are now registered as a volunteer. Pending verification.",
//                     "success"
//                 );
//                 if (res.data.data) {
//                     localStorage.setItem("user", JSON.stringify(res.data.data));
//                     setUser(res.data.data);
//                 } else {
//                     await refreshUserFromServer();
//                 }
//             } else {
//                 Swal.fire("Error", res.data?.message || "Registration failed", "error");
//             }
//         } catch (err) {
//             console.error("Register error:", err);
//             Swal.fire("Error", "Failed to register as volunteer.", "error");
//         } finally {
//             setRegistering(false);
//         }
//     };

//     /* ----------------------------
//        Update availability
//        ---------------------------- */
//     const toggleAvailability = async () => {
//         if (!user) return;
//         setUpdatingAvailability(true);
//         try {
//             const res = await axiosInstance.patch("/volunteers/update", {
//                 availability: !user.volunteerProfile?.availability,
//             });

//             if (res.data?.success) {
//                 Swal.fire("Updated", "Your availability has been updated.", "success");
//                 if (res.data.data) {
//                     localStorage.setItem("user", JSON.stringify(res.data.data));
//                     setUser(res.data.data);
//                 } else {
//                     await refreshUserFromServer();
//                 }
//             }
//         } catch (err) {
//             console.error("Availability update error:", err);
//             Swal.fire("Error", "Failed to update availability.", "error");
//         } finally {
//             setUpdatingAvailability(false);
//         }
//     };

//     const volunteerProfile = user?.volunteerProfile || null;

//     /* ----------------------------
//        UI
//        ---------------------------- */
//     const TabButton = ({ id, label, icon }) => (
//         <button
//             onClick={() => setActiveTab(id)}
//             className={`px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2 border-b-2 ${activeTab === id
//                 ? "text-rose-600 border-rose-500 bg-rose-50"
//                 : "text-gray-600 border-transparent hover:bg-gray-100"
//                 }`}
//         >
//             {icon}
//             {label}
//         </button>
//     );

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             <Sidebar />

//             <div className="flex-1 p-8 ml-64">
//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.35 }}
//                     className="p-8 mb-6 text-white shadow-md bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 rounded-b-3xl"
//                 >
//                     <h1 className="text-3xl font-extrabold md:text-4xl">
//                         {user?.role === "volunteer"
//                             ? `Welcome back, ${user.name}`
//                             : "Join the ResQNet Volunteer Force"}
//                     </h1>
//                     <p className="mt-2 opacity-90">
//                         {user?.role === "volunteer"
//                             ? "Manage your profile and availability here."
//                             : "Respond faster. Save lives. Become a verified volunteer."}
//                     </p>
//                 </motion.div>

//                 {/* Navbar */}
//                 {user?.role === "volunteer" && (
//                     <div className="sticky top-0 z-10 flex gap-4 p-3 mb-8 bg-white shadow-sm rounded-xl">
//                         <TabButton
//                             id="profile"
//                             label="Volunteer Profile"
//                             icon={<CheckCircle size={16} />}
//                         />
//                         <TabButton
//                             id="tasks"
//                             label="My Tasks"
//                             icon={<ClipboardList size={16} />}
//                         />
//                         <TabButton
//                             id="requests"
//                             label="Requests"
//                             icon={<Users size={16} />}
//                         />
//                         <TabButton
//                             id="rewards"
//                             label="Rewards"
//                             icon={<Gift size={16} />}
//                         />
//                     </div>
//                 )}

//                 {/* Content */}
//                 {loadingUser ? (
//                     <div className="flex items-center justify-center py-20">
//                         <Loader2 className="mr-2 animate-spin" /> Loading...
//                     </div>
//                 ) : (
//                     <>
//                         {activeTab === "profile" && (
//                             <>
//                                 {user?.role === "volunteer" && volunteerProfile ? (
//                                     <motion.div
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         className="max-w-3xl"
//                                     >
//                                         {/* ✅ Volunteer Profile Section */}
//                                         <div className="flex items-center gap-6 p-6 mb-6 bg-white shadow-md rounded-xl">
//                                             <div className="flex items-center justify-center overflow-hidden bg-gray-100 border rounded-full w-28 h-28">
//                                                 {user.profileImage ? (
//                                                     <img
//                                                         src={user.profileImage}
//                                                         alt="profile"
//                                                         className="object-cover w-full h-full"
//                                                     />
//                                                 ) : (
//                                                     <div className="text-3xl">👤</div>
//                                                 )}
//                                             </div>

//                                             <div className="flex-1">
//                                                 <div className="flex items-center justify-between">
//                                                     <div>
//                                                         <h2 className="text-2xl font-semibold">
//                                                             {user.name}
//                                                         </h2>
//                                                         <p className="text-sm text-gray-600">{user.email}</p>
//                                                     </div>

//                                                     <div className="text-right">
//                                                         {volunteerProfile.verified ? (
//                                                             <span className="flex items-center gap-1 text-sm font-semibold text-green-700">
//                                                                 <CheckCircle size={16} /> Verified
//                                                             </span>
//                                                         ) : (
//                                                             <span className="flex items-center gap-1 text-sm font-medium text-yellow-700">
//                                                                 <Clock size={14} /> Pending verification
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">
//                                                     <div className="p-3 border rounded-lg bg-gray-50">
//                                                         <div className="text-sm text-gray-500">Skills</div>
//                                                         <div className="mt-1 font-medium">
//                                                             {(volunteerProfile.skills || []).join(", ") || "—"}
//                                                         </div>
//                                                     </div>

//                                                     <div className="p-3 border rounded-lg bg-gray-50">
//                                                         <div className="text-sm text-gray-500">
//                                                             Radius (km)
//                                                         </div>
//                                                         <div className="mt-1 font-medium">
//                                                             {volunteerProfile.radiusKm ?? "—"} km
//                                                         </div>
//                                                     </div>

//                                                     <div className="p-3 border rounded-lg bg-gray-50">
//                                                         <div className="text-sm text-gray-500">
//                                                             Total Cases Resolved
//                                                         </div>
//                                                         <div className="mt-1 font-medium">
//                                                             {volunteerProfile.totalCasesResolved ?? 0}
//                                                         </div>
//                                                     </div>

//                                                     <div className="p-3 border rounded-lg bg-gray-50">
//                                                         <div className="text-sm text-gray-500">
//                                                             Average Rating
//                                                         </div>
//                                                         <div className="mt-1 font-medium">
//                                                             {(volunteerProfile.averageRating ?? 0).toFixed(1)}
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex items-center gap-4 mt-4">
//                                                     <button
//                                                         onClick={toggleAvailability}
//                                                         disabled={updatingAvailability}
//                                                         className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition ${volunteerProfile.availability
//                                                             ? "bg-green-600 text-white hover:bg-green-700"
//                                                             : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                                                             }`}
//                                                     >
//                                                         {updatingAvailability
//                                                             ? "Updating..."
//                                                             : volunteerProfile.availability
//                                                                 ? "Available"
//                                                                 : "Not Available"}
//                                                     </button>

//                                                     <div className="text-sm text-gray-500">
//                                                         Joined:{" "}
//                                                         {volunteerProfile.joinedDate
//                                                             ? format(
//                                                                 new Date(volunteerProfile.joinedDate),
//                                                                 "dd/MM/yyyy"
//                                                             )
//                                                             : "—"}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* ID Proof card */}
//                                         <div className="max-w-3xl p-6 bg-white shadow-md rounded-xl">
//                                             <h3 className="mb-3 text-lg font-semibold">ID Proof</h3>
//                                             {volunteerProfile.idProof ? (
//                                                 <div className="flex items-start gap-4">
//                                                     <div className="flex items-center justify-center h-24 overflow-hidden bg-gray-100 border rounded-md w-36">
//                                                         {volunteerProfile.idProof.documentUrl ? (
//                                                             <img
//                                                                 src={volunteerProfile.idProof.documentUrl}
//                                                                 alt="id"
//                                                                 className="object-cover w-full h-full"
//                                                             />
//                                                         ) : (
//                                                             <div className="text-sm text-gray-500">
//                                                                 No document
//                                                             </div>
//                                                         )}
//                                                     </div>

//                                                     <div className="flex-1">
//                                                         <div>
//                                                             <b>Type:</b> {volunteerProfile.idProof.type}
//                                                         </div>
//                                                         <div>
//                                                             <b>Verified:</b>{" "}
//                                                             {volunteerProfile.idProof.verified
//                                                                 ? "Yes"
//                                                                 : "No"}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             ) : (
//                                                 <div className="text-sm text-gray-500">
//                                                     No ID proof uploaded.
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </motion.div>
//                                 ) : (
//                                     /* Registration Form */
//                                     <motion.div
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         className="max-w-3xl"
//                                     >
//                                         <div className="p-6 bg-white shadow-md rounded-xl">
//                                             <h2 className="mb-2 text-2xl font-semibold">
//                                                 Become a ResQNet Volunteer
//                                             </h2>
//                                             <p className="mb-4 text-gray-600">
//                                                 Join the volunteer network — upload your ID proof and
//                                                 start responding to emergencies.
//                                             </p>

//                                             <form onSubmit={handleRegister} className="space-y-4">
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700">
//                                                         Skills (comma separated)
//                                                     </label>
//                                                     <textarea
//                                                         value={skills}
//                                                         onChange={(e) => setSkills(e.target.value)}
//                                                         placeholder="e.g. first aid, rescue operations"
//                                                         className="w-full p-3 mt-1 border rounded-lg resize-none bg-gray-50"
//                                                         rows={3}
//                                                         required
//                                                     />
//                                                 </div>

//                                                 <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//                                                     <div>
//                                                         <label className="block text-sm font-medium text-gray-700">
//                                                             Radius (km)
//                                                         </label>
//                                                         <input
//                                                             type="number"
//                                                             min={1}
//                                                             value={radiusKm}
//                                                             onChange={(e) =>
//                                                                 setRadiusKm(Number(e.target.value))
//                                                             }
//                                                             className="w-full p-2 mt-1 bg-white border rounded-lg"
//                                                             required
//                                                         />
//                                                     </div>

//                                                     <div>
//                                                         <label className="block text-sm font-medium text-gray-700">
//                                                             Availability
//                                                         </label>
//                                                         <label className="inline-flex items-center gap-2 mt-2">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 checked={availability}
//                                                                 onChange={(e) =>
//                                                                     setAvailability(e.target.checked)
//                                                                 }
//                                                                 className="w-5 h-5 form-checkbox text-rose-500"
//                                                             />
//                                                             <span className="text-sm">
//                                                                 Available for duty
//                                                             </span>
//                                                         </label>
//                                                     </div>

//                                                     <div>
//                                                         <label className="block text-sm font-medium text-gray-700">
//                                                             ID Proof Type
//                                                         </label>
//                                                         <select
//                                                             value={idProofType}
//                                                             onChange={(e) => setIdProofType(e.target.value)}
//                                                             className="w-full p-2 mt-1 bg-white border rounded-lg"
//                                                             required
//                                                         >
//                                                             <option>Adhaar</option>
//                                                             <option>PAN</option>
//                                                             <option>Driving License</option>
//                                                             <option>Passport</option>
//                                                         </select>
//                                                     </div>
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700">
//                                                         Upload ID Proof
//                                                     </label>
//                                                     <div className="flex items-center gap-3 mt-2">
//                                                         <input
//                                                             ref={fileRef}
//                                                             type="file"
//                                                             accept="image/*,application/pdf"
//                                                             onChange={(e) =>
//                                                                 setIdProofFile(e.target.files?.[0] || null)
//                                                             }
//                                                             className="text-sm"
//                                                             required
//                                                         />
//                                                         <div className="text-sm text-gray-500">
//                                                             {idProofFile
//                                                                 ? idProofFile.name
//                                                                 : "No file chosen"}
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="flex items-center justify-end gap-3 mt-4">
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => {
//                                                             setSkills("");
//                                                             setRadiusKm(10);
//                                                             setAvailability(true);
//                                                             setIdProofType("Adhaar");
//                                                             setIdProofFile(null);
//                                                             if (fileRef.current)
//                                                                 fileRef.current.value = "";
//                                                         }}
//                                                         className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
//                                                     >
//                                                         Reset
//                                                     </button>

//                                                     <button
//                                                         type="submit"
//                                                         disabled={registering}
//                                                         className="flex items-center gap-2 px-5 py-2 font-semibold text-white transition rounded-lg bg-rose-600 hover:bg-rose-700"
//                                                     >
//                                                         {registering ? (
//                                                             <Loader2 className="animate-spin" size={16} />
//                                                         ) : (
//                                                             <Camera size={16} />
//                                                         )}
//                                                         {registering ? "Registering..." : "Register as Volunteer"}
//                                                     </button>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     </motion.div>
//                                 )}
//                             </>
//                         )}

//                         {/* 🧾 My Tasks tab */}
//                         {activeTab === "tasks" && (
//                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                                 <MyTasks user={user} />
//                             </motion.div>
//                         )}


//                         {/* 🤝 Requests tab */}
//                         {activeTab === "requests" && (
//                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                                 <div className="max-w-4xl p-6 bg-white shadow-md rounded-xl">
//                                     <h2 className="mb-3 text-2xl font-semibold">Requests</h2>
//                                     <p className="mb-4 text-gray-600">
//                                         Requests from other volunteers or coordinators will appear here.
//                                     </p>
//                                     <div className="py-10 text-center text-gray-500 border rounded-lg">
//                                         <Users className="mx-auto mb-2 text-gray-400" size={40} />
//                                         <p>No active requests right now.</p>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         )}

//                         {/* 🏅 Rewards tab */}
//                         {activeTab === "rewards" && (
//                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                                 <div className="max-w-4xl p-6 bg-white shadow-md rounded-xl">
//                                     <h2 className="mb-3 text-2xl font-semibold">Rewards & Achievements</h2>
//                                     <p className="mb-4 text-gray-600">
//                                         Track your milestones, badges, and community recognition.
//                                     </p>
//                                     <div className="py-10 text-center text-gray-500 border rounded-lg">
//                                         <Gift className="mx-auto mb-2 text-gray-400" size={40} />
//                                         <p>No rewards yet. Keep helping others to earn badges!</p>
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }



// import React, { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import axiosInstance from "../api/axiosInstance";
// import MyTasks from "../components/VolunteerTasks";
// import {
//   Loader2,
//   Camera,
//   CheckCircle,
//   Clock,
//   ClipboardList,
//   Gift,
//   Users,
//   LogOut,
//   Bell,
//   User,
//   Search,
//   Menu,
// } from "lucide-react";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";

// export default function VolunteerPortal() {
//   const [user, setUser] = useState(null);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [activeTab, setActiveTab] = useState("profile");
//   const navigate = useNavigate();

//   // Form states
//   const [skills, setSkills] = useState("");
//   const [radiusKm, setRadiusKm] = useState(10);
//   const [availability, setAvailability] = useState(true);
//   const [idProofType, setIdProofType] = useState("Adhaar");
//   const [idProofFile, setIdProofFile] = useState(null);
//   const [registering, setRegistering] = useState(false);
//   const [updatingAvailability, setUpdatingAvailability] = useState(false);
//   const fileRef = useRef(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axiosInstance.get("/auth/me");
//         if (res.data?.success) {
//           const fetchedUser = res.data.data.user || res.data.data;
//           setUser(fetchedUser);
//           localStorage.setItem("user", JSON.stringify(fetchedUser));
//         } else {
//           const local = localStorage.getItem("user");
//           if (local) setUser(JSON.parse(local));
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//       } finally {
//         setLoadingUser(false);
//       }
//     };
//     fetchUser();
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

//   const refreshUserFromServer = async () => {
//     try {
//       const res = await axiosInstance.get("/auth/me");
//       if (res.data?.success) {
//         const fetchedUser = res.data.data.user || res.data.data;
//         setUser(fetchedUser);
//         localStorage.setItem("user", JSON.stringify(fetchedUser));
//       }
//     } catch (err) {
//       console.error("Failed to refresh user:", err);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!skills.trim() || !radiusKm || !idProofType || !idProofFile) {
//       Swal.fire(
//         "Missing fields",
//         "Please fill all required fields and attach ID proof.",
//         "warning"
//       );
//       return;
//     }

//     setRegistering(true);

//     try {
//       const getLocation = () =>
//         new Promise((resolve, reject) => {
//           if (!navigator.geolocation)
//             return reject(new Error("Geolocation not supported"));
//           navigator.geolocation.getCurrentPosition(
//             (pos) =>
//               resolve({
//                 latitude: pos.coords.latitude,
//                 longitude: pos.coords.longitude,
//               }),
//             (err) => reject(err),
//             { enableHighAccuracy: true, timeout: 10000 }
//           );
//         });

//       let latitude = null;
//       let longitude = null;
//       try {
//         const loc = await getLocation();
//         latitude = loc.latitude;
//         longitude = loc.longitude;
//       } catch {
//         Swal.fire(
//           "Location not available",
//           "Couldn't fetch location automatically. Proceeding without location.",
//           "info"
//         );
//       }

//       const formData = new FormData();
//       formData.append("skills", skills);
//       formData.append("radiusKm", radiusKm);
//       formData.append("availability", availability ? "true" : "false");
//       formData.append("idProofType", idProofType);
//       formData.append("idProof", idProofFile);
//       if (latitude && longitude) {
//         formData.append("latitude", latitude);
//         formData.append("longitude", longitude);
//       }

//       const res = await axiosInstance.post("/volunteers/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data?.success) {
//         Swal.fire(
//           "Welcome!",
//           "You are now registered as a volunteer. Pending verification.",
//           "success"
//         );
//         if (res.data.data) {
//           localStorage.setItem("user", JSON.stringify(res.data.data));
//           setUser(res.data.data);
//         } else {
//           await refreshUserFromServer();
//         }
//       } else {
//         Swal.fire("Error", res.data?.message || "Registration failed", "error");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Failed to register as volunteer.", "error");
//     } finally {
//       setRegistering(false);
//     }
//   };

//   const toggleAvailability = async () => {
//     if (!user) return;
//     setUpdatingAvailability(true);
//     try {
//       const res = await axiosInstance.patch("/volunteers/update", {
//         availability: !user.volunteerProfile?.availability,
//       });
//       if (res.data?.success) {
//         Swal.fire("Updated", "Availability updated.", "success");
//         if (res.data.data) {
//           localStorage.setItem("user", JSON.stringify(res.data.data));
//           setUser(res.data.data);
//         } else {
//           await refreshUserFromServer();
//         }
//       }
//     } catch {
//       Swal.fire("Error", "Failed to update availability.", "error");
//     } finally {
//       setUpdatingAvailability(false);
//     }
//   };

//   const volunteerProfile = user?.volunteerProfile || null;

//   const TabButton = ({ id, label, icon }) => (
//     <button
//       onClick={() => setActiveTab(id)}
//       className={`px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2 border-b-2 ${
//         activeTab === id
//           ? "text-[#FF3D4F] border-[#FF3D4F] bg-rose-50"
//           : "text-gray-600 border-transparent hover:bg-gray-100"
//       }`}
//     >
//       {icon}
//       {label}
//     </button>
//   );

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
//                 <div className="text-xs text-slate-600">
//                   Empathy meets Intelligence
//                 </div>
//               </div>
//             </div>

//             <div className="items-center hidden gap-4 md:flex">
//               <nav className="flex items-center gap-6 text-sm text-slate-700">
//                 <a className="hover:text-slate-900">Dashboard</a>
//                 <a className="hover:text-slate-900 text-[#FF3D4F] font-semibold">
//                   Volunteer
//                 </a>
//                 <a className="hover:text-slate-900">Resources</a>
//               </nav>

//               <div className="flex items-center gap-3">
//                 <button className="p-2 rounded-md hover:bg-slate-100">
//                   <Bell className="w-5 h-5" />
//                 </button>
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

//       {/* HERO */}
//       <section className="pt-32 pb-16 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white text-center rounded-b-3xl shadow-md">
//         <h1 className="mb-3 text-4xl font-extrabold">
//           {user?.role === "volunteer"
//             ? `Welcome back, ${user.name}!`
//             : "Join the ResQNet Volunteer Force 🚀"}
//         </h1>
//         <p className="text-lg text-white/90">
//           {user?.role === "volunteer"
//             ? "Manage your missions, rewards, and availability."
//             : "Become part of a global rescue network to save lives."}
//         </p>
//       </section>

//       <main className="px-6 py-12 mx-auto max-w-7xl">
//         {loadingUser ? (
//           <div className="flex items-center justify-center text-gray-500 h-60">
//             <Loader2 className="mr-2 animate-spin" /> Loading your data...
//           </div>
//         ) : (
//           <>
//             {user?.role === "volunteer" && (
//               <div className="sticky top-0 z-10 flex gap-4 p-3 mb-8 bg-white shadow-sm rounded-xl">
//                 <TabButton
//                   id="profile"
//                   label="Volunteer Profile"
//                   icon={<CheckCircle size={16} />}
//                 />
//                 <TabButton
//                   id="tasks"
//                   label="My Tasks"
//                   icon={<ClipboardList size={16} />}
//                 />
//                 <TabButton
//                   id="requests"
//                   label="Requests"
//                   icon={<Users size={16} />}
//                 />
//                 <TabButton
//                   id="rewards"
//                   label="Rewards"
//                   icon={<Gift size={16} />}
//                 />
//               </div>
//             )}

//             {/* Active Tab Content */}
//             {activeTab === "profile" && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 {user?.role === "volunteer" ? (
//                   <VolunteerProfile
//                     user={user}
//                     volunteerProfile={volunteerProfile}
//                     toggleAvailability={toggleAvailability}
//                     updatingAvailability={updatingAvailability}
//                   />
//                 ) : (
//                   <VolunteerRegistration
//                     skills={skills}
//                     setSkills={setSkills}
//                     radiusKm={radiusKm}
//                     setRadiusKm={setRadiusKm}
//                     availability={availability}
//                     setAvailability={setAvailability}
//                     idProofType={idProofType}
//                     setIdProofType={setIdProofType}
//                     idProofFile={idProofFile}
//                     setIdProofFile={setIdProofFile}
//                     registering={registering}
//                     handleRegister={handleRegister}
//                     fileRef={fileRef}
//                   />
//                 )}
//               </motion.div>
//             )}

//             {activeTab === "tasks" && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <MyTasks user={user} />
//               </motion.div>
//             )}

//             {activeTab === "requests" && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <div className="max-w-4xl p-6 mx-auto text-center bg-white shadow-md rounded-xl">
//                   <Users className="mx-auto mb-3 text-gray-400" size={40} />
//                   <h2 className="mb-2 text-2xl font-semibold">Requests</h2>
//                   <p className="text-gray-600">
//                     No active requests right now.
//                   </p>
//                 </div>
//               </motion.div>
//             )}

//             {activeTab === "rewards" && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <div className="max-w-4xl p-6 mx-auto text-center bg-white shadow-md rounded-xl">
//                   <Gift className="mx-auto mb-3 text-gray-400" size={40} />
//                   <h2 className="mb-2 text-2xl font-semibold">Rewards & Achievements</h2>
//                   <p className="text-gray-600">
//                     No rewards yet. Keep helping others to earn badges!
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// }

// // 🧩 Subcomponents
// function VolunteerProfile({ user, volunteerProfile, toggleAvailability, updatingAvailability }) {
//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="flex items-center gap-6 p-6 mb-6 bg-white shadow-md rounded-xl">
//         <div className="flex items-center justify-center overflow-hidden bg-gray-100 border rounded-full w-28 h-28">
//           {user.profileImage ? (
//             <img src={user.profileImage} alt="profile" className="object-cover w-full h-full" />
//           ) : (
//             <div className="text-3xl">👤</div>
//           )}
//         </div>
//         <div className="flex-1">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-2xl font-semibold">{user.name}</h2>
//               <p className="text-sm text-gray-600">{user.email}</p>
//             </div>
//             <div>
//               {volunteerProfile.verified ? (
//                 <span className="flex items-center gap-1 text-sm font-semibold text-green-700">
//                   <CheckCircle size={16} /> Verified
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-1 text-sm font-medium text-yellow-700">
//                   <Clock size={14} /> Pending verification
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-3 mt-4">
//             <InfoCard label="Skills" value={(volunteerProfile.skills || []).join(", ") || "—"} />
//             <InfoCard label="Radius (km)" value={`${volunteerProfile.radiusKm ?? "—"} km`} />
//             <InfoCard label="Cases Resolved" value={volunteerProfile.totalCasesResolved ?? 0} />
//             <InfoCard label="Avg Rating" value={(volunteerProfile.averageRating ?? 0).toFixed(1)} />
//           </div>
//           <div className="flex items-center gap-4 mt-4">
//             <button
//               onClick={toggleAvailability}
//               disabled={updatingAvailability}
//               className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition ${
//                 volunteerProfile.availability
//                   ? "bg-green-600 text-white hover:bg-green-700"
//                   : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//               }`}
//             >
//               {updatingAvailability
//                 ? "Updating..."
//                 : volunteerProfile.availability
//                 ? "Available"
//                 : "Not Available"}
//             </button>
//             <div className="text-sm text-gray-500">
//               Joined: {volunteerProfile.joinedDate ? format(new Date(volunteerProfile.joinedDate), "dd/MM/yyyy") : "—"}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function VolunteerRegistration({
//   skills,
//   setSkills,
//   radiusKm,
//   setRadiusKm,
//   availability,
//   setAvailability,
//   idProofType,
//   setIdProofType,
//   idProofFile,
//   setIdProofFile,
//   registering,
//   handleRegister,
//   fileRef,
// }) {
//   return (
//     <div className="max-w-3xl p-6 mx-auto bg-white shadow-md rounded-xl">
//       <h2 className="mb-2 text-2xl font-semibold">Become a ResQNet Volunteer</h2>
//       <p className="mb-4 text-gray-600">Upload your ID proof and join the global rescue movement.</p>
//       <form onSubmit={handleRegister} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
//           <textarea
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//             className="w-full p-3 mt-1 border rounded-lg resize-none bg-gray-50"
//             rows={3}
//             required
//           />
//         </div>
//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//           <InputField label="Radius (km)" type="number" value={radiusKm} setValue={setRadiusKm} />
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Availability</label>
//             <label className="inline-flex items-center gap-2 mt-2">
//               <input
//                 type="checkbox"
//                 checked={availability}
//                 onChange={(e) => setAvailability(e.target.checked)}
//                 className="form-checkbox h-5 w-5 text-[#FF3D4F]"
//               />
//               <span className="text-sm">Available for duty</span>
//             </label>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">ID Proof Type</label>
//             <select
//               value={idProofType}
//               onChange={(e) => setIdProofType(e.target.value)}
//               className="w-full p-2 mt-1 bg-white border rounded-lg"
//               required
//             >
//               <option>Adhaar</option>
//               <option>PAN</option>
//               <option>Driving License</option>
//               <option>Passport</option>
//             </select>
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Upload ID Proof</label>
//           <input
//             ref={fileRef}
//             type="file"
//             accept="image/*,application/pdf"
//             onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
//             className="mt-2 text-sm"
//             required
//           />
//         </div>
//         <div className="flex items-center justify-end gap-3">
//           <button type="reset" className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100">
//             Reset
//           </button>
//           <button
//             type="submit"
//             disabled={registering}
//             className="px-5 py-2 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
//           >
//             {registering ? <Loader2 className="animate-spin" size={16} /> : <Camera size={16} />}
//             {registering ? "Registering..." : "Register as Volunteer"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// function InfoCard({ label, value }) {
//   return (
//     <div className="p-3 border rounded-lg bg-gray-50">
//       <div className="text-sm text-gray-500">{label}</div>
//       <div className="mt-1 font-medium">{value}</div>
//     </div>
//   );
// }

// function InputField({ label, type, value, setValue }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         className="w-full p-2 mt-1 bg-white border rounded-lg"
//         required
//       />
//     </div>
//   );
// }






import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import MyTasks from "../components/VolunteerTasks";
import {
  Loader2,
  Camera,
  CheckCircle,
  Clock,
  ClipboardList,
  Gift,
  Users,
  LogOut,
  Bell,
  User,
  Search,
  Menu,
} from "lucide-react";
import { format } from "date-fns";
import { Link, useNavigate, useLocation } from "react-router-dom";
import resqnetImage from "../pages/resqnet img.jpg";

export default function VolunteerPortal() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const location = useLocation();

  // Form states
  const [skills, setSkills] = useState("");
  const [radiusKm, setRadiusKm] = useState(10);
  const [availability, setAvailability] = useState(true);
  const [idProofType, setIdProofType] = useState("Adhaar");
  const [idProofFile, setIdProofFile] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        if (res.data?.success) {
          const fetchedUser = res.data.data.user || res.data.data;
          setUser(fetchedUser);
          localStorage.setItem("user", JSON.stringify(fetchedUser));
        } else {
          const local = localStorage.getItem("user");
          if (local) setUser(JSON.parse(local));
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
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

  const refreshUserFromServer = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      if (res.data?.success) {
        const fetchedUser = res.data.data.user || res.data.data;
        setUser(fetchedUser);
        localStorage.setItem("user", JSON.stringify(fetchedUser));
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!skills.trim() || !radiusKm || !idProofType || !idProofFile) {
      Swal.fire(
        "Missing fields",
        "Please fill all required fields and attach ID proof.",
        "warning"
      );
      return;
    }

    setRegistering(true);

    try {
      const getLocation = () =>
        new Promise((resolve, reject) => {
          if (!navigator.geolocation)
            return reject(new Error("Geolocation not supported"));
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              }),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 10000 }
          );
        });

      let latitude = null;
      let longitude = null;
      try {
        const loc = await getLocation();
        latitude = loc.latitude;
        longitude = loc.longitude;
      } catch {
        Swal.fire(
          "Location not available",
          "Couldn't fetch location automatically. Proceeding without location.",
          "info"
        );
      }

      const formData = new FormData();
      formData.append("skills", skills);
      formData.append("radiusKm", radiusKm);
      formData.append("availability", availability ? "true" : "false");
      formData.append("idProofType", idProofType);
      formData.append("idProof", idProofFile);
      if (latitude && longitude) {
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
      }

      const res = await axiosInstance.post("/volunteers/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        Swal.fire(
          "Welcome!",
          "You are now registered as a volunteer. Pending verification.",
          "success"
        );
        if (res.data.data) {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setUser(res.data.data);
        } else {
          await refreshUserFromServer();
        }
      } else {
        Swal.fire("Error", res.data?.message || "Registration failed", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to register as volunteer.", "error");
    } finally {
      setRegistering(false);
    }
  };

  const toggleAvailability = async () => {
    if (!user) return;
    setUpdatingAvailability(true);
    try {
      const res = await axiosInstance.patch("/volunteers/update", {
        availability: !user.volunteerProfile?.availability,
      });
      if (res.data?.success) {
        Swal.fire("Updated", "Availability updated.", "success");
        if (res.data.data) {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          setUser(res.data.data);
        } else {
          await refreshUserFromServer();
        }
      }
    } catch {
      Swal.fire("Error", "Failed to update availability.", "error");
    } finally {
      setUpdatingAvailability(false);
    }
  };

  const volunteerProfile = user?.volunteerProfile || null;

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-2 border-b-2 ${
        activeTab === id
          ? "text-[#FF3D4F] border-[#FF3D4F] bg-rose-50"
          : "text-gray-600 border-transparent hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900">
 {/* ✨ BEAUTIFIED NAVBAR */}
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
      {/* 🩶 Logo & Brand */}
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
          { name: "Volunteer", path: "/volunteer-portal" },
          { name: "Resources", path: "/find-resources" },
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
        <h1 className="mb-3 text-4xl font-extrabold">
          {user?.role === "volunteer"
            ? `Welcome back, ${user.name}!`
            : "Join the ResQNet Volunteer Force "}
        </h1>
        <p className="text-lg text-white/90">
          {user?.role === "volunteer"
            ? "Manage your missions, rewards, and availability."
            : "Become part of a global rescue network to save lives."}
        </p>
      </section>

      {/* CONTENT */}
      <main className="px-6 py-12 mx-auto max-w-7xl">
        {loadingUser ? (
          <div className="flex items-center justify-center text-gray-500 h-60">
            <Loader2 className="mr-2 animate-spin" /> Loading your data...
          </div>
        ) : (
          <>
            {user?.role === "volunteer" && (
              <div className="sticky top-0 z-10 flex gap-4 p-3 mb-8 bg-white shadow-sm rounded-xl">
                <TabButton
                  id="profile"
                  label="Volunteer Profile"
                  icon={<CheckCircle size={16} />}
                />
                <TabButton
                  id="tasks"
                  label="My Tasks"
                  icon={<ClipboardList size={16} />}
                />
                <TabButton
                  id="requests"
                  label="Requests"
                  icon={<Users size={16} />}
                />
                <TabButton
                  id="rewards"
                  label="Rewards"
                  icon={<Gift size={16} />}
                />
              </div>
            )}

            {/* Active Tab Content */}
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {user?.role === "volunteer" ? (
                  <VolunteerProfile
                    user={user}
                    volunteerProfile={volunteerProfile}
                    toggleAvailability={toggleAvailability}
                    updatingAvailability={updatingAvailability}
                  />
                ) : (
                  <VolunteerRegistration
                    skills={skills}
                    setSkills={setSkills}
                    radiusKm={radiusKm}
                    setRadiusKm={setRadiusKm}
                    availability={availability}
                    setAvailability={setAvailability}
                    idProofType={idProofType}
                    setIdProofType={setIdProofType}
                    idProofFile={idProofFile}
                    setIdProofFile={setIdProofFile}
                    registering={registering}
                    handleRegister={handleRegister}
                    fileRef={fileRef}
                  />
                )}
              </motion.div>
            )}

            {activeTab === "tasks" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <MyTasks user={user} />
              </motion.div>
            )}

            {activeTab === "requests" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="max-w-4xl p-6 mx-auto text-center bg-white shadow-md rounded-xl">
                  <Users className="mx-auto mb-3 text-gray-400" size={40} />
                  <h2 className="mb-2 text-2xl font-semibold">Requests</h2>
                  <p className="text-gray-600">
                    No active requests right now.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "rewards" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="max-w-4xl p-6 mx-auto text-center bg-white shadow-md rounded-xl">
                  <Gift className="mx-auto mb-3 text-gray-400" size={40} />
                  <h2 className="mb-2 text-2xl font-semibold">Rewards & Achievements</h2>
                  <p className="text-gray-600">
                    No rewards yet. Keep helping others to earn badges!
                  </p>
                </div>
              </motion.div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

/* Subcomponents */
function VolunteerProfile({ user, volunteerProfile, toggleAvailability, updatingAvailability }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-6 p-6 mb-6 bg-white shadow-md rounded-xl">
        <div className="flex items-center justify-center overflow-hidden bg-gray-100 border rounded-full w-28 h-28">
          {user.profileImage ? (
            <img src={user.profileImage} alt="profile" className="object-cover w-full h-full" />
          ) : (
            <div className="text-3xl">👤</div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div>
              {volunteerProfile.verified ? (
                <span className="flex items-center gap-1 text-sm font-semibold text-green-700">
                  <CheckCircle size={16} /> Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm font-medium text-yellow-700">
                  <Clock size={14} /> Pending verification
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <InfoCard label="Skills" value={(volunteerProfile.skills || []).join(", ") || "—"} />
            <InfoCard label="Radius (km)" value={`${volunteerProfile.radiusKm ?? "—"} km`} />
            <InfoCard label="Cases Resolved" value={volunteerProfile.totalCasesResolved ?? 0} />
            <InfoCard label="Avg Rating" value={(volunteerProfile.averageRating ?? 0).toFixed(1)} />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={toggleAvailability}
              disabled={updatingAvailability}
              className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition ${
                volunteerProfile.availability
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {updatingAvailability
                ? "Updating..."
                : volunteerProfile.availability
                ? "Available"
                : "Not Available"}
            </button>
            <div className="text-sm text-gray-500">
              Joined:{" "}
              {volunteerProfile.joinedDate
                ? format(new Date(volunteerProfile.joinedDate), "dd/MM/yyyy")
                : "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VolunteerRegistration({
  skills,
  setSkills,
  radiusKm,
  setRadiusKm,
  availability,
  setAvailability,
  idProofType,
  setIdProofType,
  idProofFile,
  setIdProofFile,
  registering,
  handleRegister,
  fileRef,
}) {
  return (
    <div className="max-w-3xl p-6 mx-auto bg-white shadow-md rounded-xl">
      <h2 className="mb-2 text-2xl font-semibold">Become a ResQNet Volunteer</h2>
      <p className="mb-4 text-gray-600">
        Join the volunteer network — upload your ID proof and start responding to emergencies.
      </p>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. first aid, rescue operations"
            className="w-full p-3 mt-1 border rounded-lg resize-none bg-gray-50"
            rows={3}
            required
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <InputField label="Radius (km)" type="number" value={radiusKm} setValue={setRadiusKm} />
          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <label className="inline-flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
                className="form-checkbox h-5 w-5 text-[#FF3D4F]"
              />
              <span className="text-sm">Available for duty</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ID Proof Type</label>
            <select
              value={idProofType}
              onChange={(e) => setIdProofType(e.target.value)}
              className="w-full p-2 mt-1 bg-white border rounded-lg"
              required
            >
              <option>Adhaar</option>
              <option>PAN</option>
              <option>Driving License</option>
              <option>Passport</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload ID Proof</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
            className="mt-2 text-sm"
            required
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            type="reset"
            onClick={() => {
              setSkills("");
              setRadiusKm(10);
              setAvailability(true);
              setIdProofType("Adhaar");
              setIdProofFile(null);
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={registering}
            className="px-5 py-2 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
          >
            {registering ? <Loader2 className="animate-spin" size={16} /> : <Camera size={16} />}
            {registering ? "Registering..." : "Register as Volunteer"}
          </button>
        </div>
      </form>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="p-3 border rounded-lg bg-gray-50">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function InputField({ label, type, value, setValue }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 mt-1 bg-white border rounded-lg"
        required
      />
    </div>
  );
}
