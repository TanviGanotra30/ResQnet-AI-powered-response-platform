// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { HeartPulse, Users, MapPin, Bell, ShieldCheck } from "lucide-react";
// import vid from "../pages/videoHand.mp4";

// export default function LandingPage() {
//   return (
//     <div className="relative min-h-screen overflow-hidden text-slate-800 bg-gradient-to-br from-[#FF3D4F] via-[#D241A6] to-[#1E2A78]">
//       {/* Floating background orbs */}
//       <div className="absolute inset-0 overflow-hidden -z-10">
//         {/* <div className="orb orb1"></div>
//         <div className="orb orb2"></div>
//         <div className="orb orb3"></div> */}
//         <video src={vid}></video>
//       </div>

//       {/* HERO SECTION */}
//       <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-[#f9f5ef]">
//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl font-extrabold md:text-6xl"
//         >
//           ResQNet
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//           className="mt-4 max-w-2xl text-lg text-[#FFDDE1]"
//         >
//           Empowering communities through real-time emergency response,
//           intelligent mapping, and compassionate connections.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.7 }}
//           className="flex flex-wrap justify-center gap-4 mt-10"
//         >
//           <Link
//             to="/auth"
//             className="px-8 py-3 font-semibold text-[#FF3D4F] bg-[#f9f5ef] rounded-full shadow-md hover:scale-105 transition"
//           >
//             Login / Sign Up
//           </Link>
//           <a
//             href="#about"
//             className="px-8 py-3 font-semibold border border-[#f9f5ef] rounded-full text-[#f9f5ef] hover:bg-white/10 hover:scale-105 transition"
//           >
//             Learn More
//           </a>
//         </motion.div>
//       </section>

//       {/* ABOUT SECTION */}
//       <section
//         id="about"
//         className="py-20 px-6 bg-[#f9f5ef] text-center text-slate-800 rounded-t-[4rem]"
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 text-4xl font-bold"
//         >
//           About ResQNet
//         </motion.h2>
//         <p className="max-w-3xl mx-auto text-lg text-slate-600">
//           ResQNet connects people in need with local responders, volunteers, and
//           hospitals. Our platform uses live location data and smart AI to ensure
//           help arrives faster — because every second matters.
//         </p>

//         {/* FEATURE CARDS */}
//         <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
//           {[
//             {
//               icon: <HeartPulse size={36} />,
//               title: "Emergency Response",
//               desc: "Report emergencies and get instant assistance from nearby responders.",
//             },
//             {
//               icon: <MapPin size={36} />,
//               title: "Smart Location Mapping",
//               desc: "Discover nearby hospitals, police, and fire stations in seconds.",
//             },
//             {
//               icon: <Users size={36} />,
//               title: "Volunteer Network",
//               desc: "Join hands with others and be part of our humanitarian network.",
//             },
//             {
//               icon: <Bell size={36} />,
//               title: "Real-Time Alerts",
//               desc: "Receive live updates when help is dispatched or a crisis occurs.",
//             },
//           ].map((card, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 120 }}
//               className="p-6 bg-white border shadow-lg rounded-2xl border-slate-100"
//             >
//               <div className="flex flex-col items-center gap-3 text-[#D241A6]">
//                 {card.icon}
//                 <h3 className="text-xl font-bold text-slate-800">
//                   {card.title}
//                 </h3>
//                 <p className="text-sm text-slate-600">{card.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 text-center text-white bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78]">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-4 text-4xl font-bold"
//         >
//           Join the Network of Care 
//         </motion.h2>
//         <p className="max-w-2xl mx-auto text-[#FFDDE1] mb-8">
//           Sign up today to request help, volunteer, or simply support those in
//           need. Together, we make a difference.
//         </p>
//         <Link
//           to="/auth"
//           className="px-10 py-3 bg-[#f9f5ef] text-[#FF3D4F] font-semibold rounded-full hover:scale-105 transition"
//         >
//           Get Started
//         </Link>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-purple-600 text-[#f9f5ef] text-center py-8 text-sm">
//         <p>© {new Date().getFullYear()} ResQNet • Empathy meets Intelligence</p>
//       </footer>

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
//           background: radial-gradient(circle, #ff9eb5, transparent 60%);
//           top: 10%;
//           left: 5%;
//           animation-delay: 0s;
//         }
//         .orb2 {
//           background: radial-gradient(circle, #dcb4f7, transparent 60%);
//           top: 50%;
//           left: 70%;
//           animation-delay: 3s;
//         }
//         .orb3 {
//           background: radial-gradient(circle, #99baff, transparent 60%);
//           bottom: 10%;
//           right: 10%;
//           animation-delay: 6s;
//         }
//         @keyframes floatOrb {
//           0% {
//             transform: translateY(0) translateX(0);
//           }
//           100% {
//             transform: translateY(-30px) translateX(40px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }







// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { HeartPulse, Users, MapPin, Bell } from "lucide-react";
// import vid from "../pages/ResQnet video.mp4";

// export default function LandingPage() {
//   return (
//     <div className="relative min-h-screen overflow-hidden text-slate-800">
//       {/* 🎥 Video Background */}
//  <div className="absolute inset-0 flex items-center justify-center overflow-hidden -z-10">
//   <video
//     src={vid}
//     autoPlay
//     loop
//     muted
//     playsInline
//     className="min-w-full min-h-full object-contain brightness-[0.45]"
//   />

//   {/* Soft overlay for readability */}
//   <div className="absolute inset-0 bg-gradient-to-br from-[#FF3D4F]/40 via-[#D241A6]/40 to-[#1E2A78]/40"></div>
// </div>

//       {/* HERO SECTION */}
//       <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-[#f9f5ef]">
//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-6xl font-extrabold md:text-7xl drop-shadow-2xl"
//         >
//           ResQNet
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//           className="mt-4 max-w-2xl text-lg text-[#FFDDE1]"
//         >
//           Empowering communities through real-time emergency response,
//           intelligent mapping, and compassionate connections.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.7 }}
//           className="flex flex-wrap justify-center gap-4 mt-10"
//         >
//           <Link
//             to="/auth"
//             className="px-8 py-3 font-semibold text-[#FF3D4F] bg-[#f9f5ef] rounded-full shadow-md hover:scale-105 transition"
//           >
//             Login / Sign Up
//           </Link>
//           <a
//             href="#about"
//             className="px-8 py-3 font-semibold border border-[#f9f5ef] rounded-full text-[#f9f5ef] hover:bg-white/10 hover:scale-105 transition"
//           >
//             Learn More
//           </a>
//         </motion.div>
//       </section>

//       {/* ABOUT SECTION */}
//       <section
//         id="about"
//         className="py-20 px-6 bg-[#f9f5ef] text-center text-slate-800 rounded-t-[4rem]"
//       >
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-6 text-4xl font-bold"
//         >
//           About ResQNet
//         </motion.h2>
//         <p className="max-w-3xl mx-auto text-lg text-slate-600">
//           ResQNet connects people in need with local responders, volunteers, and
//           hospitals. Our platform uses live location data and smart AI to ensure
//           help arrives faster — because every second matters.
//         </p>

//         {/* FEATURE CARDS */}
//         <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
//           {[
//             {
//               icon: <HeartPulse size={36} />,
//               title: "Emergency Response",
//               desc: "Report emergencies and get instant assistance from nearby responders.",
//             },
//             {
//               icon: <MapPin size={36} />,
//               title: "Smart Location Mapping",
//               desc: "Discover nearby hospitals, police, and fire stations in seconds.",
//             },
//             {
//               icon: <Users size={36} />,
//               title: "Volunteer Network",
//               desc: "Join hands with others and be part of our humanitarian network.",
//             },
//             {
//               icon: <Bell size={36} />,
//               title: "Real-Time Alerts",
//               desc: "Receive live updates when help is dispatched or a crisis occurs.",
//             },
//           ].map((card, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 120 }}
//               className="p-6 transition bg-white border shadow-lg rounded-2xl border-slate-100 hover:shadow-2xl"
//             >
//               <div className="flex flex-col items-center gap-3 text-[#D241A6]">
//                 {card.icon}
//                 <h3 className="text-xl font-bold text-slate-800">
//                   {card.title}
//                 </h3>
//                 <p className="text-sm text-slate-600">{card.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 text-center text-white bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78]">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mb-4 text-4xl font-bold"
//         >
//           Join the Network of Care
//         </motion.h2>
//         <p className="max-w-2xl mx-auto text-[#FFDDE1] mb-8">
//           Sign up today to request help, volunteer, or simply support those in
//           need. Together, we make a difference.
//         </p>
//         <Link
//           to="/auth"
//           className="px-10 py-3 bg-[#f9f5ef] text-[#FF3D4F] font-semibold rounded-full hover:scale-105 transition"
//         >
//           Get Started
//         </Link>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-[#1E2A78] text-[#f9f5ef] text-center py-8 text-sm">
//         <p>© {new Date().getFullYear()} ResQNet • Empathy meets Intelligence</p>
//       </footer>
//     </div>
//   );
// }




import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeartPulse, Users, MapPin, Bell } from "lucide-react";
import vid from "../pages/ResQnet video.mp4";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-800">
      {/* 🎥 Video Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden flex justify-center items-center bg-[#1E2A78]">
  <video
    src={vid}
    autoPlay
    loop
    muted
    playsInline
    className="object-contain object-top min-w-full min-h-full scale-110 opacity-90"
    style={{
      transform: "translateY(-80px)", // moves video upward
    }}
  />
  {/* Add subtle gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#1E2A78]/40 via-[#D241A6]/40 to-[#FF3D4F]/40 backdrop-blur-[2px]"></div>
</div>

      {/* HERO SECTION
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-[#f9f5ef]">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold md:text-7xl drop-shadow-2xl"
        >
          ResQNet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 max-w-2xl text-lg text-[#FFDDE1]"
        >
          Empowering communities through real-time emergency response,
          intelligent mapping, and compassionate connections.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <Link
            to="/auth"
            className="px-8 py-3 font-semibold text-[#FF3D4F] bg-[#f9f5ef] rounded-full shadow-md hover:scale-105 transition"
          >
            Login / Sign Up
          </Link>
          <a
            href="#about"
            className="px-8 py-3 font-semibold border border-[#f9f5ef] rounded-full text-[#f9f5ef] hover:bg-white/10 hover:scale-105 transition"
          >
            Learn More
          </a>
        </motion.div>
      </section> */}

      {/* HERO SECTION */}
<section className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-[#f9f5ef]">
  <motion.h1
    initial={{ opacity: 0, y: -40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-7xl md:text-8xl font-extrabold drop-shadow-2xl bg-gradient-to-r from-[#FFDDE1] via-white to-[#FFDDE1] text-transparent bg-clip-text"
  >
    ResQ<span className="text-[#FFDDE1]">Net</span>
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="mt-8 max-w-3xl text-2xl md:text-3xl font-medium leading-relaxed text-[#ffeef0]"
  >
    Empathy meets <span className="font-semibold text-white">Intelligence</span> —  
    connecting people in crisis with those who can help.  
  </motion.p>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.8 }}
    className="mt-4 text-lg md:text-xl text-[#fff5f6]/90 italic"
  >
    Together, we build a <span className="text-[#FFDDE1] font-semibold">network of care </span>
  </motion.p>

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.7 }}
    className="flex flex-wrap justify-center gap-6 mt-14"
  >
    <Link
      to="/auth"
      className="px-10 py-4 text-lg font-semibold text-[#FF3D4F] bg-[#f9f5ef] rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-transform duration-300"
    >
      Login / Sign Up
    </Link>
    <a
      href="#about"
      className="px-10 py-4 text-lg font-semibold border border-[#f9f5ef] rounded-full text-[#f9f5ef] hover:bg-white/10 hover:scale-110 transition-transform duration-300"
    >
      Learn More
    </a>
  </motion.div>
</section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="py-20 px-6 bg-[#f9f5ef] text-center text-slate-800 rounded-t-[4rem]"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-4xl font-bold"
        >
          About ResQNet
        </motion.h2>
        <p className="max-w-3xl mx-auto text-lg text-slate-600">
          ResQNet connects people in need with local responders, volunteers, and
          hospitals. Our platform uses live location data and smart AI to ensure
          help arrives faster — because every second matters.
        </p>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <HeartPulse size={36} />,
              title: "Emergency Response",
              desc: "Report emergencies and get instant assistance from nearby responders.",
            },
            {
              icon: <MapPin size={36} />,
              title: "Smart Location Mapping",
              desc: "Discover nearby hospitals, police, and fire stations in seconds.",
            },
            {
              icon: <Users size={36} />,
              title: "Volunteer Network",
              desc: "Join hands with others and be part of our humanitarian network.",
            },
            {
              icon: <Bell size={36} />,
              title: "Real-Time Alerts",
              desc: "Receive live updates when help is dispatched or a crisis occurs.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-6 transition bg-white border shadow-lg rounded-2xl border-slate-100 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center gap-3 text-[#D241A6]">
                {card.icon}
                <h3 className="text-xl font-bold text-slate-800">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 text-center text-white bg-gradient-to-r from-[#FF3D4F] via-[#D241A6] to-[#1E2A78]">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-4xl font-bold"
        >
          Join the Network of Care
        </motion.h2>
        <p className="max-w-2xl mx-auto text-[#FFDDE1] mb-8">
          Sign up today to request help, volunteer, or simply support those in
          need. Together, we make a difference.
        </p>
        <Link
          to="/auth"
          className="px-10 py-3 bg-[#f9f5ef] text-[#FF3D4F] font-semibold rounded-full hover:scale-105 transition"
        >
          Get Started
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-[#40060c] via-[#740753] to-[#10239e] text-[#f9f5ef] text-center py-8 text-sm">
        <p>© {new Date().getFullYear()} ResQNet • Empathy meets Intelligence</p>
      </footer>
    </div>
  );
}
