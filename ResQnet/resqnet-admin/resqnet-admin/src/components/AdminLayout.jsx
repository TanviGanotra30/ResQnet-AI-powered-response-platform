// /**
//  * src/components/AdminLayout.jsx
//  * Main layout for admin dashboard pages.
//  */

// import { useNavigate, useLocation } from "react-router-dom";
// import { LogOut, BarChart3, Users, FileText } from "lucide-react";

// export default function AdminLayout({ children }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   // Utility for active link highlight
//   const linkClass = (path) =>
//     `flex items-center gap-3 p-2 rounded-md transition ${
//       location.pathname === path
//         ? "bg-rose-600 text-white"
//         : "text-rose-100 hover:bg-rose-600 hover:text-white"
//     }`;

//   return (
//     <div className="flex min-h-screen bg-gray-50 text-gray-800">
//       {/* Sidebar */}
//       <aside className="w-64 bg-rose-700 text-white flex flex-col p-4">
//         <h1 className="text-2xl font-bold mb-8 text-center">ResQNet Admin</h1>

//         <nav className="flex flex-col gap-2">
//           <button onClick={() => navigate("/dashboard")} className={linkClass("/dashboard")}>
//             <BarChart3 size={20} /> Dashboard
//           </button>

//           <button onClick={() => navigate("/volunteers")} className={linkClass("/volunteers")}>
//             <Users size={20} /> Volunteers
//           </button>

//           <button onClick={() => navigate("/reports")} className={linkClass("/reports")}>
//             <FileText size={20} /> Reports
//           </button>
//         </nav>

//         {/* Footer */}
//         <div className="mt-auto border-t border-rose-500 pt-4">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 hover:bg-rose-600 p-2 rounded transition w-full text-left"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//           <p className="text-xs mt-3 text-rose-200 text-center">
//             Logged in as <br />
//             <span className="font-semibold">{user.email}</span>
//           </p>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <header className="flex justify-between items-center mb-6 border-b pb-3">
//           <h2 className="text-2xl font-semibold text-rose-700">
//             {location.pathname === "/dashboard"
//               ? "Dashboard Overview"
//               : location.pathname === "/volunteers"
//               ? "Volunteers Management"
//               : location.pathname === "/reports"
//               ? "Reports Management"
//               : "Admin Panel"}
//           </h2>
//           <span className="text-gray-600 text-sm">
//             {new Date().toLocaleDateString()}
//           </span>
//         </header>

//         {children}
//       </main>
//     </div>
//   );
// }





/**
 * src/components/AdminLayout.jsx
 * Main layout for admin dashboard pages.
 */

import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, BarChart3, Users, FileText, MessageSquare } from "lucide-react";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // Utility for active link highlight
  const linkClass = (path) =>
    `flex items-center gap-3 p-2 rounded-md transition ${
      location.pathname === path
        ? "bg-rose-600 text-white"
        : "text-rose-100 hover:bg-rose-600 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-rose-700 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-8 text-center">ResQNet Admin</h1>

        <nav className="flex flex-col gap-2">
          <button onClick={() => navigate("/dashboard")} className={linkClass("/dashboard")}>
            <BarChart3 size={20} /> Dashboard
          </button>

          <button onClick={() => navigate("/volunteers")} className={linkClass("/volunteers")}>
            <Users size={20} /> Volunteers
          </button>

          <button onClick={() => navigate("/reports")} className={linkClass("/reports")}>
            <FileText size={20} /> Reports
          </button>

          {/* 🆕 New Feedbacks Section */}
          <button onClick={() => navigate("/feedbacks")} className={linkClass("/feedbacks")}>
            <MessageSquare size={20} /> Feedbacks
          </button>
        </nav>

        {/* Footer */}
        <div className="mt-auto border-t border-rose-500 pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-rose-600 p-2 rounded transition w-full text-left"
          >
            <LogOut size={18} /> Logout
          </button>
          <p className="text-xs mt-3 text-rose-200 text-center">
            Logged in as <br />
            <span className="font-semibold">{user.email}</span>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-semibold text-rose-700">
            {location.pathname === "/dashboard"
              ? "Dashboard Overview"
              : location.pathname === "/volunteers"
              ? "Volunteers Management"
              : location.pathname === "/reports"
              ? "Reports Management"
              : location.pathname === "/feedbacks"
              ? "Feedback Management"
              : "Admin Panel"}
          </h2>
          <span className="text-gray-600 text-sm">
            {new Date().toLocaleDateString()}
          </span>
        </header>

        {children}
      </main>
    </div>
  );
}
