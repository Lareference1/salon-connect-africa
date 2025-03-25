
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./components/auth/AuthContext";
import Index from "./pages/Index";
import Salons from "./pages/Salons";
import Braiders from "./pages/Braiders";
import About from "./pages/About";
import Auth from "./pages/Auth";
import UserSettings from "./pages/UserSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout component that wraps all our providers
const AppLayout = () => (
  <>
    <Outlet />
    <Toaster />
    <Sonner />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/salons" element={<Salons />} />
                  <Route path="/braiders" element={<Braiders />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/settings" element={<UserSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
