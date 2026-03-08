import { useEffect, useRef, useState } from "react";
import "./App.css";

import teenqueen from "./assets/teenqueen.jpg";
import hamilton from "./assets/hamilton.jpg";
import immerse from "./assets/immerse.jpg";
import worldburn from "./assets/worldburn.jpeg";
import alibaba from "./assets/alibaba.jpeg";
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
    src: immerse,
    title: "Immerse Essay Competition | Honours",
    subtitle: "Writing Excellence Award",
    link: "https://www.instagram.com/p/DQCqLsYiOZ_/?igsh=MTNta3FudXd0czNhYw==",
  },
  {
    id: 4,
    src: worldburn,
    title: "World Burn | Kady Heron",
    subtitle: "Drama Showcase",
    link: "https://www.instagram.com/p/DQCqLsYiOZ_/?igsh=MTNta3FudXd0czNhYw==",
  },
  {
    id: 5,
    src: alibaba,
    title: "Alibaba Pantomime Malta | Ensemble",
    subtitle: "Two week show",
    link: "https://www.instagram.com/p/DQCqLsYiOZ_/?igsh=MTNta3FudXd0czNhYw==",
  },
  {
    id: 6,
    src: ista,
    title: "ISTA Trip | Participant",
    subtitle: "Invitation only training",
    link: "https://www.instagram.com/p/DQCqLsYiOZ_/?igsh=MTNta3FudXd0czNhYw==",
  },
];

export default function App() {
  const sectionsRef = useRef([]);
  const [bgColors, setBgColors] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Extract dominant color from each image
  const getAverageColor = (src, id) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const data = ctx.getImageData(0, 0, img.width, img.height).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4 * 100) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      setBgColors(prev => ({ ...prev, [id]: `rgb(${r}, ${g}, ${b})` }));
    };
  };

  useEffect(() => {
    images.forEach(img => getAverageColor(img.src, img.id));
  }, []);

  // Scroll-triggered header border
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Blur-sharpen scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    const animateCursor = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.left = curX + "px";
      cursor.style.top = curY + "px";
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", moveCursor);
    animateCursor();

    const links = document.querySelectorAll("a, .contact-link");
    links.forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("expanded"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("expanded"));
    });

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const scrollToFooter = () => {
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
  };

  const durations = ["1.0s", "1.3s", "1.1s", "1.2s", "1.0s", "1.15s"];

  return (
    <div className="app">
      {/* Custom cursor */}
      <div className="cursor-ring" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="logo">thezoehamilton</div>
        <div className="contact-link" onClick={scrollToFooter}>
          contact
        </div>
      </header>

      <main className="main">
        {images.map((img, i) => (
          <section
            key={img.id}
            ref={el => (sectionsRef.current[i] = el)}
            className="image-section"
            style={{
              backgroundColor: bgColors[img.id] || "#000",
              transition: "background-color 1s ease",
              "--reveal-duration": durations[i % durations.length],
            }}
          >
            <a href={img.link} target="_blank" rel="noreferrer">
            <div className="image-wrapper">
                <img src={img.src} alt={img.title} className="blur-edge" aria-hidden="true" />
                <div className="image-frame">
                  <img src={img.src} alt={img.title} className="fade-image" />
                </div>
                <div className="overlay"></div>
                <div className="vignette"></div>
                <div className="image-text">
                  <div className="text-inner">
                    <h2 className="glass-text">{img.title}</h2>
                    <p className="glass-text">{img.subtitle}</p>
                  </div>
                </div>
              </div>
            </a>
          </section>
        ))}
      </main>

      <footer id="footer" className="footer">
        <div className="footer-divider"></div>
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="glass-text">thezoehamilton</h3>
            <p className="glass-text">
              Sliema, Malta
              <br />
              Masquerade Blue Box Theatre
            </p>
          </div>
          <div className="footer-right">
            <p><span className="footer-link glass-text">thezoehamilton@gmail.com</span></p>
            <p><span className="footer-link glass-text">@thezoehamilton</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
