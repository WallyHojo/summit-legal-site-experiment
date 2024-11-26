document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  let timer;

  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    clearTimeout(timer);

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add("header-scroll-down");
      header.classList.remove("header-scroll-up");
    } else {
      // Scrolling up
      header.classList.remove("header-scroll-down");
      header.classList.add("header-scroll-up");
    }

    // Add header-bg class when scrolling
    header.classList.add("header-bg");

    // Remove header-bg class when at the top of the page
    if (scrollTop === 0) {
      header.classList.remove("header-bg");
    }

    // Remove header-scroll-down class after scrolling stops
    timer = setTimeout(() => {
      header.classList.remove("header-scroll-down");
      header.classList.remove("header-scroll-up");
    }, 150); // Adjust timeout duration as needed

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });
});

/****/

// Function to update the div height based on the screen height
function updateDivHeight() {
  const sectionHeight = window.innerHeight;
  const welcomeSection = document.getElementById("welcome-section");
  welcomeSection.style.height = `${sectionHeight}px`;
}

// Function to update the top margin of the section based on its height
function updateTopMargin() {
  const section = document.getElementById("service-section");
  const sectionHeight = section.offsetHeight;

  let negativeMargin;
  if (window.innerWidth > 1024) {
    negativeMargin = -(sectionHeight / 2.55);
  } else if (window.innerWidth > 768 && window.innerWidth < 991) {
    negativeMargin = -(sectionHeight / 5);
  } else {
    negativeMargin = -(sectionHeight / 10);
  }
  section.style.marginTop = `${negativeMargin}px`;
}

// Call functions to set the initial height and margin when the page loads
updateDivHeight();
updateTopMargin();

// Add event listeners to update the div height and margin on window load and resize
window.addEventListener("load", () => {
  updateDivHeight();
  updateTopMargin();
});
window.addEventListener("resize", () => {
  updateDivHeight();
  updateTopMargin();
});

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

function adjustHeights(selector) {
  // Select all blog containers const
  blogContainers = document.querySelectorAll(".blog-container");
  blogContainers.forEach((container) => {
    // Find all elements with the given selector within this container
    const elements = container.querySelectorAll(selector);
    // Reset height to auto to recalculate properly
    elements.forEach((el) => {
      el.style.height = "auto";
    });
    // Find the tallest element
    let maxHeight = 0;
    elements.forEach((el) => {
      const height = el.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    // Apply the tallest height to all elements
    elements.forEach((el) => {
      el.style.height = `${maxHeight}px`;
    });
  });
}
function adjustAllHeights() {
  adjustHeights(".blog-title");
  adjustHeights(".blog-snippet");
}
document.addEventListener("DOMContentLoaded", adjustAllHeights);
window.addEventListener("resize", adjustAllHeights);

/****/

document.querySelectorAll(".card-flip").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});
document.querySelectorAll(".close-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    button.closest(".card").classList.remove("is-flipped");
  });
});

/****/
