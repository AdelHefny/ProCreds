"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { FirebaseError } from "firebase/app";

function LoginModal({
  isModolOpen,
  handleCloseModal,
  handleOpenSignupModal,
}: {
  isModolOpen: boolean;
  handleCloseModal: () => void;
  handleOpenSignupModal: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      handleCloseModal();
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email address");
            break;
          case "auth/user-disabled":
            setError("This account has been disabled");
            break;
          case "auth/user-not-found":
            setError("No account found with this email");
            break;
          case "auth/wrong-password":
            setError("Incorrect password");
            break;
          default:
            setError("An error occurred during login");
            break;
        }
      }
      console.error("Login error:", error.message);
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (isModolOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isModolOpen, dialogRef]);

  return (
    <dialog className="w-96 h-[25rem] bg-transparent" ref={dialogRef}>
      <AnimatePresence>
        {isModolOpen && (
          <motion.section
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-between w-[96%] h-[94%] p-4 rounded-2xl shadow-lg bg-main"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="self-end p-1 text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faTimes as IconProp} className="w-5 h-5" />
            </button>

            {/* Title */}
            <h1 className="text-xl font-bold mb-4">Login</h1>

            {/* Login Form */}
            <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
              {error && (
                <div className="text-red text-sm mb-4 text-center">{error}</div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 bg-secant text-white rounded-lg hover:bg-secant2 ${
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {!isLoading ? "Login" : "loading..."}
              </button>
            </form>

            {/* Footer */}
            <div className="flex justify-between mt-4">
              <p className="text-sm">
                Don't have an account?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    handleCloseModal();
                    handleOpenSignupModal();
                  }}
                >
                  Sign up
                </button>
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </dialog>
  );
}

export default LoginModal;
