import Layout from "../components/layout";
import React, { useState, useEffect } from "react";

const strings = {
  welcome: "Welcome To My Portfolio",
  intro: "I am,",
  name: "NARESH PRASAD KOIRALA",
  title: "SOFTWARE ENGINEER",
};

interface CharacterIteratorProps {
  text1: string;
  text2: string;
}

function CharacterIterator({ text1, text2 }: CharacterIteratorProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [index, setIndex] = useState(0);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const currentText = isTitle ? text2 : text1;
    const typingSpeed = isDeleting ? 50 : 100;
    const pause = 1000;

    const handleTyping = () => {
      if (!isDeleting && index < currentText.length) {
        setDisplayText((prev) => prev + currentText[index]);
        setIndex((prev) => prev + 1);
        setSpeed(typingSpeed);
      } else if (isDeleting && index > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
        setSpeed(typingSpeed);
      } else if (!isDeleting && index === currentText.length) {
        setSpeed(pause);
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
        setIsTitle((prev) => !prev);
        setSpeed(typingSpeed);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [index, isDeleting, isTitle, text1, text2, speed]);

  return (
    <div className="text-base sm:text-lg lg:text-xl xl:text-2xl dark:text-gray-300 flex items-center flex-wrap justify-center">
      <strong>{strings.intro}</strong>
      <span className="relative inline-block ml-2 font-bold dark:text-blue-500">
        {displayText}
        <span className="inline-block text-blue-400 dark:text-blue-400 animate-blink ml-1 align-baseline">
          _
        </span>
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold dark:text-white mb-6 lg:mb-8 xl:mb-10 text-center">
        {strings.welcome}
      </h1>
      <CharacterIterator text1={strings.name} text2={strings.title} />
    </Layout>
  );
}