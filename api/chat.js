export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { message } = req.body;
  // এখানে GEMINI_API_KEY এর জায়গায় আপনার আসল কী-টি বসিয়ে দিন
  const apiKey = "AQ.Ab8RN6LM7ZJbZNNgSeV2OzrmbgeVCmwCInbzUGD8vAYU4lRl1A"; 

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0].content.parts[0].text) {
        res.status(200).json({ response: data.candidates[0].content.parts[0].text });
    } else {
        res.status(500).json({ response: "রেসপন্স পাওয়া যায়নি।" });
    }
  } catch (error) {
    res.status(500).json({ response: "এরর: " + error.message });
  }
}
