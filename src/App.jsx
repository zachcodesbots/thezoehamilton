import { useEffect, useRef, useState } from "react";
import "./App.css";

import teenqueen from "./assets/teenqueen.jpg";
import hamilton from "./assets/hamilton.jpg";
import immerse from "./assets/immerse.jpg";
import alibaba from "./assets/alibaba.jpeg";
import ista from "./assets/ista.jpeg";
import zoeHeadshot from "./assets/zoe-headshot.png";
import internationalYouthDay from "./assets/international-youth-day.png";
import learningToBeHeard from "./assets/learning-to-be-heard.png";
import sevenBridesShowcase from "./assets/seven-brides-showcase.png";
import sparkleQuizNight from "./assets/sparkle-quiz-night.png";
import malawiMediaTrip from "./assets/malawi-media-trip.png";
import worldburn from "./assets/worldburn-new.png";
import kissMeShowcase from "./assets/kiss-me-showcase.png";

const filters = [
  { id: "performing-arts", label: "performing arts" },
  { id: "leadership", label: "leadership" },
  { id: "film", label: "film" },
];

const filmReel = [
  {
    id: 1,
    src: "/film-reel-01.mp4",
    title: "Malawi Media Trip",
    subtitle: "Donor Communications",
  },
  {
    id: 2,
    src: "/film-reel-02.mp4",
    title: "Malawi Media Trip",
    subtitle: "Donor Communications",
  },
  {
    id: 3,
    src: "/film-reel-03.mp4",
    title: "Malawi Media Trip",
    subtitle: "Donor Communications",
  },
  {
    id: 4,
    src: "/film-reel-04.mp4",
    title: "Malawi Media Trip",
    subtitle: "Donor Communications",
  },
  {
    id: 5,
    src: "/film-reel-05.mp4",
    title: "Malawi Media Trip",
    subtitle: "Donor Communications",
  },
];

const activities = [
  {
    id: 1,
    sections: ["performing-arts"],
    src: hamilton,
    title: "Hamilton | Burr",
    subtitle: "Blue Box Theatre",
    link: "https://www.instagram.com/p/DKxHysToosg/?igsh=MTF0Z3FyMmpjbTQ4aw==",
  },
  {
    id: 2,
    sections: ["performing-arts"],
    src: teenqueen,
    title: "We Will Rock You | Teen Queen",
    subtitle: "Teatru Salesjan",
    link: "https://www.instagram.com/p/DIMGEg-IMgK/?igsh=MTh2aGF5ZG5oZnJxcQ==",
  },
  {
    id: 3,
    sections: ["performing-arts"],
    src: worldburn,
    title: "World Burn | Cady Heron",
    subtitle: "Blue Box Theatre",
    link: "https://www.instagram.com/p/DQCqLsYiOZ_/?igsh=MTNta3FudXd0czNhYw==",
  },
  {
    id: 4,
    sections: ["performing-arts"],
    src: alibaba,
    title: "Ali Baba — The Panto | Ensemble",
    subtitle: "Manoel Theatre",
    link: "https://www.instagram.com/p/DTa4-TziLNU/?igsh=MjVsejl1cWI1ZHFl",
  },
  {
    id: 5,
    sections: ["performing-arts"],
    src: ista,
    title: "ISTA | Participant",
    subtitle: "Global Learning Through The Arts",
    link: "https://www.instagram.com/p/DXXNgrhiNDt/",
  },
  {
    id: 6,
    sections: ["leadership"],
    src: learningToBeHeard,
    title: "Learning To Be Heard | Scholarship Award",
    subtitle: "Global Public Speaking Challenge",
    link: "https://www.instagram.com/p/DWRz-RDiHdf/",
  },
  {
    id: 7,
    sections: ["leadership"],
    src: internationalYouthDay,
    title: "International Youth Day | Organising Team",
    subtitle: "Kennedy Grove | 12 August",
  },
  {
    id: 8,
    sections: ["performing-arts"],
    src: sevenBridesShowcase,
    title: "7 Brides For 7 Brothers | Dance Showcase",
    subtitle: "Blue Box Theatre",
  },
  {
    id: 9,
    sections: ["performing-arts"],
    src: kissMeShowcase,
    title: "Kiss Me | Singing Showcase",
    subtitle: "Blue Box Theatre",
    link: "https://www.instagram.com/p/DatKP8JoNfN/",
  },
  {
    id: 10,
    sections: ["leadership"],
    src: sparkleQuizNight,
    title: "Quiz Night | Lead Organiser",
    subtitle: "Created For The Sparkle Foundation",
  },
  {
    id: 11,
    sections: ["leadership"],
    src: malawiMediaTrip,
    title: "Malawi Media Trip | Media Lead",
    subtitle: "Donor Communications | The Sparkle Foundation",
    link: "https://www.instagram.com/p/DaudRm8iMpD/",
  },
  {
    id: 12,
    sections: ["leadership"],
    src: immerse,
    title: "Immerse Essay Competition | Honours",
    subtitle: "Writing Excellence Award",
    link: "https://www.instagram.com/p/DPEDTC-DABd/?igsh=MWt1ZXg2NnN0ZzdhNg==",
  },
];

export default function App() {
  const sectionsRef = useRef([]);
  const carouselRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const filmVideoRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState(filters[0].id);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const filteredActivities = activities.filter(activity =>
    activity.sections.includes(activeFilter)
  );
  const carouselActivities = [...filteredActivities, ...filteredActivities];
  const activeReel = filmReel[activeReelIndex];

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

  useEffect(() => {
    const carousel = carouselRef.current;
    const track = carouselTrackRef.current;

    if (!carousel || !track || filteredActivities.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrame;
    let lastTime = performance.now();
    let offset = 0;
    let paused = false;

    const pause = () => {
      paused = true;
    };

    const play = () => {
      paused = false;
    };

    const animate = now => {
      const delta = Math.min(now - lastTime, 40);
      lastTime = now;

      if (!paused) {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const loopWidth = track.scrollWidth / 2 + gap / 2;

        if (loopWidth > 0) {
          const viewportCenter = window.innerWidth / 2;
          const cards = Array.from(track.children);
          const closestDistance = cards.reduce((closest, card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            return Math.min(closest, Math.abs(cardCenter - viewportCenter));
          }, Infinity);
          const easingRange = Math.max(window.innerWidth * 0.32, 240);
          const nearness = Math.max(
            0,
            1 - Math.min(closestDistance / easingRange, 1)
          );
          const speed = 0.072 * (1 - nearness * 0.58);

          offset -= speed * delta;

          if (Math.abs(offset) >= loopWidth) {
            offset += loopWidth;
          }

          track.style.transform = `translateX(${offset}px)`;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    carousel.addEventListener("pointerenter", pause);
    carousel.addEventListener("pointerleave", play);
    carousel.addEventListener("focusin", pause);
    carousel.addEventListener("focusout", play);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      carousel.removeEventListener("pointerenter", pause);
      carousel.removeEventListener("pointerleave", play);
      carousel.removeEventListener("focusin", pause);
      carousel.removeEventListener("focusout", play);
      track.style.transform = "";
    };
  }, [activeFilter, filteredActivities.length]);

  useEffect(() => {
    filmVideoRef.current?.load();
  }, [activeReelIndex]);

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    footer?.scrollIntoView({ behavior: "smooth" });
  };

  const showReelClip = index => {
    setActiveReelIndex((index + filmReel.length) % filmReel.length);
  };

  const showNextReelClip = () => {
    showReelClip(activeReelIndex + 1);
  };

  const showPreviousReelClip = () => {
    showReelClip(activeReelIndex - 1);
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
          <div className="section-selector" aria-label="Activity sections">
            {filters.map(filter => (
              <button
                type="button"
                key={filter.id}
                className={`section-tab ${
                  activeFilter === filter.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {activeFilter === "film" ? (
            <div className="film-reel">
              <div className="film-feature">
                <div className="film-player">
                  <video
                    ref={filmVideoRef}
                    key={activeReel.src}
                    className="film-video"
                    controls
                    playsInline
                    onEnded={showNextReelClip}
                  >
                    <source src={activeReel.src} type="video/mp4" />
                  </video>
                </div>

                <div className="film-copy">
                  <h2>{activeReel.title}</h2>
                  <p>{activeReel.subtitle}</p>
                  <p>
                    Three weeks in Malawi filming field media for donor
                    communications with The Sparkle Foundation.
                  </p>

                  <div className="film-controls" aria-label="Film controls">
                    <button type="button" onClick={showPreviousReelClip}>
                      previous
                    </button>
                    <span>
                      {activeReelIndex + 1} / {filmReel.length}
                    </span>
                    <button type="button" onClick={showNextReelClip}>
                      next
                    </button>
                  </div>
                </div>
              </div>

              <div className="continue-reel" aria-label="Continue watching">
                <p>continue watching</p>
                <div className="continue-track">
                  {filmReel.map((clip, index) => (
                    <button
                      type="button"
                      key={clip.id}
                      className={`continue-card ${
                        index === activeReelIndex ? "active" : ""
                      }`}
                      onClick={() => showReelClip(index)}
                      aria-label={`Watch clip ${index + 1}`}
                    >
                      <video
                        src={`${clip.src}#t=0.1`}
                        muted
                        playsInline
                        preload="auto"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredActivities.length > 0 ? (
            <div
              className="carousel"
              aria-label="Selected activities"
              ref={carouselRef}
            >
              <div
                className="carousel-track"
                key={activeFilter}
                ref={carouselTrackRef}
              >
              {carouselActivities.map((img, i) => {
                const isDuplicate = i >= filteredActivities.length;
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
          ) : (
            <div className="empty-section">
              <p>Film work coming soon.</p>
            </div>
          )}
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
