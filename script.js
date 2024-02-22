let head = document.querySelector("h2");

const emojis = ["❤️", "❤️", "😍", "😍", "😂", "😂", "🤗", "🤗", "😎", "😎", "🤡", "🤡", "🍨", "🍨", "😡", "😡"];

var score = 0;
var seconds = 0,
  minutes = 0;
var time;
var timerInterval;

function startTimer() {
  timerInterval = setInterval(function () {
    seconds += 1;

    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    }

    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;


    time = document.querySelector('.time').innerHTML = "Time: " + minutesValue + ":" + secondsValue;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function removeEmojisAndBoxes() {
  let gameContainer = document.querySelector('.game');
  gameContainer.innerHTML = '';
  let score = document.querySelector(".score");
  score.innerHTML = '';
  let time = document.querySelector(".time");
  time.innerHTML = '';
  let reset = document.querySelector(".reset");
  reset.innerHTML = '';
}

var shuf_emojis = emojis.sort(() => (Math.random() > .5) ? 2 : -1);
for (var i = 0; i < emojis.length; i++) {
  let box = document.createElement('div')
  box.className = 'item';
  box.innerHTML = shuf_emojis[i];

  box.onclick = function () {
    this.classList.add('boxOpen');
    setTimeout(function () {
      if (document.querySelectorAll(".boxOpen").length > 1) {
        if (document.querySelectorAll(".boxOpen")[0].innerHTML ==
          document.querySelectorAll(".boxOpen")[1].innerHTML) {
          document.querySelectorAll(".boxOpen")[0].classList.add("boxMatch")
          document.querySelectorAll(".boxOpen")[1].classList.add("boxMatch")

          score += 15;
          document.querySelector('.score').innerText = score;

          document.querySelectorAll(".boxOpen")[1].classList.remove("boxOpen")
          document.querySelectorAll(".boxOpen")[0].classList.remove("boxOpen")

          if (document.querySelectorAll(".boxMatch").length == emojis.length) {
            stopTimer();
            showWinner();
            removeEmojisAndBoxes();
          }
        }
        else {
          document.querySelectorAll(".boxOpen")[1].classList.remove("boxOpen")
          document.querySelectorAll(".boxOpen")[0].classList.remove("boxOpen")

          score -= 5;
          document.querySelector('.score').innerText = score;
        }
      }
    }, 500)
  }

  document.querySelector('.game').appendChild(box);
}

function showWinner() {
  winning_call = document.createElement("p");
  winning_call.innerText = "You won! Score: " + score + "\n\n" + time + "s"
  head.append(winning_call);
}

startTimer();
