document.getElementById('genBtn').onclick = async () => {
    const prompt = document.getElementById('prompt').value;
    const output = document.getElementById('output');
    
    output.innerText = "නිර්මාණය වෙමින් පවතී...";
    
    try {
        const res = await fetch('/api', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        output.innerText = data.success ? "සාර්ථකයි! URL එක: " + data.url : "දෝෂයකි: " + data.error;
    } catch (e) {
        output.innerText = "Error: " + e.message;
    }
};
