export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text) {
      return Response.json({ error: "No text provided" }, { status: 400 });
    }
    if (text.length > 1000){
      if (text.length > 1000) {
  return Response.json(
    { error: "Text too long (max ~150-200 words)" },
    { status: 400 }
  );
}
    }
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Notes Summarizer",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Summarize the following text in 3-4 concise bullet points:\n${text}`,
            },
          ],
        }),
      },
    );
    const data = await response.json();
    console.log("STATUS:", response.status);
    console.log("DATA:", data);
    if (!response.ok) {
      console.error(data);
      return Response.json({ error: "AI API failed" }, { status: 500 });
    }

    const summary =
      data?.choices?.[0]?.message?.content || "No summary generated";
    return Response.json({
      summary,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
