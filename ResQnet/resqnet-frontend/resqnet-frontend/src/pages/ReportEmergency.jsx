// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Mic, AlertTriangle } from "lucide-react";

// export default function ReportEmergency() {
//   const [showModal, setShowModal] = useState(false);
//   const [description, setDescription] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Emergency Submitted:", description);
//     setShowModal(false);
//     setDescription("");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 font-[Inter]">
//       <Sidebar />

//       {/* Main Page Content */}
//       <div className="flex-1 ml-64 p-10">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           🚨 Report Emergency
//         </h1>
//         <p className="text-gray-600 mb-10">
//           Quickly report an ongoing emergency so responders can take action immediately.
//         </p>

//         <button
//           onClick={() => setShowModal(true)}
//           className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition flex items-center gap-2"
//         >
//           <AlertTriangle size={18} /> Report Emergency Now
//         </button>
//       </div>

//       {/* 🪟 Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md border border-gray-200"
//             >
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Report Emergency
//                 </h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-500 hover:text-red-500 transition"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <textarea
//                     placeholder="Describe the emergency..."
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none resize-none"
//                     rows="3"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   ></textarea>
//                   <button
//                     type="button"
//                     className="absolute mt-[-2.5rem] ml-[calc(100%-2.5rem)] p-2 text-gray-500 hover:text-rose-600"
//                   >
//                     <Mic size={18} />
//                   </button>
//                 </div>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
//                   >
//                     Submit Report
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }









import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, AlertTriangle, Loader2, MapPin } from "lucide-react";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";

export default function ReportEmergency() {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false); // 👈 new loader flag

  // Auto fields from APIs
  const [address, setAddress] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [requiredSupplies, setRequiredSupplies] = useState([]);
  const [coords, setCoords] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // ✅ Step 1: Ask for location permission + loader
  const handleOpenModal = async () => {
    setFetchingLocation(true);

    try {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("✅ Coordinates:", latitude, longitude);
          setCoords({ lat: latitude, lng: longitude });

          try {
            const res = await fetch(
              "https://address-fetching-api.onrender.com/get-address",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ latitude, longitude }),
              }
            );
            const data = await res.json();
            if (data.success) {
              console.log("📍 Address:", data.address);
              setAddress(data.address);
            }
          } catch (err) {
            console.error("Error fetching address:", err);
          }

          setFetchingLocation(false);
          setShowModal(true);
        },
        (err) => {
          console.error("Location error:", err);
          setFetchingLocation(false);
          Swal.fire("Error", "Please enable location access.", "error");
        }
      );
    } catch (err) {
      console.error("Error getting location:", err);
      setFetchingLocation(false);
    }
  };

  // 🧠 Auto classify description (debounced)
  useEffect(() => {
    if (!description.trim()) return;
    const delay = setTimeout(async () => {
      try {
        const res = await fetch("https://incident-bot-api.onrender.com/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ situation: description }),
        });
        const data = await res.json();
        console.log("🧠 Classifier:", data);
        setEmergencyType(data.incident?.toLowerCase() || "");
        setPriorityLevel(data.priority?.toLowerCase() || "");
        setRequiredSupplies(data.supplies ? data.supplies.split(" ") : []);
      } catch (err) {
        console.error("Classification error:", err);
      }
    }, 1200);
    return () => clearTimeout(delay);
  }, [description]);

  // 🎙️ Voice Recording
  const handleRecord = async () => {
    if (recording) {
      setRecording(false);
      mediaRecorderRef.current.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });

        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch("https://alysha-nonvibrating-winona.ngrok-free.dev/transcribe", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          if (data.text) {
            setDescription((prev) => (prev ? prev + " " + data.text : data.text));
          } else {
            Swal.fire("Info", "No speech detected. Try again.", "info");
          }
        } catch (err) {
          console.error("Transcription error:", err);
          Swal.fire("Error", "Failed to transcribe audio.", "error");
        }

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Mic permission denied:", err);
      Swal.fire("Error", "Microphone access denied.", "error");
    }
  };

  // 📨 Submit Final Report
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !emergencyType || !priorityLevel || !coords) {
      Swal.fire("Error", "Please describe the emergency properly.", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        text: description,
        location: {
          type: "Point",
          coordinates: [coords.lng, coords.lat],
        },
        address,
        emergencyType,
        priorityLevel,
        requiredSupplies,
      };

      console.log("🚀 Sending payload:", payload);

      const res = await axiosInstance.post("/reports", payload);
      if (res.data.success) {
        Swal.fire("✅ Success", "Emergency reported successfully!", "success");
        setShowModal(false);
        setDescription("");
        setAddress("");
      }
    } catch (err) {
      console.error("Submit error:", err);
      Swal.fire("Error", "Failed to submit report.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-[Inter]">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🚨 Report Emergency
        </h1>
        <p className="text-gray-600 mb-10">
          Quickly report an ongoing emergency so responders can take action immediately.
        </p>

        <button
          onClick={handleOpenModal}
          disabled={fetchingLocation}
          className={`px-6 py-3 rounded-lg shadow-md font-semibold flex items-center gap-2 transition
            ${fetchingLocation
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
            }`}
        >
          {fetchingLocation ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Fetching Location...
            </>
          ) : (
            <>
              <AlertTriangle size={18} /> Report Emergency Now
            </>
          )}
        </button>
      </div>

      {/* 🌍 Location Fetching Overlay */}
      {fetchingLocation && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center text-white z-50">
          <Loader2 size={45} className="animate-spin mb-4" />
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MapPin size={20} /> Fetching your location...
          </h2>
          <p className="text-sm opacity-80 mt-2">Please allow location access in your browser.</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Report Emergency</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <X size={22} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 relative">
                <div className="relative">
                  <textarea
                    placeholder="Describe the emergency..."
                    className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none resize-none bg-gray-50 hover:bg-gray-100 transition"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>

                  {/* 🎤 Mic Button */}
                  <button
                    type="button"
                    onClick={handleRecord}
                    className={`absolute right-3 bottom-3 flex items-center justify-center 
                    w-9 h-9 rounded-full shadow-md border transition-all duration-300 
                    ${recording
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600 border-gray-300"
                      }`}
                  >
                    <Mic size={18} />
                  </button>
                </div>

                {/* Auto Fields Preview */}
                {emergencyType && (
                  <div className="bg-gray-50 p-3 rounded-lg border text-sm text-gray-700">
                    <p><b>Type:</b> {emergencyType}</p>
                    <p><b>Priority:</b> {priorityLevel}</p>
                    <p><b>Address:</b> {address || "Fetching..."}</p>
                    {requiredSupplies.length > 0 && (
                      <p><b>Supplies:</b> {requiredSupplies.join(", ")}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
                  >
                    {loading && <Loader2 size={16} className="animate-spin" />}
                    Submit Report
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
