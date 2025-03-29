const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const pricePerTicket = document.getElementById("pricePerTicket");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  pricePerTicket.innerText = ticketPrice; // Update per-ticket price

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Get the current date and day
const dayElement = document.querySelector(".day");
const dateElement = document.querySelector(".date");

function updateDayAndDate() {
  const today = new Date();

  // Days of the week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[today.getDay()]; // Get current day

  // Format date as DD MMM
  const date = today.getDate() + " " + today.toLocaleString('default', { month: 'short' });

  // Update the elements
  dayElement.innerText = day;
  dateElement.innerText = date;
}

const showTimings = document.querySelectorAll(".show-timings .time");

showTimings.forEach(button => {
  button.addEventListener("click", () => {
    // Remove 'selected' class from all buttons
    showTimings.forEach(btn => btn.classList.remove("selected"));

    // Add 'selected' class to the clicked button
    button.classList.add("selected");
  });
});

// Razorpay payment integration
document.addEventListener("DOMContentLoaded", function () {
  const bookTicketsButton = document.querySelector(".book-btn");

  bookTicketsButton.addEventListener("click", function () {
    const selectedSeats = [...document.querySelectorAll(".row .seat.selected")];
    const selectedTime = document.querySelector(".show-timings .time.selected")?.innerText;

    if (selectedSeats.length === 0 || !selectedTime) {
      alert("Please select seats and show time before proceeding.");
      return;
    }

    const totalAmount = +total.innerText * 100; 

    const options = {
      key: "rzp_test_k1HwXkeOniG3gl", 
      amount: totalAmount,
      currency: "INR",
      name: "Movie Booking",
      description: "Payment for movie ticket",
      image: "https://your-logo-url-here.png",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        generateTicketPDF(selectedSeats, selectedTime);
      },
      prefill: {
        name: "Kanishkar R",
        email: "kanishkar@gmail.com",
        contact: "9567895487",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  });
});

function generateTicketPDF(seatsArray, showTime) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const selectedSeatsText = seatsArray.map(seat => seat.innerText).join(", ");

  doc.setFontSize(18);
  doc.text("Your Movie Ticket", 70, 20);
  doc.setFontSize(14);
  doc.text(`Movie: ${movieSelect.options[movieSelect.selectedIndex].text}`, 20, 40);
  doc.text("Language: Tamil, 2D", 20, 50);
  doc.text(`Date & Time: ${dateElement.innerText}, ${showTime}`, 20, 60);
  doc.text("Venue: Shakthi Cinemas, Screen 2", 20, 70);
  doc.text(`Seats: ${selectedSeatsText}`, 20, 80);
  doc.text("Booking ID: WHQRT56786", 20, 90);
  doc.text(`Total Amount: ₹ ${total.innerText}`, 20, 100);

  doc.save("Movie_Ticket.pdf");
}

// Call to update day and date
updateDayAndDate();

// Initial count and total set
updateSelectedCount();
