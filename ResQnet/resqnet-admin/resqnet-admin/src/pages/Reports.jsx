/**
 * src/pages/Reports.jsx
 * Admin: Manage emergency reports (view, assign volunteer, see details, distance-based filter)
 */

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import AdminLayout from "../components/AdminLayout";
import { Eye, UserCheck, Loader2 } from "lucide-react";

// 🌍 Haversine distance calculator (in km)
const getDistanceKm = (coord1, coord2) => {
    const R = 6371; // Earth's radius (km)
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

export default function Reports() {
    const [reports, setReports] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Fetch reports + volunteers
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [reportsRes, volunteersRes] = await Promise.all([
                    axiosInstance.get("/reports"),
                    axiosInstance.get("/volunteers"),
                ]);

                if (reportsRes.data.success) setReports(reportsRes.data.data);
                if (volunteersRes.data.success)
                    setVolunteers(
                        volunteersRes.data.data.filter(
                            (v) => v.volunteerProfile?.verified && v.volunteerProfile?.availability
                        )
                    );
            } catch (err) {
                Swal.fire("Error", "Failed to load reports or volunteers.", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🧮 Filter volunteers by distance before assignment
    const getEligibleVolunteers = (report) => {
        if (!report.location?.coordinates) return [];

        return volunteers.filter((v) => {
            if (!v.location?.coordinates) return false;
            const distance = getDistanceKm(report.location.coordinates, v.location.coordinates);
            return distance <= v.volunteerProfile.radiusKm;
        });
    };

    // Assign volunteer
    const handleAssignVolunteer = async (report) => {
        const eligibleVolunteers = getEligibleVolunteers(report);

        if (eligibleVolunteers.length === 0) {
            Swal.fire(
                "No Nearby Volunteers",
                "No available volunteers found within their working radius.",
                "warning"
            );
            return;
        }

        const options = eligibleVolunteers.map((v) => ({
            id: v._id,
            name: `${v.name} (${v.volunteerProfile.skills.join(", ")})`,
        }));

        const { value: volunteerId } = await Swal.fire({
            title: "Assign Volunteer",
            input: "select",
            inputOptions: Object.fromEntries(options.map((v) => [v.id, v.name])),
            inputPlaceholder: "Select a nearby volunteer",
            showCancelButton: true,
            confirmButtonText: "Assign",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#d33",
        });

        if (!volunteerId) return;

        try {
            setUpdating(true);
            const res = await axiosInstance.patch(`/reports/${report._id}/status`, {
                assignedVolunteer: volunteerId,
                status: "assigned",
            });

            if (res.data.success) {
                setReports((prev) =>
                    prev.map((r) =>
                        r._id === report._id
                            ? { ...r, assignedVolunteer: res.data.data.assignedVolunteer, status: "assigned" }
                            : r
                    )
                );
                Swal.fire("Assigned!", "Volunteer assigned successfully.", "success");
            }
        } catch (err) {
            Swal.fire("Error", "Failed to assign volunteer.", "error");
        } finally {
            setUpdating(false);
        }
    };

    // View report details
    const handleViewDetails = (r) => {
        Swal.fire({
            title: "Report Details",
            html: `
        <div class="text-left">
          <p><strong>Reporter:</strong> ${r.reporter?.name || "Unknown"}</p>
          <p><strong>Emergency Type:</strong> ${r.emergencyType}</p>
          <p><strong>Priority:</strong> ${r.priorityLevel}</p>
          <p><strong>Status:</strong> ${r.status}</p>
          <p><strong>Address:</strong> ${r.address || "N/A"}</p>
          <p><strong>Supplies Needed:</strong> ${r.requiredSupplies?.join(", ")}</p>
          ${r.location?.coordinates
                    ? `<p><strong>Map:</strong> <a href="https://www.google.com/maps?q=${r.location.coordinates[1]},${r.location.coordinates[0]}" target="_blank" style="color:#2563eb;">View on Map</a></p>`
                    : ""
                }
          ${r.assignedVolunteer
                    ? `<p><strong>Assigned Volunteer:</strong> ${r.assignedVolunteer.name} (${r.assignedVolunteer.email})</p>`
                    : `<p><strong>Assigned Volunteer:</strong> None</p>`
                }
        </div>
      `,
            width: 500,
            confirmButtonText: "Close",
            confirmButtonColor: "#2563eb",
        });
    };

    if (loading) return <p className="text-gray-600">Loading reports...</p>;

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6 text-gray-700">Reports Management</h1>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <table className="w-full text-sm">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3 text-left">Reporter</th>
                            <th className="p-3 text-left">Emergency Type</th>
                            <th className="p-3 text-left">Priority</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Volunteer</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-gray-500">
                                    No reports found.
                                </td>
                            </tr>
                        ) : (
                            reports.map((r) => (
                                <tr key={r._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-3">{r.reporter?.name || "Anonymous"}</td>
                                    <td className="p-3 capitalize">{r.emergencyType}</td>
                                    <td
                                        className={`p-3 font-semibold ${r.priorityLevel === "high"
                                                ? "text-red-600"
                                                : r.priorityLevel === "medium"
                                                    ? "text-yellow-600"
                                                    : "text-green-600"
                                            }`}
                                    >
                                        {r.priorityLevel}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${r.status === "resolved"
                                                    ? "bg-green-100 text-green-700"
                                                    : r.status === "assigned"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {r.assignedVolunteer?.name || (
                                            <span className="text-gray-500 italic">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="p-3 flex justify-center gap-3">
                                        <button
                                            onClick={() => handleViewDetails(r)}
                                            className="flex items-center gap-2 px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                        >
                                            <Eye size={16} /> View
                                        </button>
                                        {r.status === "pending" && (
                                            <button
                                                disabled={updating}
                                                onClick={() => handleAssignVolunteer(r)}
                                                className="flex items-center gap-2 px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                                            >
                                                {updating ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <>
                                                        <UserCheck size={16} />
                                                        Assign
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
