import React from "react";
const ShareButton = ({children,shared}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Link for Media",
          text: "Check out this media file!",
          url: shared,
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
    <button onClick={handleShare}>
      {children}
    </button>
  );
};
export default ShareButton;