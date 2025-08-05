import Head from "next/head";
import NavBar from "./nav-bar";

export default function Layout({ children, home }) {
    return (
        <div className="">
            <Head>
                <title>Naresh Prasad Koirala</title>
                <meta name="description" content="Welcome to my portfolio page" />
                <link rel="icon" href="/mainicon.ico" />
            </Head>
            <header>
                <NavBar />

                {home ? (
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] py-8 px-4 sm:px-6 lg:px-8">
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
