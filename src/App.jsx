import { useEffect, useRef } from "react";
import "./App.css";

import teenqueen from "./assets/teenqueen.jpg";
import hamilton from "./assets/hamilton.jpg";
import immerse from "./assets/immerse.jpg";

const images = [
  {
    id: 1,
    src: teenqueen,
    title: "We Will Rock You | Teen Queen",
    subtitle: "Musical Production",
    link: "https://www.instagram.com/p/DIMGEg-IMgK/?igsh=MTh2aGF5ZG5oZnJxcQ==",
  },
  {
    id: 2,
    src: hamilton,
    title: "Hamilton | Burr",
    subtitle: "Drama Showcase 2024",
    link: "https://www.instagram.com/p/DKxHysToosg/?igsh=MTF0Z3FyMmpjbTQ4aw==",
  },
  {
    id: 3,
    src: immerse,
    title: "Immerse Essay Competition | Honours",
    subtitle: "Writing Excellence Award",
    link: "https://www.instagram.com/p/DQCqLsYiOZ_/?igsh=MTNta3FudXd0czNhYw==",
  },
  /*{
    id: 4,
    src: choir,
    title: "Andrew Lloyd Choir",
    subtitle: "Vocal Ensemble",
    link: "https://www.instagram.com/p/DPEEW3VjFWt/?igsh=cnkwZ2VxNjR5N2s5",
  },*/
]
export default function App() {
  const sectionsRef = useRef([]);

  // Fade-in effect using Intersection Observer
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
      {/* Header */}
      <header className="header">
        <div className="logo">thezoehamilton</div>
        <div className="contact-link" onClick={scrollToFooter}>
          contact
        </div>
      </header>

      {/* Main content */}
      <main className="main">
        {images.map((img, i) => (
          <section
            key={img.id}
            className="image-section"
            ref={el => (sectionsRef.current[i] = el)}
          >
            <a href={img.link} target="_blank" rel="noreferrer">
              <div className="image-wrapper">
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

      {/* Footer */}
      <footer id="footer" className="footer">
        <div className="footer-left">
          <h3>thezoehamilton</h3>
          <p>
            123 Theatre Lane
            <br />
            London, UK
          </p>
        </div>
        <div className="footer-right">
          <p>contact@thezoehamilton.com</p>
          <p>@thezoehamilton</p>
        </div>
      </footer>
    </div>
  );
}
