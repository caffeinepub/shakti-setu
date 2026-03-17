import { BookOpen, Home, ShoppingBag, User, Users } from "lucide-react";
import type { TabId } from "../App";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: {
  id: TabId;
  label: string;
  Icon: React.FC<{ className?: string }>;
}[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "learn", label: "Learn", Icon: BookOpen },
  { id: "market", label: "Market", Icon: ShoppingBag },
  { id: "community", label: "Community", Icon: Users },
  { id: "profile", label: "Profile", Icon: User },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              type="button"
              key={id}
              data-ocid={`nav.${id}.link`}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-primary/10" : ""}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
