"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


const EmailInput = ({ inputStyle, errorMessageStyle }) => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [value, setValue] = useState("");
    const router = useRouter();
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const storedValue = localStorage.getItem("sharedValue");
        if (storedValue) {
            setValue(storedValue);
        }
    }, []);

    const validateEmail = (input) => {
        // Regular expression to check if the input is in email format
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(input);
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        clearTimeout(typingTimeout);

        setIsTyping(true);

        if (inputValue.trim() === "") {
            setErrorMessage("");
        } else {
            setTypingTimeout(
                setTimeout(() => {
                    setIsTyping(false);
                    if (!validateEmail(inputValue)) {
                        setErrorMessage("Valid email required");
                    } else {
                        setErrorMessage("");
                    }
                }, 1000)
            );
        }
    };

    useEffect(() => {
        return () => {
            // Clean up the timeout when the component unmounts
            clearTimeout(typingTimeout);
        };
    }, [typingTimeout]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateEmail(email) && email !== "") {
            router.push("/success");
            setValue(email);
            localStorage.setItem("sharedValue", email);     
        }
        console.log("Email: ", email);
        const res = await fetch("api/contact",{
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email
            }),
        });
        const {msg, success} = await res.json();
        setError(msg);
        setSuccess(success);

        if (success) {
           
      setEmail("");
     
        }
    };

    return (
        <div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col pt-10"
            >
                <div className="flex ">
                    <label htmlFor="email" className="text-sm pb-2 font-bold">
                        Email address
                    </label>
                    {!isTyping && errorMessage && (
                        <p className={errorMessageStyle}>{errorMessage}</p>
                    )}
                </div>
                {!isTyping && errorMessage ? (
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email@company.com"
                        value={email}
                        onChange={handleInputChange}
                        className={`${inputStyle} text-tomato bg-lightTomato`} // Apply the input style
                    />
                ) : (
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email@company.com"
                        value={email}
                        onChange={handleInputChange}
                        className={inputStyle} // Apply the input style
                    />
                )}
                <button
                    type="submit"
                    className="mt-5 p-4 text-sm text-whiteBetter rounded-lg bg-darkSlateGray flex justify-center w-full font-bold relative overflow-hidden bg-gradient-to-r hover:from-pink-500 hover:via-pink-400 hover:to-orange-500 hover:text-whiteBetter transition duration-300"
                >
                    Ricevi Offerta
                </button>
            </form>
        </div>
    );
};

export default EmailInput;
