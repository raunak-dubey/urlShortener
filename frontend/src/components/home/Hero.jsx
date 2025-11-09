"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UrlForm from "./UrlForm";
import styles from "@/styles/components/hero.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Hero(){
  const bgRef = useRef(null);

  useEffect(() => {
    // subtle floating background rotation
    gsap.to(bgRef.current, { rotation: 8, duration: 30, repeat: -1, yoyo: true, ease: "sine.inOut" });

  }, []);

  return (
    <section className={styles.hero}>
      <div ref={bgRef} className={styles.heroBg} aria-hidden />
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.subtitle}>Beautiful, brandable short links with analytics — built for creators and teams.</p>

          <div className={styles.formWrap}>
            <UrlForm />
          </div>

          <div className={styles.quick}>
            <div>• Custom slugs</div>
            <div>• Fast redirects</div>
            <div>• Privacy focused</div>
          </div>
        </div>
      </div>
    </section>
  );
}