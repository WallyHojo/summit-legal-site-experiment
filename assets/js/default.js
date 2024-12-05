document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  let timer;

  const header = document.getElementById("header");
  const scrollUp = 'header-scroll-up';
  const scrollDown = 'header-scroll-down';

  // Initially remove 'header-bg' if exists.
  // Initiated for click event on logo.
  header.classList.remove("header-bg");    

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    clearTimeout(timer);

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add(scrollDown);
      header.classList.remove(scrollUp);
    } else {
      // Scrolling up
      header.classList.remove(scrollDown);
      header.classList.add(scrollUp);
    }

    // Add header-bg class when scrolling
    header.classList.add("header-bg");

    // Remove header-bg class when at the top of the page
    if (scrollTop === 0) {
      header.classList.remove("header-bg");
    }

    // Remove header-scroll-down class after scrolling stops
    timer = setTimeout(() => {
      //header.classList.remove(scrollDown);
      header.classList.remove(scrollUp);
    }, 300); // Adjust timeout duration as needed

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });

  // Add a click event listener to the div with the class 'logo'.
  // When the div is clicked, the user will be redirected to the specified URL.
  document.querySelectorAll(".logo").forEach((logo) => {
    logo.addEventListener("click", () => {
      window.location.href = '/';
    });
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
    negativeMargin = -(sectionHeight / 12);
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
const words = ["Justice.", "Freedom.", "Dignity."];
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

// Get the scroll-to-top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Function to handle the scroll event
window.onscroll = function() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        // Show the button when scrolling down 300px
        scrollToTopBtn.style.opacity = "1";
        scrollToTopBtn.style.visibility = "visible"; // Enable interaction
    } else {
        // Hide the button when less than 300px scrolled
        scrollToTopBtn.style.opacity = "0";
        scrollToTopBtn.style.visibility = "hidden"; // Disable interaction
    }
};

// Function to scroll to the top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Optional smooth scroll effect
    });
}

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