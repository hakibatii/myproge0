// src/components/home/BannerImage.tsx
import React from "react";

const BannerImage = () => {
  return (
    <div style={styles.imageContainer}>
      <img
        src="/images/kkkkk.jpg"
        alt="Banner"
        style={styles.image}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  imageContainer: {
    height: 220,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 12,
  },
};

export default BannerImage;