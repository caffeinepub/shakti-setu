import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Clock, Play, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useCourses, useEnrollInCourse } from "../../hooks/useQueries";

const sampleCourses = [
  {
    id: "c1",
    title: "Business Planning Basics",
    category: "Business",
    duration: "3 hrs",
    progress: 65,
    enrolled: true,
    rating: 4.8,
    students: 892,
  },
  {
    id: "c2",
    title: "Digital Marketing Starter",
    category: "Marketing",
    duration: "2.5 hrs",
    progress: 0,
    enrolled: false,
    rating: 4.9,
    students: 1240,
  },
  {
    id: "c3",
    title: "Handicraft to Business",
    category: "Skills",
    duration: "4 hrs",
    progress: 100,
    enrolled: true,
    rating: 4.7,
    students: 543,
  },
  {
    id: "c4",
    title: "Instagram for Business",
    category: "Marketing",
    duration: "1.5 hrs",
    progress: 30,
    enrolled: true,
    rating: 4.6,
    students: 2100,
  },
  {
    id: "c5",
    title: "Financial Literacy 101",
    category: "Business",
    duration: "2 hrs",
    progress: 0,
    enrolled: false,
    rating: 4.8,
    students: 678,
  },
  {
    id: "c6",
    title: "Stitching & Tailoring Skills",
    category: "Skills",
    duration: "5 hrs",
    progress: 0,
    enrolled: false,
    rating: 4.9,
    students: 1560,
  },
];

const categories = ["All", "Business", "Marketing", "Skills"];

const categoryColors: Record<string, string> = {
  Business: "bg-primary/10 text-primary",
  Marketing: "bg-accent/15 text-accent",
  Skills: "bg-green-100 text-green-700",
};

export default function LearnScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: backendCourses } = useCourses();
  const enrollMutation = useEnrollInCourse();

  const courses =
    backendCourses && backendCourses.length > 0
      ? backendCourses.map((c) => ({
          id: c.id,
          title: c.title,
          category: c.category,
          duration: `${c.duration} hrs`,
          progress: 0,
          enrolled: false,
          rating: 4.7,
          students: 500,
        }))
      : sampleCourses;

  const filtered =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <div className="flex flex-col">
      <div className="shakti-gradient px-5 pt-safe pb-5">
        <div className="pt-4">
          <h1 className="text-white text-xl font-bold">Sikho & Badho 📚</h1>
          <p className="text-white/80 text-sm mt-1">
            500+ courses to grow your business
          </p>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar mb-4">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              data-ocid={`learn.${cat.toLowerCase()}.tab`}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              data-ocid={`learn.course.item.${i + 1}`}
            >
              <Card className="border-0 shakti-card-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-none text-2xl">
                      {course.category === "Business"
                        ? "📊"
                        : course.category === "Marketing"
                          ? "📱"
                          : "✂️"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          className={`text-xs px-2 py-0 rounded-full border-0 font-semibold ${categoryColors[course.category] ?? "bg-muted text-muted-foreground"}`}
                        >
                          {course.category}
                        </Badge>
                        {course.progress === 100 && (
                          <Badge className="text-xs px-2 py-0 rounded-full bg-green-100 text-green-700 border-0">
                            ✅ Completed
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-foreground text-sm leading-tight">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {course.enrolled &&
                    course.progress > 0 &&
                    course.progress < 100 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                  <div className="mt-3 flex gap-2">
                    {course.enrolled ? (
                      <Button
                        className="flex-1 h-9 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90"
                        data-ocid={`learn.course.primary_button.${i + 1}`}
                      >
                        <Play className="w-3 h-3 mr-1" />
                        {course.progress === 100 ? "Review" : "Continue"}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="flex-1 h-9 rounded-xl text-xs font-semibold border-primary text-primary hover:bg-primary/10"
                        data-ocid={`learn.course.secondary_button.${i + 1}`}
                        onClick={() => enrollMutation.mutate(course.id)}
                        disabled={enrollMutation.isPending}
                      >
                        Enroll Free <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
