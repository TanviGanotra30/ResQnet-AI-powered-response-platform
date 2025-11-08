// import React, { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import InputField from "../components/InputField";
// import Swal from "sweetalert2";
// import { Eye, EyeOff, MailCheck, Send } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// /**
//  * src/pages/AuthPage.jsx
//  * Login / Register page with email OTP verification, confirm password,
//  * eye toggles, paste-block, and SweetAlert feedback.
//  */

// export default function AuthPage() {
//     const [mode, setMode] = useState("login");
//     const [loading, setLoading] = useState(false);

//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//     });

//     const [otpToken, setOtpToken] = useState("");
//     const [otp, setOtp] = useState("");
//     const [emailVerified, setEmailVerified] = useState(false);
//     const [otpStage, setOtpStage] = useState(false); // show OTP input after sending

//     const toggleMode = (m) => {
//         setMode(m);
//         setForm({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
//         setOtpToken("");
//         setOtp("");
//         setEmailVerified(false);
//         setOtpStage(false);
//         setShowPassword(false);
//         setShowConfirmPassword(false);
//     };

//     const handleChange = (e) =>
//         setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//     // Disable paste in confirm password
//     const preventPaste = (e) => {
//         e.preventDefault();
//         Swal.fire({
//             icon: "warning",
//             title: "Paste disabled",
//             text: "Please type your password manually.",
//             timer: 1500,
//             showConfirmButton: false,
//         });
//     };

//     /** ✅ Send OTP to Email */
//     const handleSendOtp = async () => {
//         if (!form.email) {
//             Swal.fire("Warning", "Please enter your email first.", "warning");
//             return;
//         }

//         try {
//             setLoading(true);

//             // 🧠 1️⃣ Check if email already registered
//             const check = await axiosInstance.post("/auth/check-email", { email: form.email });
//             if (check.data?.data?.exists) {
//                 Swal.fire({
//                     icon: "info",
//                     title: "Already Registered",
//                     text: "This email is already registered. Try logging in instead.",
//                 });
//                 setLoading(false);
//                 return;
//             }

//             // 🧠 2️⃣ Proceed to send OTP
//             const res = await axiosInstance.post("/auth/send-otp", { email: form.email });
//             if (res.data.success) {
//                 setOtpToken(res.data.data.token);
//                 setOtpStage(true);
//                 Swal.fire("Sent!", "OTP sent to your email successfully.", "success");
//             }
//         } catch (err) {
//             const msg = err?.response?.data?.message || "Failed to send OTP.";
//             Swal.fire("Error", msg, "error");
//         } finally {
//             setLoading(false);
//         }
//     };


//     /** ✅ Verify OTP */
//     const handleVerifyOtp = async () => {
//         if (!otp) {
//             Swal.fire("Warning", "Enter the OTP you received.", "warning");
//             return;
//         }

//         try {
//             setLoading(true);
//             const res = await axiosInstance.post("/auth/verify-otp", {
//                 otp,
//                 token: otpToken,
//             });

//             if (res.data.success && res.data.data.verified) {
//                 setEmailVerified(true);
//                 setOtpStage(false);
//                 Swal.fire("Verified!", "Email verified successfully!", "success");
//             }
//         } catch (err) {
//             const msg = err?.response?.data?.message || "Invalid or expired OTP.";
//             Swal.fire("Error", msg, "error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     /** ✅ Final form submission */
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (mode === "register") {
//             if (!emailVerified) {
//                 Swal.fire("Error", "Please verify your email before signing up.", "error");
//                 return;
//             }

//             if (form.password !== form.confirmPassword) {
//                 Swal.fire("Error", "Passwords do not match!", "error");
//                 return;
//             }
//         }

//         setLoading(true);
//         try {
//             if (mode === "login") {
//                 const res = await axiosInstance.post("/auth/login", {
//                     email: form.email,
//                     password: form.password,
//                 });
//                 if (res.data.success) {
//                     const token = res.data.data.accessToken;
//                     const user = res.data.data.user;
//                     localStorage.setItem("access_token", token);
//                     localStorage.setItem("user", JSON.stringify(user));
//                     Swal.fire("Welcome", "Login successful!", "success");
//                     window.location.href = "/home";
//                 }
//             } else {
//                 const res = await axiosInstance.post("/auth/register", {
//                     name: form.name,
//                     email: form.email,
//                     phone: form.phone,
//                     password: form.password,
//                 });
//                 if (res.data.success) {
//                     const token = res.data.data.accessToken;
//                     const user = res.data.data.user;
//                     localStorage.setItem("access_token", token);
//                     localStorage.setItem("user", JSON.stringify(user));
//                     Swal.fire("Success", "Registration completed!", "success");
//                     window.location.href = "/home";
//                 }
//             }
//         } catch (err) {
//             const msg = err?.response?.data?.message || "Something went wrong!";
//             Swal.fire("Error", msg, "error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Quote side
//     const leftQuote =
//         mode === "login"
//             ? { text: "When disaster strikes, the time to prepare has passed.", author: "" }
//             : { text: "In the midst of every crisis, lies great opportunity.", author: "— Albert Einstein" };

//     return (
//         <div className="flex items-center justify-center min-h-screen px-6">
//             <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden shadow-xl md:grid-cols-2 rounded-xl">
//                 {/* LEFT SIDE */}
//                 <motion.div
//                     key="quote"
//                     initial={{ opacity: 0, x: -30 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="flex flex-col justify-center p-12 text-white bg-gradient-to-r from-red-600 via-purple-600 to-violet-600"
//                 >
//                     <div className="p-8 rounded-l-xl backdrop-blur-sm">
//                         <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">resQnet</h1>
//                         <p className="text-lg italic opacity-90">{leftQuote.text}</p>
//                         {leftQuote.author && <p className="mt-6 text-sm opacity-90">{leftQuote.author}</p>}
//                     </div>
//                 </motion.div>

//                 {/* RIGHT SIDE */}
//                 <div className="p-10 bg-white">
//                     <div className="max-w-md mx-auto">
//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={mode}
//                                 initial={{ opacity: 0, x: 30 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -30 }}
//                                 transition={{ duration: 0.35 }}
//                             >
//                                 <h2 className="mb-6 text-2xl font-bold text-center text-rose-700">
//                                     {mode === "login" ? "Login" : "Sign Up"}
//                                 </h2>

//                                 <form onSubmit={handleSubmit}>
//                                     {mode === "register" && (
//                                         <InputField
//                                             label="Username"
//                                             name="name"
//                                             value={form.name}
//                                             onChange={handleChange}
//                                             placeholder="Enter your name"
//                                             required
//                                         />
//                                     )}

//                                     {/* EMAIL + SEND OTP */}
//                                     <label className="block mb-4">
//                                         <div className="mb-2 text-sm font-medium text-gray-700">Email</div>
//                                         <div className="flex gap-2">
//                                             <input
//                                                 type="email"
//                                                 name="email"
//                                                 value={form.email}
//                                                 onChange={handleChange}
//                                                 className="flex-1 input"
//                                                 placeholder="Enter your email"
//                                                 required
//                                                 disabled={emailVerified}
//                                             />
//                                             {mode === "register" && !emailVerified && (
//                                                 <button
//                                                     type="button"
//                                                     onClick={handleSendOtp}
//                                                     disabled={loading}
//                                                     className="flex items-center gap-1 px-3 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
//                                                 >
//                                                     <Send size={16} /> Send
//                                                 </button>
//                                             )}
//                                             {emailVerified && (
//                                                 <MailCheck size={22} className="mt-2 text-green-600" title="Email Verified" />
//                                             )}
//                                         </div>
//                                     </label>

//                                     {/* OTP INPUT */}
//                                     {otpStage && !emailVerified && (
//                                         <label className="block mb-4">
//                                             <div className="mb-2 text-sm font-medium text-gray-700">Enter OTP</div>
//                                             <div className="flex gap-2">
//                                                 <input
//                                                     type="text"
//                                                     value={otp}
//                                                     onChange={(e) => setOtp(e.target.value)}
//                                                     maxLength={6}
//                                                     className="flex-1 input"
//                                                     placeholder="6-digit code"
//                                                 />
//                                                 <button
//                                                     type="button"
//                                                     onClick={handleVerifyOtp}
//                                                     disabled={loading}
//                                                     className="px-3 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
//                                                 >
//                                                     Verify
//                                                 </button>
//                                             </div>
//                                         </label>
//                                     )}

//                                     {/* PASSWORD */}
//                                     <label className="relative block mb-4">
//                                         <div className="mb-2 text-sm font-medium text-gray-700">Password</div>
//                                         <input
//                                             className="pr-10 input"
//                                             type={showPassword ? "text" : "password"}
//                                             name="password"
//                                             value={form.password}
//                                             onChange={handleChange}
//                                             placeholder="Enter your password"
//                                             required
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword((s) => !s)}
//                                             className="absolute text-gray-500 right-3 top-9 hover:text-gray-700"
//                                         >
//                                             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                         </button>
//                                     </label>

//                                     {/* CONFIRM PASSWORD */}
//                                     {mode === "register" && (
//                                         <label className="relative block mb-4">
//                                             <div className="mb-2 text-sm font-medium text-gray-700">Confirm Password</div>
//                                             <input
//                                                 className="pr-10 input"
//                                                 type={showConfirmPassword ? "text" : "password"}
//                                                 name="confirmPassword"
//                                                 value={form.confirmPassword}
//                                                 onChange={handleChange}
//                                                 placeholder="Re-type password"
//                                                 required
//                                                 onPaste={preventPaste}
//                                                 onDrop={preventPaste}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowConfirmPassword((s) => !s)}
//                                                 className="absolute text-gray-500 right-3 top-9 hover:text-gray-700"
//                                             >
//                                                 {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                             </button>
//                                         </label>
//                                     )}

//                                     {mode === "register" && (
//                                         <InputField
//                                             label="Phone Number"
//                                             name="phone"
//                                             type="text"
//                                             value={form.phone}
//                                             onChange={handleChange}
//                                             placeholder="Enter your phone number"
//                                             required
//                                         />
//                                     )}

//                                     <button
//                                         type="submit"
//                                         disabled={loading || (mode === "register" && !emailVerified)}
//                                         className={`w-full mt-4 mb-2 py-3 text-white rounded-lg font-semibold transition ${mode === "register" && !emailVerified
//                                                 ? "bg-gray-400 cursor-not-allowed"
//                                                 : "bg-red-600 hover:bg-red-700"
//                                             }`}
//                                     >
//                                         {loading
//                                             ? mode === "login"
//                                                 ? "Logging in..."
//                                                 : "Processing..."
//                                             : mode === "login"
//                                                 ? "Login"
//                                                 : "Sign Up"}
//                                     </button>
//                                 </form>

//                                 <div className="mt-4 text-center">
//                                     {mode === "login" ? (
//                                         <>
//                                             Don’t have an account?{" "}
//                                             <button
//                                                 onClick={() => toggleMode("register")}
//                                                 className="font-semibold text-rose-600 hover:underline"
//                                             >
//                                                 Sign Up
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             Already have an account?{" "}
//                                             <button
//                                                 onClick={() => toggleMode("login")}
//                                                 className="font-semibold text-rose-600 hover:underline"
//                                             >
//                                                 Login
//                                             </button>
//                                         </>
//                                     )}
//                                 </div>
//                             </motion.div>
//                         </AnimatePresence>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }







// import React, { useState, useEffect } from "react";
// import axiosInstance from "../api/axiosInstance";
// import InputField from "../components/InputField";
// import Swal from "sweetalert2";
// import { Eye, EyeOff, MailCheck, Send } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// /**
//  * src/pages/AuthPage.jsx
//  * Login / Register page with OTP resend cooldown (30s), wrong-attempt lock,
//  * email verification, confirm password validation, and SweetAlert messages.
//  */

// export default function AuthPage() {
//   const [mode, setMode] = useState("login");
//   const [loading, setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [otpToken, setOtpToken] = useState("");
//   const [otp, setOtp] = useState("");
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [otpStage, setOtpStage] = useState(false);

//   // ⏳ Cooldown timer for resend OTP
//   const [otpCooldown, setOtpCooldown] = useState(0);
//   const [timerId, setTimerId] = useState(null);

//   // ⚠️ Wrong OTP attempts tracking
//   const [wrongAttempts, setWrongAttempts] = useState(0);
//   const [otpLocked, setOtpLocked] = useState(false);

//   const toggleMode = (m) => {
//     setMode(m);
//     setForm({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
//     setOtpToken("");
//     setOtp("");
//     setEmailVerified(false);
//     setOtpStage(false);
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//     setOtpCooldown(0);
//     setWrongAttempts(0);
//     setOtpLocked(false);
//     if (timerId) clearInterval(timerId);
//   };

//   const handleChange = (e) =>
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const preventPaste = (e) => {
//     e.preventDefault();
//     Swal.fire({
//       icon: "warning",
//       title: "Paste disabled",
//       text: "Please type your password manually.",
//       timer: 1500,
//       showConfirmButton: false,
//     });
//   };

//   /** ✅ Send or Resend OTP */
//   const handleSendOtp = async () => {
//     if (!form.email) {
//       Swal.fire("Warning", "Please enter your email first.", "warning");
//       return;
//     }

//     if (otpCooldown > 0) return; // prevent spam clicks during cooldown

//     try {
//       setLoading(true);

//       // 🧠 Step 1: Check if email already registered
//       const check = await axiosInstance.post("/auth/check-email", { email: form.email });
//       if (check.data?.data?.exists) {
//         Swal.fire({
//           icon: "info",
//           title: "Already Registered",
//           text: "This email is already registered. Try logging in instead.",
//         });
//         setLoading(false);
//         return;
//       }

//       // 🧠 Step 2: Send OTP
//       const res = await axiosInstance.post("/auth/send-otp", { email: form.email });
//       if (res.data.success) {
//         setOtpToken(res.data.data.token);
//         setOtpStage(true);
//         setWrongAttempts(0); // ✅ reset attempts
//         setOtpLocked(false); // ✅ unlock OTP
//         Swal.fire("Sent!", "OTP sent to your email successfully.", "success");

//         // ⏳ Start cooldown timer (30 seconds)
//         setOtpCooldown(30);
//         const id = setInterval(() => {
//           setOtpCooldown((prev) => {
//             if (prev <= 1) {
//               clearInterval(id);
//               return 0;
//             }
//             return prev - 1;
//           });
//         }, 1000);
//         setTimerId(id);
//       }
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Failed to send OTP.";
//       Swal.fire("Error", msg, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /** ✅ Verify OTP with 5-attempt limit */
//   const handleVerifyOtp = async () => {
//     if (otpLocked) {
//       Swal.fire("Locked", "Too many invalid attempts. Please resend OTP.", "warning");
//       return;
//     }

//     if (!otp) {
//       Swal.fire("Warning", "Enter the OTP you received.", "warning");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axiosInstance.post("/auth/verify-otp", {
//         otp,
//         token: otpToken,
//       });

//       if (res.data.success && res.data.data.verified) {
//         setEmailVerified(true);
//         setOtpStage(false);
//         setWrongAttempts(0);
//         setOtpLocked(false);
//         Swal.fire("Verified!", "Email verified successfully!", "success");
//       }
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Invalid or expired OTP.";

//       // ❌ Increment wrong attempts
//       setWrongAttempts((prev) => {
//         const newCount = prev + 1;
//         if (newCount >= 5) {
//           setOtpLocked(true);
//           Swal.fire(
//             "Too Many Attempts",
//             "You've entered the wrong OTP 5 times. Please resend OTP.",
//             "error"
//           );
//         } else {
//           Swal.fire("Error", `Invalid OTP. ${5 - newCount} attempts left.`, "error");
//         }
//         return newCount;
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   /** ✅ Final form submission */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (mode === "register") {
//       if (!emailVerified) {
//         Swal.fire("Error", "Please verify your email before signing up.", "error");
//         return;
//       }

//       if (form.password !== form.confirmPassword) {
//         Swal.fire("Error", "Passwords do not match!", "error");
//         return;
//       }
//     }

//     setLoading(true);
//     try {
//       if (mode === "login") {
//         const res = await axiosInstance.post("/auth/login", {
//           email: form.email,
//           password: form.password,
//         });
//         if (res.data.success) {
//           const token = res.data.data.accessToken;
//           const user = res.data.data.user;
//           localStorage.setItem("access_token", token);
//           localStorage.setItem("user", JSON.stringify(user));
//           Swal.fire("Welcome", "Login successful!", "success");
//           window.location.href = "/home";
//         }
//       } else {
//         const res = await axiosInstance.post("/auth/register", {
//           name: form.name,
//           email: form.email,
//           phone: form.phone,
//           password: form.password,
//         });
//         if (res.data.success) {
//           const token = res.data.data.accessToken;
//           const user = res.data.data.user;
//           localStorage.setItem("access_token", token);
//           localStorage.setItem("user", JSON.stringify(user));
//           Swal.fire("Success", "Registration completed!", "success");
//           window.location.href = "/home";
//         }
//       }
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Something went wrong!";
//       Swal.fire("Error", msg, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (timerId) clearInterval(timerId);
//     };
//   }, [timerId]);

//   const leftQuote =
//     mode === "login"
//       ? { text: "When disaster strikes, the time to prepare has passed.", author: "" }
//       : {
//           text: "In the midst of every crisis, lies great opportunity.",
//           author: "— Albert Einstein",
//         };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-6">
//       <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden shadow-xl md:grid-cols-2 rounded-xl">
//         {/* LEFT SIDE */}
//         <motion.div
//           key="quote"
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="flex flex-col justify-center p-12 text-white bg-gradient-to-r from-red-600 via-purple-600 to-violet-600"
//         >
//           <div className="p-8 rounded-l-xl backdrop-blur-sm">
//             <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">resQnet</h1>
//             <p className="text-lg italic opacity-90">{leftQuote.text}</p>
//             {leftQuote.author && <p className="mt-6 text-sm opacity-90">{leftQuote.author}</p>}
//           </div>
//         </motion.div>

//         {/* RIGHT SIDE */}
//         <div className="p-10 bg-white">
//           <div className="max-w-md mx-auto">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={mode}
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: 0.35 }}
//               >
//                 <h2 className="mb-6 text-2xl font-bold text-center text-rose-700">
//                   {mode === "login" ? "Login" : "Sign Up"}
//                 </h2>

//                 <form onSubmit={handleSubmit}>
//                   {mode === "register" && (
//                     <InputField
//                       label="Username"
//                       name="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       placeholder="Enter your name"
//                       required
//                     />
//                   )}

//                   {/* EMAIL + SEND/RESEND OTP */}
//                   <label className="block mb-4">
//                     <div className="mb-2 text-sm font-medium text-gray-700">Email</div>
//                     <div className="flex gap-2">
//                       <input
//                         type="email"
//                         name="email"
//                         value={form.email}
//                         onChange={handleChange}
//                         className="flex-1 input"
//                         placeholder="Enter your email"
//                         required
//                         disabled={emailVerified}
//                       />
//                       {mode === "register" && !emailVerified && (
//                         <button
//                           type="button"
//                           onClick={handleSendOtp}
//                           disabled={loading || otpCooldown > 0}
//                           className={`px-3 text-white rounded-lg transition flex items-center gap-1 ${
//                             otpCooldown > 0
//                               ? "bg-gray-400 cursor-not-allowed"
//                               : "bg-blue-500 hover:bg-blue-600"
//                           }`}
//                         >
//                           {otpCooldown > 0 ? (
//                             <>Resend OTP ({otpCooldown}s)</>
//                           ) : (
//                             <>
//                               <Send size={16} /> {otpToken ? "Resend OTP" : "Send OTP"}
//                             </>
//                           )}
//                         </button>
//                       )}
//                       {emailVerified && (
//                         <MailCheck size={22} className="mt-2 text-green-600" title="Email Verified" />
//                       )}
//                     </div>
//                   </label>

//                   {/* OTP INPUT */}
//                   {otpStage && !emailVerified && (
//                     <label className="block mb-4">
//                       <div className="mb-2 text-sm font-medium text-gray-700">Enter OTP</div>
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           value={otp}
//                           onChange={(e) => setOtp(e.target.value)}
//                           maxLength={6}
//                           className={`input flex-1 ${
//                             otpLocked ? "border-red-500 bg-red-50 cursor-not-allowed" : ""
//                           }`}
//                           placeholder={otpLocked ? "Please resend OTP" : "6-digit code"}
//                           disabled={otpLocked}
//                         />
//                         <button
//                           type="button"
//                           onClick={handleVerifyOtp}
//                           disabled={loading || otpLocked}
//                           className={`px-3 rounded-lg text-white transition ${
//                             otpLocked
//                               ? "bg-gray-400 cursor-not-allowed"
//                               : "bg-green-500 hover:bg-green-600"
//                           }`}
//                         >
//                           Verify
//                         </button>
//                       </div>
//                     </label>
//                   )}

//                   {/* PASSWORDS */}
//                   <label className="relative block mb-4">
//                     <div className="mb-2 text-sm font-medium text-gray-700">Password</div>
//                     <input
//                       className="pr-10 input"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={form.password}
//                       onChange={handleChange}
//                       placeholder="Enter your password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((s) => !s)}
//                       className="absolute text-gray-500 right-3 top-9 hover:text-gray-700"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </label>

//                   {mode === "register" && (
//                     <label className="relative block mb-4">
//                       <div className="mb-2 text-sm font-medium text-gray-700">Confirm Password</div>
//                       <input
//                         className="pr-10 input"
//                         type={showConfirmPassword ? "text" : "password"}
//                         name="confirmPassword"
//                         value={form.confirmPassword}
//                         onChange={handleChange}
//                         placeholder="Re-type password"
//                         required
//                         onPaste={preventPaste}
//                         onDrop={preventPaste}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword((s) => !s)}
//                         className="absolute text-gray-500 right-3 top-9 hover:text-gray-700"
//                       >
//                         {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                       </button>
//                     </label>
//                   )}

//                   {mode === "register" && (
//                     <InputField
//                       label="Phone Number"
//                       name="phone"
//                       type="text"
//                       value={form.phone}
//                       onChange={handleChange}
//                       placeholder="Enter your phone number"
//                       required
//                     />
//                   )}

//                   <button
//                     type="submit"
//                     disabled={loading || (mode === "register" && !emailVerified)}
//                     className={`w-full mt-4 mb-2 py-3 text-white rounded-lg font-semibold transition ${
//                       mode === "register" && !emailVerified
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-red-600 hover:bg-red-700"
//                     }`}
//                   >
//                     {loading
//                       ? mode === "login"
//                         ? "Logging in..."
//                         : "Processing..."
//                       : mode === "login"
//                       ? "Login"
//                       : "Sign Up"}
//                   </button>
//                 </form>

//                 <div className="mt-4 text-center">
//                   {mode === "login" ? (
//                     <>
//                       Don’t have an account?{" "}
//                       <button
//                         onClick={() => toggleMode("register")}
//                         className="font-semibold text-rose-600 hover:underline"
//                       >
//                         Sign Up
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       Already have an account?{" "}
//                       <button
//                         onClick={() => toggleMode("login")}
//                         className="font-semibold text-rose-600 hover:underline"
//                       >
//                         Login
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import InputField from "../components/InputField";
import Swal from "sweetalert2";
import { Eye, EyeOff, MailCheck, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpStage, setOtpStage] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [otpLocked, setOtpLocked] = useState(false);

  const toggleMode = (m) => {
    setMode(m);
    setForm({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
    setOtpToken("");
    setOtp("");
    setEmailVerified(false);
    setOtpStage(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setOtpCooldown(0);
    setWrongAttempts(0);
    setOtpLocked(false);
    if (timerId) clearInterval(timerId);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const preventPaste = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Paste disabled",
      text: "Please type your password manually.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleSendOtp = async () => {
    if (!form.email) {
      Swal.fire("Warning", "Please enter your email first.", "warning");
      return;
    }
    if (otpCooldown > 0) return;

    try {
      setLoading(true);
      const check = await axiosInstance.post("/auth/check-email", { email: form.email });
      if (check.data?.data?.exists) {
        Swal.fire({
          icon: "info",
          title: "Already Registered",
          text: "This email is already registered. Try logging in instead.",
        });
        setLoading(false);
        return;
      }

      const res = await axiosInstance.post("/auth/send-otp", { email: form.email });
      if (res.data.success) {
        setOtpToken(res.data.data.token);
        setOtpStage(true);
        setWrongAttempts(0);
        setOtpLocked(false);
        Swal.fire("Sent!", "OTP sent to your email successfully.", "success");
        setOtpCooldown(30);
        const id = setInterval(() => {
          setOtpCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(id);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setTimerId(id);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to send OTP.";
      Swal.fire("Error", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpLocked) {
      Swal.fire("Locked", "Too many invalid attempts. Please resend OTP.", "warning");
      return;
    }
    if (!otp) {
      Swal.fire("Warning", "Enter the OTP you received.", "warning");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/verify-otp", { otp, token: otpToken });
      if (res.data.success && res.data.data.verified) {
        setEmailVerified(true);
        setOtpStage(false);
        setWrongAttempts(0);
        setOtpLocked(false);
        Swal.fire("Verified!", "Email verified successfully!", "success");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid or expired OTP.";
      setWrongAttempts((prev) => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          setOtpLocked(true);
          Swal.fire("Too Many Attempts", "Please resend OTP.", "error");
        } else {
          Swal.fire("Error", `Invalid OTP. ${5 - newCount} attempts left.`, "error");
        }
        return newCount;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "register" && !emailVerified) {
      Swal.fire("Error", "Please verify your email before signing up.", "error");
      return;
    }
    if (mode === "register" && form.password !== form.confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const res = await axiosInstance.post("/auth/login", {
          email: form.email,
          password: form.password,
        });
        if (res.data.success) {
          localStorage.setItem("access_token", res.data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          Swal.fire("Welcome", "Login successful!", "success");
          window.location.href = "/home";
        }
      } else {
        const res = await axiosInstance.post("/auth/register", form);
        if (res.data.success) {
          localStorage.setItem("access_token", res.data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          Swal.fire("Success", "Registration completed!", "success");
          window.location.href = "/home";
        }
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong!";
      Swal.fire("Error", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  const leftQuote =
    mode === "login"
      ? { text: "When disaster strikes, the time to prepare has passed." }
      : { text: "In the midst of every crisis, lies great opportunity.", author: "— Albert Einstein" };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78]
">
      {/* Floating Glass Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden border shadow-2xl md:grid-cols-2 rounded-2xl backdrop-blur-lg bg-white/20 border-white/30">
        {/* LEFT SIDE */}
        <motion.div
          key="quote"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center p-12 text-white backdrop-blur-lg bg-gradient-to-r from-[#E63946] via-[#9D2FFF] to-[#1D3557]"
        >
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight">ResQNet</h1>
          <p className="text-lg italic opacity-90">{leftQuote.text}</p>
          {leftQuote.author && <p className="mt-6 text-sm opacity-90">{leftQuote.author}</p>}
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="p-10 bg-white/70 backdrop-blur-2xl">
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <h2 className="mb-6 text-3xl font-bold text-center text-slate-800">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "register" && (
                    <InputField
                      label="Full Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  )}

                  {/* EMAIL */}
                  <label className="block">
                    <div className="mb-2 text-sm font-medium text-gray-700">Email</div>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg input focus:ring-2 focus:ring-rose-400"
                        placeholder="Enter your email"
                        required
                        disabled={emailVerified}
                      />
                      {mode === "register" && !emailVerified && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={loading || otpCooldown > 0}
                          className={`px-3 text-white rounded-lg transition flex items-center gap-1 ${
                            otpCooldown > 0
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-[#E63946] to-[#9D2FFF] hover:opacity-90"
                          }`}
                        >
                          {otpCooldown > 0 ? (
                            <>Resend OTP ({otpCooldown}s)</>
                          ) : (
                            <>
                              <Send size={16} /> {otpToken ? "Resend" : "Send"}
                            </>
                          )}
                        </button>
                      )}
                      {emailVerified && <MailCheck size={22} className="mt-2 text-green-600" />}
                    </div>
                  </label>

                  {/* OTP */}
                  {otpStage && !emailVerified && (
                    <label className="block">
                      <div className="mb-2 text-sm font-medium text-gray-700">Enter OTP</div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          maxLength={6}
                          className={`input flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-400 ${
                            otpLocked ? "bg-red-50 cursor-not-allowed" : ""
                          }`}
                          placeholder={otpLocked ? "Please resend OTP" : "6-digit code"}
                          disabled={otpLocked}
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={loading || otpLocked}
                          className={`px-3 rounded-lg text-white transition ${
                            otpLocked
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-[#E63946] to-[#9D2FFF] hover:opacity-90"
                          }`}
                        >
                          Verify
                        </button>
                      </div>
                    </label>
                  )}

                  {/* PASSWORDS */}
                  <label className="relative block">
                    <div className="mb-2 text-sm font-medium text-gray-700">Password</div>
                    <input
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute text-gray-500 right-3 top-9 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </label>

                  {mode === "register" && (
                    <label className="relative block">
                      <div className="mb-2 text-sm font-medium text-gray-700">Confirm Password</div>
                      <input
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-type password"
                        required
                        onPaste={preventPaste}
                        onDrop={preventPaste}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((s) => !s)}
                        className="absolute text-gray-500 right-3 top-9 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </label>
                  )}

                  {mode === "register" && (
                    <InputField
                      label="Phone Number"
                      name="phone"
                      type="text"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  )}

                  <button
                    type="submit"
                    disabled={loading || (mode === "register" && !emailVerified)}
                    className={`w-full mt-4 mb-2 py-3 text-white rounded-lg font-semibold transition ${
                      mode === "register" && !emailVerified
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#E63946] to-[#9D2FFF] hover:opacity-90"
                    }`}
                  >
                    {loading
                      ? mode === "login"
                        ? "Logging in..."
                        : "Processing..."
                      : mode === "login"
                      ? "Login"
                      : "Sign Up"}
                  </button>
                </form>

                <div className="mt-4 text-center text-gray-700">
                  {mode === "login" ? (
                    <>
                      Don’t have an account?{" "}
                      <button
                        onClick={() => toggleMode("register")}
                        className="font-semibold text-rose-600 hover:underline"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => toggleMode("login")}
                        className="font-semibold text-rose-600 hover:underline"
                      >
                        Login
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Orbs Animation */}
      <style jsx>{`
        .orb {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.4;
          animation: floatOrb 15s ease-in-out infinite alternate;
        }
        .orb1 {
          background: radial-gradient(circle, #ff7ab3, transparent 60%);
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }
        .orb2 {
          background: radial-gradient(circle, #d8b4fe, transparent 60%);
          top: 40%;
          left: 60%;
          animation-delay: 3s;
        }
        .orb3 {
          background: radial-gradient(circle, #9ec5ff, transparent 60%);
          bottom: 10%;
          right: 10%;
          animation-delay: 6s;
        }
        @keyframes floatOrb {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          100% {
            transform: translateY(-40px) translateX(40px);
          }
        }
      `}</style>
    </div>
  );
}
