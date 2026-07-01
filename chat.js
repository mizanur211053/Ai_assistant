export default async function handler(req, res) {
  // শুধুমাত্র POST রিকোয়েস্ট গ্রহণ করবে
  if (req.method !== 'POST') return res.status(405).end();
  
  const { message } = req.body;
  
  // এনভায়রনমেন্ট ভেরিয়েবল থেকে API Key সংগ্রহ করা হচ্ছে
  const apiKey = process.env.GEMINI_API_KEY; 

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });

    const data = await response.json();
    
    // এআই রেসপন্স প্রসেস করা হচ্ছে
    const aiResponse = data.candidates[0].content.parts[0].text;
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    // এরর হ্যান্ডলিং
    res.status(500).json({ response: "এপিআই এরর হয়েছে। দয়া করে আবার চেষ্টা করুন।" });
  }
}