import { FcGoogle } from "react-icons/fc";
import { FiPhone } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import GoogleAuthHandler from "./GoogleAuth";
import FacebookAuth from "./FacebookAuth";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Login = ({ active }) => {
    const { login } = useAuth();

    const handleLoginSuccess = (userData) => {
        login(userData);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-100">
            {/* Modal backdrop */}
            <div
                className="fixed inset-0 backdrop-blur-sm bg-black/30 dark:bg-black/50"
                onClick={() => active(false)}
            />

            {/* Modal content */}
            <div className="relative bg-background text-foreground rounded-xl border border-border w-full max-w-sm sm:max-w-md p-6 sm:p-8 shadow-lg">
                {/* Close button */}
                <button
                    onClick={() => active(false)}
                    className="absolute top-4 right-4 p-1 rounded-full cursor-pointer hover:bg-accent transition"
                >
                    <IoClose size={24} />
                </button>

                {/* Illustration */}
                <div className="flex flex-col items-center text-center mb-4 sm:mb-6 p-4 sm:p-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-full flex items-center justify-center mb-3">
                        <span className="text-xl sm:text-2xl">👤</span>
                    </div>
                    <p className="font-semibold text-sm sm:text-base text-foreground">
                        Keep all your favourites in one place.
                    </p>
                </div>

                {/* Phone login */}
                <div className="w-full mb-4">
                    <FacebookAuth
                        onClose={() => active(false)}
                        handleLoginSuccess={handleLoginSuccess}
                    />
                </div>

                {/* Google login */}
                <div className="w-full">
                    <GoogleAuthHandler
                        onClose={() => active(false)}
                        handleLoginSuccess={handleLoginSuccess}
                    />
                </div>

                {/* Footer text */}
                <p className="text-xs sm:text-sm text-muted-foreground text-center mt-4 sm:mt-6 leading-relaxed">
                    All your personal details are safe with us. <br />
                    By continuing, you accept our{" "}
                    <span className="text-primary cursor-pointer hover:underline">
                        Terms
                    </span>{" "}
                    and{" "}
                    <span className="text-primary cursor-pointer hover:underline">
                        Privacy Policy
                    </span>
                    .
                </p>
            </div>
        </div>
    );
};

export default Login;
