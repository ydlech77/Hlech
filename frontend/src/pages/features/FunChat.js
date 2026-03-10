// src/pages/features/FunChat.js
import React, { useState } from "react";

/* 😂 LECH JOKES */
const lechJokes = [
  "Dating your neighbor is nonsense 😭😂 Because you’ll be receiving texts like: “Baby is everything alright? I just saw you coming out from toilet.” 🤣",
  "Africans be like: Please you get flashing credit? I just wan tell this guy make e no forget the package wey we discuss… Shuuuu! For inside flashing? 😭🤣",
  "Once you hear people saying, ‘His girlfriend is controlling him’, just know the relationship is going very well 😌😂",
  "You want to be wise but you’re dating only one girl? Is that what King Solomon taught you? My brother improve 😭😂",
  "That song ‘EKWUEME’ can make you return stolen meat with tears in your eyes 😭🤣",
  "How do you even argue with a last born? Someone who has never seen their mother pregnant 😭😂",
  "Sisters why do you wear seatbelt while taking selfie inside parked car? You think we no go know? 😎🤣",
  "I thought being Nigerian was stressful until I met one Arab man called Soq Madik… Interviewer: your name? Guy: Soq Madik 😭🤣",
  "Why will I marry a girl with small breast? What if I finish the milk before my kids arrive? 😭😂",
  "My sister stop calling somebody’s son broke. If your papa get money you no go dey disturb person pikin 😭🤣",
  "Show me a clean Yoruba girl and I’ll show you a virgin from Akwa Ibom 😭😂",
  "I made many mistakes last year but thank God I know buy that Balenciaga sweater wey Yoruba boys dey wear like uniform 😭🤣",

  "I told my phone battery we are in this together… now it’s at 2% and I’m scared 😭😂",
  "If sleep was a subject, I would have first class 😎🤣",
  "Teacher said ‘use your brain’… I said ‘which one?’ 😭😂",
  "My village people finally found me… but network is too bad 😭🤣",
  "I opened my fridge 5 times… nothing changed but I still believe 😭😂",

  // NEW JOKES
  "My internet went down, so I had to speak to my family… they seem like strangers 😭😂",
  "I don’t need anger management, I need people to stop annoying me 😎🤣",
  "They told me ‘do what you love’, now I’m broke but happy 😭😂",
  "If laziness was an Olympic sport, I’d probably send someone else to compete 😎🤣",
  "I put my phone on airplane mode, but it’s not flying… someone lied to me 😭😂",
];

/* 🧠 LECH GAMES */
const lechGames = [
  { question: "I speak without a mouth and hear without ears. What am I?", answer: "echo" },
  { question: "What number comes next: 2, 4, 8, 16, ?", answer: "32" },
  { question: "If 5 + 3 × 2 = ?", answer: "11" },
  { question: "What has keys but can’t open a door?", answer: "keyboard" },

  { question: "What has a head, a tail, but no body?", answer: "coin" },
  { question: "Which month has 28 days?", answer: "all" },
  { question: "What goes up but never comes down?", answer: "age" },
  { question: "If you have 3 apples and take away 2, how many do you have?", answer: "2" },

  // NEW GAMES
  { question: "What can travel around the world while staying in a corner?", answer: "stamp" },
  { question: "I’m tall when I’m young and short when I’m old. What am I?", answer: "candle" },
  { question: "What gets wetter the more it dries?", answer: "towel" },
  { question: "I’m always running but never get tired. What am I?", answer: "water" },
  { question: "What begins with T, ends with T, and has T in it?", answer: "teapot" },
];

/* 😈 FUNNY INSULTS */
const insults = [
  "😭😂 This one pass you… go drink cold water.",
  "Omooo this brain don off since morning 😭",
  "You sure say you no skip primary school? 😂",
  "Hmmm… education is chasing you but you’re faster 😭🤣",
  "Calm down first… breathing is important 😂",
];

export default function FunChat() {
  const [mode, setMode] = useState(null);
  const [content, setContent] = useState("");
  const [game, setGame] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);

  // 🎤 Speak function with funny voice
  function speak(text) {
    if (!voiceOn) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        // Random funny pitch and rate
        utterance.pitch = Math.random() * 1.5 + 0.5; // 0.5 to 2
        utterance.rate = Math.random() * 0.7 + 0.8; // 0.8 to 1.5
        window.speechSynthesis.speak(utterance);
      }, 100);
    }
  }

  /* 😂 JOKE MODE */
  function tellLechJoke() {
    const joke = lechJokes[Math.floor(Math.random() * lechJokes.length)];
    setContent(joke);
    speak(joke);
  }

  /* 🧠 GAME MODE */
  function startGame() {
    const g = lechGames[Math.floor(Math.random() * lechGames.length)];
    setGame(g);
    setAnswer("");
    setContent("");
    speak(g.question);
  }

  function checkGameAnswer() {
    if (!game) return;

    if (answer.trim().toLowerCase() === game.answer) {
      setScore(score + 1);
      setContent("Correct! 🔥 Brain still dey work 😎");
      speak("Correct! Well done!");
    } else {
      const insult = insults[Math.floor(Math.random() * insults.length)];
      setContent(`Wrong! ${insult}`);
      speak(insult);
    }

    setGame(null);
  }

  return (
    <div className="max-w-xl p-4">
      <h2 className="text-xl font-bold mb-2">
        Hchat — Lech Fun Zone 😎
      </h2>

      {/* 🔊 VOICE TOGGLE */}
      <button
        onClick={() => {
          if (voiceOn && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
          }
          setVoiceOn(!voiceOn);
        }}
        className="mb-3 px-3 py-1 bg-gray-200 rounded"
      >
        {voiceOn ? "🔊 Voice On" : "🔇 Voice Off"}
      </button>

      {!mode && (
        <div className="grid gap-3">
          <button
            onClick={() => setMode("joke")}
            className="p-4 bg-purple-600 text-white rounded"
          >
            Lech Jokes 😂
          </button>

          <button
            onClick={() => setMode("game")}
            className="p-4 bg-blue-600 text-white rounded"
          >
            Lech Games 🧠
          </button>
        </div>
      )}

      {/* 😂 JOKE MODE */}
      {mode === "joke" && (
        <>
          <button
            onClick={tellLechJoke}
            className="mt-4 p-3 bg-white rounded shadow"
          >
            Give me Lech Joke 😂
          </button>

          <button
            onClick={() => setMode(null)}
            className="mt-2 text-sm text-gray-500"
          >
            ← Back
          </button>
        </>
      )}

      {/* 🧠 GAME MODE */}
      {mode === "game" && (
        <>
          <button
            onClick={startGame}
            className="mt-4 p-3 bg-white rounded shadow"
          >
            Start Lech Game 🎮
          </button>

          {game && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <p className="font-semibold mb-2">{game.question}</p>

              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your answer..."
                className="w-full p-2 mb-2 border rounded"
              />

              <button
                onClick={checkGameAnswer}
                className="w-full bg-green-600 text-white p-2 rounded"
              >
                Submit ✅
              </button>
            </div>
          )}

          <p className="mt-2 font-semibold">Score: {score} 🏆</p>

          <button
            onClick={() => setMode(null)}
            className="mt-2 text-sm text-gray-500"
          >
            ← Back
          </button>
        </>
      )}

      {content && (
        <p className="mt-4 text-lg font-medium">{content}</p>
      )}
    </div>
  );
}