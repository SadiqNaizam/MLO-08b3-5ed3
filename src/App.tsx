import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // shadcn Sonner
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import MedicationsPage from "./pages/MedicationsPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Basic auth check placeholder
const isAuthenticated = () => {
  // In a real app, check for a token, user session, etc.
  // For this example, let's assume not authenticated by default to show AuthPage
  // To test protected routes, you can temporarily set this to true
  // console.log("Current auth state check (mock):", false); // or true
  return false; // Set to true to simulate logged in user for direct access to dashboard
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    console.log("ProtectedRoute: Not authenticated, redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }
  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* For shadcn Toasts */}
      <Sonner /> {/* For shadcn Sonner (rich toasts) */}
      <BrowserRouter>
        <Routes>
          {/* Auth page is the entry point / default */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            // <ProtectedRoute> Remove protection for easier testing without real auth
              <DashboardPage />
            // </ProtectedRoute>
          }/>
          <Route path="/appointments" element={
            // <ProtectedRoute>
              <AppointmentsPage />
            // </ProtectedRoute>
          }/>
          <Route path="/medications" element={
            // <ProtectedRoute>
              <MedicationsPage />
            // </ProtectedRoute>
          }/>
          <Route path="/user-profile" element={
            // <ProtectedRoute>
              <UserProfilePage />
            // </ProtectedRoute>
          }/>
          
          {/* Fallback for unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;