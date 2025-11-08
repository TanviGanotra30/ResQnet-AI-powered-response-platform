/**
 * src/pages/Volunteers.jsx
 * Admin: verify volunteer & ID Proof with SweetAlert2 confirmation + search + filters
 */

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import AdminLayout from "../components/AdminLayout";
import { ShieldCheck, IdCard, Eye, Loader2, Search } from "lucide-react";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await axiosInstance.get("/volunteers");
        if (res.data.success) {
          setVolunteers(res.data.data);
          setFilteredVolunteers(res.data.data);
        }
      } catch {
        Swal.fire("Error", "Failed to load volunteers.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  // 🔍 Filter logic
  useEffect(() => {
    let filtered = volunteers.filter((v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus === "verified") {
      filtered = filtered.filter((v) => v.volunteerProfile?.verified);
    } else if (filterStatus === "pending") {
      filtered = filtered.filter((v) => !v.volunteerProfile?.verified);
    }

    setFilteredVolunteers(filtered);
  }, [searchTerm, filterStatus, volunteers]);

  const handleVerify = async (id, type, currentStatus) => {
    const label = type === "idProof" ? "ID Proof" : "Volunteer";
    const action = currentStatus ? "unverify" : "verify";

    const confirm = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} ${label}?`,
      text: `Do you want to ${action} this ${label}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33"
    });

    if (!confirm.isConfirmed) return;

    try {
      setUpdating(true);
      const res = await axiosInstance.patch(`/volunteers/${id}/verify`, {
        type,
        verified: !currentStatus
      });

      if (res.data.success) {
        setVolunteers((prev) =>
          prev.map((v) => {
            if (v._id === id) {
              if (type === "volunteer") v.volunteerProfile.verified = !currentStatus;
              else v.volunteerProfile.idProof.verified = !currentStatus;
            }
            return { ...v };
          })
        );

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `${label} ${!currentStatus ? "verified" : "unverified"} successfully.`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch {
      Swal.fire("Error", "Verification failed. Try again later.", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleViewIdProof = (url, name) => {
    if (!url) {
      Swal.fire("No Image", "This volunteer has not uploaded an ID proof.", "info");
      return;
    }

    Swal.fire({
      title: `${name}'s ID Proof`,
      imageUrl: url,
      imageWidth: 400,
      imageAlt: "ID Proof",
      background: "#fff",
      showCloseButton: true
    });
  };

  if (loading)
    return (
      <AdminLayout>
        <p className="text-center text-gray-600 text-lg mt-10">Loading volunteers...</p>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Volunteers Management</h1>
        {/* <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p> */}
      </div>

      {/* 🔍 Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        {/* Search box */}
        <div className="flex items-center w-full sm:w-1/2 bg-white shadow-sm border border-gray-200 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 w-full outline-none text-gray-700"
          />
        </div>

        {/* Filter dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
        >
          <option value="all">All Volunteers</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-sm md:text-base border-collapse">
          <thead className="bg-rose-600 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Skills</th>
              <th className="p-3 text-left">Profile Status</th>
              <th className="p-3 text-left">ID Proof</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVolunteers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  No volunteers found.
                </td>
              </tr>
            ) : (
              filteredVolunteers.map((v) => (
                <tr
                  key={v._id}
                  className="border-b hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="p-3 font-medium text-gray-800">{v.name}</td>
                  <td className="p-3 text-gray-600">{v.email}</td>
                  <td className="p-3 text-gray-700">
                    {v.volunteerProfile?.skills?.join(", ") || "—"}
                  </td>

                  {/* Volunteer Verified */}
                  <td className="p-3">
                    {v.volunteerProfile?.verified ? (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-md">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-md">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* ID Proof Column */}
                  <td className="p-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          handleViewIdProof(v.volunteerProfile?.idProof?.documentUrl, v.name)
                        }
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center gap-1 transition"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      {v.volunteerProfile?.idProof?.verified ? (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-md">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-md">
                          Pending
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-3 flex flex-wrap gap-2">
                    <button
                      disabled={updating}
                      onClick={() =>
                        handleVerify(v._id, "volunteer", v.volunteerProfile?.verified)
                      }
                      className={`px-3 py-1 rounded-md flex items-center gap-2 text-xs font-medium transition ${
                        v.volunteerProfile?.verified
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }`}
                    >
                      {updating ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck size={14} />
                          {v.volunteerProfile?.verified ? "Unverify" : "Verify"}
                        </>
                      )}
                    </button>

                    <button
                      disabled={updating}
                      onClick={() =>
                        handleVerify(v._id, "idProof", v.volunteerProfile?.idProof?.verified)
                      }
                      className={`px-3 py-1 rounded-md flex items-center gap-2 text-xs font-medium transition ${
                        v.volunteerProfile?.idProof?.verified
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }`}
                    >
                      {updating ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <>
                          <IdCard size={14} />
                          {v.volunteerProfile?.idProof?.verified ? "Unverify ID" : "Verify ID"}
                        </>
                      )}
                    </button>
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
