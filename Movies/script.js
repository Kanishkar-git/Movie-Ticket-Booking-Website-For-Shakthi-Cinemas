// Function to open the trailer modal
function openTrailerModal(trailerUrl) {
  const modal = document.getElementById("trailer-modal");
  const iframe = modal.querySelector("iframe");

  // Set the iframe source to the embed URL
  iframe.src = trailerUrl;
  modal.style.display = "flex"; // Show the modal
}

// Function to close the trailer modal
function closeTrailerModal() {
  const modal = document.getElementById("trailer-modal");
  const iframe = modal.querySelector("iframe");

  iframe.src = ""; // Stop the video by clearing the iframe source
  modal.style.display = "none"; // Hide the modal
}

// Add event listeners to "Watch Trailer" buttons
document.querySelectorAll(".watch-trailer-btn").forEach(button => {
  button.addEventListener("click", function () {
    const trailerUrl = this.getAttribute("data-trailer-url");
    openTrailerModal(trailerUrl);
  });
});

// Add event listener to close button in the modal
document.querySelector("#trailer-modal .close-btn").addEventListener("click", closeTrailerModal);

// Close modal when clicking outside the modal content
document.getElementById("trailer-modal").addEventListener("click", function (event) {
  if (event.target === this) {
    closeTrailerModal();
  }
});

document.querySelectorAll(".watch-trailer-btn").forEach(button => {
  button.addEventListener("click", function() {
      const trailerUrl = this.getAttribute("data-trailer-url");
      if (trailerUrl) {
          const modal = document.getElementById("trailer-modal");
          const iframe = modal.querySelector("iframe");
          iframe.src = trailerUrl + "?autoplay=1";
          modal.style.display = "block";
      }
  });
});

// Close modal when clicking the close button
document.querySelector(".close-btn").addEventListener("click", function() {
  const modal = document.getElementById("trailer-modal");
  const iframe = modal.querySelector("iframe");
  iframe.src = ""; // Stop the video
  modal.style.display = "none";
});
