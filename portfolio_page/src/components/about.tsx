import Head from "next/head";
import Image from "next/image";
import style from "../styles/about.module.css";

export default function About() {
  return (
    <>
      <Head>
        <meta name="keywords" content="Naresh Prasad Koirala, web developer, React, Next.js, TypeScript" />
      </Head>
      <section className={style.aboutContainer} aria-labelledby="about-title">
        <div className={style.contentSection}>
          <div className={style.textContent}>
            <h1 id="about-title" className={style.title}>About Me</h1>
            <div className={style.paragraphContainer}>
              <p className={style.paragraph}>
                Hey, I’m Naresh Koirala — a full-stack developer who builds things with logic, purpose, and a touch of personality.
              </p>
              <p className={style.paragraph}>
                I believe in facts, logic, and perspective. 
                There’s no universal right or wrong — just how people see things. 
                I could be someone’s hero and someone else’s villain, and I’m okay with that.
              </p>
              <p className={style.paragraph}>
                When I’m not deep in code, you’ll find me playing the flute, a peaceful reminder of Lord Krishna’s grace. 
                I live and breathe football (not soccer — big difference) and bleed blue for Chelsea FC — #KTBFFH. 
                I also watch anime religiously. 
                And if you think One Piece is too long... you probably don’t really love anime.
              </p>
              <p className={style.paragraph}>
                I’m a realistic person with a curious mind. 
                My goal is to grow as a developer, work on meaningful tech, 
                and eventually build products that genuinely help people 
                — whether it's tools, platforms, or even just better user experiences.
              </p>
              <p className={style.paragraph}>
                If that sounds like someone you’d want on your team — feel free to 
                <a href="../contact"> connect.</a>
                <br />
                <br />
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className={style.imageSection}>
          <div className={style.imageContainer}>
            <Image
              src="/image/me.png"
              alt="Naresh Prasad Koirala saluting"
              fill
              sizes="(max-width: 768px) 250px, (max-width: 1024px) 280px, 300px"
              className={style.profileImage}
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}