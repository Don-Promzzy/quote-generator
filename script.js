const quoteContainer = document.getElementById("quote__container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const copyBtn = document.getElementById("copy");
const copyMessage = document.getElementById("copy-message");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new__quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes Array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is bank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine the styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long__quote");
  } else {
    quoteText.classList.remove("long__quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
    console.log("whoops, no quote", erroe);
  }
}

// Copy Message
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
  copyMessage.style.visibility = "visible";
  setTimeout(function () {
    copyMessage.style.visibility = "hidden";
  }, 2000);
});

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener
newQuoteBtn.addEventListener("click", newQuote, false);
twitterBtn.addEventListener("click", tweetQuote, false);

// On Load
getQuotes();
