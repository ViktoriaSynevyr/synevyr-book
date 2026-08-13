import { Literata } from "next/font/google";
import ChapterNavigation from "../../components/ChapterNavigation";

const literata = Literata({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default function ReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={literata.className}
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/forest.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(to bottom, rgba(3, 10, 8, 0.82), rgba(3, 10, 8, 0.94))",
          padding: "48px 18px 80px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          <section
            style={{
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255, 235, 190, 0.16)",
              borderRadius: "28px",
              background:
                "linear-gradient(145deg, rgba(13, 24, 20, 0.96), rgba(5, 14, 11, 0.96))",
              boxShadow:
                "0 30px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              padding: "clamp(28px, 6vw, 72px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, rgba(255, 220, 150, 0.55), transparent)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: "1",
              }}
            >
              {children}
              <ChapterNavigation />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}