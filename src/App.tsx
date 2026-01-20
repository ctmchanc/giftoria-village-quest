import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GameProvider } from "./contexts/GameContext";
import IntroPage from "./pages/IntroPage";
import VillageMap from "./pages/VillageMap";
import Level1 from "./pages/levels/Level1";
import Level2 from "./pages/levels/Level2";
import Level3 from "./pages/levels/Level3";
import Level4 from "./pages/levels/Level4";
import Level5 from "./pages/levels/Level5";
import FinalePage from "./pages/FinalePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/map" element={<VillageMap />} />
            <Route path="/level/1" element={<Level1 />} />
            <Route path="/level/2" element={<Level2 />} />
            <Route path="/level/3" element={<Level3 />} />
            <Route path="/level/4" element={<Level4 />} />
            <Route path="/level/5" element={<Level5 />} />
            <Route path="/finale" element={<FinalePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
