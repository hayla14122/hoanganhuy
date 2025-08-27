const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");
const chatPopup = document.getElementById("chatPopup");
const chatToggleBtn = document.getElementById("chat-toggle-btn");

const apiKey = "AIzaSyB355CZPyovGGA7klD4k3XjeKzbVY_pd4M"; // 🔑 thay bằng API key của bạn
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

// Mở/đóng chatbot
chatToggleBtn.onclick = function () {
  chatPopup.style.display = "block";
  chatToggleBtn.style.display = "none";
};

document.getElementById("chat-header").onclick = function () {
  chatPopup.style.display = "none";
  chatToggleBtn.style.display = "flex";
};

sendBtn.onclick = async function () {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  addMessage("bot", "Thinking...", true);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful medical assistant. 
Always answer briefly (1–3 sentences), clearly, and only about medicine/health. 
If the user asks something unrelated, politely refuse.

User: ${text}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, something went wrong.";

    // Xóa tin "Thinking..."
    chatBox.lastChild.remove();
    addMessage("bot", reply);
  } catch (err) {
    chatBox.lastChild.remove();
    addMessage("bot", "Error connecting to server.");
  }
};

function addMessage(sender, message, thinking = false) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${sender}` + (thinking ? " thinking" : "");
  msgDiv.textContent = (sender === "user" ? "You: " : "Gemini: ") + message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Gửi bằng Enter
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});
