import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  ChevronRight,
  Edit,
  HelpCircle,
  LogOut,
  MapPin,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useBadges,
  useCallerProfile,
  useDashboardStats,
} from "../../hooks/useQueries";

const defaultBadges = [
  {
    id: "b1",
    name: "Pehla Kadam",
    description: "First Course",
    emoji: "🎓",
    earned: true,
  },
  {
    id: "b2",
    name: "Pehli Bikri",
    description: "First Sale",
    emoji: "🛍️",
    earned: true,
  },
  {
    id: "b3",
    name: "Community Star",
    description: "50 Likes",
    emoji: "⭐",
    earned: false,
  },
  {
    id: "b4",
    name: "Karobar Queen",
    description: "₹10k Earnings",
    emoji: "👑",
    earned: false,
  },
  {
    id: "b5",
    name: "Seekhne Wali",
    description: "5 Courses",
    emoji: "📚",
    earned: false,
  },
  {
    id: "b6",
    name: "Dost Maker",
    description: "10 Connections",
    emoji: "🤝",
    earned: true,
  },
];

const settingsItems = [
  { label: "Notifications", icon: Bell, ocid: "profile.notifications.button" },
  { label: "Privacy & Security", icon: Shield, ocid: "profile.privacy.button" },
  { label: "Help & Support", icon: HelpCircle, ocid: "profile.help.button" },
];

export default function ProfileScreen() {
  const { data: profile } = useCallerProfile();
  const { data: stats } = useDashboardStats();
  const { data: backendBadges } = useBadges();
  const { clear, identity } = useInternetIdentity();
  const [isEditing, setIsEditing] = useState(false);

  const badges =
    backendBadges && backendBadges.length > 0
      ? backendBadges.map((b, i) => ({
          id: b.id,
          name: b.name,
          description: b.description,
          emoji: ["🎓", "🛍️", "⭐", "👑", "📚", "🤝"][i % 6],
          earned: true,
        }))
      : defaultBadges;

  const profileCompletion = Number(profile?.profileCompletion ?? 72);
  const name = profile?.name ?? "Priya Sharma";
  const location = profile?.location ?? "Mumbai, Maharashtra";
  const earnings = stats?.totalEarnings ?? BigInt(2450);
  const completedCourses = stats?.completedCourses ?? BigInt(3);
  const productsListed = stats?.productsListed ?? BigInt(5);

  const handleLogout = () => {
    clear();
    toast.success("Successfully logged out");
  };

  return (
    <div className="flex flex-col">
      <div className="shakti-gradient px-5 pt-safe pb-8">
        <div className="pt-4 flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">Mera Profile</h1>
          <button
            type="button"
            data-ocid="profile.edit.button"
            onClick={() => setIsEditing(!isEditing)}
            className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-3xl">
            👩
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">{name}</h2>
            <p className="text-white/80 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </p>
            {identity && (
              <p className="text-white/60 text-xs mt-0.5">
                {`${identity.getPrincipal().toString().slice(0, 12)}...`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card
            className="border-0 shakti-card-shadow"
            data-ocid="profile.stats.card"
          >
            <CardContent className="p-4">
              <div className="grid grid-cols-3 divide-x divide-border">
                {[
                  {
                    label: "Courses Done",
                    value: completedCourses.toString(),
                    emoji: "📚",
                  },
                  {
                    label: "Products",
                    value: productsListed.toString(),
                    emoji: "🛍️",
                  },
                  {
                    label: "Earnings",
                    value: `₹${earnings.toString()}`,
                    emoji: "💰",
                  },
                ].map((s) => (
                  <div key={s.label} className="text-center px-2">
                    <p className="text-xl">{s.emoji}</p>
                    <p className="text-base font-black text-foreground">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Card className="border-0 shakti-card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-foreground">
                Profile Completion
              </p>
              <span className="text-sm font-bold text-primary">
                {profileCompletion}%
              </span>
            </div>
            <Progress
              value={profileCompletion}
              className="h-2.5 rounded-full"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Profile photo aur bio add karein 100% complete karne ke liye
            </p>
          </CardContent>
        </Card>

        <div>
          <h2 className="font-bold text-foreground text-sm mb-3">
            Meri Uplabdhiyan 🏆
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                data-ocid={`profile.badge.item.${i + 1}`}
              >
                <Card
                  className={`border-0 text-center ${badge.earned ? "shakti-card-shadow" : "opacity-50 shadow-none"}`}
                >
                  <CardContent className="p-3">
                    <p className="text-2xl mb-1">{badge.emoji}</p>
                    <p className="text-xs font-bold text-foreground leading-tight">
                      {badge.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                      {badge.description}
                    </p>
                    {!badge.earned && (
                      <span className="text-xs text-muted-foreground mt-1 block">
                        🔒
                      </span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-foreground text-sm mb-3">Settings</h2>
          <Card className="border-0 shakti-card-shadow">
            <CardContent className="p-0">
              {settingsItems.map(({ label, icon: Icon, ocid }, i) => (
                <button
                  type="button"
                  key={label}
                  data-ocid={ocid}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors ${
                    i < settingsItems.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground flex-1 text-left">
                    {label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <Button
          data-ocid="profile.logout.button"
          variant="outline"
          onClick={handleLogout}
          className="w-full h-12 rounded-2xl border-destructive text-destructive hover:bg-destructive/10 font-semibold"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        <p className="text-center text-xs text-muted-foreground pb-4">
          © {new Date().getFullYear()} Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-primary underline"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
