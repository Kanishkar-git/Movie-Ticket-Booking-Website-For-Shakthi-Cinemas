document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input");

  // Handle focus and blur on input fields
  function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
  }

  function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
  });

  const sendButton = document.querySelector('.btn');
  const sendingMessage = document.getElementById('sendingMessage'); // The div to show "Sending..." message

  // When the send button is clicked
  sendButton.addEventListener('click', () => {
    // Show the sending message in the center
    sendingMessage.style.display = 'block';

    // Add loading class to the button to show animation
    sendButton.classList.add('loading');

    // Simulate an async action like sending a message
    setTimeout(() => {
      // Hide the sending message after 3 seconds
      sendingMessage.style.display = 'none';

      // Remove loading class after 3 seconds
      sendButton.classList.remove('loading');
    }, 3000);
  });

  // Preloading animation
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 3000); // Hide after 3 seconds
});
