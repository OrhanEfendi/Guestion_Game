const qTitle = document.querySelector("#qTitle");
const btnGroup = document.querySelector("#btnGroup");
const progresLine = document.querySelector("#progresLine");
const point = document.querySelector("#point");
const title = document.querySelector("#title");
const questions = [
  {
    question:
      "JavaScript'te bir değişken tanımlamak için kullanılan anahtar kelime hangisidir?",
    variants: ["var", "let", "const"],
    trueanswers: "let",
  },
  {
    question: "Aşağıdaki veri tiplerinden hangisi sayıları temsil eder?",
    variants: ["String", "Number", "Boolean"],
    trueanswers: "Number",
  },
  {
    question:
      "Bir dizi içindeki elemanlara erişmek için kullanılan indeks başlangıcı nedir?",
    variants: ["1", "0", "-1"],
    trueanswers: "0",
  },
  {
    question:
      "Bir fonksiyonu bir değişkene atamak için kullanılan terim nedir?",
    variants: ["Invoke", "Call", "Assign"],
    trueanswers: "Assign",
  },
  {
    question:
      "Bir koşulun doğru olması durumunda çalışacak kod bloğunu belirtmek için kullanılan ifadenin adı nedir?",
    variants: ["Switch", "For", "If"],
    trueanswers: "If",
  },
  {
    question:
      "Bir HTML sayfasındaki bir öğenin CSS özelliklerini değiştirmek için kullanılan JavaScript yöntemi nedir?",
    variants: ["modifyStyle", "changeCSS", "style"],
    trueanswers: "style",
  },
  {
    question:
      "Bir dizedeki karakter sayısını bulmak için kullanılan method hangisidir?",
    variants: ["length()", "count()", "size()"],
    trueanswers: "length()",
  },
  {
    question:
      "Bir döngü içinde mevcut iterasyonun bir sonraki iterasyona atlanması için kullanılan ifade nedir?",
    variants: ["skip", "break", "continue"],
    trueanswers: "continue",
  },
  {
    question:
      "Bir sayının mutlak değerini bulmak için kullanılan fonksiyon hangisidir?",
    variants: ["abs()", "absolute()", "Math.abs()"],
    trueanswers: "Math.abs()",
  },
  {
    question:
      "Bir JavaScript dosyasını HTML sayfasına bağlamak için kullanılan etiket nedir?",
    variants: ["link", "script", "js"],
    trueanswers: "script",
  },
];

class Game {
  points = 0;
  nextQues = 0;
  qData = [];
  currentData = null;

  constructor(data) {
    this.qData = data;
  }

  nextQuestions() {
    if (this.nextQues >= this.qData.length) {
      this.restart();
    } else {
      const question = this.qData[this.nextQues];
      this.nextQues += 1;

      this.currentData = question;
      return question;
    }
  }

  restart() {
    this.nextQues = 0;
    this.points = 0;
    point.innerHTML = this.points;
    progresLine.style.width = "0%";
    this.currentData = null;
    this.startGame();
  }

  startGame() {
    let questions = this.nextQuestions();

    if (questions) {
      qTitle.innerHTML = questions.question;

      btnGroup.innerHTML = questions.variants
        .map(
          (item) =>
            `<button class="btn btn-outline-light" value='${item}'>${item}</button>`
        )
        .join("");
    } else {
      console.log("Oyun bitti");
    }
  }
}

const Mygame = new Game(questions);

Mygame.startGame();

function selectItem(e) {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  let button_tag = e.target;
  let correct_variant = Mygame.currentData.trueanswers;
  progresLine.style.width = `${(Mygame.nextQues + 1) * 10}%`;
  let correctButton = document.querySelector(
    `button[value="${correct_variant}"]`
  );

  if (button_tag.value == correct_variant) {
    Mygame.points += 10;
    point.innerHTML = Mygame.points;
    button_tag.style.backgroundColor = "green";
    title.style.backgroundColor = "green";
    setTimeout(() => {
      button_tag.style.background = "";
      title.style.backgroundColor = "rgb(243, 216, 66)";
      Mygame.startGame();
    }, 200);
  } else {
    button_tag.style.backgroundColor = "red";
    title.style.backgroundColor = "red";
    correctButton.style.backgroundColor = "green";
    setTimeout(() => {
      button_tag.style.background = "";
      correctButton.style.backgroundColor = "";
      title.style.backgroundColor = "rgb(243, 216, 66)";
      Mygame.startGame();
    }, 200);
  }
}

btnGroup.addEventListener("click", selectItem);
