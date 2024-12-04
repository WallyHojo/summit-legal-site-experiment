document.addEventListener("DOMContentLoaded", () => {
  // Fetch the JSON data
  fetch("assets/data/case.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";

      // Iterate over the JSON data and create list items
      data.forEach((item) => {

        html += '<li class="glide__slide">';
        html += '<div class="card border-0 rounded-0 overflow-hidden">';
        html += '<div class="card-img">';
        html += `<img src="${item.image}" class="img-fluid w-100">`;
        html += '</div>';
        html += '<div class="card-img-overlay d-flex flex-column align-items-center justify-content-center gap-1 rounded-0">';
        html += `<h4 class="mb-0">${item.title}</h4>`;
        html += `<h6 class="mb-0">${item.subtitle}</h6>`;
        html += `</div></div>`;
      });
      document.querySelector(".caseData").innerHTML = html;

      new Glide(".case", {
        type: "sliders",
        autoplay: 2000,
        startAt: 0,
        perView: 3,
        keyboard: true,
        gap: 20,
        breakpoints: {
          992: {
            perView: 2,
          },
          768: {
            perView: 1.5,
          },
          576: {
            perView: 1,
          },
        },
      }).mount();
    })
    .catch((error) => console.error("Error fetching the JSON data:", error));
});
