"use client";
import { useState } from "react";

export default function Home() {
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ problem })
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ClearStep</h1>

      <textarea
        placeholder="Describe your problem..."
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Get My Plan
      </button>

      <p>{result}</p>
    </div>
  );
}
