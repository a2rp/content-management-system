import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiCalendar, FiEdit3, FiGrid, FiMenu, FiSearch, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const links = [
  { to: "/overview", label: "Overview", Icon: FiGrid },
  { to: "/calendar", label: "Calendar", Icon: FiCalendar },
  { to: "/library", label: "Content library", Icon: FiEdit3 },
  { to: "/reviews", label: "Review desk", Icon: FiEdit3 },
];

const Header = ({ reviewCount, searchValue, onSearchChange, onSearch, onNewContent }) => {
  const lastScroll = useRef(0);
  const searchInput = useRef(null);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
        window.setTimeout(() => searchInput.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (menuOpen || current < 24 || current < lastScroll.current - 8) setHidden(false);
      else if (current > lastScroll.current + 8) setHidden(true);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    onSearch(searchValue);
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header className={`${styles.header} ${hidden && !menuOpen ? styles.hidden : ""} ${menuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.inner}>
        <NavLink to="/overview" className={styles.brand} aria-label="Morrow editorial workspace">
          <span className={styles.mark}><FiEdit3 aria-hidden="true" /></span>
          <span><strong>morrow</strong><small>EDITORIAL STUDIO</small></span>
        </NavLink>

        <nav className={styles.nav} aria-label="Main navigation">
          {links.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
              <Icon aria-hidden="true" />
              {label}
              {label === "Review desk" && reviewCount > 0 ? <span className={styles.badge}>{reviewCount}</span> : null}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <form className={`${styles.search} ${searchOpen ? styles.searchOpen : ""}`} onSubmit={submitSearch} role="search">
            <FiSearch aria-hidden="true" />
            <input ref={searchInput} aria-label="Search content" value={searchValue} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search stories" />
            <kbd>Ctrl K</kbd>
            <button className={styles.searchButton} type="button" aria-label="Open content search" onClick={() => { setSearchOpen(true); window.setTimeout(() => searchInput.current?.focus(), 0); }}><FiSearch /></button>
          </form>
          <button className={styles.newButton} type="button" onClick={() => { setMenuOpen(false); onNewContent(); }}><FiEdit3 aria-hidden="true" /> New story</button>
          <div className={styles.profile} aria-label="Signed in as Mara Ellis"><span>ME</span><small>Mara Ellis</small></div>
          <button className={styles.menuButton} type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <FiX /> : <FiMenu />}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
