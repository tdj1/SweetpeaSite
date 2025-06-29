import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import './App.css';
import postcardImg from './assets/postcard.png';
import confetti from "canvas-confetti";

export default function AnniversarySurprise() {
  const [authenticated, setAuthenticated] = useState(false);
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = () => {
    if (name.toLowerCase() === "annie" && password === "0803") {
      setAuthenticated(true);
    } else {
      setShowError(true);
    }
  };

  const handlePostcardOpen = () => {
    confetti({ particleCount: 300, angle: 60, spread: 70, origin: { x: 0, y: 0.6 } });
    confetti({ particleCount: 300, angle: 120, spread: 70, origin: { x: 1, y: 0.6 } });
    confetti({ particleCount: 300, angle: 60, spread: 70, origin: { x: 0.3, y: 0.6 } });
    confetti({ particleCount: 300, angle: 120, spread: 70, origin: { x: 0.7, y: 0.6 } });
    setOpened(true);
  };

  // 💕 Floating trail hearts
  useEffect(() => {
    let lastSpawn = 0;
    const throttleDelay = 100;

    const spawnHeart = (x, y) => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💕";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastSpawn > throttleDelay) {
        spawnHeart(e.clientX, e.clientY);
        lastSpawn = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 💖 Falling clickable hearts (always active)
  useEffect(() => {
    const mwahSound = new Audio("chomp.mp3");

    const spawnFallingHeart = () => {
      const heart = document.createElement("div");
      heart.className = "falling-heart";
      heart.textContent = "💖";
      heart.style.left = `${Math.random() * 100}vw`;

      heart.onclick = () => {
        heart.classList.add("pop");
        mwahSound.currentTime = 0;
        mwahSound.play();
        setTimeout(() => heart.remove(), 300);
      };

      document.body.appendChild(heart);

      setTimeout(() => {
        if (document.body.contains(heart)) {
          heart.remove();
        }
      }, 5000);
    };

    const interval = setInterval(spawnFallingHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      {!authenticated ? (
        <div className="card">
          <h1 className="text-4xl font-pacifico text-pink-500 mb-4">💕 Welcome Love 💕</h1>
          <p className="text-pink-600 mb-4">Please log in for a special surprise!</p>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login to Love</button>
          {showError && <p className="error">Oops! Try again 💫</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {!opened ? (
            <motion.div
              className="relative cursor-pointer"
              onClick={handlePostcardOpen}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={postcardImg}
                alt="Click to untie"
                className="postcard"
              />
              <p className="text-pink-600 mt-2">Untie the bowtie darling 💝</p>
            </motion.div>
          ) : (
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl font-pacifico text-pink-500 mb-4">
                Happy 4 Months! 🎉
              </h1>
              <p className="text-lg mb-2">Dear Annie, you're easy to love and I miss you every day. Hopefully by now we're together!!!</p>
              <p className="text-pink-600 mb-1">
                I'm looking forward to our time &lt;333
              </p>
              <p className="text-3xl font-pacifico text-pink-500 mb-4">💌💌💌💌💌💌</p>
            </motion.div>
          )}
        </div>
      )}

      <div className="tulip-banner"></div>
    </div>
  );
}