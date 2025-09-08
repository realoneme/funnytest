import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Star, Heart, Gift } from "lucide-react";

interface BasicResultsPageProps {
  behaviorData: {
    basicPackageTime: number;
    premiumPackageTime: number;
    toggledRomantic: boolean;
    enteredSubscriptionTime: number;
  };
  showPremiumContent: boolean;
  onGoBack: () => void;
}

export function BasicResultsPage({ 
  behaviorData, 
  showPremiumContent, 
  onGoBack 
}: BasicResultsPageProps) {
  return (
    <div className="subscription-container min-h-screen w-full px-6 py-12 animate-in fade-in duration-500">
      <div className="max-w-md mx-auto space-y-6">
        {/* Title */}
        <h1 className="text-2xl text-white text-center font-semibold">
          You just did all this:
        </h1>

        {/* Behavior List */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-white">
            <Star
              className="w-4 h-4 text-[#88CCFF]"
              style={{
                filter:
                  "drop-shadow(0 0 4px rgba(136, 204, 255, 0.6))",
              }}
            />
            <span>
              Viewed the <strong>Basic Package</strong> for{" "}
              {behaviorData.basicPackageTime} seconds
            </span>
          </div>

          {showPremiumContent && (
            <div className="flex items-center gap-3 text-white">
              <Heart
                className="w-4 h-4 text-[#88CCFF]"
                style={{
                  filter:
                    "drop-shadow(0 0 4px rgba(136, 204, 255, 0.6))",
                }}
              />
              <span>
                Peeked into the{" "}
                <strong>Girlfriend Premium Package</strong>{" "}
                for {behaviorData.premiumPackageTime}{" "}
                seconds
              </span>
            </div>
          )}

          {behaviorData.toggledRomantic && (
            <div className="flex items-center gap-3 text-white">
              <Gift
                className="w-4 h-4 text-[#88CCFF]"
                style={{
                  filter:
                    "drop-shadow(0 0 4px rgba(136, 204, 255, 0.6))",
                }}
              />
              <span>
                Toggled{" "}
                <em>
                  "Do you want to be perceived
                  romantically?"
                </em>
              </span>
            </div>
          )}
        </div>

        {/* Summary Card */}
        <Card className="friends-card border-none mt-8">
          <CardContent className="pt-6 text-center">
            <p className="text-white text-lg">
              But didn't choose any package.
            </p>
            <p className="text-[#88CCFF] text-sm italic mt-2">
              (...indecision is also a decision, huh?)
            </p>
          </CardContent>
        </Card>

        {/* Teasing Line */}
        <div className="text-center py-8">
          <p className="text-[#FFD580] text-xl italic font-medium leading-relaxed">
            I'm still looking forward to see your Thor pecs.
            💪😉
          </p>
          <div
            className="h-0.5 w-3/4 mx-auto mt-3 opacity-60"
            style={{
              background:
                "linear-gradient(90deg, transparent, #FFD580, transparent)",
              filter:
                "drop-shadow(0 0 2px rgba(255, 213, 128, 0.4))",
            }}
          />
        </div>

        {/* Bottom Section */}
        <div className="text-center space-y-4 pt-6">
          <p className="text-white text-lg">
            🔁 Regret your choice?
          </p>
          <p className="text-gray-400 text-sm">
            You can always go back and pick again. Just
            saying. 😌
          </p>

          <Button
            onClick={onGoBack}
            className="w-full bg-transparent border-2 border-[#ff66b3] text-white hover:bg-[#ff66b3] hover:text-black transition-all duration-300"
            style={{
              boxShadow:
                "0 0 15px rgba(255, 102, 179, 0.3)",
            }}
          >
            Go back and reconsider
          </Button>
        </div>
      </div>
    </div>
  );
}