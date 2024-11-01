"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config"; // Ensure your firebase config is properly imported

function SignupModal({
  isModolOpen,
  handleCloseModal,
  handleOpenLoginModal,
}: {
  isModolOpen: boolean;
  handleCloseModal: () => void;
  handleOpenLoginModal: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Basic form validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      handleCloseModal();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      // Handle Firebase signup errors
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already in use");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/weak-password":
          setError("Password is too weak");
          break;
        default:
          setError("An error occurred during signup");
          break;
      }
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModolOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isModolOpen]);

  return (
    <dialog className="w-96 min-h-[25rem] bg-transparent" ref={dialogRef}>
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
            <h1 className="text-xl font-bold mb-4">Sign Up</h1>

            {/* Signup Form */}
            <form className="flex flex-col space-y-4" onSubmit={handleSignup}>
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
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
                required
              />
              {/* Display error message */}
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
                {!isLoading ? "Sign Up" : "Signing up..."}
              </button>
            </form>

            {/* Footer */}
            <div className="flex justify-between mt-4">
              <p className="text-sm">
                Already have an account?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    handleCloseModal();
                    handleOpenLoginModal();
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </dialog>
  );
}

export default SignupModal;
