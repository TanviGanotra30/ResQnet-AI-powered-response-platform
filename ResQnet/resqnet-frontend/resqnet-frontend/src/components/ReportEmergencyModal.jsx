// import React, { useState, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Mic, Loader2 } from "lucide-react";
// import Swal from "sweetalert2";
// import axiosInstance from "../api/axiosInstance";

// export default function ReportEmergencyModal({ show, onClose }) {
//   const [description, setDescription] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [phase, setPhase] = useState(""); // "fetching-location" | "classifying" | "getting-address" | "submitting"

//   const [coords, setCoords] = useState(null);
//   const [address, setAddress] = useState("");
//   const [classification, setClassification] = useState(null);

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const streamRef = useRef(null);

//   const TRANSCRIBE_API = "https://alysha-nonvibrating-winona.ngrok-free.dev/transcribe";
//   const CLASSIFY_API = "https://incident-bot-api.onrender.com/classify";
//   const ADDRESS_API = "https://address-fetching-api.onrender.com/get-address";

//   // 🎙️ Voice recording logic
//   const handleMicClick = async () => {
//     if (isRecording) {
//       mediaRecorderRef.current?.stop();
//       setIsRecording(false);
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//       }
//       return;
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

//       mediaRecorder.onstop = async () => {
//         const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//         const file = new File([blob], "recording.webm", { type: "audio/webm" });

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//           const res = await fetch(TRANSCRIBE_API, { method: "POST", body: formData });
//           const data = await res.json();
//           if (data.text) {
//             setDescription((prev) => (prev ? prev + " " + data.text : data.text));
//           } else {
//             Swal.fire("Info", "No speech detected. Try again.", "info");
//           }
//         } catch (err) {
//           Swal.fire("Error", "Transcription failed.", "error");
//         }
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (err) {
//       Swal.fire("Error", "Please allow microphone access.", "error");
//     }
//   };

//   // 🚨 Final smart submit process
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!description.trim()) {
//       Swal.fire("Error", "Please describe the emergency.", "error");
//       return;
//     }

//     try {
//       setIsProcessing(true);
//       setPhase("fetching-location");

//       // 1️⃣ Get location
//       const coords = await new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(
//           (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
//           (err) => reject(err)
//         );
//       });
//       setCoords(coords);

//       // 2️⃣ Classify
//       setPhase("classifying");
//       const classifyRes = await fetch(CLASSIFY_API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ situation: description }),
//       });
//       const classifyData = await classifyRes.json();
//       setClassification(classifyData);

//       // 3️⃣ Get address
//       setPhase("getting-address");
//       const addressRes = await fetch(ADDRESS_API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ latitude: coords.lat, longitude: coords.lng }),
//       });
//       const addressData = await addressRes.json();
//       const fetchedAddress = addressData.success ? addressData.address : "Unknown";
//       setAddress(fetchedAddress);

//       // 4️⃣ Submit to backend
//       setPhase("submitting");
//       const payload = {
//         text: description,
//         location: { type: "Point", coordinates: [coords.lng, coords.lat] },
//         address: fetchedAddress,
//         emergencyType: classifyData.incident?.toLowerCase() || "general",
//         priorityLevel: classifyData.priority?.toLowerCase() || "medium",
//         requiredSupplies: classifyData.supplies
//           ? classifyData.supplies.split(" ")
//           : [],
//       };

//       const res = await axiosInstance.post("/reports", payload);
//       if (res.data.success) {
//         Swal.fire("✅ Success", "Emergency reported successfully!", "success");
//         setDescription("");
//         setIsProcessing(false);
//         onClose();
//       }
//     } catch (err) {
//       console.error("Workflow error:", err);
//       Swal.fire("Error", "Something went wrong while reporting.", "error");
//       setIsProcessing(false);
//     }
//   };

//   // 🧠 Step loader messages
//   const phaseMessages = {
//     "fetching-location": {
//       text: "📍 Fetching your location...",
//       sub: "Please allow location access.",
//     },
//     classifying: {
//       text: "🧠 Classifying your report...",
//       sub: "Analyzing your emergency type and priority.",
//     },
//     "getting-address": {
//       text: "📬 Getting your address...",
//       sub: "Reverse geocoding your coordinates.",
//     },
//     submitting: {
//       text: "🚀 Submitting your report...",
//       sub: "Sending to response network.",
//     },
//   };

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {/* ✅ Processing Flow Screen */}
//           {isProcessing ? (
//             <motion.div
//               className="bg-white p-8 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center gap-3 w-[90%] max-w-md"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//             >
//               <Loader2 className="animate-spin text-red-500" size={45} />
//               <h3 className="font-semibold text-gray-800 text-lg">
//                 {phaseMessages[phase]?.text}
//               </h3>
//               <p className="text-gray-500 text-sm">{phaseMessages[phase]?.sub}</p>
//             </motion.div>
//           ) : (
//             // ✅ Main Modal
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md border border-gray-200"
//             >
//               {/* Header */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">Report Emergency</h2>
//                 <button
//                   onClick={onClose}
//                   className="text-gray-500 hover:text-red-500 transition"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-4 relative">
//                 {/* 🧾 Description */}
//                 <div className="relative">
//                   <textarea
//                     placeholder="Describe the emergency..."
//                     className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-rose-400 outline-none resize-none bg-gray-50 hover:bg-gray-100 transition"
//                     rows="3"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                   ></textarea>

//                   {/* 🎙️ Mic Button */}
//                   <button
//                     type="button"
//                     onClick={handleMicClick}
//                     className={`absolute right-3 bottom-3 flex items-center justify-center w-9 h-9 rounded-full border shadow-md transition-all duration-200 active:scale-95
//                       ${isRecording
//                         ? "bg-red-600 text-white animate-pulse"
//                         : "bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600"
//                       }`}
//                   >
//                     <Mic size={18} />
//                   </button>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="flex justify-end gap-3 mt-4">
//                   <button
//                     type="button"
//                     onClick={onClose}
//                     className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           )}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }





















import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

export default function ReportEmergencyModal({ show, onClose }) {
  const [description, setDescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phase, setPhase] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const TRANSCRIBE_API = "https://alysha-nonvibrating-winona.ngrok-free.dev/transcribe";
  const CLASSIFY_API = "https://incident-bot-api.onrender.com/classify";
  const ADDRESS_API = "https://address-fetching-api.onrender.com/get-address";

  // 🎙️ Voice recording logic
  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch(TRANSCRIBE_API, { method: "POST", body: formData });
          const data = await res.json();
          if (data.text) setDescription((prev) => (prev ? prev + " " + data.text : data.text));
          else Swal.fire("Info", "No speech detected. Try again.", "info");
        } catch (err) {
          Swal.fire("Error", "Transcription failed.", "error");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      Swal.fire("Error", "Please allow microphone access.", "error");
    }
  };

  // 🚨 Optimized smart submit process
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      Swal.fire("Error", "Please describe the emergency.", "error");
      return;
    }

    try {
      setIsProcessing(true);
      setPhase("fetching-location");

      // 1️⃣ Get location
      const coords = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => reject(err)
        );
      });

      // 2️⃣ Classify
      setPhase("classifying");
      const classifyRes = await fetch(CLASSIFY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: description }),
      });
      const classifyData = await classifyRes.json();

      // 3️⃣ Get address
      setPhase("getting-address");
      const addressRes = await fetch(ADDRESS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: coords.lat, longitude: coords.lng }),
      });
      const addressData = await addressRes.json();
      const address = addressData.success ? addressData.address : "Unknown";

      // 4️⃣ Submit final report automatically
      setPhase("submitting");
      const payload = {
        text: description,
        location: { type: "Point", coordinates: [coords.lng, coords.lat] },
        address,
        emergencyType: classifyData.incident?.toLowerCase() || "general",
        priorityLevel: classifyData.priority?.toLowerCase() || "medium",
        requiredSupplies: classifyData.supplies ? classifyData.supplies.split(" ") : [],
      };

      const res = await axiosInstance.post("/reports", payload);

      if (res.data.success) {
        Swal.fire("✅ Success", "Emergency reported successfully!", "success");
        setDescription("");
        setIsProcessing(false);
        onClose();
      }
    } catch (err) {
      console.error("Workflow error:", err);
      Swal.fire("Error", "Something went wrong while reporting.", "error");
      setIsProcessing(false);
    }
  };

  // 🧠 Step loader messages
  const phaseMessages = {
    "fetching-location": {
      text: "📍 Fetching your location...",
      sub: "Please allow location access.",
    },
    classifying: {
      text: "🧠 Classifying your report...",
      sub: "Analyzing your emergency type and priority...",
    },
    "getting-address": {
      text: "📬 Getting your address...",
      sub: "Reverse geocoding your coordinates...",
    },
    submitting: {
      text: "🚀 Submitting your report...",
      sub: "Sending to emergency network...",
    },
  };

  // 🧩 Simple progress indicator (minimal change)
  const progressSteps = ["fetching-location", "classifying", "getting-address", "submitting"];
  const currentIndex = progressSteps.indexOf(phase);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {isProcessing ? (
            // ✅ Smart Processing Loader
            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl text-center flex flex-col items-center justify-center gap-4 w-[90%] max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Loader2 className="animate-spin text-red-500" size={45} />
              <h3 className="font-semibold text-gray-800 text-lg">
                {phaseMessages[phase]?.text}
              </h3>
              <p className="text-gray-500 text-sm">{phaseMessages[phase]?.sub}</p>

              {/* ✅ Minimal progress dots */}
              <div className="flex justify-center gap-2 mt-3">
                {progressSteps.map((step, i) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i <= currentIndex ? "bg-red-500" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </motion.div>
          ) : (
            // ✅ Main Modal (unchanged style)
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
                  onClick={onClose}
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

                  <button
                    type="button"
                    onClick={handleMicClick}
                    className={`absolute right-3 bottom-3 flex items-center justify-center 
                      w-9 h-9 rounded-full border shadow-md transition-all duration-200 active:scale-95
                      ${isRecording
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                      }`}
                  >
                    <Mic size={18} />
                  </button>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
