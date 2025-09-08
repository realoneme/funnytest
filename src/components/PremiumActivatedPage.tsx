import React, { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { SnarkyPopupManager } from "./SnarkyPopup";

interface PremiumActivatedPageProps {
  onBack?: () => void;
}

export function PremiumActivatedPage({
  onBack,
}: PremiumActivatedPageProps) {
  const [showProviderNote, setShowProviderNote] =
    useState(false);
  const [showGoldenMessage, setShowGoldenMessage] =
    useState(false);
  const [continueClickCount, setContinueClickCount] =
    useState(0);
  const [popupTrigger, setPopupTrigger] = useState(0);

  const snarkyMessages = [
    "Don’t go lookin’ for real experience on a webpage, sweetheart.",
    "Clickin' again? What are ya hopin' for, a miracle?",
    "She ain't gonna show up just 'cause you tapped a button, lad.",
    "What are you waitin' for, an AI to write your feelings too?",
    "It's your move now, Mr. Touchy.",
    "Still here? Maybe flex your courage next, not just your pecs.",
    "You've clicked enough. Time to grow a spine, son.",
  ];

  const handleContinueClick = () => {
    const newCount = continueClickCount + 1;
    setContinueClickCount(newCount);

    if (newCount === 1) {
      // First click - show original functionality
      setShowProviderNote(true);

      setTimeout(() => {
        setShowGoldenMessage(true);
      }, 2000);
    } else {
      // Subsequent clicks - show popup
      setPopupTrigger((prev) => prev + 1);
    }
  };

  return (
    <div
      className="min-h-screen w-full px-6 py-12 flex items-center justify-center animate-in fade-in duration-500"
      style={{
        background: "#000000",
        backgroundImage:
          "radial-gradient(circle at center, rgba(255, 102, 204, 0.15) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-md mx-auto text-center space-y-8">
        {/* Premium Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-block"
        >
          <div
            className="px-6 py-3 rounded-full border-2 border-[#FF66CC] bg-black/50 backdrop-blur-sm"
            style={{
              boxShadow: "0 0 30px rgba(255, 102, 204, 0.4)",
            }}
          >
            <span className="text-[#FF66CC] font-semibold">
              ✨ PREMIUM ACTIVATED ✨
            </span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl text-white font-medium">
            Welcome to
            <br />
            <span
              className="text-[#FF66CC]"
              style={{
                textShadow: "0 0 20px rgba(255, 102, 204, 0.6)",
              }}
            >
              Girlfriend Premium
            </span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            You've unlocked a deeper connection.
            <br />
            <span className="text-[#FF66CC] italic">
              Things just got... interesting. 😉
            </span>
          </p>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="space-y-4"
        >
          <div
            className="p-4 rounded-lg border border-[#FF66CC]/30 bg-black/30 backdrop-blur-sm"
            style={{
              boxShadow: "0 0 15px rgba(255, 102, 204, 0.1)",
            }}
          >
            <p className="text-white text-sm">
              🔓 <strong>Exclusive Access:</strong> Everything
              you've been thinking about...
            </p>
            <p className="text-[#FF66CC] text-xs italic mt-2">
              (Yes, that too. We know what's on your mind. 💭)
            </p>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="pt-6"
        >
          <Button
            onClick={handleContinueClick}
            className="w-full bg-gradient-to-r from-[#FF66CC] to-[#FF66B3] text-white border-none font-medium py-3"
            style={{
              boxShadow: "0 0 25px rgba(255, 102, 204, 0.5)",
            }}
          >
            Continue the Experience ✨
          </Button>
        </motion.div>

        {/* Golden Message */}
        {showGoldenMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-6"
          >
            <div className="text-center space-y-1">
              <p
                className="italic leading-relaxed"
                style={{
                  color: "#FFD700",
                  textShadow:
                    "0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3)",
                  fontSize: "15px",
                }}
              >
                Oi. Go tell the girl.
              </p>
              <p
                className="italic leading-relaxed"
                style={{
                  color: "#FFD700",
                  textShadow:
                    "0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3)",
                  fontSize: "15px",
                }}
              >
                Before she thinks you've lost your bloody mind.
              </p>
              <p
                className="italic leading-relaxed"
                style={{
                  color: "#FFD700",
                  textShadow:
                    "0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3)",
                  fontSize: "15px",
                }}
              >
                No point flexin' in the mirror if you're too
                scared to say a word.
              </p>
              <p
                className="italic leading-relaxed"
                style={{
                  color: "#FFD700",
                  textShadow:
                    "0 0 10px rgba(255, 215, 0, 0.6), 0 0 20px rgba(255, 215, 0, 0.3)",
                  fontSize: "15px",
                }}
              >
                Go on. Use those gains properly.
              </p>
            </div>
          </motion.div>
        )}

        {/* Provider Note - Inline */}
        {showProviderNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pt-6"
          >
            <div
              className="bg-[#FF66CC]/10 border-2 border-[#FF66CC]/50 rounded-lg p-4 backdrop-blur-sm"
              style={{
                boxShadow: "0 0 20px rgba(255, 102, 204, 0.2)",
              }}
            >
              <div className="text-[#FF66CC] text-xs font-medium mb-2">
                note from the provider:
              </div>
              <div className="text-white text-sm leading-relaxed space-y-2">
                <p>
                  sorry, I'm not really a big fan of touching
                  others…
                </p>
                <p>but I do like being touched or caressed.</p>
                <div className="pt-2 border-t border-[#FF66CC]/20">
                  <p className="text-gray-300 text-xs italic">
                    still — non-sensual full-body massage only
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="text-gray-500 text-xs italic"
        >
          Welcome to the premium side of things... 🌹
        </motion.p>
      </div>

      {/* Snarky Popup System */}
      <SnarkyPopupManager
        messages={snarkyMessages}
        forceMessage={
          continueClickCount > 0 && continueClickCount % 5 === 0
            ? "You're making me finish my tea too fast."
            : undefined
        }
        trigger={popupTrigger}
      />
    </div>
  );
}