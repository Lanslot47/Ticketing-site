"use client";

import AuthGuard from "./component/authGuard";
import Hero from "./component/Hero";

const Home = () => {
    return (
        <AuthGuard>
            <>

                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-black">

                        <Hero />
                    </div>
                </div>
            </>
        </AuthGuard>
    );
};

export default Home;
