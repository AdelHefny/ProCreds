"use client";
import Footer from "../components/Footer";
import { useState } from "react";

function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("Sending...");

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Error sending message. Please try again.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-between h-screen bg-secant3 text-main">
      <section className="flex flex-col items-center justify-center w-full mt-20 ">
        <h1 className="text-3xl font-bold mt-8">Contact Us</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-md p-4 space-y-4 text-secant3"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </section>
      {status && <p className="mt-4">{status}</p>}
      <Footer />
    </section>
  );
}

export default Contacts;
