async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class='user-message'>${userInput}</div>`;

    document.getElementById("user-input").value = "";

    let response = await fetch("https://huggingface.co/spaces/cooperstark/DeepSeek-Chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput, chat_id: "user1" })
    });

    let data = await response.json();
    chatBox.innerHTML += `<div class='bot-message'>${data.answer}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
