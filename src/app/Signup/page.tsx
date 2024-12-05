
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
 

const Signup = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
 
    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/Tshirt");
        }
    }, [sessionStatus, router]);
 
    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
 
        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }
 
        if (!password || password.length < 8) {
            setError("Password is invalid");
            return;
        }
 
        try {
            const res = await fetch("../Api/Signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            if (res.status === 400) {
                setError("This email is already registered");
            }
            if (res.status === 200) {
                setError("");
                router.push("/Login");
            }
        } catch (error) {
            setError("Error, try again");
            console.log(error);
        }
    };
 
    if (sessionStatus === "loading") {
        return <h1>Loading...</h1>;
    }
 
    return (
        sessionStatus !== "authenticated" && (
            <div className="justify-center mt-16">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                    
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                placeholder="Name"
                type ="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                />
              </div>
           </div>
                        <div >
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">           
                <input
                  type="text"
                  placeholder="Email Address"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                />
                 </div>
                        </div>
                        <div >
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">          
                <input
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                />
                </div>
                        </div>
                        <div> 
                        <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
{" "}
                Sign Up
              </button>
              </div>
                        <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
            Already a user{' '}
           <Link href='/Login'> <a  className="font-semibold leading-6 text-yellow-500 hover:text-yellow-600">
              Sign In
            </a> </Link>
          </p>

                </div>
            </div>
        )
    );
};
 
export default Signup;
