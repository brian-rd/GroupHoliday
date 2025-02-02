import type { Route } from "./+types/register";
import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Voyagen | Register" },
    { name: "description", content: "Welcome to Voyagen!" },
  ];
}


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmFocused, setIsConfirmFocused] = useState(false);

    const [isLengthValid, setIsLengthValid] = useState(false);
    const [hasNumberOrSymbol, setHasNumberOrSymbol] = useState(false);
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    interface SignupEvent extends React.FormEvent<HTMLFormElement> {}

    const signupWithUsernameAndPassword = async (e: SignupEvent): Promise<void> => {
        e.preventDefault();

        if (isFormValid) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setNotice("Account created successfully!");
            } catch {
                setNotice("Sorry, something went wrong. Please try again.");
            }     
        } else {
            setNotice("Sorry, something went wrong. Please try again.");
        }
    };

    useEffect(() => {
      setIsLengthValid(password.length >= 8);
      setHasNumberOrSymbol(/[0-9!@#$%^&.?£"'*]/.test(password));
    }, [password]);

    useEffect(() => {
      setDoPasswordsMatch(password === confirmPassword);
    }, [confirmPassword]);

    useEffect(() => {
      setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    }, [email]);

    useEffect(() => {
      setIsFormValid(isLengthValid && hasNumberOrSymbol && doPasswordsMatch && isEmailValid);
    }, [isLengthValid, hasNumberOrSymbol, doPasswordsMatch, isEmailValid]);
    
    return (
      <>
        <div className="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8 ">
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
              {notice && (
                <div className="mb-4 text-sm text-red-600">
                  {notice}
                </div>
              )}
              <form className="space-y-5" onSubmit={signupWithUsernameAndPassword}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsEmailFocused(true)}
                      className="block p-3 w-full rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {isEmailFocused && !isEmailValid && (
                    <div className="mt-1 text-xs text-red-600">
                      Email is not valid
                    </div>
                    )}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      className="block p-3 w-full rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {isPasswordFocused && (
                      <div>
                        <div className={`mt-1 text-xs ${isLengthValid ? 'text-green-600' : 'text-gray-600'}`}>
                          At least 8 characters long
                        </div>
                        <div className={`mt-1 text-xs ${hasNumberOrSymbol ? 'text-green-600' : 'text-gray-600'}`}>
                          At least one number or symbol
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setIsConfirmFocused(true)}
                      className="block p-3 w-full rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {isConfirmFocused && !doPasswordsMatch && (
                    <div className="mt-1 text-xs text-red-600">
                      Passwords do not match
                    </div>
                    )}
                  </div>
                </div>
  
                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={!isFormValid}
                  >
                    Register
                  </button>
                </div>
              </form>
  
              <div>
                <div className="relative mt-7">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="px-6 text-gray-900 bg-white">Or continue with</span>
                  </div>
                </div>
  
                  <a
                    href="#"
                    className="flex mt-6 w-full outline-gray-300 outline items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d2125]"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 my-2">
                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path>
                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path>
                        <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path>
                        <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path>
                    </svg>
                    <span className="text-sm font-semibold leading-6">Google</span>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

export default Register;