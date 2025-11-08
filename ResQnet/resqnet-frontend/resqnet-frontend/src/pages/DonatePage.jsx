// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { HeartHandshake, Mail, Phone, MapPin } from "lucide-react";

// export default function DonatePage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     amount: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     Swal.fire({
//       icon: "success",
//       title: "Thank You ❤️",
//       text: "Your contribution will help save more lives!",
//       confirmButtonColor: "#800020",
//     });
//     setFormData({ name: "", email: "", amount: "", message: "" });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f9f5ef] via-white to-[#fdfdfd] text-slate-800">
//       {/* HERO SECTION */}
//       <section className="relative overflow-hidden py-24 text-center bg-gradient-to-r from-[#aa2222] via-[#800020] to-[#4a0015] text-[#f9f5ef] rounded-b-3xl">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-4 text-5xl font-extrabold"
//         >
//           Make a Difference 💞
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           className="max-w-2xl mx-auto text-lg text-[#fbecec]"
//         >
//           Every donation brings us closer to saving lives and spreading hope.
//           Your kindness powers ResQNet’s mission to connect help faster.
//         </motion.p>
//       </section>

//       {/* DONATION FORM */}
//       <section className="max-w-4xl px-6 py-16 mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="p-8 bg-white border shadow-xl rounded-2xl border-slate-100"
//         >
//           <h2 className="mb-6 text-3xl font-bold text-center text-[#800020]">
//             Donation Form
//           </h2>
//           <form onSubmit={handleSubmit} className="grid gap-6">
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div>
//                 <label className="text-sm font-semibold text-slate-600">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#800020] focus:outline-none"
//                   placeholder="Enter your name"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-slate-600">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#800020] focus:outline-none"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-slate-600">
//                 Donation Amount (₹)
//               </label>
//               <input
//                 type="number"
//                 name="amount"
//                 required
//                 value={formData.amount}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#800020] focus:outline-none"
//                 placeholder="e.g., 500"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-slate-600">
//                 Message (optional)
//               </label>
//               <textarea
//                 name="message"
//                 rows="3"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#800020] focus:outline-none"
//                 placeholder="Write a kind message..."
//               />
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               type="submit"
//               className="w-full py-3 text-lg font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-[#aa2222] via-[#800020] to-[#4a0015] hover:opacity-90 transition"
//             >
//               <HeartHandshake className="inline mr-2 -mt-1" /> Donate Now
//             </motion.button>
//           </form>
//         </motion.div>
//       </section>

//       {/* CONTACT / FOOTER */}
//       <footer className="mt-12 bg-[#800020] text-[#f9f5ef] py-10 text-center rounded-t-3xl">
//         <div className="max-w-4xl px-6 mx-auto space-y-4">
//           <p className="text-lg font-semibold">Need Help or Have Questions?</p>
//           <div className="flex flex-wrap justify-center gap-6 text-sm">
//             <span className="flex items-center gap-2">
//               <Mail size={16} /> contact@resqnet.com
//             </span>
//             <span className="flex items-center gap-2">
//               <Phone size={16} /> +91 98765 43210
//             </span>
//             <span className="flex items-center gap-2">
//               <MapPin size={16} /> 123 Care Street, City, India
//             </span>
//           </div>

//           <div className="pt-4 mt-4 text-sm border-t border-[#f9f5ef]/30">
//             “Together, we build a network of care.”
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { HeartHandshake, Mail, Phone, MapPin } from "lucide-react";

export default function DonatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Thank You ❤️",
      text: "Your contribution brings hope to someone in need.",
      confirmButtonColor: "#D241A6",
    });
    setFormData({ name: "", email: "", amount: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5ef] via-white to-[#fdfdfd] text-slate-800">
      {/* HERO SECTION */}
      <section className="relative py-24 text-center bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-[#f9f5ef] rounded-b-3xl shadow-lg">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-5xl font-extrabold"
        >
          Together, We Make Hope Possible 
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mx-auto text-lg text-[#FFDDE1]"
        >
          Every donation powers life-saving missions, connects volunteers, and
          helps families in need — thank you for being part of the ResQNet
          family.
        </motion.p>
      </section>

      {/* DONATION FORM */}
      <section className="max-w-4xl px-6 py-16 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-8 border shadow-xl bg-white/90 rounded-2xl border-white/40 backdrop-blur-md"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-[#1E2A78]">
            Make a Donation
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#D241A6] focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#D241A6] focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                required
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#D241A6] focus:outline-none"
                placeholder="e.g., 500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                Message (optional)
              </label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-[#D241A6] focus:outline-none"
                placeholder="Leave a kind message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white rounded-full shadow-md bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] hover:opacity-90 transition"
            >
              <HeartHandshake className="inline mr-2 -mt-1" /> Donate Now
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="mt-12 bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78] text-[#f9f5ef] py-10 text-center rounded-t-3xl shadow-lg">
        <div className="max-w-4xl px-6 mx-auto space-y-4">
          <p className="text-lg font-semibold">Need Help or Have Questions?</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <Mail size={16} /> contact@resqnet.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> 123 Care Street, City, India
            </span>
          </div>

          <div className="pt-4 mt-4 text-sm border-t border-[#f9f5ef]/30">
            “Together, we build a network of care.”
          </div>
        </div>
      </footer>
    </div>
  );
}
