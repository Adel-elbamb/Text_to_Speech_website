  async function generateVoice() {
    const text = document.getElementById("text").value;
    console.log(text);
    const response = await fetch("http://localhost:3000/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    document.getElementById("audio").src = audioUrl;
  }