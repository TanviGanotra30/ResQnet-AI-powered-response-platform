// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AuthPage from "./pages/AuthPage";
// import HomePage from "./pages/HomePage";
// import FindResources from "./pages/FindResources";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/auth" replace />} />
//       <Route path="/auth" element={<AuthPage />} />
//       <Route path="/home" element={<HomePage />} />
//       <Route path="*" element={<div className="p-6 text-center">404 - Not found</div>} />
//     </Routes>
//   );
// }



import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import FindResources from "./pages/FindResources";
import TrackIncidents from "./pages/TrackIncidents";
import ReportEmergency from "./pages/ReportEmergency";
import VolunteerPortal from "./pages/VolunteerPortal";
import DonatePage from "./pages/DonatePage";
import LandingPage from "./pages/LandingPage";


export default function App() {
  const isLoggedIn = localStorage.getItem("access_token");

  return (
    <Routes>
      {/* Default route */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/Landing" /> : <Navigate to="/Landing" />
        }
      />

      {/* Auth Page */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Home Page (after login) */}
      <Route path="/home" element={<HomePage />} />

      {/* Find Resources Page */}
      <Route path="/find-resources" element={<FindResources />} />

      {/* Track Incidents Page */}
      <Route path="/track-incidents" element={<TrackIncidents />} />

      {/* Report Emergency Page */}
      <Route path="/report-emergency" element={<ReportEmergency />} />

      {/* Volunteer Portal Page */}
      <Route path="/volunteer-portal" element={<VolunteerPortal />} />
      <Route path="/Donate" element={<DonatePage/>}/>

      <Route path="/Landing" element={<LandingPage />} />


      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
