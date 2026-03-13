"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generateVideo() {
    setLoading(true);
    setVideo(null);

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    let prediction = await response.json();

    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await new Promise((r) => setTimeout(r, 3000));
      const poll = await fetch(`/api/predictions/${prediction.id}`);
      prediction = await poll.json();
    }

    if (prediction.output) setVideo(prediction.output);
    setLoading(false);
  }

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🎬 Mi Generador de Video con IA</h1>
      <input
        style={{ width: "60%", padding: "10px", fontSize: "16px" }}
        type="text"
        placeholder="Describe tu video en inglés..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        style={{ padding: "10px 20px", marginLeft: "10px", fontSize: "16px", cursor: "pointer" }}
        onClick={generateVideo}
        disabled={loading}
      >
        {loading ? "Generando..." : "¡Generar!"}
      </button>
      {loading && <p>⏳ Generando tu video, espera 1-2 minutos...</p>}
      {video && (
        <div style={{ marginTop: "30px" }}>
          <video controls autoPlay style={{ width: "70%", borderRadius: "12px" }}>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
    </main>
  );
}
