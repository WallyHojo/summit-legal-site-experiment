document.addEventListener("DOMContentLoaded", () => {
  // Fetch the JSON data
  fetch("assets/data/testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";

      // Iterate over the JSON data and create list items
      data.forEach((item) => {
        // Convert the name to lowercase for the alt attribute
        let altNameLower = item.name.toLowerCase();

        html += '<li class="glide__slide">';
        html +=
          '<div class="testimonial d-flex flex-column justify-content-between rounded-2 p-3 gap-5 mx-auto overflow-hidden">';
        html += `<p>${item.review}</p>`;
        html +=
          '<div class="staff d-flex flex-row align-items-center mt-auto">';
        html += '<div class="name-container order-1">';
        html += `<div class="name"> ${item.name} </div>`;
        html += `<div class="title text-purple"> ${item.title} </div>`;
        html += "</div>";
        html += '<div class="photo me-2">';
        html += `<img class="ellipse position-relative img-fluid" alt="${altNameLower} photo" src="${item.photo}">`;
        html += "</div></div></div></li>";
      });
      document.querySelector(".testimonialData").innerHTML = html;

      new Glide(".testimonials", {
        type: "sliders",
        startAt: 0,
        perView: 4,
        focusAt: "center",
        keyboard: true,
        gap: 20,
        breakpoints: {
          1024: {
            perView: 3,
          },
          992: {
            perView: 2,
          },
          768: {
            perView: 1,
          },
        },
      }).mount();
    })
    .catch((error) => console.error("Error fetching the JSON data:", error));
});
