import Image from "next/image";
import React from "react";
import styles from "./footer.module.css";

const SOCIAL_ICONS = [
  { src: "/1.png", alt: "BlogMania Facebook" },
  { src: "/2.png", alt: "BlogMania Instagram" },
  { src: "/3.png", alt: "BlogMania Twitter" },
  { src: "/4.png", alt: "BlogMania YouTube" },
];

const SocialIcon = ({ src, alt }) => (
  <Image src={src} width={15} height={15} className={styles.icon} alt={alt} />
);

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2026 BlogMania. All rights reserved.</div>
      <div className={styles.social}>
        {SOCIAL_ICONS.map((icon) => (
          <SocialIcon key={icon.alt} src={icon.src} alt={icon.alt} />
        ))}
      </div>
    </div>
  );
};

export default Footer;
