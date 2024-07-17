// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the buttons by their IDs
    const btnQuotes = document.getElementById("btn-1");
    const btnJokes = document.getElementById("btn-2");
    const btnFacts = document.getElementById("btn-3");

    // Add click event listeners to each button
    btnQuotes.addEventListener("click", function() {
        window.location.href = "./quotes/quotes.html"; // Navigate to quotes.html
    });

    btnJokes.addEventListener("click", function() {
        window.location.href = "./jokes/jokes.html"; // Navigate to jokes.html
    });

    btnFacts.addEventListener("click", function() {
        window.location.href = "./facts/facts.html"; // Navigate to facts.html
    });
});





