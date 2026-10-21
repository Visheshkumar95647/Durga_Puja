
import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  Heart,
  Menu,
  Music2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  House,
  Check,
  RotateCcw,
  Sparkles,
  X,
  Flower2,
  Bike,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { days, IMAGE, routeOut, dashamiSteps } from './data/journey.js';

const dashamiDay = {
  day: 10,
  name: 'Dashami',
  subtitle: 'Family, blessings and togetherness',
  area: 'Family celebration',
};

function Img({ src = IMAGE, alt, className = '' }) {
  const [failedSrc, setFailedSrc] = useState('');

  if (failedSrc === src) {
    return (
      <div className={`fallback ${className}`}>
        <Sparkles />
        <span>Our Pujo memory ❤️</span>
      </div>
    );
  }

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}

function Header({ home }) {
  return (
    <header className="topbar">
      <button className="icon" onClick={home} aria-label="Welcome">
        <Menu size={19} />
      </button>

      <div className="brand">
        ✦ GUDDU <Heart size={11} fill="currentColor" /> BUGGU
      </div>

      <Music2 size={17} />
    </header>
  );
}

function Selector({ selected, onSelect }) {
  return (
    <div className="days">
      {[...days, dashamiDay].map((item) => (
        <button
          key={item.day}
          className={`day-pill ${
            selected.day === item.day ? 'active' : ''
          }`}
          onClick={() => onSelect(item)}
        >
          <b>{item.day}</b>
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
}

function Welcome({ start, explore }) {
  return (
    <motion.main
      className="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header home={explore} />

      <p className="eyebrow">A LITTLE JOURNEY, A THOUSAND MEMORIES</p>

      <h1>
        Amader
        <br />
        <em>Pujo Diary</em> <span>♥</span>
      </h1>

      <p className="byline">Made by Guddu ❤️ for Buggu</p>

      <div className="hero">
        <Img
          alt="Durga Puja pandal glowing at night"
          className="hero-img"
        />
        <div className="hero-shade" />
        <p className="hero-quote">
          “Pujo shesh, kintu golpo ekhono baki...”
        </p>
        <span className="flower f1">✿</span>
        <span className="flower f2">✽</span>
      </div>

      <div className="welcome-bottom">
        <div className="divider">━━━━ 🪔 ━━━━</div>
        <h2>Buggu, cholo abar Pujo ghure ashi?</h2>
        <p>Five days. Beautiful pandals. Little moments that stay forever.</p>

        <button className="primary" onClick={start}>
          Cholo, abar shuru kori <Heart size={16} fill="currentColor" />
        </button>

        <button className="text-btn" onClick={explore}>
          Explore our Pujo days <ArrowRight size={15} />
        </button>

        <small>MADE WITH LOVE, JUST FOR YOU ✦</small>
      </div>
    </motion.main>
  );
}

function Route({ index, setIndex, returning, finish }) {
  const list = returning ? [...routeOut].reverse() : routeOut;
  const safeIndex = Math.min(index, list.length - 1);

  return (
    <section className="route panel">
      <small className="kicker">
        {returning ? 'THE WAY BACK HOME' : 'TODAY’S JOURNEY'}
      </small>

      <h2>{returning ? 'Cholo, bari phiri' : 'Our little travel route'} ✦</h2>

      {list.map((stop, i) => (
        <div
          className={`stop ${i <= safeIndex ? 'visited' : ''}`}
          key={`${returning ? 'return' : 'out'}-${stop.id}`}
        >
          <span>{i < safeIndex ? <Check size={13} /> : stop.icon}</span>
          <div>
            <b>{stop.title}</b>
            <small>{stop.detail}</small>
          </div>
        </div>
      ))}

      <button
        className="primary"
        onClick={() =>
          safeIndex < list.length - 1
            ? setIndex(safeIndex + 1)
            : finish()
        }
      >
        {safeIndex < list.length - 1
          ? `Continue to ${list[safeIndex + 1].title}`
          : returning
            ? 'Arrive home ❤️'
            : 'Explore the pandals'}
        <ArrowRight size={15} />
      </button>

      <p className="hint">Illustrated journey, not live transport tracking.</p>
    </section>
  );
}

function Pandal({
  p,
  index,
  lit,
  flipLit,
  done,
  mark,
  devotional,
}) {
  const [photo, setPhoto] = useState(0);
  const photos = p.photos?.length ? p.photos : [IMAGE];
  const photoCount = photos.length;

  const previousPhoto = () => {
    setPhoto((current) => (current - 1 + photoCount) % photoCount);
  };

  const nextPhoto = () => {
    setPhoto((current) => (current + 1) % photoCount);
  };

  return (
    <motion.article
      className="pandal"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
    >
      <div className="pandal-image">
        <Img
          src={photos[photo]}
          alt={`${p.name}, photo ${photo + 1}`}
          className="cover-img"
        />

        <span className="counter">
          PHOTO {photo + 1} / {photoCount}
        </span>

        <span className="stopno">
          STOP {String(index + 1).padStart(2, '0')}
        </span>

        {photoCount > 1 && (
          <>
            <button
              type="button"
              className="photo-nav photo-prev"
              onClick={previousPhoto}
              aria-label={`Previous photo of ${p.name}`}
              title="Previous photo"
            >
              <ChevronLeft size={23} />
            </button>

            <button
              type="button"
              className="photo-nav photo-next"
              onClick={nextPhoto}
              aria-label={`Next photo of ${p.name}`}
              title="Next photo"
            >
              <ChevronRight size={23} />
            </button>
          </>
        )}

        <button
          className={`diya ${lit ? 'lit' : ''}`}
          onClick={flipLit}
        >
          <span>{lit ? '🔥' : '🪔'}</span>
          {lit ? 'Diya is glowing' : 'Light a Diya'}
        </button>
      </div>

      <div className="pandal-body">
        <small className="area">
          <MapPin size={12} /> {p.area}
        </small>

        <h3>{p.name}</h3>
        <p>{p.caption}</p>

        <div className="photos">
          {photos.map((photoPath, i) => (
            <button
              key={photoPath}
              type="button"
              aria-label={`Show photo ${i + 1} of ${p.name}`}
              aria-pressed={photo === i}
              className={photo === i ? 'chosen' : ''}
              onClick={() => setPhoto(i)}
            />
          ))}
        </div>

        <div className="photo-controls">
          <button
            type="button"
            className="photo-text-btn"
            onClick={previousPhoto}
            disabled={photoCount < 2}
          >
            <ArrowLeft size={14} /> Previous
          </button>

          <span>
            {photo + 1} of {photoCount}
          </span>

          <button
            type="button"
            className="photo-text-btn"
            onClick={nextPhoto}
            disabled={photoCount < 2}
          >
            Next <ArrowRight size={14} />
          </button>
        </div>

        <p className="photo-hint">
          Every photo holds a little Pujo memory. ❤️
        </p>

        <button
          className={`memory ${done ? 'done' : ''}`}
          onClick={mark}
        >
          {done ? (
            <>
              <Check size={14} /> Memory saved
            </>
          ) : (
            <>
              Take a Memory <Heart size={14} />
            </>
          )}
        </button>

        {done && (
          <p className="saved">A little moment saved in our diary. ❤️</p>
        )}

        {devotional && (
          <p className="blessing">
            May Maa Durga always protect us. 🪷
          </p>
        )}
      </div>
    </motion.article>
  );
}

function Dashami({ step, setStep, readLetter }) {
  const currentStep = dashamiSteps[step];

  const icons = [
    <House size={34} />,
    <Bike size={34} />,
    <Heart size={34} />,
    <PartyPopper size={34} />,
    <Flower2 size={34} />,
  ];

  return (
    <section className="panel dashami dashami-text-only">
      <div className="dashami-decoration" aria-hidden="true">
        <span>✦</span>
        <Flower2 size={23} />
        <span>🪔</span>
      </div>

      <small className="kicker">BIJOYA DASHAMI · DAY 10</small>

      <div className="big-emoji">{icons[step]}</div>

      <p className="dashami-count">
        MEMORY {step + 1} OF {dashamiSteps.length}
      </p>

      <h2>{currentStep.title}</h2>
      <p>{currentStep.detail}</p>

      <div className="stepdots">
        {dashamiSteps.map((item, i) => (
          <span key={item.title} className={i <= step ? 'on' : ''} />
        ))}
      </div>

      <button
        className="primary"
        onClick={() =>
          step < dashamiSteps.length - 1
            ? setStep(step + 1)
            : readLetter()
        }
      >
        {step < dashamiSteps.length - 1
          ? 'Next memory'
          : 'Read Guddu’s message'}
        <ArrowRight size={15} />
      </button>

      <p className="blessing">
        Family, blessings and love — the sweetest part of Bijoya. ❤️
      </p>
    </section>
  );
}

function Letter({ replay }) {
  return (
    <section className="letter">
      <div className="letter-flower">✿</div>
      <small className="kicker">A LITTLE NOTE FROM GUDDU</small>
      <h2>For my Bacha, Buggu ❤️</h2>

      <div className="letter-text">
        <p>Bacha,</p>
        <p>
          Mata kahin nahi gayi hai. Jab bhi aapko meri yaad aaye,
          yeh zaroor dekhna. ❤️
        </p>
        <p>
          I love you so much. Maa aapki hamesha raksha kare,
          aapko hamesha khush rakhe, aur aapki zindagi ko pyaar
          aur roshni se bhar de.
        </p>
        <p>
          Pujo shesh hote pare, kintu amader golpo ekhanei shesh noy.
        </p>
        <p>
          <i>
            Until next Pujo, Buggu.
            <br />
            Maa Durga always bless us. 🪔
          </i>
        </p>
      </div>

      <button className="primary" onClick={replay}>
        <RotateCcw size={15} /> Replay our journey
      </button>
    </section>
  );
}

export default function App() {
  const reduced = useReducedMotion();

  const [screen, setScreen] = useState('welcome');
  const [day, setDay] = useState(days[0]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [returning, setReturning] = useState(false);
  const [pandalsOpen, setPandalsOpen] = useState(false);
  const [lit, setLit] = useState({});
  const [done, setDone] = useState({});
  const [dashStep, setDashStep] = useState(0);
  const [letter, setLetter] = useState(false);

  const choose = (selectedDay) => {
    const chosenDay =
      selectedDay.day === 10
        ? dashamiDay
        : days.find((item) => item.day === selectedDay.day) ?? days[0];

    setDay(chosenDay);
    setRouteIndex(0);
    setReturning(false);
    setPandalsOpen(chosenDay.day === 10);
    setDashStep(0);
    setScreen('day');
    setLetter(false);
  };

  const reset = () => {
    setScreen('welcome');
    setDay(days[0]);
    setRouteIndex(0);
    setReturning(false);
    setPandalsOpen(false);
    setLit({});
    setDone({});
    setDashStep(0);
    setLetter(false);
  };

  const current = days.find((item) => item.day === day.day);
  const allDone =
    current?.pandals.length > 0 &&
    current.pandals.every((p) => done[`${day.day}-${p.id}`]);

  const advance = () => {
    if (routeIndex < routeOut.length - 1) {
      setRouteIndex((index) => index + 1);
    } else if (returning) {
      setScreen('homecoming');
      setReturning(false);
    } else {
      setPandalsOpen(true);
    }
  };

  const beginReturn = () => {
    setReturning(true);
    setRouteIndex(0);
    setPandalsOpen(false);
  };

  const nextDay = () => {
    if (day.day < 9) {
      choose(days.find((item) => item.day === day.day + 1));
    } else {
      choose(dashamiDay);
    }
  };

  return (
    <div className="shell">
      <div className="glow g1" />
      <div className="glow g2" />

      <div className="frame">
        {screen !== 'welcome' && (
          <Header home={() => setScreen('welcome')} />
        )}

        <AnimatePresence mode="wait">
          {screen === 'welcome' && (
            <Welcome
              key="welcome"
              start={() => choose(days[0])}
              explore={() => setScreen('overview')}
            />
          )}

          {screen === 'overview' && (
            <motion.main
              key="overview"
              className="page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <small className="kicker">OUR LITTLE TIME MACHINE</small>
              <h1>
                Choose a Pujo day <span>♥</span>
              </h1>
              <p className="muted">
                Every day has its own route, pandals and memories.
              </p>

              <Selector selected={day} onSelect={choose} />

              <Img alt="Pujo diary cover" className="overview-img" />

              <button className="primary" onClick={() => choose(day)}>
                Open {day.name} <ArrowRight size={15} />
              </button>

              <button
                className="text-btn"
                onClick={() => setScreen('welcome')}
              >
                <ArrowLeft size={15} /> Back to welcome
              </button>
            </motion.main>
          )}

          {screen === 'day' && (
            <motion.main
              key={`day-${day.day}-${returning}-${pandalsOpen}`}
              className="page"
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <small className="kicker">OUR PUJO · DAY {day.day}</small>

              <h1>
                {day.day === 10 ? 'Bijoya Dashami' : day.name} <span>♥</span>
              </h1>

              <p className="muted">
                {day.day === 10
                  ? 'A day for family, blessings and togetherness.'
                  : current?.subtitle}
              </p>

              <Selector selected={day} onSelect={choose} />

              {day.day === 10 ? (
                <Dashami
                  step={dashStep}
                  setStep={setDashStep}
                  readLetter={() => setLetter(true)}
                />
              ) : !pandalsOpen ? (
                <Route
                  index={routeIndex}
                  setIndex={setRouteIndex}
                  returning={returning}
                  finish={advance}
                />
              ) : (
                <section className="pandal-section">
                  <small className="kicker">
                    OUR STOPS · {current.area.toUpperCase()}
                  </small>

                  <h2>
                    Let’s make memories <Heart size={17} fill="currentColor" />
                  </h2>

                  <p className="muted">{current.intro}</p>

                  {current.devotional && (
                    <button
                      className="push"
                      onClick={(event) => {
                        event.currentTarget.textContent =
                          '🪷 Flower offered with love ❤️';
                      }}
                    >
                      🪷 Offer virtual Pushpanjali
                    </button>
                  )}

                  <div className="pandal-list">
                    {current.pandals.map((p, index) => {
                      const key = `${day.day}-${p.id}`;

                      return (
                        <Pandal
                          key={key}
                          p={p}
                          index={index}
                          lit={Boolean(lit[key])}
                          flipLit={() =>
                            setLit((state) => ({
                              ...state,
                              [key]: !state[key],
                            }))
                          }
                          done={Boolean(done[key])}
                          mark={() =>
                            setDone((state) => ({
                              ...state,
                              [key]: true,
                            }))
                          }
                          devotional={current.devotional}
                        />
                      );
                    })}
                  </div>

                  <section className="panel finish">
                    <span>🪔</span>
                    <h2>
                      {allDone
                        ? 'All memories collected!'
                        : 'Your memories are waiting'}
                    </h2>
                    <p>
                      {allDone
                        ? 'Every pandal is visited. Let’s take the way back home.'
                        : `Visit all ${current.pandals.length} pandals and tap Take a Memory to finish today.`}
                    </p>

                    <button
                      className="primary"
                      disabled={!allDone}
                      onClick={beginReturn}
                    >
                      Let’s return home <ArrowRight size={15} />
                    </button>
                  </section>
                </section>
              )}
            </motion.main>
          )}

          {screen === 'homecoming' && (
            <motion.main
              key="homecoming"
              className="page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <section className="homecoming">
                <span>🏡</span>
                <small className="kicker">BACK WHERE WE BELONG</small>
                <h2>Day {day.day} complete! ❤️</h2>
                <p>
                  Another day of Pujo memories, and still so many stories
                  left to make.
                </p>

                <button className="primary" onClick={nextDay}>
                  {day.day === 9
                    ? 'Visit Nani on Dashami'
                    : 'Tomorrow, another adventure'}
                  <ArrowRight size={15} />
                </button>

                <button
                  className="text-btn"
                  onClick={() => setScreen('overview')}
                >
                  Explore all days
                </button>
              </section>
            </motion.main>
          )}

          {letter && (
            <motion.main
              key="letter"
              className="page letter-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="close"
                onClick={() => setLetter(false)}
                aria-label="Close message"
              >
                <X size={17} />
              </button>

              <Letter replay={reset} />
            </motion.main>
          )}
        </AnimatePresence>

        {screen !== 'welcome' && (
          <nav className="bottom-nav">
            <button onClick={() => setScreen('welcome')}>
              <House size={15} /> Home
            </button>
            <button onClick={() => setScreen('overview')}>
              <MapPin size={15} /> Days
            </button>
            <button onClick={() => setLetter(true)}>
              <Heart size={15} /> Guddu’s note
            </button>
          </nav>
        )}
      </div>

      <footer>
        MADE WITH LOVE BY GUDDU <Heart size={10} fill="currentColor" /> FOR BUGGU
      </footer>
    </div>
  );
}
