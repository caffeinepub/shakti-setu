import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import CommunityScreen from "./components/screens/CommunityScreen";
import HomeScreen from "./components/screens/HomeScreen";
import LearnScreen from "./components/screens/LearnScreen";
import MarketplaceScreen from "./components/screens/MarketplaceScreen";
import OnboardingScreen from "./components/screens/OnboardingScreen";
import ProfileScreen from "./components/screens/ProfileScreen";

export type TabId = "home" | "learn" | "market" | "community" | "profile";

export default function App() {
  const [onboardingDone, setOnboardingDone] = useState(() => {
    return localStorage.getItem("shakti_onboarded") === "true";
  });
  const [activeTab, setActiveTab] = useState<TabId>("home");

  useEffect(() => {
    if (onboardingDone) {
      localStorage.setItem("shakti_onboarded", "true");
    }
  }, [onboardingDone]);

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "learn":
        return <LearnScreen />;
      case "market":
        return <MarketplaceScreen />;
      case "community":
        return <CommunityScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-dvh bg-slate-100 flex items-start justify-center">
      {/* Desktop centering wrapper */}
      <div className="relative bg-background mobile-container flex flex-col shadow-2xl">
        {!onboardingDone ? (
          <OnboardingScreen onComplete={() => setOnboardingDone(true)} />
        ) : (
          <>
            <main className="flex-1 overflow-y-auto pb-20">
              {renderScreen()}
            </main>
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          </>
        )}
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
}
