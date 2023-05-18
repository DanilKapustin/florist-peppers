// time wrapper

function timeWrapper() {
  const timeElement = document.querySelector(".time");
  const mainBlock = document.querySelector(".wrapper_worker");
  const countBlock = document.querySelector(".wrapper_count");

  const result_FinalPage = document.querySelector(".result");
  const infoLeft_FinalPage = document.querySelector(".info_left");
  const infoRight_FinalPage = document.querySelector(".info_right");
  const percent_FinalPage = document.querySelector(".percent");
  const neuron_FinalPage = document.querySelector(".neuron");
  let TF = document.querySelector("#helper_ok");
  let FT = document.querySelector("#helper_no");

  let count = 0;
  let trueColorResult = 0;
  let trueColorScore = 0;
  let isLastStep = false

  let timeDefault = 59;

  timeElement.textContent = timeDefault;

  function removeHelper() {
    TF = document.querySelector("#helper_ok");
    FT = document.querySelector("#helper_no");
    TF.classList.remove('helper');
    FT.classList.remove('helper');
  }

  function checkLastStep(){
    if(timeDefault === 0){
      isLastStep = true;
      timeCount()
    }
  }

  function timeCount() {
    if (timeDefault !== 0) timeDefault -= 1;
    
    if (timeDefault < 10)
      timeElement.textContent = '0'+ timeDefault;  
    else
      timeElement.textContent = timeDefault;  

    removeHelper()

    if (timeDefault == 0 && isLastStep) {
      mainBlock.style.display = "none";
      countBlock.style.display = "inline-block";

      result_FinalPage.textContent = count;
      neuron_FinalPage.textContent = count / 25 + trueColorResult;
      infoLeft_FinalPage.textContent = trueColorResult;
      infoRight_FinalPage.textContent = trueColorScore;

      let percentResult = Math.round((trueColorResult / trueColorScore) * 100);

      if (isNaN(percentResult)) {
        percent_FinalPage.textContent = 0;
      } else {
        percent_FinalPage.textContent = percentResult;
      }
    }
  }

  //  wrapper for random color

  function mainWrapper() {
    const color = document.querySelectorAll(".color");
    const btn_right = document.querySelector(".btn_right");
    const btn_left = document.querySelector(".btn_left");

    let countHTML = document.querySelector(".count");

    const colorsArr = ["Зелёный", "Красный", "Черный", "Синий"];
    const colorsCss = ["green", "red", "black", "blue"];

    // create random color

    function colorRandom() {
      let trueColor = [];

      function colorRandomFor() {
        for (let i = 0; i < color.length; i++) {
          let randomColor = Math.floor(Math.random() * colorsArr.length);
          color[i].textContent = colorsArr[randomColor];
          let randomCss = Math.floor(Math.random() * colorsCss.length);
          color[i].style.color = colorsCss[randomCss];

          if (i === 0) {
            trueColor[0] = randomColor;
          }
          if (i === 1) {
            trueColor[1] = randomCss;
          }
        }
      }

      colorRandomFor();

      // click to btn

      btn_left.onclick = () => {
        clickCountLeft();
        colorRandomFor();
      };
      btn_right.onclick = () => {
        clickCountRight();
        colorRandomFor();
      };

      // count

      function clickCountLeft() {
        trueColorScore += 1;
        removeHelper() //help remove class helper from ok & no

        if (trueColor[0] !== trueColor[1]) {
          trueColorResult += 1;
          count += 100;
          countHTML.textContent = count;
          TF.classList.add('helper');
        } else {
          if (count <= 400) {
            count = 0;
          } else {
            count += -400;
          }
          countHTML.textContent = count;
          FT.classList.add('helper');
        }        
        
        checkLastStep() //check last iteration
        
      }

      function clickCountRight() {
        trueColorScore += 1;
        removeHelper() //help remove class helper from ok & no

        if (trueColor[0] === trueColor[1]) {
          TF.classList.add('helper');
          trueColorResult += 1;
          count += 100;
          countHTML.textContent = count;
        } else {
          if (count <= 400) {
            count = 0;
          } else {
            count += -400;
          }
          countHTML.textContent = count;
          FT.classList.add('helper');
        }

        checkLastStep() //check last iteration

      }

      // event arrow

      document.onkeydown = checkKey;

      function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == "37") {
          // left btn
          clickCountLeft();
          colorRandomFor();
        } else if (e.keyCode == "39") {
          // right btn
          clickCountRight();
          colorRandomFor();
        }
      }
    }

    colorRandom();
  }

  for (let i = 0; i <= timeDefault; i++) {

    if(i != 0) setTimeout(timeCount, i * 1000);

  }

  mainWrapper();
}


//start wrapper
function startProgram(){
  const mainBlock = document.querySelector(".wrapper_worker");
  const startBlock = document.querySelector(".wrapper_start");
  startBlock.style.display = "none";
  mainBlock.style.display = "inline-block";
  

  timeWrapper();
}

function restartProgram(){
  const startBlock = document.querySelector(".wrapper_start");
  const countBlock = document.querySelector(".wrapper_count");

  countBlock.style.display = "none";
  startBlock.style.display = "inline-block";

}


