import Head from "next/head";
import NavBar from "./nav-bar";

export default function Layout({ children, home }) {
  return (
    <div className="">
        <Head>
            <title>My Portfolio</title>
            <meta name="description" content="Welcome to my portfolio page" />
            <link rel="icon" href="/mainicon.ico" />
        </Head>
        <header>
            <NavBar />
            
            {home ? (
                <div  className="flex flex-col items-center justify-center min-h-screen py-10">
                {children}
                </div>
            ) : (
                <>
                {children}
                </>
            )}
        </header>
    </div>
  );
}
