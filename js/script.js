const sportasi = [
    {
        ime: "Cristiano Ronaldo",
        sport: "Fudbal",
        drzava: "Portugal",
        godina: 1985,
        uspjeh: "Višestruki osvajač Lige prvaka",
        slika: "images/ronaldo.jpg",
        opis: "Cristiano Ronaldo je portugalski fudbaler poznat po disciplini, brzini, snazi i velikom broju postignutih golova. Smatra se jednim od najboljih fudbalera svih vremena."
    },
    {
        ime: "Lionel Messi",
        sport: "Fudbal",
        drzava: "Argentina",
        godina: 1987,
        uspjeh: "Svjetski prvak sa Argentinom",
        slika: "images/messi.jpg",
        opis: "Lionel Messi je argentinski fudbaler poznat po tehnici, driblingu, pregledu igre i izuzetnoj kreativnosti. Jedan je od najuspješnijih igrača u historiji fudbala."
    },
    {
        ime: "Novak Đoković",
        sport: "Tenis",
        drzava: "Srbija",
        godina: 1987,
        uspjeh: "Jedan od najtrofejnijih tenisera svih vremena",
        slika: "images/djokovic.jpg",
        opis: "Novak Đoković je profesionalni teniser poznat po mentalnoj snazi, defanzivnoj igri i velikom broju osvojenih Grand Slam turnira."
    },
    {
        ime: "Serena Williams",
        sport: "Tenis",
        drzava: "SAD",
        godina: 1981,
        uspjeh: "Jedna od najuspješnijih teniserki svih vremena",
        slika: "images/serena.jpg",
        opis: "Serena Williams je američka teniserka poznata po snažnoj igri, borbenosti i velikom utjecaju na razvoj ženskog tenisa."
    },
    {
        ime: "LeBron James",
        sport: "Košarka",
        drzava: "SAD",
        godina: 1984,
        uspjeh: "Višestruki NBA prvak",
        slika: "images/lebron.jpg",
        opis: "LeBron James je američki košarkaš poznat po fizičkoj snazi, liderstvu i dugoj uspješnoj NBA karijeri."
    },
    {
        ime: "Usain Bolt",
        sport: "Atletika",
        drzava: "Jamajka",
        godina: 1986,
        uspjeh: "Svjetski rekorder na 100m i 200m",
        slika: "images/bolt.jpg",
        opis: "Usain Bolt je bivši jamajčanski sprinter poznat kao najbrži čovjek na svijetu. Posebno se istakao u disciplinama 100 i 200 metara."
    }
];

const kartice = document.getElementById("kartice");
const pretraga = document.getElementById("pretraga");
const sortiranje = document.getElementById("sortiranje");
const filterDugmad = document.querySelectorAll(".filter-btn");
const brojSportasa = document.getElementById("brojSportasa");
const brojSportova = document.getElementById("brojSportova");
const brojFavorita = document.getElementById("brojFavorita");
const brojRezultata = document.getElementById("brojRezultata");
const resetBtn = document.getElementById("resetBtn");
const randomBtn = document.getElementById("randomBtn");
const topBtn = document.getElementById("topBtn");
const themeBtn = document.getElementById("themeBtn");

const prviSportas = document.getElementById("prviSportas");
const drugiSportas = document.getElementById("drugiSportas");
const compareBtn = document.getElementById("compareBtn");
const compareResult = document.getElementById("compareResult");
const favoritiLista = document.getElementById("favoritiLista");

const detaljiIme = document.getElementById("detaljiIme");
const detaljiSport = document.getElementById("detaljiSport");
const detaljiOpis = document.getElementById("detaljiOpis");
const detaljiDrzava = document.getElementById("detaljiDrzava");
const detaljiGodina = document.getElementById("detaljiGodina");
const detaljiUspjeh = document.getElementById("detaljiUspjeh");
const detaljiSlika = document.getElementById("detaljiSlika");

const modalIme = document.getElementById("modalIme");
const modalSlika = document.getElementById("modalSlika");
const modalOpis = document.getElementById("modalOpis");
const modalSport = document.getElementById("modalSport");
const modalDrzava = document.getElementById("modalDrzava");
const modalUspjeh = document.getElementById("modalUspjeh");

let aktivniSport = "Svi";
let trenutniSportas = sportasi[0];
let favoriti = JSON.parse(localStorage.getItem("favoriti")) || [];

brojSportasa.textContent = sportasi.length;

const sportovi = [...new Set(sportasi.map(function (sportas) {
    return sportas.sport;
}))];

brojSportova.textContent = sportovi.length;

function sacuvajFavorite() {
    localStorage.setItem("favoriti", JSON.stringify(favoriti));
}

function azurirajBrojFavorita() {
    brojFavorita.textContent = favoriti.length;
}

function prikaziKartice(listaSportasa) {
    kartice.innerHTML = "";
    brojRezultata.textContent = `Prikazano sportaša: ${listaSportasa.length}`;

    if (listaSportasa.length === 0) {
        kartice.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    Nema pronađenih sportaša za odabranu pretragu ili filter.
                </div>
            </div>
        `;
        return;
    }

    listaSportasa.forEach(function (sportas) {
        const jeFavorit = favoriti.includes(sportas.ime);

        kartice.innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card sport-card">
                    <img src="${sportas.slika}" alt="${sportas.ime}">

                    <div class="card-body">
                        <span class="sport-tag">${sportas.sport}</span>

                        <h3>${sportas.ime}</h3>

                        <p class="info-line">
                            <strong>Država:</strong> ${sportas.drzava}
                        </p>

                        <p class="info-line">
                            <strong>Godina rođenja:</strong> ${sportas.godina}
                        </p>

                        <div class="card-actions">
                            <button class="btn btn-primary" onclick="prikaziDetalje('${sportas.ime}')">
                                Detalji
                            </button>

                            <button class="btn btn-outline-dark" onclick="otvoriModal('${sportas.ime}')" data-bs-toggle="modal" data-bs-target="#sportasModal">
                                Modal
                            </button>
                        </div>

                        <button class="btn ${jeFavorit ? "btn-warning" : "btn-outline-warning"} favorite-btn" onclick="toggleFavorit('${sportas.ime}')">
                            ${jeFavorit ? "Ukloni iz favorita" : "Dodaj u favorite"}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function prikaziDetalje(ime) {
    const sportas = sportasi.find(function (item) {
        return item.ime === ime;
    });

    trenutniSportas = sportas;

    detaljiIme.textContent = sportas.ime;
    detaljiSport.textContent = sportas.sport;
    detaljiOpis.textContent = sportas.opis;
    detaljiDrzava.textContent = sportas.drzava;
    detaljiGodina.textContent = sportas.godina;
    detaljiUspjeh.textContent = sportas.uspjeh;

    detaljiSlika.src = sportas.slika;
    detaljiSlika.alt = sportas.ime;

    document.getElementById("detaljiSekcija").scrollIntoView({
        behavior: "smooth"
    });
}

function otvoriModal(ime) {
    const sportas = sportasi.find(function (item) {
        return item.ime === ime;
    });

    modalIme.textContent = sportas.ime;
    modalSlika.src = sportas.slika;
    modalSlika.alt = sportas.ime;
    modalOpis.textContent = sportas.opis;
    modalSport.textContent = sportas.sport;
    modalDrzava.textContent = sportas.drzava;
    modalUspjeh.textContent = sportas.uspjeh;
}

function filtrirajSportase() {
    const tekstPretrage = pretraga.value.toLowerCase();

    let filtriraniSportasi = sportasi.filter(function (sportas) {
        const odgovaraPretrazi = sportas.ime.toLowerCase().includes(tekstPretrage);
        const odgovaraSportu = aktivniSport === "Svi" || sportas.sport === aktivniSport;

        return odgovaraPretrazi && odgovaraSportu;
    });

    const tipSortiranja = sortiranje.value;

    if (tipSortiranja === "imeAZ") {
        filtriraniSportasi.sort(function (a, b) {
            return a.ime.localeCompare(b.ime);
        });
    }

    if (tipSortiranja === "imeZA") {
        filtriraniSportasi.sort(function (a, b) {
            return b.ime.localeCompare(a.ime);
        });
    }

    if (tipSortiranja === "godinaStariji") {
        filtriraniSportasi.sort(function (a, b) {
            return a.godina - b.godina;
        });
    }

    if (tipSortiranja === "godinaMladji") {
        filtriraniSportasi.sort(function (a, b) {
            return b.godina - a.godina;
        });
    }

    prikaziKartice(filtriraniSportasi);
}

function toggleFavorit(ime) {
    if (favoriti.includes(ime)) {
        favoriti = favoriti.filter(function (item) {
            return item !== ime;
        });
    } else {
        favoriti.push(ime);
    }

    sacuvajFavorite();
    azurirajBrojFavorita();
    prikaziFavorite();
    filtrirajSportase();
}

function prikaziFavorite() {
    favoritiLista.innerHTML = "";

    if (favoriti.length === 0) {
        favoritiLista.innerHTML = `<p class="text-muted mb-0">Još nema omiljenih sportaša.</p>`;
        return;
    }

    favoriti.forEach(function (ime) {
        const sportas = sportasi.find(function (item) {
            return item.ime === ime;
        });

        favoritiLista.innerHTML += `
            <div class="favorite-item">
                <img src="${sportas.slika}" alt="${sportas.ime}">

                <div>
                    <h5>${sportas.ime}</h5>
                    <p>${sportas.sport} | ${sportas.drzava}</p>
                </div>

                <button class="btn btn-sm btn-outline-danger ms-auto" onclick="toggleFavorit('${sportas.ime}')">
                    Ukloni
                </button>
            </div>
        `;
    });
}

function popuniSelecteZaPoredjenje() {
    prviSportas.innerHTML = "";
    drugiSportas.innerHTML = "";

    sportasi.forEach(function (sportas) {
        prviSportas.innerHTML += `<option value="${sportas.ime}">${sportas.ime}</option>`;
        drugiSportas.innerHTML += `<option value="${sportas.ime}">${sportas.ime}</option>`;
    });

    drugiSportas.selectedIndex = 1;
}

function uporediSportase() {
    const prvi = sportasi.find(function (sportas) {
        return sportas.ime === prviSportas.value;
    });

    const drugi = sportasi.find(function (sportas) {
        return sportas.ime === drugiSportas.value;
    });

    if (prvi.ime === drugi.ime) {
        compareResult.innerHTML = `
            <div class="alert alert-warning">
                Izaberi dva različita sportaša za poređenje.
            </div>
        `;
        return;
    }

    compareResult.innerHTML = `
        <table class="compare-table">
            <tr>
                <th>Podatak</th>
                <th>${prvi.ime}</th>
                <th>${drugi.ime}</th>
            </tr>

            <tr>
                <td>Sport</td>
                <td>${prvi.sport}</td>
                <td>${drugi.sport}</td>
            </tr>

            <tr>
                <td>Država</td>
                <td>${prvi.drzava}</td>
                <td>${drugi.drzava}</td>
            </tr>

            <tr>
                <td>Godina rođenja</td>
                <td>${prvi.godina}</td>
                <td>${drugi.godina}</td>
            </tr>

            <tr>
                <td>Najveći uspjeh</td>
                <td>${prvi.uspjeh}</td>
                <td>${drugi.uspjeh}</td>
            </tr>
        </table>
    `;
}

function resetujFiltere() {
    pretraga.value = "";
    sortiranje.value = "default";
    aktivniSport = "Svi";

    filterDugmad.forEach(function (btn) {
        btn.classList.remove("active");
    });

    filterDugmad[0].classList.add("active");

    prikaziKartice(sportasi);
}

function prikaziRandomSportasa() {
    const randomIndex = Math.floor(Math.random() * sportasi.length);
    const sportas = sportasi[randomIndex];

    prikaziDetalje(sportas.ime);
}

function promijeniTemu() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "Light mode";
        localStorage.setItem("tema", "dark");
    } else {
        themeBtn.textContent = "Dark mode";
        localStorage.setItem("tema", "light");
    }
}

function ucitajTemu() {
    const tema = localStorage.getItem("tema");

    if (tema === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "Light mode";
    }
}

pretraga.addEventListener("input", filtrirajSportase);
sortiranje.addEventListener("change", filtrirajSportase);
resetBtn.addEventListener("click", resetujFiltere);
randomBtn.addEventListener("click", prikaziRandomSportasa);
compareBtn.addEventListener("click", uporediSportase);
themeBtn.addEventListener("click", promijeniTemu);

filterDugmad.forEach(function (dugme) {
    dugme.addEventListener("click", function () {
        filterDugmad.forEach(function (btn) {
            btn.classList.remove("active");
        });

        dugme.classList.add("active");
        aktivniSport = dugme.getAttribute("data-sport");

        filtrirajSportase();
    });
});

document.getElementById("modalDugme").addEventListener("click", function () {
    otvoriModal(trenutniSportas.ime);
});

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

ucitajTemu();
popuniSelecteZaPoredjenje();
prikaziKartice(sportasi);
prikaziDetalje("Cristiano Ronaldo");
prikaziFavorite();
azurirajBrojFavorita();