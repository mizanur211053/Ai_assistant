export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY; 

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    res.status(500).json({ response: "এপিআই এরর হয়েছে। দয়া করে আবার চেষ্টা করুন।" });
  }
}
