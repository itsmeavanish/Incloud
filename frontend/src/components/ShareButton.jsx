import React from "react";
const ShareButton = ({children,shared}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Link for Media",
          text: shared,
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
      {children}
    </button>
  );
};

export default ShareButton;
