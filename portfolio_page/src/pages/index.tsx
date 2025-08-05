import Layout from "../../components/layout";
import React from "react";

const strings= {
  welcome: "Welcome to My Portfolio",
  intro: "I am ",
  name: "Naresh Prasad Koirala",
  title: "Software Engineer"
};

function CharacterIterator({ text }) {
  const characters = text.split(''); // Convert string to an array of characters

  return (
    <div className="text-xl dark:text-gray-300">
      {strings.intro}
      {characters.map((char, index) => (
        // Render each character, e.g., in a span
        <span key={index} style={{ margin: '2px' }}>
          {char}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <Layout home>
      <div className="">
        <h1 className="text-4xl font-bold dark:text-white">
            {strings.welcome}
        </h1>
        <CharacterIterator text={strings.name} />
      </div>
    </Layout>
  );
}
