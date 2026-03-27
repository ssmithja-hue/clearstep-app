export async function POST(req) {
  try {
    const { problem } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({
        error: "Missing API key"
      }), { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Give a clear step-by-step solution to this problem:\n\n${problem}`
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify({
      result: data.output?.[0]?.content?.[0]?.text || "No response"
    }));

  } catch (err) {
    return new Response(JSON.stringify({
      error: "Server error"
    }), { status: 500 });
  }
}
