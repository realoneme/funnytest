import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SnarkyPopupProps {
  message: string;
  onClose: () => void;
  stackIndex: number;
}

const SnarkyPopup: React.FC<SnarkyPopupProps> = ({ 
  message, 
  onClose, 
  stackIndex 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    // Auto-close after 3 seconds
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow exit animation to complete
    }, 3400);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            y: 100,
            opacity: 0,
            scale: 0.8
          }}
          animate={{ 
            y: 0,
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.3 }
          }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 300,
            duration: 1.2
          }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: "50%",
            bottom: `${20 + (stackIndex * 80)}px`, // Stack effect - each popup 80px higher
            transform: "translateX(-50%)",
            fontFamily: "'Courier New', 'Courier', monospace"
          }}
        >
          <div
            className="px-5 py-4 rounded-xl border-2 max-w-sm mx-4"
            style={{
              backgroundColor: "#fdfdf8",
              borderColor: "#4a5c3c",
              color: "#1d1d1d",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(0, 0, 0, 0.2)"
            }}
          >
            <p 
              className="text-sm leading-relaxed text-center"
              style={{
                fontFamily: "'Courier New', 'Courier', monospace",
                color: "#1d1d1d"
              }}
            >
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SnarkyPopupManagerProps {
  messages: string[];
  forceMessage?: string;
  trigger: number;
  onComplete?: () => void;
}

export const SnarkyPopupManager: React.FC<SnarkyPopupManagerProps> = ({ 
  messages, 
  forceMessage, 
  trigger, 
  onComplete 
}) => {
  const [popups, setPopups] = useState<Array<{ id: number; message: string; stackIndex: number }>>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    if (trigger === 0) return;

    // Small buffer to prevent overlap with toasts
    setTimeout(() => {
      const message = forceMessage || messages[Math.floor(Math.random() * messages.length)];
      const newPopup = {
        id: nextId,
        message,
        stackIndex: popups.length
      };
      
      setPopups(prev => [...prev, newPopup]);
      setNextId(prev => prev + 1);
    }, 200);
  }, [trigger, messages, forceMessage, nextId, popups.length]);

  const handleClose = (id: number) => {
    setPopups(prev => prev.filter(popup => popup.id !== id));
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <>
      {popups.map((popup) => (
        <SnarkyPopup
          key={popup.id}
          message={popup.message}
          stackIndex={popup.stackIndex}
          onClose={() => handleClose(popup.id)}
        />
      ))}
    </>
  );
};