// /**
//  * src/pages/Dashboard.jsx
//  * Admin Dashboard — summary analytics + reports preview
//  */

// import { useEffect, useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import AdminLayout from "../components/AdminLayout";
// import { Users, ClipboardList, CheckCircle, AlertTriangle, UserCheck, Loader2 } from "lucide-react";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalVolunteers: 0,
//     activeVolunteers: 0,
//     verifiedVolunteers: 0,
//     totalReports: 0,
//     pendingReports: 0,
//     assignedReports: 0,
//     resolvedReports: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const [usersRes, volunteersRes, reportsRes] = await Promise.all([
//           axiosInstance.get("/users"),        // Make sure you have an admin-only route for all users
//           axiosInstance.get("/volunteers"),
//           axiosInstance.get("/reports"),
//         ]);

//         const users = usersRes.data.data || [];
//         const volunteers = volunteersRes.data.data || [];
//         const reports = reportsRes.data.data || [];

//         const verifiedVolunteers = volunteers.filter(
//           (v) => v.volunteerProfile?.verified
//         ).length;

//         const activeVolunteers = volunteers.filter(
//           (v) => v.volunteerProfile?.availability
//         ).length;

//         const pendingReports = reports.filter((r) => r.status === "pending").length;
//         const assignedReports = reports.filter((r) => r.status === "assigned").length;
//         const resolvedReports = reports.filter((r) => r.status === "resolved").length;

//         setStats({
//           totalUsers: users.length,
//           totalVolunteers: volunteers.length,
//           activeVolunteers,
//           verifiedVolunteers,
//           totalReports: reports.length,
//           pendingReports,
//           assignedReports,
//           resolvedReports,
//         });
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const statCards = [
//     {
//       title: "Total Users",
//       value: stats.totalUsers,
//       icon: <Users className="text-blue-500" size={24} />,
//       color: "bg-blue-50 border-blue-200",
//     },
//     {
//       title: "Active Volunteers",
//       value: stats.activeVolunteers,
//       icon: <UserCheck className="text-green-500" size={24} />,
//       color: "bg-green-50 border-green-200",
//     },
//     {
//       title: "Verified Volunteers",
//       value: stats.verifiedVolunteers,
//       icon: <CheckCircle className="text-emerald-500" size={24} />,
//       color: "bg-emerald-50 border-emerald-200",
//     },
//     {
//       title: "Total Reports",
//       value: stats.totalReports,
//       icon: <ClipboardList className="text-purple-500" size={24} />,
//       color: "bg-purple-50 border-purple-200",
//     },
//     {
//       title: "Pending Reports",
//       value: stats.pendingReports,
//       icon: <AlertTriangle className="text-yellow-500" size={24} />,
//       color: "bg-yellow-50 border-yellow-200",
//     },
//     {
//       title: "Assigned Reports",
//       value: stats.assignedReports,
//       icon: <UserCheck className="text-blue-600" size={24} />,
//       color: "bg-blue-50 border-blue-200",
//     },
//     {
//       title: "Resolved Reports",
//       value: stats.resolvedReports,
//       icon: <CheckCircle className="text-green-600" size={24} />,
//       color: "bg-green-50 border-green-200",
//     },
//   ];

//   return (
//     <AdminLayout>
//       <h1 className="text-3xl font-bold mb-6 text-gray-700">Admin Dashboard</h1>

//       {loading ? (
//         <div className="flex justify-center items-center h-40 text-gray-600">
//           <Loader2 className="animate-spin mr-2" /> Loading dashboard data...
//         </div>
//       ) : (
//         <>
//           {/* Summary Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {statCards.map((card, idx) => (
//               <div
//                 key={idx}
//                 className={`flex items-center justify-between p-5 rounded-xl border shadow-sm ${card.color}`}
//               >
//                 <div>
//                   <h3 className="text-sm text-gray-600">{card.title}</h3>
//                   <p className="text-2xl font-bold text-gray-800">{card.value}</p>
//                 </div>
//                 {card.icon}
//               </div>
//             ))}
//           </div>

//           {/* Recent Reports Table */}
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h2 className="text-lg font-semibold mb-3 text-gray-700">Recent Reports</h2>
//             <table className="w-full text-sm">
//               <thead className="bg-rose-600 text-white">
//                 <tr>
//                   <th className="p-2 text-left">Reporter</th>
//                   <th className="p-2 text-left">Emergency Type</th>
//                   <th className="p-2 text-left">Priority</th>
//                   <th className="p-2 text-left">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {stats.totalReports === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center p-4 text-gray-500">
//                       No reports found.
//                     </td>
//                   </tr>
//                 ) : (
//                   stats.totalReports > 0 &&
//                   reports.map((r) => (
//                     <tr key={r._id} className="border-b hover:bg-gray-50">
//                       <td className="p-2">{r.reporter?.name || "Anonymous"}</td>
//                       <td className="p-2 capitalize">{r.emergencyType}</td>
//                       <td
//                         className={`p-2 font-medium ${
//                           r.priorityLevel === "high"
//                             ? "text-red-600"
//                             : r.priorityLevel === "medium"
//                             ? "text-yellow-600"
//                             : "text-green-600"
//                         }`}
//                       >
//                         {r.priorityLevel}
//                       </td>
//                       <td className="p-2 capitalize">{r.status}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </AdminLayout>
//   );
// }


/**
 * src/pages/Dashboard.jsx
 * Admin Dashboard — summary analytics + reports preview (optimized)
 */


import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import AdminLayout from "../components/AdminLayout";
import {
  Users,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  UserCheck,
  Loader2,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ Fetch everything in one go
        const [statsRes, reportsRes] = await Promise.all([
          axiosInstance.get("/admin/stats"),
          axiosInstance.get("/reports"),
        ]);

        if (statsRes.data.success) setStats(statsRes.data.data);
        if (reportsRes.data.success)
          setReports(reportsRes.data.data.slice(0, 5)); // Show only 5 latest reports
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: <Users className="text-blue-500" size={24} />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Total Volunteers",
      value: stats.totalVolunteers || 0,
      icon: <UserCheck className="text-green-500" size={24} />,
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Verified Volunteers",
      value: stats.verifiedVolunteers || 0,
      icon: <CheckCircle className="text-emerald-500" size={24} />,
      color: "bg-emerald-50 border-emerald-200",
    },
    {
      title: "Total Reports",
      value: stats.totalReports || 0,
      icon: <ClipboardList className="text-purple-500" size={24} />,
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Pending Reports",
      value: stats.pendingReports || 0,
      icon: <AlertTriangle className="text-yellow-500" size={24} />,
      color: "bg-yellow-50 border-yellow-200",
    },
    {
      title: "Assigned Reports",
      value: stats.assignedReports || 0,
      icon: <UserCheck className="text-blue-600" size={24} />,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "Resolved Reports",
      value: stats.resolvedReports || 0,
      icon: <CheckCircle className="text-green-600" size={24} />,
      color: "bg-green-50 border-green-200",
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Admin Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-600">
          <Loader2 className="animate-spin mr-2" /> Loading dashboard data...
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-5 rounded-xl border shadow-sm ${card.color}`}
              >
                <div>
                  <h3 className="text-sm text-gray-600">{card.title}</h3>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                </div>
                {card.icon}
              </div>
            ))}
          </div>

          {/* Recent Reports Table */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Recent Reports
            </h2>
            <table className="w-full text-sm">
              <thead className="bg-rose-600 text-white">
                <tr>
                  <th className="p-2 text-left">Reporter</th>
                  <th className="p-2 text-left">Emergency Type</th>
                  <th className="p-2 text-left">Priority</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No reports found.
                    </td>
                  </tr>
                ) : (
                  reports.map((r) => (
                    <tr key={r._id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{r.reporter?.name || "Anonymous"}</td>
                      <td className="p-2 capitalize">{r.emergencyType}</td>
                      <td
                        className={`p-2 font-medium ${
                          r.priorityLevel === "high"
                            ? "text-red-600"
                            : r.priorityLevel === "medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {r.priorityLevel}
                      </td>
                      <td
                        className={`p-2 capitalize font-semibold ${
                          r.status === "pending"
                            ? "text-yellow-500"
                            : r.status === "assigned"
                            ? "text-blue-500"
                            : "text-green-600"
                        }`}
                      >
                        {r.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

