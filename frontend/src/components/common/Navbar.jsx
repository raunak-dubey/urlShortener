"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "@/styles/components/navbar.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const logoRef = useRef(null);
  useEffect(() => {
    // split text into spans for character animation
    const elem = logoRef.current;
    const text = elem.textContent;
    elem.innerHTML = text
      .split("")
      .map((ch) => `<span class="${styles.char}">${ch}</span>`)
      .join("");
    // timeline for chars
    gsap.fromTo(
      `.${styles.char}`,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.02,
        ease: "power3.out",
      }
    );
  }, []);
  
  return (
    <header className={styles.nav}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.left}>
            <Link href="/" ref={logoRef} className={styles.brand}>
              Url Shortener
            </Link>
          </div>
          <nav className={styles.links}>
            <Link href="/auth/register">Sign Up</Link>
            <Link href="/auth/login" className={styles.cta}>
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
