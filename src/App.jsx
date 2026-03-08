import { useEffect, useRef, useState } from "react";
import "./App.css";

import teenqueen from "./assets/teenqueen.jpg";
import hamilton from "./assets/hamilton.jpg";
import immerse from "./assets/immerse.jpg";
import alibaba from "./assets/alibaba.jpeg";
import worldburn from "./assets/worldburn.jpeg";
import ista from "./assets/ista.jpeg";

const images = [
  {
    id: 1,
    src: hamilton,
    title: "Hamilton | Burr",
    subtitle: "Drama Showcase 2024",
    link: "https://www.instagram.com/p/DKxHysToosg/?igsh=MTF0Z3FyMmpjbTQ4aw==",
  },
  {
    id: 2,
    src: teenqueen,
    title: "We Will Rock You | Teen Queen",
    subtitle: "Musical Production",
    link: "https://www.instagram.com/p/DIMGEg-IMgK/?igsh=MTh2aGF5ZG5oZnJxcQ==",
  },
  {
    id: 3,
    src: worldburn,
    title: "World Burn | Kady Heron",
    subtitle: "Drama Showcase",
    link: "https://www.instagram.com/p/DQCqLsYiOZ_/?igsh=MTNta3FudXd0czNhYw==",
  },
  {
    id: 4,
    src: alibaba,
    title: "Alibaba Pantomime Malta | Ensemble",
    subtitle: "Two week show",
    link: "https://www.instagram.com/p/DTa4-TziLNU/?igsh=MjVsejl1cWI1ZHFl",
  },
  {
    id: 5,
    src: ista,
    title: "ISTA Trip | Participant",
    subtitle: "Invitation only training",
    link: "https://www.instagram.com/p/DPG7lVSiKa1/?igsh=MWVzZzEyZnRnMW81Yg==",
  },
  {
    id: 6,
    src: immerse,
    title: "Immerse Essay Competition | Honours",
    subtitle: "Writing Excellence Award",
    link: "https://www.instagram.com/p/DPEDTC-DABd/?igsh=MWt1ZXg2NnN0ZzdhNg==",
  },
];

export default function App() {
  const sectionsRef = useRef([]);

  // Fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    footer?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">thezoehamilton</div>
        <div className="contact-link" onClick={scrollToFooter}>
          contact
        </div>
      </header>

      <main className="main">
        {images.map((img, i) => (
          <section
            key={img.id}
            className="image-section"
            ref={el => (sectionsRef.current[i] = el)}
          >
            <a href={img.link} target="_blank" rel="noreferrer">
              <div className="image-wrapper">
                {/* Blurred border background */}
                <img src={img.src} alt={img.title} className="blur-edge" />
                {/* Main clear image */}
                <img src={img.src} alt={img.title} className="fade-image" />
                <div className="overlay"></div>
                <div className="image-text">
                  <h2>{img.title}</h2>
                  <p>{img.subtitle}</p>
                </div>
              </div>
            </a>
          </section>
        ))}
      </main>

      <footer id="footer" className="footer">
        <div className="footer-left">
          <h3>thezoehamilton</h3>
          <p>
            Sliema, Malta
            <br />
            Masquerade Blue Box Theatre
          </p>
        </div>
        <div className="footer-right">
          <p>thezoehamilton@gmail.com</p>
          <p>@thezoehamilton</p>
        </div>
      </footer>
    </div>
  );
}