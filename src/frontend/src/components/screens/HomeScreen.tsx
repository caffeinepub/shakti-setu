import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Clock,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useDashboardStats } from "../../hooks/useQueries";

const topSellers = [
  {
    name: "Handmade Jhola Bag",
    price: 450,
    seller: "Sunita Devi",
    image: "/assets/generated/product-handicraft.dim_200x200.png",
    rating: 4.8,
  },
  {
    name: "Homemade Pickle Set",
    price: 280,
    seller: "Rekha Ben",
    image: "/assets/generated/product-food.dim_200x200.png",
    rating: 4.9,
  },
];

const todaysPick = {
  title: "Digital Marketing for Beginners",
  category: "Marketing",
  duration: "2.5 hrs",
  rating: 4.9,
  students: 1240,
};

export default function HomeScreen() {
  const { data: stats } = useDashboardStats();

  const statItems = [
    {
      label: "Enrolled",
      value: stats?.enrolledCourses?.toString() ?? "3",
      icon: "📚",
    },
    {
      label: "Completed",
      value: stats?.completedCourses?.toString() ?? "1",
      icon: "✅",
    },
    {
      label: "Products",
      value: stats?.productsListed?.toString() ?? "2",
      icon: "🛍️",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Purple Header */}
      <div className="shakti-gradient px-5 pt-safe pb-6">
        <div className="flex items-center justify-between pt-4 mb-4">
          <div>
            <p className="text-white/80 text-sm">Good morning</p>
            <h1 className="text-white text-xl font-bold">
              Namaskar, Priya! 🙏
            </h1>
          </div>
          <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xl">
            👩
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {statItems.map((s) => (
            <div
              key={s.label}
              className="bg-white/15 rounded-2xl p-3 text-center"
              data-ocid="home.stats.card"
            >
              <p className="text-xl mb-0.5">{s.icon}</p>
              <p className="text-white font-bold text-lg leading-none">
                {s.value}
              </p>
              <p className="text-white/80 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Quick Actions */}
        <div>
          <h2 className="text-foreground font-bold text-base mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Learn",
                icon: BookOpen,
                color: "bg-primary/10 text-primary",
                ocid: "home.learn.button",
              },
              {
                label: "My Shop",
                icon: ShoppingBag,
                color: "bg-accent/15 text-accent",
                ocid: "home.shop.button",
              },
              {
                label: "Community",
                icon: Users,
                color: "bg-green-100 text-green-700",
                ocid: "home.community.button",
              },
            ].map(({ label, icon: Icon, color, ocid }) => (
              <motion.div
                key={label}
                whileTap={{ scale: 0.95 }}
                data-ocid={ocid}
              >
                <Card className="border-0 shakti-card-shadow cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-foreground text-center">
                      {label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Today's Pick */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground font-bold text-base">
              Today's Pick 🔥
            </h2>
            <span className="text-primary text-xs font-semibold">See all</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card
              className="border-0 shakti-card-shadow overflow-hidden"
              data-ocid="home.course.card"
            >
              <div className="h-28 relative overflow-hidden">
                <img
                  src="/assets/generated/learn-illustration.dim_300x200.png"
                  alt="course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent" />
                <span className="absolute top-3 left-3 bg-accent text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {todaysPick.category}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-foreground text-sm mb-2">
                  {todaysPick.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {todaysPick.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    {todaysPick.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {todaysPick.students} students
                  </span>
                </div>
                <Button
                  className="mt-3 w-full h-9 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90"
                  data-ocid="home.course.primary_button"
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Top Sellers */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-foreground font-bold text-base">
              Top Sellers 🛍️
            </h2>
            <span className="text-primary text-xs font-semibold">View all</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
            {topSellers.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                data-ocid={`home.product.item.${i + 1}`}
                className="flex-none w-40"
              >
                <Card className="border-0 shakti-card-shadow overflow-hidden">
                  <div className="h-28 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.seller}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-bold text-primary">
                        ₹{product.price}
                      </p>
                      <span className="text-xs flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {product.rating}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Earnings Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="orange-gradient rounded-2xl p-4 flex items-center gap-3"
            data-ocid="home.earnings.card"
          >
            <div className="text-4xl">💰</div>
            <div>
              <p className="text-white font-bold text-sm">
                Your Earnings This Month
              </p>
              <p className="text-white text-2xl font-black">
                ₹{stats?.totalEarnings?.toString() ?? "2,450"}
              </p>
              <p className="text-white/80 text-xs">
                Keep going! You're doing great 🌟
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pb-2">
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
