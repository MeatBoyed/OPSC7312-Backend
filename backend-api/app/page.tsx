import Link from "next/link";
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        backgroundColor: "#f4f4f4",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "2.5em", marginBottom: "20px" }}>Welcome to Our API</h1>
        <h2 style={{ fontSize: "1.5em", marginBottom: "30px", color: "#555" }}>OPSC7312 Backend API</h2>
        <p style={{ marginBottom: "20px", color: "#777" }}>
          Our API provides a powerful and flexible way to access various News articles and provides features for our Mobile App.
          <br /> Get started by exploring the documentation or checking out the API overview.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <Link
            href="/api/news"
            style={{
              textDecoration: "none",
              border: "1px solid #007bff",
              backgroundColor: "white",
              color: "black",
              padding: "15px 25px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
          >
            Request some Articles
          </Link>
          <Link
            href="/api/ui"
            style={{
              textDecoration: "none",
              backgroundColor: "#007bff",
              color: "white",
              padding: "15px 25px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
          >
            View Documentation
          </Link>
        </div>
        <p style={{ marginTop: "20px", fontSize: "0.9em", color: "#999" }}>
          Created by{" "}
          <a href="https://nerfdesigns.com" style={{ color: "#007bff", textDecoration: "none" }}>
            Charles Rossouw (Joel Shaduka)
          </a>{" "}
          and{" "}
          <a href="https://nerfdesigns.com" style={{ color: "#007bff", textDecoration: "none" }}>
            Kayode Daniel Akilo
          </a>{" "}
          and <br />
          <a href="https://nerfdesigns.com" style={{ color: "#007bff", textDecoration: "none" }}>
            {" "}
            Donna Peter
          </a>{" "}
          and{" "}
          <a href="https://nerfdesigns.com" style={{ color: "#007bff", textDecoration: "none" }}>
            Vaughn Hay
          </a>{" "}
          and{" "}
          <a href="https://nerfdesigns.com" style={{ color: "#007bff", textDecoration: "none" }}>
            Lebohang Makgatho
          </a>
        </p>
      </div>
    </div>
  );
}
