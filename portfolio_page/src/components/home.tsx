// ...existing code...
import CharacterIterator from "./typing-animation";

const strings = {
  welcome: "Welcome To My Portfolio",
  intro: "I am,",
  name: "NARESH PRASAD KOIRALA",
  title: "SOFTWARE ENGINEER",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-centerx-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold dark:text-white mb-6 lg:mb-8 xl:mb-10 text-center">
        {strings.welcome}
      </h1>
      <CharacterIterator 
        text1={strings.name} 
        text2={strings.title} 
        intro={strings.intro} />
    </div>
  );
}