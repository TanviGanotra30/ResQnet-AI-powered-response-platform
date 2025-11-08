// import React from "react";
// import {
//   Home,
//   Users,
//   AlertTriangle,
//   Settings,
//   HelpCircle,
//   LogOut,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import { useNavigate, useLocation, Link } from "react-router-dom";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation(); // 👈 Get current route

//   // 🧹 Logout handler
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Logout",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#d33",
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Clear user session
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("user");

//         Swal.fire({
//           icon: "success",
//           title: "Logged out!",
//           text: "You have been logged out successfully.",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         // Redirect after short delay
//         setTimeout(() => {
//           navigate("/auth");
//         }, 1500);
//       }
//     });
//   };

//   // Helper function to check active route
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="h-screen w-64 fixed left-0 top-0 bg-white/80 backdrop-blur-xl shadow-lg border-r border-gray-200 flex flex-col justify-between rounded-r-2xl overflow-hidden">
//       {/* 🔺 Top Logo Section */}
//       <div>
//         <div className="px-6 py-5 border-b border-gray-100">
//           <h1 className="text-2xl font-extrabold text-rose-600 tracking-tight flex items-center gap-2">
//             ❤️ <span className="text-gray-800">ResQnet</span>
//           </h1>
//         </div>

//         {/* 🔹 Navigation */}
//         <nav className="flex-1 px-5 py-6">
//           <ul className="space-y-2 text-gray-700 font-medium">

//             {/* 🏠 Public View */}
//             <li>
//               <Link
//                 to="/home"
//                 className={`flex items-center gap-3 p-2 rounded-lg transition cursor-pointer ${
//                   isActive("/home")
//                     ? "bg-rose-100 text-rose-700 font-semibold shadow-sm"
//                     : "hover:bg-rose-50 hover:text-rose-600"
//                 }`}
//               >
//                 <Home size={18} /> <span>Public View</span>
//               </Link>
//             </li>

//             {/* 🤝 Volunteer Portal */}
//             <li>
//               <Link
//                 to="/volunteer-portal"
//                 className={`flex items-center gap-3 p-2 rounded-lg transition cursor-pointer ${
//                   isActive("/volunteer-portal")
//                     ? "bg-rose-100 text-rose-700 font-semibold shadow-sm"
//                     : "hover:bg-rose-50 hover:text-rose-600"
//                 }`}
//               >
//                 <Users size={18} /> <span>Volunteer Portal</span>
//               </Link>
//             </li>
//           </ul>

//           {/* 🚨 Emergency Button */}
//           <button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition flex items-center justify-center gap-2">
//             <AlertTriangle size={16} /> Report Emergency
//           </button>
//         </nav>
//       </div>

//       {/* ⚙️ Bottom Options */}
//       <div className="px-5 py-4 border-t border-gray-100">
//         <ul className="space-y-3 text-sm">
//           <li className="flex items-center gap-3 text-gray-600 hover:text-rose-600 transition cursor-pointer">
//             <Settings size={16} /> <span>Settings</span>
//           </li>
//           <li className="flex items-center gap-3 text-gray-600 hover:text-rose-600 transition cursor-pointer">
//             <HelpCircle size={16} /> <span>Help & Support</span>
//           </li>

//           {/* ✅ Working Logout */}
//           <li
//             onClick={handleLogout}
//             className="flex items-center gap-3 text-red-600 font-semibold hover:underline cursor-pointer"
//           >
//             <LogOut size={16} /> <span>Logout</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }







import React from "react";
import {
  Home,
  Users,
  AlertTriangle,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🧹 Logout handler
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        Swal.fire({
          icon: "success",
          title: "Logged out!",
          text: "You have been logged out successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/"), 1500);
      }
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-white/80 backdrop-blur-xl shadow-lg border-r border-gray-200 flex flex-col justify-between rounded-r-2xl overflow-hidden">
      {/* 🔺 Top Logo Section */}
      <div>
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-rose-600 tracking-tight flex items-center gap-2">
             <span className="text-gray-800">ResQnet</span>
          </h1>
        </div>

        {/* 🔹 Navigation */}
        <nav className="flex-1 px-5 py-6">
          <ul className="space-y-2 text-gray-700 font-medium">

            {/* 🏠 Public View */}
            <li>
              <Link
                to="/home"
                className={`flex items-center gap-3 p-2 rounded-lg transition cursor-pointer ${
                  isActive("/home")
                    ? "bg-rose-100 text-rose-700 font-semibold shadow-sm"
                    : "hover:bg-rose-50 hover:text-rose-600"
                }`}
              >
                <Home size={18} /> <span>Public View</span>
              </Link>
            </li>

            {/* 🤝 Volunteer Portal */}
            <li>
              <Link
                to="/volunteer-portal"
                className={`flex items-center gap-3 p-2 rounded-lg transition cursor-pointer ${
                  isActive("/volunteer-portal")
                    ? "bg-rose-100 text-rose-700 font-semibold shadow-sm"
                    : "hover:bg-rose-50 hover:text-rose-600"
                }`}
              >
                <Users size={18} /> <span>Volunteer Portal</span>
              </Link>
            </li>
          </ul>

          {/* 🚨 Report Emergency Button */}
          <button
            onClick={() => navigate("/report-emergency")}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition flex items-center justify-center gap-2"
          >
            <AlertTriangle size={16} /> Report Emergency
          </button>
        </nav>
      </div>

      {/* ⚙️ Bottom Options */}
      <div className="px-5 py-4 border-t border-gray-100">
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3 text-gray-600 hover:text-rose-600 transition cursor-pointer">
            <Settings size={16} /> <span>Settings</span>
          </li>
          <li className="flex items-center gap-3 text-gray-600 hover:text-rose-600 transition cursor-pointer">
            <HelpCircle size={16} /> <span>Help & Support</span>
          </li>

          <li
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-600 font-semibold hover:underline cursor-pointer"
          >
            <LogOut size={16} /> <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
