/* Šis failas valdo dinaminę 10-ies klausimų kosmoso viktoriną */

// Klausimų masyvas (Array of objects)
const questions = [
  {
    question: "1. Kokia yra didžiausia saulės sistemos planeta?",
    answers: ["Marsas", "Žemė", "Jupiteris", "Saturnas"],
    correct: 2, // Teisingo atsakymo indeksas (pradedant nuo 0: 2 yra "Jupiteris")
  },
  {
    question: "2. Kuri planeta yra arčiausiai Saulės?",
    answers: ["Venera", "Merkurijus", "Žemė", "Marsas"],
    correct: 1,
  },
  {
    question: "3. Kokia planeta vadinama „Raudonąja planeta“?",
    answers: ["Marsas", "Jupiteris", "Uranas", "Neptūnas"],
    correct: 0,
  },
  {
    question: "4. Kuri planeta turi įspūdingiausią žiedų sistemą?",
    answers: ["Uranas", "Jupiteris", "Neptūnas", "Saturnas"],
    correct: 3,
  },
  {
    question: "5. Kokia yra karščiausia saulės sistemos planeta?",
    answers: ["Merkurijus", "Venera", "Marsas", "Jupiteris"],
    correct: 1,
  },
  {
    question: "6. Kokia planeta sukasi aplink Saulę „gulėdama“ ant šono?",
    answers: ["Saturnas", "Neptūnas", "Uranas", "Venera"],
    correct: 2,
  },
  {
    question: "7. Kiek gamtinių palydovų (mėnulių) turi Žemė?",
    answers: ["Vieną", "Du", "Nė vieno", "Tris"],
    correct: 0,
  },
  {
    question: "8. Kaip vadinasi mūsų galaktika?",
    answers: [
      "Andromedos ūkas",
      "Paukščių Takas",
      "Trikampio galaktika",
      "Sūkurio galaktika",
    ],
    correct: 1,
  },
  {
    question: "9. Kokia yra tolimiausia nuo Saulės esanti planeta?",
    answers: ["Uranas", "Plutonas", "Neptūnas", "Saturnas"],
    correct: 2,
  },
  {
    question: "10. Iš kokių dujų daugiausia sudaryta Saulė?",
    answers: [
      "Deguonies ir azoto",
      "Vandenilio ir helio",
      "Anglies dioksido",
      "Metano",
    ],
    correct: 1,
  },
];

// Pagrindiniai kintamieji
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// HTML elementų paėmimas
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const nextBtn = document.getElementById("next-btn");
const resultMessage = document.getElementById("quiz-result");
const restartBtn = document.getElementById("restart-btn");
const quizBox = document.getElementById("quiz-box");

/* Funkcija, kuri užkrauna klausimą ir sukuria mygtukus */
function loadQuestion() {
  answered = false;
  nextBtn.classList.add("d-none"); // Paslepiame "Kitas klausimas" mygtuką
  resultMessage.classList.add("d-none"); // Paslepiame rezultatų žinutę

  // Paimame dabartinį klausimą
  let currentQ = questions[currentQuestionIndex];
  questionText.innerText = currentQ.question;
  answersContainer.innerHTML = ""; // Išvalome senus mygtukus

  // Generuojame naujus mygtukus iš masyvo
  currentQ.answers.forEach((answer, index) => {
    let btn = document.createElement("button");
    btn.className = "btn btn-outline-light w-100 quiz-btn mb-2";
    btn.innerText = answer;
    // Priskiriame įvykį mygtukui
    btn.onclick = () => checkAnswer(index, btn, currentQ.correct);
    answersContainer.appendChild(btn);
  });
}

/* Funkcija, kuri tikrina vartotojo atsakymą */
function checkAnswer(selectedIndex, buttonElement, correctIndex) {
  if (answered) return; // Neleidžiame spaudinėti kelis kartus
  answered = true;

  let buttons = answersContainer.children;

  // Tikriname, ar pataikė
  if (selectedIndex === correctIndex) {
    score++;
    buttonElement.classList.replace("btn-outline-light", "btn-success");
    resultMessage.innerHTML = "Teisingai! 🚀";
    resultMessage.className = "alert alert-success mt-3";
  } else {
    buttonElement.classList.replace("btn-outline-light", "btn-danger");
    // Parodome, kuris atsakymas iš tikrųjų buvo teisingas
    buttons[correctIndex].classList.replace("btn-outline-light", "btn-success");
    resultMessage.innerHTML = "Neteisingai! ☄️";
    resultMessage.className = "alert alert-danger mt-3";
  }

  resultMessage.classList.remove("d-none"); // Parodome žinutę

  // Išjungiame visus mygtukus (disabled)
  for (let btn of buttons) {
    btn.disabled = true;
  }

  // Jei tai paskutinis klausimas, rodome "Baigti", kitaip "Kitas"
  if (currentQuestionIndex < questions.length - 1) {
    nextBtn.classList.remove("d-none");
  } else {
    showFinalResult();
  }
}

/* Funkcija, kuri pereina prie kito klausimo */
function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

/* Funkcija, kuri parodo galutinį rezultatą (Sumą) */
function showFinalResult() {
  // Paslepiame patį klausimų bloką
  quizBox.classList.add("d-none");

  // Parodome gražią lentelę su galutiniais taškais
  resultMessage.className = "alert alert-info mt-4";
  resultMessage.innerHTML = `
        <h3 class="mb-3">Viktorina baigta!</h3>
        <p style="font-size: 20px;">Tavo rezultatas:</p>
        <h1 class="font-weight-bold" style="color: #6c5ce7;">${score} iš ${questions.length}</h1>
        <p class="mt-3">Ačiū, kad dalyvavai!</p>
    `;
  resultMessage.classList.remove("d-none");
  restartBtn.classList.remove("d-none"); // Parodome mygtuką "Bandyti dar kartą"
}

/* Funkcija, kuri atstato viktoriną nuo nulio */
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizBox.classList.remove("d-none");
  restartBtn.classList.add("d-none");
  loadQuestion();
}

// Užkrauname patį pirmą klausimą kai tik atidaromas puslapis
window.onload = loadQuestion;

/* --- GALERIJOS MODALINIO LANGO KODAS --- */

// Pilnas objektas su informacija apie visas 8 planetas
const planetsData = {
  Merkurijus:
    "Merkurijus yra mažiausia Saulės sistemos planeta и esanti arčiausiai Saulės. Ji neturi atmosferos, todėl temperatūra svyruoja nuo ekstremalaus karščio dieną iki didelio šalčio naktį.",
  Venera:
    "Venera yra karščiausia planeta dėl savo tankios atmosferos, kuri sulaiko šilumą (šiltnamio efektas). Ji sukasi priešinga kryptimi nei dauguma kitų planetų.",
  Žemė: "Mūsų gimtoji planeta yra vienintelė žinoma vieta visatoje, kurioje egzistuoja gyvybė. 71% jos paviršiaus dengia vanduo, o atmosfera apsaugo mus nuo kenksmingos spinduliuotės.",
  Marsas:
    "Marsas dažnai vadinamas „Raudonąja planeta“ dėl geležies oksido jo paviršiuje. Čia stūkso Olimpo kalnas – aukščiausias užgesęs ugnikalnis visoje Saulės sistemoje.",
  Jupiteris:
    "Didžiausia planeta, kurios masė viršija visų kitų planetų bendrą masę. Jupiteris neturi kieto paviršiaus и pasižymi milžiniškomis audromis, kaip Didžioji raudonoji dėmė.",
  Saturnas:
    "Dujų milžinas, garsėjantis savo ryškiais žiedais, sudarytais iš ledo gabalėlių и dulkių. Saturnas yra toks lengvas, kad teoriškai galėtų plūduriuoti vandenyje.",
  Uranas:
    "Ledinė milžinė, turinti unikalią sukimosi ašį – ji skrieja aplink Saulę tarsi „gulėdama“ ant šono. Jos melsvą spalvą lemia atmosferoje esantis metanas.",
  Neptūnas:
    "Tolimiausia Saulės sistemos planeta, kurioje pučia patys stipriausi vėjai, pasiekiantys net 2000 km/val. greitį. Tai tamsi, šalta и vėjuota ledinė milžinė.",
};

/* Funkcija, kuri atidaro modalinį langą su atitinkama informacija */
function showInfo(planetName) {
  const modal = document.getElementById("info-modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");

  // Įstatome duomenis į langą
  title.innerText = planetName;
  text.innerText = planetsData[planetName]; // Paima tekstą iš objekto viršuje

  // Parodome langą (nuimame 'd-none' klasę ir uždedame 'd-flex')
  modal.classList.remove("d-none");
  modal.classList.add("d-flex");
}

/* Funkcija, kuri uždaro modalinį langą */
function closeInfo() {
  const modal = document.getElementById("info-modal");
  modal.classList.remove("d-flex");
  modal.classList.add("d-none");
}
