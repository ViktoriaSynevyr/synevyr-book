"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  {
    code: "uk",
    shortName: "UA",
    name: "Ukrainian",
    nativeName: "Українська",
    flag: "🇺🇦",
  },
  {
    code: "en",
    shortName: "EN",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
  },
  {
    code: "es",
    shortName: "ES",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
  },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

function isLanguageCode(value: string): value is LanguageCode {
  return languages.some((language) => language.code === value);
}

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const pathParts = pathname.split("/").filter(Boolean);
  const languageFromPath = pathParts[0] ?? "";

  const initialLanguage: LanguageCode = isLanguageCode(languageFromPath)
    ? languageFromPath
    : "uk";

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode>(initialLanguage);

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelectedLanguage(initialLanguage);
  }, [initialLanguage]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const savedLanguage = localStorage.getItem("book-language");

    if (!savedLanguage) {
      setIsOpen(true);
    }
  }, [mounted]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function chooseLanguage(languageCode: LanguageCode) {
    localStorage.setItem("book-language", languageCode);
    setSelectedLanguage(languageCode);
    setIsOpen(false);

    const newPathParts = pathname.split("/").filter(Boolean);

    if (
      newPathParts.length > 0 &&
      isLanguageCode(newPathParts[0])
    ) {
      newPathParts[0] = languageCode;
    } else {
      newPathParts.unshift(languageCode);
    }

    router.push(`/${newPathParts.join("/")}`);
  }

  const currentLanguage =
    languages.find(
      (language) => language.code === selectedLanguage
    ) ?? languages[0];

  const modal =
    mounted && isOpen
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-dialog-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              width: "100vw",
              height: "100dvh",
              overflowY: "auto",
              background: "rgba(0, 0, 0, 0.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "850px",
                maxHeight: "calc(100dvh - 48px)",
                overflowY: "auto",
                padding: "32px",
                borderRadius: "24px",
                border: "1px solid rgba(253, 230, 138, 0.25)",
                background: "rgba(11, 13, 11, 0.98)",
                boxShadow: "0 30px 90px rgba(0, 0, 0, 0.75)",
                color: "white",
              }}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close language menu"
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "white",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>

              <p
                style={{
                  margin: "0 50px 10px",
                  textAlign: "center",
                  color: "rgba(254, 243, 199, 0.65)",
                  fontSize: "12px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                }}
              >
                Legend of Lake Synevyr
              </p>

              <h2
                id="language-dialog-title"
                style={{
                  margin: "0 0 10px",
                  textAlign: "center",
                  fontSize: "clamp(32px, 5vw, 52px)",
                  lineHeight: 1.1,
                }}
              >
                Choose your language
              </h2>

              <p
                style={{
                  margin: "0 0 28px",
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                Оберіть мову, якою хочете читати історію
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(190px, 1fr))",
                  gap: "14px",
                }}
              >
                {languages.map((language) => {
                  const isSelected =
                    language.code === selectedLanguage;

                  return (
                    <button
                      key={language.code}
                      type="button"
                      onClick={() =>
                        chooseLanguage(language.code)
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "18px",
                        borderRadius: "16px",
                        border: isSelected
                          ? "1px solid rgba(252, 211, 77, 0.85)"
                          : "1px solid rgba(255, 255, 255, 0.12)",
                        background: isSelected
                          ? "rgba(252, 211, 77, 0.12)"
                          : "rgba(255, 255, 255, 0.05)",
                        color: "white",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: "32px" }}>
                        {language.flag}
                      </span>

                      <span>
                        <strong
                          style={{
                            display: "block",
                            fontSize: "16px",
                          }}
                        >
                          {language.nativeName}
                        </strong>

                        <span
                          style={{
                            display: "block",
                            marginTop: "4px",
                            color: "rgba(255, 255, 255, 0.45)",
                            fontSize: "14px",
                          }}
                        >
                          {language.name}
                        </span>
                      </span>
                      </button>
                  );
                })}
              </div>

              <p
                style={{
                  margin: "26px 0 0",
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.35)",
                  fontSize: "12px",
                }}
              >
                You can change your language anytime.
              </p>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Choose language"
        aria-expanded={isOpen}
        className="flex h-10 shrink-0 items-center gap-2 rounded-full border border-amber-200/30 bg-black/40 px-3 text-xs font-semibold uppercase tracking-[0.15em] text-amber-100 shadow-xl backdrop-blur-xl transition hover:border-amber-200/70 hover:bg-amber-200/10"
      >
        <span aria-hidden="true">🌐</span>
        <span>{currentLanguage.shortName}</span>
        <span
          aria-hidden="true"
          className="text-[10px] text-amber-100/60"
        >
          ▼
        </span>
      </button>

      {modal}
    </>
  );
}