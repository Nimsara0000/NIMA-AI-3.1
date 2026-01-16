const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { prompt } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) return res.status(500).json({ error: "API Key missing" });

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        const model = genAI.getGenerativeModel({ model: "veo-3.1-generate-preview" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ success: true, url: response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
