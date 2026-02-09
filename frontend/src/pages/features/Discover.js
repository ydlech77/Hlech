// src/pages/features/Discover.js
import React from "react";

export default function Discover() {
  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-bold mb-3">Discover Hlech</h2>
      
      <p className="text-gray-600 mb-4">
        Hi! I am <strong>Igbah David Alecheno (Prince Lech)</strong>. My passion is using technology
        to improve people's lives, especially in health and wellness. With Hlech, I wanted to create
        a smart health companion that goes beyond basic apps — one that truly understands users’ needs
        and guides them toward better health decisions.
      </p>

      <p className="text-gray-600 mb-4">
        <strong>Hlech</strong> (Alecheno Health) is designed to help you monitor symptoms, manage meals,
        follow exercise guides, and even connect with medical professionals. It's more than an app —
        it's your personal health assistant, learning and growing with you.
      </p>

      <p className="text-gray-600 mb-4">
        In the next 5 years, Hlech aims to:
      </p>

      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Become an AI-driven health assistant that predicts health risks early.</li>
        <li>Integrate advanced nutrition, fitness, and mental wellness tools for holistic care.</li>
        <li>Offer real-time consultation and personalized guidance from verified medical experts.</li>
        <li>Empower communities with health education and preventive strategies.</li>
      </ul>

      <p className="text-gray-600 mb-4">
        Hlech wouldn’t have been possible without inspiration from my brother, <strong>Igbah A. Sunday</strong>,
        who has always encouraged me to pursue tech solutions that make a difference. Thank you for the
        support and belief!
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Mission</h3>
          <p className="text-gray-600 mt-2">
            Use technology to make health guidance affordable, accessible, and personal for everyone.
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Vision</h3>
          <p className="text-gray-600 mt-2">
            Build a smart, proactive, and trustworthy health companion that supports users throughout their journey.
          </p>
        </div>
      </div>
    </div>
  );
}
