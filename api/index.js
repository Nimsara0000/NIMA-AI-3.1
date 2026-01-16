const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // CORS සැකසුම් (Frontend එක සමඟ සම්බන්ධ වීමට)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY; // Vercel Settings වලින් ලබාගනී

    if (!apiKey) {
        return res.status(500).json({ error: "API Key එක Vercel හි සඳහන් කර නැත!" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // ERROR FIX: gemini-1.5-flash වෙනුවට gemini-1.5-flash-latest භාවිතා කිරීම
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ 
            success: true, 
            data: text 
        });
    } catch (error) {
        console.error(error);
        // Error එක විස්තරාත්මකව පෙන්වීමට
        res.status(500).json({ error: "මොඩල් එක සම්බන්ධ වීමේ දෝෂයකි: " + error.message });
    }
};
