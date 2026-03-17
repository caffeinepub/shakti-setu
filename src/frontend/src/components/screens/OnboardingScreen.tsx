import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, ShoppingBag, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const steps = [
  {
    id: "step-1",
    headline: "Namaskar! 🙏\nYour Journey Begins Here",
    subtext:
      "Meet Priya — a 32-year-old homemaker who turned her dreams into a thriving business. You can too!",
    visual: "woman",
  },
  {
    id: "step-2",
    headline: "Your 3 Pillars of Success",
    subtext:
      "Everything you need to grow — learning, earning, and a supportive community — all in one place.",
    visual: "pillars",
  },
  {
    id: "step-3",
    headline: "Ready to Begin Your Story?",
    subtext:
      "Thousands of women like you have already started. Join Shakti Setu and take your first step today.",
    visual: "cta",
  },
];

export default function OnboardingScreen({
  onComplete,
}: OnboardingScreenProps) {
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="flex flex-col h-dvh shakti-gradient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-32 left-0 w-32 h-32 rounded-full bg-white/10 -translate-x-1/2" />

      <div className="flex justify-end p-5">
        <button
          type="button"
          data-ocid="onboarding.close_button"
          onClick={onComplete}
          className="text-white/80 text-sm font-medium hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[step].id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center text-center w-full"
          >
            {step === 0 && (
              <>
                <div className="mb-6 rounded-3xl overflow-hidden w-52 h-56 bg-white/20 shadow-purple-md flex items-center justify-center">
                  <img
                    src="/assets/generated/onboarding-woman.dim_300x320.png"
                    alt="Priya – homemaker entrepreneur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white/20 rounded-2xl px-4 py-2 mb-4">
                  <p className="text-white/90 text-xs font-medium">
                    "मेरा सपना — मेरा व्यापार" ✨
                  </p>
                </div>
              </>
            )}

            {step === 1 && (
              <div className="flex gap-4 mb-8 w-full">
                {[
                  {
                    icon: BookOpen,
                    label: "Learn",
                    desc: "500+ courses",
                    color: "bg-white/20",
                  },
                  {
                    icon: ShoppingBag,
                    label: "Earn",
                    desc: "Sell online",
                    color: "bg-accent/30",
                  },
                  {
                    icon: Users,
                    label: "Connect",
                    desc: "5000+ women",
                    color: "bg-white/20",
                  },
                ].map(({ icon: Icon, label, desc, color }) => (
                  <div
                    key={label}
                    className={`flex-1 ${color} rounded-2xl p-4 flex flex-col items-center gap-2`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-white font-bold text-sm">{label}</p>
                    <p className="text-white/80 text-xs">{desc}</p>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="mb-8">
                <img
                  src="/assets/generated/community-women.dim_300x200.png"
                  alt="Women community"
                  className="w-64 h-44 object-cover rounded-3xl shadow-purple-md"
                />
                <div className="flex gap-2 mt-4 justify-center">
                  {["🏆", "💰", "🌟", "❤️"].map((e) => (
                    <span key={e} className="text-2xl">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <h1 className="text-white text-2xl font-bold leading-tight mb-3 whitespace-pre-line">
              {steps[step].headline}
            </h1>
            <p className="text-white/85 text-sm leading-relaxed max-w-xs">
              {steps[step].subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-10 flex flex-col items-center gap-5">
        <div className="flex gap-2" data-ocid="onboarding.panel">
          {steps.map((s, i) => (
            <button
              type="button"
              key={s.id}
              onClick={() => setStep(i)}
              data-ocid={`onboarding.item.${i + 1}`}
              className={`rounded-full transition-all ${i === step ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"}`}
            />
          ))}
        </div>

        <Button
          data-ocid="onboarding.primary_button"
          onClick={next}
          className="w-full h-14 rounded-2xl text-base font-bold bg-white text-primary hover:bg-white/90 shadow-purple-md"
        >
          {step < steps.length - 1 ? (
            <span className="flex items-center gap-2">
              Aage Badhein <ChevronRight className="w-5 h-5" />
            </span>
          ) : (
            "Start Your Journey 🚀"
          )}
        </Button>
      </div>
    </div>
  );
}
