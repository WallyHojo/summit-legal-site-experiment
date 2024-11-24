// Function to update the div height based on the screen height
function updateDivHeight() {
  // Get the height of the screen
  const screenHeight = window.innerHeight;

  // Get the div element by its ID
  const divElement = document.getElementById("welcome-section");

  // Apply the screen height to the div in pixels
  divElement.style.height = screenHeight + "px";
}

// Function to update the top margin of the section based on its height
function updateTopMargin() {
  // Get the section element by its ID
  const section = document.getElementById("service-section");

  // Get the height of the section
  const sectionHeight = section.offsetHeight;

  // Calculate the negative top margin (height divided by 2.5)
  const negativeMargin = -(sectionHeight / 2.5);

  // Apply the negative margin to the section
  section.style.marginTop = `${negativeMargin}px`;
}

// Call the function to set the initial height when the page loads
updateDivHeight();
updateTopMargin();

// Add an event listener to update the div height on window resize
window.addEventListener("resize", updateDivHeight, updateTopMargin);

/****/

// Array of words to type out
const words = ["Justice", "Freedom", "Dignity"];
let currentWordIndex = 0;
let currentCharIndex = 0;
const typingSpeed = 150; // Speed of typing (in milliseconds)
const erasingSpeed = 100; // Speed of erasing (in milliseconds)
const delayBetweenWords = 1500; // Delay before moving to the next word (in milliseconds)

const spanElement = document.getElementById("typedText");

// Function to animate the typing of a word
function typeWord() {
  // Get the current word to type
  const currentWord = words[currentWordIndex];

  // Add the current character to the span
  spanElement.textContent += currentWord[currentCharIndex];

  // Move to the next character
  currentCharIndex++;

  // If all characters of the word have been typed, wait and then erase
  if (currentCharIndex === currentWord.length) {
    setTimeout(eraseWord, delayBetweenWords);
  } else {
    setTimeout(typeWord, typingSpeed);
  }
}

// Function to erase the current word
function eraseWord() {
  // Remove the last character from the span
  spanElement.textContent = spanElement.textContent.slice(0, -1);

  // If the word has been fully erased, move to the next word
  if (spanElement.textContent === "") {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    currentCharIndex = 0;
    setTimeout(typeWord, typingSpeed);
  } else {
    setTimeout(eraseWord, erasingSpeed);
  }
}

// Start typing the first word
typeWord();

/****/
