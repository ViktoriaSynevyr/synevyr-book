"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setMessage(
      "Account created! Check your email and confirm your registration."
    );
    setIsLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at top, #193326 0%, #0a1711 45%, #050b08 100%)",
        color: "white",
      }}
    >
      <form
        onSubmit={handleSignup}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "22px",
          background: "rgba(15, 31, 23, 0.94)",
          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.45)",
        }}
      >
        <p
          style={{
            marginBottom: "10px",
            color: "#c5d8c9",
            fontSize: "13px",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          Legend of Lake Synevyr
        </p>

        <h1 style={{ margin: "0 0 10px", fontSize: "36px" }}>
          Create account
        </h1>

        <p
          style={{
            marginBottom: "28px",
            color: "#b7c5bb",
            lineHeight: 1.6,
          }}
        >
          Create an account to save your reading progress and bookmarks.
        </p>

        <label
          htmlFor="email"
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px",
            marginBottom: "18px",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: "10px",
            background: "#f4f1e8",
            color: "#101a14",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <label
          htmlFor="password"
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
          required
          minLength={6}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px",
            marginBottom: "18px",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: "10px",
            background: "#f4f1e8",
            color: "#101a14",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <label
          htmlFor="confirmPassword"
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Confirm password
        </label>

        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Repeat your password"
          autoComplete="new-password"
          required
          minLength={6}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px",
            marginBottom: "22px",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: "10px",
            background: "#f4f1e8",
            color: "#101a14",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: isLoading ? "#83978a" : "#d8c77b",
            color: "#132018",
            fontSize: "15px",
            fontWeight: 700,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>

        {message && (
          <p
            style={{
              marginTop: "18px",
              padding: "12px",
              borderRadius: "9px",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#f2e8bc",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        )}

        <p
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: "#b7c5bb",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#eadb91",
              fontWeight: 700,
            }}
          >
            Login
          </Link>
        </p>

        <Link
          href="/uk"
          style={{
            display: "block",
            marginTop: "18px",
            textAlign: "center",
            color: "#aebbb2",
            textDecoration: "none",
          }}
        >
          ← Back to the website
        </Link>
      </form>
    </main>
  );
}