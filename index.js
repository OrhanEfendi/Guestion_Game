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

class QuestionGame {
  points = 0;
  nextQindex = -1;
  currentQuestion = [];
  qData = [];

  constructor(data) {
    this.qData = data;
  }

  nextQuestion() {
    if (this.nextQindex == this.qData.length - 1) {
      console.log("Oyun Bitdi");
    } else {
      this.nextQindex += 1;
      const questionItem = this.qData[this.nextQindex];
      this.currentQuestion = questionItem;
      return questionItem;
    }
  }
}

const Mygame = new QuestionGame(questions);

const qTitle = document.querySelector("#qTitle");
const btnGroup = document.querySelector("#btnGroup");
const progresLine = document.querySelector("#progresLine");
const point = document.querySelector("#point");
function StartGame() {
  Mygame.nextQuestion();
  qTitle.innerHTML = Mygame.currentQuestion.question;
  btnGroup.innerHTML = Mygame.currentQuestion.variants.map(
    (item) =>
      `<button class="btn btn-outline-light" value='${item}'  onclick="selectItem('${item}')">${item}</button>`
  );
}

StartGame();
function selectItem(userChoose) {
  console.log(Mygame.currentQuestion);
  console.log(userChoose);

  if (userChoose == Mygame.currentQuestion.trueanswers) {
    console.log("duz tapdi");
    Mygame.points += 10;
    point.innerHTML = Mygame.points;
  } else {
    console.log("sehf tapdi");
  }
  progresLine.style.width = `${(Mygame.nextQindex + 1) * 10}%`;
  btnGroup.addEventListener("click", function (e) {
    const clickedElement = e.target;

    // Eğer tıklanan öğe bir button ise işlem yap
    if (clickedElement.tagName === "BUTTON") {
      if (clickedElement.value == Mygame.currentQuestion.trueanswers) {
        const buttonValue = clickedElement.value;
        console.log(buttonValue);
        clickedElement.style.background = "green";
        setTimeout(() => {
          // Bekleme süresi bittikten sonra arka plan rengini temizle ve bir sonraki soruya geç
          clickedElement.style.background = "";
          StartGame();
        }, 200);
      } else {
        clickedElement.style.background = "red";
        setTimeout(() => {
          // Bekleme süresi bittikten sonra arka plan rengini temizle ve bir sonraki soruya geç
          clickedElement.style.background = "";
          StartGame();
        }, 200);
      }
    }
  });
}
