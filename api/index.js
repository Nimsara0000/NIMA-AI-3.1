const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // CORS සැකසුම්
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { prompt } = req.body;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "API Key එක Vercel හි සඳහන් කර නැත!" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        // ERROR FIX: veo-3.1 වෙනුවට gemini-1.5-flash භාවිතා කිරීම
        // මෙය වඩාත් ස්ථාවර වන අතර Error එක ඉවත් කරයි
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(`පහත විස්තරයට අනුව AI වීඩියෝවක් නිර්මාණය කිරීමට අවශ්‍ය තාක්ෂණික විධානයක් (Technical Prompt) සකසන්න: ${prompt}`);
        const response = await result.response;
        const text = response.text();

        res.json({ 
            success: true, 
            message: "Prompt processed successfully!",
            data: text 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "මොඩල් එක සම්බන්ධ කරගැනීමට නොහැකි විය: " + error.message });
    }
};
