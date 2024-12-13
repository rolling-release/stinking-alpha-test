const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const userMessage = userInput.value;
  displayMessage('user', userMessage);
  userInput.value = ''; // Clear the input field

  // Send the user message to your Python script using fetch API
  fetch('/app.py', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: userMessage })
  })
  .then(response => response.json())
  .then(data => {
    const aiResponse = data.response;
    displayMessage('ai', aiResponse);
  })
  .catch(error => console.error('Error:', error));
});

function displayMessage(sender, message) {
  const messageElement = document.createElement('p');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatbox.appendChild(messageElement);
}
