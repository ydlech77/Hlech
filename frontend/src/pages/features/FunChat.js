// src/pages/features/FunChat.js
import React, { useState, useRef } from "react";

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
  "Why did the tomato turn red? Because it saw the salad dressing 😭🤣",
  "I asked my dog what’s 2 + 2… he gave me a blank stare 😭😂",
  "I tried to catch fog yesterday. Mist! 😎🤣",
  "I told my wallet a joke… now it’s empty from laughing 😭😂",
  "If Mondays had a face, I would punch it 😭🤣",
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
  { question: "I am tall when I am young, and short when I am old. What am I?", answer: "candle" },
  { question: "The more you take, the more you leave behind. What am I?", answer: "footsteps" },
  { question: "What has hands but can’t clap?", answer: "clock" },
  { question: "I’m full of holes but I can hold water. What am I?", answer: "sponge" },
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

  const utteranceRef = useRef(null);
  const lastTextRef = useRef(""); // to replay last joke/question

  function speak(text) {
    lastTextRef.current = text;

    if (!voiceOn) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // stop any current speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utteranceRef.current = utterance;

      window.speechSynthesis.speak(utterance);
    }
  }

  function toggleVoice() {
    if ("speechSynthesis" in window) {
      if (voiceOn) {
        // Mute
        window.speechSynthesis.cancel();
        setVoiceOn(false);
      } else {
        // Unmute and replay last text
        setVoiceOn(true);
        if (lastTextRef.current) {
          speak(lastTextRef.current);
        }
      }
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
        onClick={toggleVoice}
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