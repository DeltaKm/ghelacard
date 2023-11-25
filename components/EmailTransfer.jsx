"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EmailTransfer = () => {
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const storedValue = localStorage.getItem("sharedValue");
        if (storedValue) {
            setEmail(storedValue);
        }
    }, []);


    return (
        <div className="text-charcoalGray flex flex-col gap-5">
            <img
                className="sm:pt-0 pt-32"
                src="./icon-list.svg"
                width={50}
                alt="checkmark"
            />
            <span className="text-darkSlateGray text-4xl font-bold">
                Complimenti!
                
            </span>
            <p className="font-semibold">
                Verrai contattato a questa email: <br></br>{" "}
                <span className="text-darkSlateGray font-bold">{email}</span>
                {" "}al lancio del progetto.
            </p>
            <button
                onClick={() => router.push("/")}
                className="mt-auto font-semibold p-3 sm:mt-3 rounded-lg text-whiteBetter bg-darkSlateGray relative overflow-hidden bg-gradient-to-r hover:from-pink-500 hover:via-pink-400 hover:to-orange-500 hover:text-whiteBetter transition duration-300"
            >
                Chiudi il messaggio
            </button>
        </div>
    );
};

export default EmailTransfer;
