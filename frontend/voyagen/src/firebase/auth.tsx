import { auth } from './firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup, 
    sendPasswordResetEmail, 
    updatePassword, 
    sendEmailVerification,
    UserCredential
} from "firebase/auth";

type AuthResult = Promise<UserCredential>;

export const doCreateUserWithEmailAndPassword = (email: string, password: string): AuthResult => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string): AuthResult => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async (): AuthResult => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const doSignOut = (): Promise<void> => {
    return auth.signOut();
};

export const doPasswordReset = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string): Promise<void> => {
    if (auth.currentUser) {
        return updatePassword(auth.currentUser, password);
    } else {
        return Promise.reject(new Error("No user is currently signed in."));
    }
};

export const doSendEmailVerification = (): Promise<void> => {
    if (auth.currentUser) {
        return sendEmailVerification(auth.currentUser, {
            url: `${window.location.origin}/home`,
        });
    } else {
        return Promise.reject(new Error("No user is currently signed in."));
    }
};