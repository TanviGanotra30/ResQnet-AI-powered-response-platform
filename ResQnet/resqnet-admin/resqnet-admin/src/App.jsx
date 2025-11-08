import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Volunteers from "./pages/Volunteers";
import Reports from "./pages/Reports";
import Feedback from "./pages/Feedbacks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/feedbacks" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
