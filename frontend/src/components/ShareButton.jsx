import React from "react";
const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "I found this amazing content and thought you’d love it too.",
          url: window.location.href,
        });
        console.log("Content shared successfully!");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <button onClick={handleShare} className="bg-blue-500 text-white p-3 rounded-lg">
      Share
    </button>
  );
};

export default ShareButton;
