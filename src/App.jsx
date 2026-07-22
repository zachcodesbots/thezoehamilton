import { useEffect, useRef } from "react";
import "./App.css";

import teenqueen from "./assets/teenqueen.jpg";
import hamilton from "./assets/hamilton.jpg";
import immerse from "./assets/immerse.jpg";
import alibaba from "./assets/alibaba.jpeg";
import worldburn from "./assets/worldburn.jpeg";
import ista from "./assets/ista.jpeg";
import zoeHeadshot from "./assets/zoe-headshot.png";
import internationalYouthDay from "./assets/international-youth-day.png";

const activities = [
  {
    id: 1,
    src: hamilton,
    title: "Hamilton | Burr",
    subtitle: "Blue Box Theatre",
    link: "https://www.instagram.com/p/DKxHysToosg/?igsh=MTF0Z3FyMmpjbTQ4aw==",
  },
  {
    id: 2,
    src: teenqueen,
    title: "We Will Rock You | Teen Queen",
    subtitle: "Teatru Salesjan",
    link: "https://www.instagram.com/p/DIMGEg-IMgK/?igsh=MTh2aGF5ZG5oZnJxcQ==",
  },
  {
    id: 3,
    src: worldburn,
    title: "World Burn | Cady Heron",
    subtitle: "Blue Box Theatre",
    link: "https://www.instagram.com/p/DQCqLsYiOZ_/?igsh=MTNta3FudXd0czNhYw==",
  },
  {
    id: 4,
    src: alibaba,
    title: "Ali Baba — The Panto | Ensemble",
    subtitle: "Manoel Theatre",
    link: "https://www.instagram.com/p/DTa4-TziLNU/?igsh=MjVsejl1cWI1ZHFl",
  },
  {
    id: 5,
    src: ista,
    title: "ISTA | Participant",
    subtitle: "Global Learning Through The Arts",
    link: "https://www.instagram.com/p/DPG7lVSiKa1/?igsh=MWVzZzEyZnRnMW81Yg==",
  },
  {
    id: 6,
    src: internationalYouthDay,
    title: "International Youth Day | Organising Team",
    subtitle: "Kennedy Grove | 12 August",
  },
  {
    id: 7,
    src: immerse,
    title: "Immerse Essay Competition | Honours",
    subtitle: "Writing Excellence Award",
    link: "https://www.instagram.com/p/DPEDTC-DABd/?igsh=MWt1ZXg2NnN0ZzdhNg==",
  },
];

export default function App() {
  const sectionsRef = useRef([]);
  const carouselActivities = [...activities, ...activities];

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
        <section
          className="about-section reveal-section"
          ref={el => (sectionsRef.current[0] = el)}
        >
          <div className="about-inner">
            <img
              src={zoeHeadshot}
              alt="Zoe Hamilton headshot"
              className="about-image"
            />
            <div className="about-copy">
              <p className="section-kicker">about</p>
              <h1>Zoe Hamilton</h1>
              <p>
                Malta-based performer drawn to bold characters, close harmony,
                and stories with a little bite. Currently training, performing,
                and building work across theatre, music, and movement.
              </p>
            </div>
          </div>
        </section>

        <section
          className="activities-section reveal-section"
          ref={el => (sectionsRef.current[1] = el)}
        >
          <div className="activities-heading">
            <p className="section-kicker">current activities</p>
          </div>

          <div className="carousel" aria-label="Current activities">
            <div className="carousel-track">
              {carouselActivities.map((img, i) => {
                const isDuplicate = i >= activities.length;
                const cardContent = (
                  <div className="image-wrapper">
                    <img src={img.src} alt="" className="blur-edge" />
                    <img
                      src={img.src}
                      alt={img.title}
                      className="fade-image"
                    />
                    <div className="overlay"></div>
                    <div className="image-text">
                      <h2>{img.title}</h2>
                      <p>{img.subtitle}</p>
                    </div>
                  </div>
                );

                return (
                  <article className="carousel-card" key={`${img.id}-${i}`}>
                    {img.link ? (
                      <a
                        href={img.link}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={isDuplicate ? -1 : undefined}
                        aria-hidden={isDuplicate ? "true" : undefined}
                      >
                        {cardContent}
                      </a>
                    ) : (
                      <div aria-hidden={isDuplicate ? "true" : undefined}>
                        {cardContent}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
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
