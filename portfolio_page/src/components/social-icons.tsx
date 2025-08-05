import Image from "next/image";
import styles from "../styles/social-icons.module.css";

const urls = {
    twitter: "https://x.com/NareshKoirala8",
    instagram: "https://www.instagram.com/eden_naresh/",
    linkedin: "https://www.linkedin.com/in/naresh-koirala-6205582b3/",
    github: "https://github.com/NareshKoirala"
}

const socialPlatforms = [
    {
        name: "Twitter",
        url: urls.twitter,
        icon: "/icons/twitter.ico",
        className: styles.twitter
    },
    {
        name: "Instagram", 
        url: urls.instagram,
        icon: "/icons/instagram.ico",
        className: styles.instagram
    },
    {
        name: "LinkedIn",
        url: urls.linkedin,
        icon: "/icons/linkedin.ico", 
        className: styles.linkedin
    },
    {
        name: "GitHub",
        url: urls.github,
        icon: "/icons/github.ico",
        className: styles.github
    }
];

export default function SocialIcons() {
  return (
    <div className={styles.socialContainer}>
      <div className={styles.socialIconsWrapper}>
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialIcon} ${platform.className}`}
            aria-label={`Visit my ${platform.name} profile`}
            title={platform.name}
          >
            <Image
              src={platform.icon}
              alt={`${platform.name} icon`}
              width={24}
              height={24}
              className={styles.socialIconImage}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
