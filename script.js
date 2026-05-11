const dugme = document.getElementById("dugme");

const naslov = document.getElementById("naslov");

dugme.addEventListener("click", function () {

    naslov.textContent = "JavaScript radi!";

    document.body.style.backgroundColor = "#d1e7ff";

});