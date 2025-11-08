/**
 * src/pages/Feedbacks.jsx
 * Admin page to view all user feedback.
 */

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Star, AlertCircle, Loader2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axiosInstance.get("/feedback");
        if (res.data.success) {
          setFeedbacks(res.data.data);
        } else {
          setError("Failed to fetch feedbacks.");
        }
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Server error while fetching feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <AdminLayout>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-rose-700">
          All Feedbacks
        </h3>

        {loading ? (
          <div className="flex items-center justify-center h-40 text-gray-500">
            <Loader2 className="animate-spin mr-2" /> Loading feedbacks...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-40 text-red-500 gap-2">
            <AlertCircle /> {error}
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-gray-500">
            <AlertCircle className="mr-2" /> No feedbacks found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-rose-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Incident</th>
                  <th className="py-2 px-4 text-left">Volunteer</th>
                  <th className="py-2 px-4 text-left">Rating</th>
                  <th className="py-2 px-4 text-left">Remarks</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb, i) => (
                  <tr
                    key={fb._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4">
                      {fb.incidentId?.emergencyType || "—"}
                    </td>
                    <td className="py-2 px-4">
                      {fb.volunteerId?.name || "Not Assigned"}
                    </td>
                    <td className="py-2 px-4 flex items-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={
                            index < fb.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </td>
                    <td className="py-2 px-4">
                      {fb.remarks || "No remarks"}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-500">
                      {new Date(fb.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
