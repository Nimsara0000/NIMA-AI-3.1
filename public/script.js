document.getElementById('genBtn').onclick = async () => {
    const prompt = document.getElementById('prompt').value;
    const output = document.getElementById('output');
    const genBtn = document.getElementById('genBtn');
    
    if (!prompt) {
        alert("කරුණාකර Prompt එකක් ඇතුළත් කරන්න!");
        return;
    }

    // බොත්තම අක්‍රීය කර Loading පණිවිඩය පෙන්වීම
    output.innerText = "NIMA AI සැකසුම් සිදු කරමින් පවතී... කරුණාකර රැඳී සිටින්න.";
    genBtn.disabled = true;
    
    try {
        const res = await fetch('/api', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ prompt })
        });
        
        const data = await res.json();
        
        if (data.success) {
            // ERROR FIX: data.url වෙනුවට data.data භාවිතා කරන්න
            output.style.color = "#00ff00"; // සාර්ථක නම් කොළ පැහැයෙන් පෙන්වීමට
            output.innerText = "සාර්ථකයි! \n\nAI ප්‍රතිචාරය: " + data.data;
        } else {
            output.style.color = "#ff0000"; // දෝෂයක් නම් රතු පැහැයෙන්
            output.innerText = "දෝෂයකි: " + data.error;
        }
    } catch (e) {
        output.style.color = "#ff0000";
        output.innerText = "Error: සර්වර් එක සමඟ සම්බන්ධ වීමට නොහැකි විය. ( " + e.message + " )";
    } finally {
        // ක්‍රියාවලිය අවසානයේ බොත්තම නැවත සක්‍රීය කිරීම
        genBtn.disabled = false;
    }
};
