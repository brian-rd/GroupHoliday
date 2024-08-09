import { useState } from 'react';
import { useAuth } from '../firebase/useAuth';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle, doSignOut } from '../firebase/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
// import { registerUser } from '../api/api';

interface UserData {
    uid: string;
    email: string | null;
    name: string;
}

export default function Register() {
    const mutation = useMutation({
        mutationFn: (userData : UserData) => {
          return axios.post('/users', userData)
        },
    })

    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [confirmError, setConfirmError] = useState(false)
    // const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    // const [usernameError, setUsernameError] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setConfirmError(false);
        // setEmailError(false);
        setPasswordError(false);
        // setUsernameError(false);

        if (password.length < 6) {
            setPasswordError(true)
            return;
        } else if (password !== confirm) {
            setConfirmError(true)
            return;
        }

        if (!isSubmitting) {
            setIsSubmitting(true)
            const userCredential = await doCreateUserWithEmailAndPassword(email, password)
            if (userCredential) {
                const uid = userCredential.user.uid
                const email = userCredential.user.email
                mutation.mutate({ uid, email, name: username })
            }
        }
    }

    const onGoogleSignIn = async () => {
        if (!isSubmitting) {
            setIsSubmitting(true)
            const userCredential = await doSignInWithGoogle().catch(() => {
                setIsSubmitting(false)
            });
            if (userCredential) {
                const uid = userCredential.user.uid
                const email = userCredential.user.email
                mutation.mutate({ uid, email, name: username })
            }
        }
    };

    return(
        <div className="flex h-screen">
            {userLoggedIn ? (
                <button
                    onClick={ doSignOut }
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    Log Out
                </button>
            ) : null}
            <div className="flex flex-col justify-center flex-1 min-h-full py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
                Register
            </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
                <form className="space-y-6" onSubmit={onSubmit}>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-4 text-gray-900">
                    Email
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-4 text-gray-900">
                    Username
                    </label>
                    <div className="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-4 text-gray-900">
                    Password
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${passwordError ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'} block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}                    />
                    {passwordError && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                        </div>
                    )}
                    </div>
                    {passwordError && (
                        <p className="mt-2 text-sm text-red-600" id="password-error">
                            Password must be at least 6 characters long.
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-4 text-gray-900">
                    Confirm password
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        id="confirm"
                        name="confirm"
                        type="password"
                        required
                        onChange={(e) => setConfirm(e.target.value)}
                        className={`${confirmError ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500' : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'} block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}                    />
                    {confirmError && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                        </div>
                    )}
                    </div>
                    {confirmError && (
                        <p className="mt-2 text-sm text-red-600" id="confirm-error">
                            Must match password above
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="block ml-3 text-sm leading-4 text-gray-900">
                        Remember me
                    </label>
                    </div>

                    {/* <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </a>
                    </div> */}
                </div>

                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Register
                    </button>
                </div>
                </form>

                <div>
                <div className="relative mt-10">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-400" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-4">
                    <span className="px-6 text-gray-900 bg-white">Or continue with</span>
                    </div>
                </div>

                <div className="gap-4 mt-6">
                    <button
                        onClick={onGoogleSignIn}
                        className="flex w-full outline-gray-300 outline outline-1 items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d2125]"
                    >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 my-2">
                        <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"></path>
                        <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"></path>
                        <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"></path>
                        <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"></path>
                    </svg>
                    <span className="font-semibold leading-6 text-md">Google</span>
                    </button>
                </div>
                </div>
            </div>

            <p className="mt-10 text-sm text-center text-gray-500">
                Already have an account?{' '}
                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Log in
                </a>
            </p>
            </div>
        </div>
        </div>
    )
}