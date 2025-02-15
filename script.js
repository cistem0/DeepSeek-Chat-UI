async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class='user-message'>${userInput}</div>`;

    document.getElementById("user-input").value = "";

    try {
        let response = await fetch("https://huggingface.co/spaces/cooperstark/DeepSeek-Chat/api/predict/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userInput, chat_id: "user1" })
        });

        if (!response.ok) {
            throw new Error(`Server error! Status: ${response.status}`);
        }

        let data = await response.json();
        chatBox.innerHTML += `<div class='bot-message'>${data.answer || "No response from AI"}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Fetch error:", error);
        chatBox.innerHTML += `<div class='bot-message'>Error: Could not connect to AI</div>`;
    }
}
