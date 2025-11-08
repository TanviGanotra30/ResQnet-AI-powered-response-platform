import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import { format } from "date-fns";
import { MapPin, User, Clock, Info } from "lucide-react";

export default function MyTasks({ user }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axiosInstance.get("/reports");
        if (res.data?.success && Array.isArray(res.data.data)) {
          // ✅ Only show reports assigned to current volunteer
          const assignedReports = res.data.data.filter(
            (r) => r.assignedVolunteer?._id === user?._id
          );
          setReports(assignedReports);
        } else {
          setReports([]);
        }
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        Swal.fire("Error", "Could not fetch assigned tasks.", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchReports();
  }, [user]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-orange-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-600 text-white";
      case "assigned":
        return "bg-blue-600 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const handleViewDetails = (report) => setSelectedReport(report);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Assigned Tasks</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <p>Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No tasks assigned to you yet.
        </div>
      ) : (
        <div className="space-y-5">
          {reports.map((report) => (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl shadow-md bg-gradient-to-r from-rose-50 to-indigo-50 border border-gray-200 relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold capitalize">
                    {report.emergencyType}
                  </h3>
                  <p className="text-gray-600 mt-1">{report.text}</p>

                  <div className="flex items-center gap-2 text-gray-600 mt-3 text-sm">
                    <MapPin size={16} />
                    <span>{report.address || "Address unavailable"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mt-1 text-sm">
                    <User size={16} />
                    <span>
                      Assigned to{" "}
                      {report.assignedVolunteer?.name || "Unassigned"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mt-1 text-sm">
                    <Clock size={16} />
                    <span>{format(new Date(report.createdAt), "dd/MM/yyyy, HH:mm:ss")}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-semibold ${getPriorityColor(
                      report.priorityLevel
                    )}`}
                  >
                    Priority: {report.priorityLevel}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-semibold ${getStatusColor(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleViewDetails(report)}
                  className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-1 text-sm font-medium"
                >
                  <Info size={16} /> View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🪟 Modal for report details */}
      {selectedReport && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              Report Details
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <b>Reporter:</b> {selectedReport.reporter?.name || "Unknown"}
              </p>
              <p>
                <b>Emergency Type:</b> {selectedReport.emergencyType}
              </p>
              <p>
                <b>Priority:</b> {selectedReport.priorityLevel}
              </p>
              <p>
                <b>Status:</b> {selectedReport.status}
              </p>
              <p>
                <b>Address:</b> {selectedReport.address}
              </p>
              <p>
                <b>Supplies Needed:</b>{" "}
                {selectedReport.requiredSupplies?.join(", ") || "None"}
              </p>
              <p>
                <b>Map:</b>{" "}
                <a
                  href={`https://www.google.com/maps?q=${selectedReport.location?.coordinates[1]},${selectedReport.location?.coordinates[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View on Map
                </a>
              </p>
              <p>
                <b>Assigned Volunteer:</b>{" "}
                {selectedReport.assignedVolunteer
                  ? `${selectedReport.assignedVolunteer.name} (${selectedReport.assignedVolunteer.email})`
                  : "Unassigned"}
              </p>
            </div>

            <div className="flex justify-center mt-5">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
