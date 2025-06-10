"use client";

import styles from "./chat.module.css";
import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "This is a response from the AI." },
      ]);
    }, 1000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: "easeOut" },
  };

  return (
    <main className={styles.chatContainer}>
      <motion.div
        className={styles.chatBox}
        initial={fadeInUp.initial}
        animate={fadeInUp.animate}
        transition={{ ...fadeInUp.transition, delay: 0.2 }}
      >
        <motion.div
          className={styles.chatHeader}
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
        >
          GUTT
        </motion.div>

        <motion.div
          className={styles.messages}
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.4 }}
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`${styles.message} ${
                msg.role === "user" ? styles.user : styles.ai
              }`}
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.5 + i * 0.05 }}
            >
              {msg.content}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </motion.div>

        <motion.div
          className={styles.inputArea}
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className={styles.input}
          />
          <button onClick={handleSend} className={styles.sendButton}>
            <FaPaperPlane />
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}
