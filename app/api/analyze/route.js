export async function POST(req) {
  const { problem } = await req.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates clear step-by-step action plans."
        },
        {
          role: "user",
          content: `Create a clear step-by-step plan for: ${problem}`
        }
      ]
    })
  });

  const data = await response.json();
  const result = data.choices[0].message.content;

  return Response.json({ result });
}
