export default function ForestHero() {
  const leaves = Array.from({ length: 15 });

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "serif",
      }}
    >
      {/* затемнення */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
        }}
      />

      {/* падаюче листя */}
      {leaves.map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "-10%",
            left: Math.random() * 100 + "%",
            fontSize: "20px",
            animation: "fall 10s linear infinite",
          }}
        >
          🍂
        </div>
      ))}

      {/* текст */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "64px", marginBottom: "20px" }}>
          Легенда озера Синевир
        </h1>

        <p style={{ marginBottom: "30px", opacity: 0.9 }}>
          Ліс мовчить… але бібліотека вже чекає.
        </p>

        <a
          href="/reading"
          style={{
            padding: "14px 30px",
            background: "#2563eb",
            borderRadius: "10px",
            textDecoration: "none",
            color: "white",
            fontSize: "18px",
          }}
        >
          Почати читати
        </a>
      </div>
    </div>
  );
}