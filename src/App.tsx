import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import { Heart, Star } from "lucide-react";
import { toast, Toaster } from "sonner";
import { motion } from "motion/react";
import { imgLock } from "./imports/svg-b9r92";
import { BasicResultsPage } from "./components/BasicResultsPage";
import { PremiumActivatedPage } from "./components/PremiumActivatedPage";

export default function App() {
  const [hideHeader, setHideHeader] = useState(false);
  const [wantToBePerceived, setWantToBePerceived] = useState(false);
  const [toggleMessage, setToggleMessage] = useState("");
  const [showPremiumContent, setShowPremiumContent] = useState(false);
  const [currentPage, setCurrentPage] = useState<"landing" | "subscription" | "basic-results" | "premium-activated">(
    "landing"
  );
  const [showTransition, setShowTransition] = useState(false);

  // Behavior tracking state
  const [behaviorData, setBehaviorData] = useState({
    basicPackageTime: 0,
    premiumPackageTime: 0,
    toggledRomantic: false,
    enteredSubscriptionTime: 0,
  });

  // Refs for tracking interactions and timers
  const hesitationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const premiumTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toggleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());
  const basicStartTimeRef = useRef<number>(0);
  const premiumStartTimeRef = useRef<number>(0);

  // Manage body overflow based on current page
  useEffect(() => {
    if (currentPage === "subscription") {
      // For subscription page, allow vertical scroll but hide horizontal
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    } else if (currentPage === "basic-results" || currentPage === "premium-activated") {
      // For results pages, allow scrolling
      document.body.style.overflowX = "hidden";
      document.body.style.overflowY = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }

    // Cleanup function to restore original state
    return () => {
      if (currentPage === "landing") {
        document.body.style.overflow = "hidden";
      }
    };
  }, [currentPage]);

  // Start tracking when subscriptions are shown
  useEffect(() => {
    if (currentPage === "subscription") {
      const currentTime = Date.now();
      basicStartTimeRef.current = currentTime;
      setBehaviorData((prev) => ({
        ...prev,
        enteredSubscriptionTime: currentTime,
      }));
    }
  }, [currentPage]);

  // Start tracking premium time when premium content is shown
  useEffect(() => {
    if (showPremiumContent) {
      premiumStartTimeRef.current = Date.now();
    }
  }, [showPremiumContent]);

  // Toast trigger 1: Hesitation after 5 seconds on Basic Card page
  useEffect(() => {
    if (currentPage === "subscription" && !showPremiumContent) {
      hesitationTimerRef.current = setTimeout(() => {
        showHesitationToast();
      }, 5000);
    }

    return () => {
      if (hesitationTimerRef.current) {
        clearTimeout(hesitationTimerRef.current);
      }
    };
  }, [currentPage, showPremiumContent]);

  // Toast trigger 2: No interaction 3 seconds after Premium content is shown
  useEffect(() => {
    if (showPremiumContent) {
      lastInteractionRef.current = Date.now();

      const checkForInactivity = () => {
        const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
        if (timeSinceLastInteraction >= 3000) {
          showThinkingToast();
        }
      };

      premiumTimerRef.current = setTimeout(checkForInactivity, 3000);
    }

    return () => {
      if (premiumTimerRef.current) {
        clearTimeout(premiumTimerRef.current);
      }
    };
  }, [showPremiumContent]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (hesitationTimerRef.current) {
        clearTimeout(hesitationTimerRef.current);
      }
      if (premiumTimerRef.current) {
        clearTimeout(premiumTimerRef.current);
      }
      if (toggleTimerRef.current) {
        clearTimeout(toggleTimerRef.current);
      }
    };
  }, []);

  // Console easter egg for curious developers
  useEffect(() => {
    console.log("// Hello curious TyTy 👀");
    console.log("// Looking for secrets?");
    console.log("// Maybe you should just... upgrade your plan instead 😏");
  }, []);

  // Safari mobile viewport fix
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);
    window.addEventListener("orientationchange", setViewportHeight);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
      window.removeEventListener("orientationchange", setViewportHeight);
    };
  }, []);

  // Custom toast functions
  const showHesitationToast = () => {
    toast.custom(
      () => (
        <div
          className="bg-white text-black font-semibold rounded-[12px] px-4 py-3 shadow-lg border-2 border-[#00CCFF] animate-in slide-in-from-bottom duration-300"
          style={{
            boxShadow: "0 0 20px rgba(0, 204, 255, 0.6), 0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          This person is... hesitating, huh?
        </div>
      ),
      { duration: 3000 }
    );
  };

  const showThinkingToast = () => {
    toast.custom(
      () => (
        <div
          className="bg-[#0A0A0A] text-white font-semibold rounded-[12px] px-4 py-3 shadow-lg border-2 border-[#FF5CB8] animate-in slide-in-from-bottom duration-300"
          style={{
            boxShadow: "0 0 20px rgba(255, 92, 184, 0.6), 0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          So... are you really thinking about this?
        </div>
      ),
      { duration: 3000 }
    );
  };

  const showTemptedToast = () => {
    toast.custom(
      () => (
        <div
          className="bg-[#0A0A0A] text-white font-semibold rounded-[12px] px-4 py-3 shadow-lg border-2 border-[#FF5CB8] animate-in slide-in-from-bottom duration-300"
          style={{
            boxShadow: "0 0 20px rgba(255, 92, 184, 0.6), 0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          Ooh, someone's trying. Tempted?
        </div>
      ),
      { duration: 3000 }
    );
  };

  // Track user interactions
  const trackInteraction = () => {
    lastInteractionRef.current = Date.now();
  };

  const handleTogglePerception = (checked: boolean) => {
    trackInteraction();
    setWantToBePerceived(checked);
    setBehaviorData((prev) => ({
      ...prev,
      toggledRomantic: true,
    }));

    if (checked) {
      setToggleMessage("Tell her for the upgrade");
    } else {
      setToggleMessage("Are you sure? She's already known what's on your mind.");
    }

    // Clear any existing timer
    if (toggleTimerRef.current) {
      clearTimeout(toggleTimerRef.current);
    }

    // Start 2-second timer for toggle toast
    toggleTimerRef.current = setTimeout(() => {
      showTemptedToast();
    }, 2000);
  };

  const handleStayOnBasic = () => {
    trackInteraction();

    // Calculate final times
    const currentTime = Date.now();
    const totalBasicTime =
      premiumStartTimeRef.current > 0
        ? (premiumStartTimeRef.current - basicStartTimeRef.current) / 1000
        : (currentTime - basicStartTimeRef.current) / 1000;

    const totalPremiumTime = premiumStartTimeRef.current > 0 ? (currentTime - premiumStartTimeRef.current) / 1000 : 0;

    setBehaviorData((prev) => ({
      ...prev,
      basicPackageTime: Math.round(totalBasicTime),
      premiumPackageTime: Math.round(totalPremiumTime),
    }));

    // Clear timers
    if (toggleTimerRef.current) {
      clearTimeout(toggleTimerRef.current);
    }

    setCurrentPage("basic-results");
  };

  const handleSubscribeToPremium = () => {
    trackInteraction();

    // Clear any existing timers
    if (toggleTimerRef.current) {
      clearTimeout(toggleTimerRef.current);
    }

    // Start the transition animation
    setShowTransition(true);

    // After 2 seconds, show the premium activated screen
    setTimeout(() => {
      setShowTransition(false);
      setCurrentPage("premium-activated");

      // Show success toast
      toast.custom(
        () => (
          <div
            className="bg-[#000000] text-white font-semibold rounded-[12px] px-4 py-3 shadow-lg border-2 border-[#FF69B4] animate-in slide-in-from-bottom duration-300"
            style={{
              boxShadow: "0 0 20px rgba(255, 105, 180, 0.6), 0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            ✅ Girlfriend Premium Package: Activated
          </div>
        ),
        { duration: 4000 }
      );

      // Show playful toast after 5 seconds
      setTimeout(() => {
        toast.custom(
          () => (
            <div
              className="bg-[#0A0A0A] text-white font-semibold rounded-[12px] px-4 py-3 shadow-lg border-2 border-[#FF5CB8] animate-in slide-in-from-bottom duration-300"
              style={{
                boxShadow: "0 0 20px rgba(255, 92, 184, 0.6), 0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              That curtain doesn't pull itself twice...
            </div>
          ),
          { duration: 3000 }
        );
      }, 5000);
    }, 2000);
  };

  return (
    <>
      {/* Landing Page */}
      {currentPage === "landing" && (
        <div className="min-h-screen bg-gray-50 px-4 flex items-center justify-center">
          <div className="max-w-md mx-auto space-y-6">
            {/* Header */}
            {!hideHeader && (
              <div className="flex flex-col gap-6 items-center justify-center w-full">
                <div
                  className="h-20 leading-[0] not-italic relative shrink-0 text-[#f06a83] text-[64px] text-center w-full"
                  style={{ fontFamily: "'Irish Grover', cursive" }}
                >
                  <p className="leading-[normal]">
                    I wonder if <br />I could
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full">
                  <div
                    onClick={() => {
                      if (currentPage === "landing") {
                        setHideHeader(true);
                        setTimeout(() => setCurrentPage("subscription"), 300);
                      }
                    }}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (currentPage === "landing") {
                        setHideHeader(true);
                        setTimeout(() => setCurrentPage("subscription"), 300);
                      }
                    }}
                    className="relative cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      animation: "heartbeat 1.5s ease-in-out infinite",
                    }}
                  >
                    <img
                      src="/images/heartbutton.svg"
                      alt="Heart button"
                      className="w-[90vw] h-auto"
                      style={{
                        width: "calc(90vw)",
                        maxWidth: "calc(400px)",
                      }}
                      data-name="Generated Image September 08, 2025 - 10_42AM 1"
                    />
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-16"
                      data-name="Lock"
                    >
                      <img className="block max-w-none size-full" src={imgLock} alt="Lock icon" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subscription Options - Full Screen */}
      {currentPage === "subscription" && (
        <div
          className="subscription-container min-h-screen w-full px-4 py-12 animate-in fade-in duration-500"
          onClick={trackInteraction}
          onTouchStart={trackInteraction}
          onScroll={trackInteraction}
        >
          <div className="max-w-md mx-auto space-y-8">
            {/* Title */}
            <h1 className="text-2xl text-white text-center font-medium">So... you are thinking about this?</h1>

            {/* Basic Package */}
            <Card className="friends-card border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 friends-card-title">
                  <Star className="w-5 h-5 friends-card-icon" />
                  Basic Package
                </CardTitle>
                <p className="text-sm friends-card-subtitle">Free • Friendly</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm text-white">
                  <li>• Friendly hugs</li>
                  <li>• Support each other</li>
                  <li>• High-fives</li>
                  <li>• Compliment (only when you actually did a good job)</li>
                  <li>• Exchange small gifts</li>
                  <li>• Share little secrets</li>
                  <li>• Mutual playlists sharing</li>
                  <li>• Inside jokes & private nicknames</li>
                  <li>• "This reminded me of you" messages</li>
                  <li>• Care about each other's healthy</li>
                  <li>• Poke your pecs and say: "Wow, good job, young man!"</li>
                  <li>
                    • One non-sensual full-body massage{" "}
                    <span className="text-[10px]">(not the kind you're hoping for.)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Introductory text for Premium */}
            <div className="text-center text-white text-sm font-medium">Oh, this guy says it's not enough...</div>

            {/* Check More Button */}
            {!showPremiumContent && (
              <div className="text-center">
                <Button
                  onClick={() => {
                    trackInteraction();
                    setShowPremiumContent(true);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    trackInteraction();
                    setShowPremiumContent(true);
                  }}
                  className="text-white bg-transparent border border-[#88CCFF] hover:bg-[#88CCFF] hover:text-[#222222] transition-all duration-300"
                >
                  check more...
                </Button>
              </div>
            )}

            {/* Premium Content - Only show when button is clicked */}
            {showPremiumContent && (
              <>
                {/* Girlfriend Premium Package */}
                <Card className="premium-card border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 premium-title-glow text-white">
                      <Heart className="w-5 h-5 premium-card-icon" />
                      Girlfriend Premium Package
                    </CardTitle>
                    <p>
                      <span className="text-[10px] premium-card-subtitle text-white">
                        Babe, if you're checking this... you might be thinking about something more.
                      </span>{" "}
                      😉
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-[#221C26]">
                      <li>
                        <span className="premium-card-icon">🔒</span> Everything in your mind… (yes, that too)
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* CTA Buttons */}
                <div className="space-y-4 pt-6">
                  <Button
                    onClick={handleSubscribeToPremium}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSubscribeToPremium();
                    }}
                    className="w-full premium-button-glow text-white border-none"
                  >
                    Subscribe to Premium
                  </Button>

                  <Button
                    onClick={handleStayOnBasic}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleStayOnBasic();
                    }}
                    className="w-full basic-button border-none hover:bg-gray-500"
                  >
                    Sure, stay on Basic… and take a cold shower
                  </Button>
                </div>

                {/* Romantic Perception Toggle */}
                <Card className="friends-card" style={{ border: "1px solid #88CCFF" }}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-white">Do you want to be perceived romantically?</label>
                      <Switch checked={wantToBePerceived} onCheckedChange={handleTogglePerception} />
                    </div>

                    {toggleMessage && (
                      <div className="mt-3 rounded-lg">
                        <p className="text-sm friends-card-subtitle">{toggleMessage}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Footer */}
                <div
                  className="text-center text-xs mt-8 animate-in fade-in duration-500 delay-200"
                  style={{ color: "#666666" }}
                >
                  <p>
                    Terms and conditions apply. Side effects may include butterflies, overthinking, and unexpected
                    vulnerability.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Basic Results Page */}
      {currentPage === "basic-results" && (
        <BasicResultsPage
          behaviorData={behaviorData}
          showPremiumContent={showPremiumContent}
          onGoBack={() => {
            setCurrentPage("subscription");
            setShowPremiumContent(false);
            setWantToBePerceived(false);
            setShowPremiumContent(true);
            setToggleMessage("");
            setBehaviorData({
              basicPackageTime: 0,
              premiumPackageTime: 0,
              toggledRomantic: false,
              enteredSubscriptionTime: 0,
            });
            basicStartTimeRef.current = Date.now();
          }}
        />
      )}

      {/* Transition Veil Animation */}
      {showTransition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black" />

          {/* Floating caption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-30"
          >
            <p className="text-white text-lg italic text-center px-6">Accessing... a different kind of closeness.</p>
          </motion.div>

          {/* Left curtain */}
          <motion.div
            initial={{ x: "50vw", scaleX: 1 }}
            animate={{ x: "-50vw", scaleX: 1.2 }}
            transition={{
              duration: 1.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute inset-y-0 left-0 w-screen z-20"
            style={{
              background: "linear-gradient(to bottom, #F7C3E0, #E4B1F5)",
              transformOrigin: "right center",
            }}
          >
            {/* Sparkles on left curtain */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`left-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.3,
                }}
              />
            ))}

            {/* Hearts on left curtain */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`left-heart-${i}`}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                  x: [0, Math.random() * 80 - 40],
                  y: [0, Math.random() * 80 - 40],
                }}
                transition={{
                  duration: 2.5,
                  delay: Math.random() * 1.8,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
                className="absolute text-white text-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.4,
                }}
              >
                💖
              </motion.div>
            ))}
          </motion.div>

          {/* Right curtain */}
          <motion.div
            initial={{ x: "-50vw", scaleX: 1 }}
            animate={{ x: "50vw", scaleX: 1.2 }}
            transition={{
              duration: 1.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute inset-y-0 right-0 w-screen z-20"
            style={{
              background: "linear-gradient(to bottom, #F7C3E0, #E4B1F5)",
              transformOrigin: "left center",
            }}
          >
            {/* Sparkles on right curtain */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`right-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 1.5,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 2,
                }}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.3,
                }}
              />
            ))}

            {/* Hearts on right curtain */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`right-heart-${i}`}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [0, 1, 0],
                  rotate: [0, -360],
                  x: [0, Math.random() * 80 - 40],
                  y: [0, Math.random() * 80 - 40],
                }}
                transition={{
                  duration: 2.5,
                  delay: Math.random() * 1.8,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
                className="absolute text-white text-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.4,
                }}
              >
                💖
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Premium Activated Page */}
      {currentPage === "premium-activated" && <PremiumActivatedPage />}

      {/* Toast Container */}
      <Toaster
        position="bottom-center"
        richColors={false}
        closeButton={false}
        toastOptions={{
          style: {
            background: "transparent",
            border: "none",
            boxShadow: "none",
          },
        }}
      />
    </>
  );
}
