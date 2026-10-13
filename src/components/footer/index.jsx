import { FiCoffee, FiFacebook, FiGithub, FiGlobe, FiHeart, FiLinkedin, FiMail, FiPackage, FiYoutube } from "react-icons/fi";
import styles from "./styles.module.css";

const links = [
  { label: "Portfolio", href: "https://www.ashishranjan.net", Icon: FiGlobe },
  { label: "GitHub", href: "https://github.com/a2rp", Icon: FiGithub },
  { label: "CodePen", href: "https://codepen.io/ash1198", Icon: FiPackage },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", Icon: FiLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", Icon: FiFacebook },
  { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", Icon: FiYoutube },
  { label: "Email", href: "mailto:ash.ranjan09@gmail.com", Icon: FiMail },
  { label: "Support", href: "https://a2rp-donation-page.netlify.app/", Icon: FiHeart },
  { label: "Buy Me a Coffee", href: "https://www.buymeacoffee.com/ashishranjan", Icon: FiCoffee },
  { label: "Patreon", href: "https://www.patreon.com/ashishranjan", Icon: FiHeart },
  { label: "Source code", href: "https://github.com/a2rp/content-management-system", Icon: FiGithub },
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.copyright}>
      <a href="https://www.ashishranjan.net" aria-label="Ashish Ranjan portfolio">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />
      </a>
      <p>© {new Date().getFullYear()} <a className={styles.name} href="https://www.ashishranjan.net">Ashish Ranjan</a>. All rights reserved.</p>
    </div>
    <nav className={styles.links} aria-label="Creator links">
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label} title={label}>
          <Icon aria-hidden="true" />
        </a>
      ))}
    </nav>
  </footer>
);

export default Footer;
