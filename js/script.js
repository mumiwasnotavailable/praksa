const sportasi = [

    {
        ime: "Cristiano Ronaldo",
        sport: "Fudbal",
        opis: "Jedan od najboljih fudbalera svih vremena."
    },

    {
        ime: "LeBron James",
        sport: "Košarka",
        opis: "NBA legenda i višestruki prvak."
    },

    {
        ime: "Novak Djokovic",
        sport: "Tenis",
        opis: "Jedan od najuspješnijih tenisera ikad."
    }

];

const kartice = document.getElementById("kartice");

const detalji = document.getElementById("detalji");

sportasi.forEach(function (sportas) {

    kartice.innerHTML += `

        <div class="col-md-4 mb-4">

            <div class="card p-3 h-100">

                <h3>${sportas.ime}</h3>

                <p>${sportas.sport}</p>

                <button class="btn btn-primary"
                    onclick="prikaziDetalje('${sportas.opis}')">

                    Detalji

                </button>

            </div>

        </div>

    `;

});

function prikaziDetalje(opis) {

    detalji.textContent = opis;

}