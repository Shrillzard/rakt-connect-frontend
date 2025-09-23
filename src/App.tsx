import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Emergency from "./pages/Emergency";
import FindDonors from "./pages/FindDonors";
import DonorProfile from "./pages/DonorProfile";
import SignIn from "./pages/SignIn";
import BloodRequests from "./pages/BloodRequests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/find-donors" element={<FindDonors />} />
          <Route path="/donor/:id" element={<DonorProfile />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blood-requests" element={<BloodRequests />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
