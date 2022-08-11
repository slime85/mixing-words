const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const $en = document.querySelector("#en");
const $ko = document.querySelector("#ko");
const $add = document.querySelector("#add");
const $mix = document.querySelector("#mix");
const $reset = document.querySelector("#reset");
const $download = document.querySelector("#download");
const $list = document.querySelector("#list-tbody");
const $output = document.querySelector("#output-tbody");
const $count = document.querySelector("#output-count");
const $enToKo = document.querySelector("#en-to-ko");
let wordsList = localStorage.getItem("wordsList") == null ? [] : JSON.parse(localStorage.getItem("wordsList"));
let shift = false;

const koToEn = (key) => {
  let result = key;

  switch(key) {
    case "ㄱ" : result = "r"; break;
    case "ㄲ" : result = "r"; break;
    case "ㄴ" : result = "s"; break;
    case "ㄷ" : result = "e"; break;
    case "ㄸ" : result = "e"; break;
    case "ㄹ" : result = "f"; break;
    case "ㅁ" : result = "a"; break;
    case "ㅂ" : result = "q"; break;
    case "ㅃ" : result = "q"; break;
    case "ㅅ" : result = "t"; break;
    case "ㅆ" : result = "t"; break;
    case "ㅇ" : result = "d"; break;
    case "ㅈ" : result = "w"; break;
    case "ㅉ" : result = "w"; break;
    case "ㅊ" : result = "c"; break;
    case "ㅋ" : result = "z"; break;
    case "ㅌ" : result = "x"; break;
    case "ㅍ" : result = "v"; break;
    case "ㅎ" : result = "g"; break;
    case "ㅏ" : result = "k"; break;
    case "ㅑ" : result = "i"; break;
    case "ㅓ" : result = "j"; break;
    case "ㅕ" : result = "u"; break;
    case "ㅗ" : result = "h"; break;
    case "ㅛ" : result = "y"; break;
    case "ㅜ" : result = "n"; break;
    case "ㅠ" : result = "b"; break;
    case "ㅡ" : result = "m"; break;
    case "ㅣ" : result = "l"; break;
    case "ㅐ" : result = "o"; break;
    case "ㅒ" : result = "o"; break;
    case "ㅔ" : result = "p"; break;
    case "ㅖ" : result = "p"; break;
  }

  // if(shift) result = result.toUpperCase();

  return result;
}

const reloadList = e => {
  const removeList = $list.querySelectorAll("tr");

  localStorage.setItem("wordsList", JSON.stringify(wordsList));

  removeList.forEach(el => el.remove());

  for(let i = 0; i < wordsList.length; i += 2) {
    const tr = document.createElement("tr");
    const no1 = document.createElement("td");
    const en1 = document.createElement("td");
    const ko1 = document.createElement("td");
    const rm1 = document.createElement("td");
    const rmBtn1 = document.createElement("input");
    const no2 = document.createElement("td");
    const en2 = document.createElement("td");
    const ko2 = document.createElement("td");
    const rm2 = document.createElement("td");
    const rmBtn2 = document.createElement("input");
  
    no1.innerText = i + 1;
    en1.innerText = wordsList[i].en;
    ko1.innerText = wordsList[i].ko;
    rm1.append(rmBtn1);

    rmBtn1.addEventListener("click", e => {
      wordsList.splice(i, 1);

      reloadList();
    })
    
    if(i < wordsList.length - 1) {
      no2.innerText = i + 2;
      en2.innerText = wordsList[i + 1].en;
      ko2.innerText = wordsList[i + 1].ko;
      rm2.append(rmBtn2);
      
      rmBtn2.addEventListener("click", e => {
        wordsList.splice(i + 1, 1);

        reloadList();
      })
    } 
  
    rmBtn1.type = rmBtn2.type = "button";
    rmBtn1.value = rmBtn2.value = "삭제"
  
    no1.classList.add("num");
    no2.classList.add("num");

    tr.append(no1);
    tr.append(en1);
    tr.append(ko1);
    tr.append(rm1);
    tr.append(no2);
    tr.append(en2);
    tr.append(ko2);
    tr.append(rm2);

    $list.append(tr);
  }
}

const addWord = e => {
  const result = {ko: "", en: ""};

  result.ko = $ko.value;
  if($en.value.match(/[ㄱ-ㅎ]|[ㅏ-ㅣ]|[가-힣]/g)) {
    result.en = $enToKo.innerText;
  }else {
    result.en = $en.value;
  }

  $ko.value = $en.value = "";
  $enToKo.innerText = "";

  wordsList.push(result);
  
  $en.focus();

  reloadList();
}

const init = e => {
  canvas.width = 2480;
  canvas.height = 3508;

  reloadList();
}

init();


$add.addEventListener("click", addWord);
document.addEventListener("keydown", e => {
  if(e.key == "Enter") {
    addWord();
  }
})

$reset.addEventListener("click", e => {
  if(confirm("모든 단어를 삭제하시겠습니까?")) {
    wordsList.length = 0;

    reloadList();
  }
})

$mix.addEventListener("click", e => {
  const mixed = wordsList.sort(e => Math.random() - 0.5);
  const removeList = $output.querySelectorAll("tr");

  removeList.forEach(el => el.remove());

  $count.innerHTML = " " + wordsList.length;

  ctx.font = "bold 70px NotoSans";
  ctx.textBaseline = "middle";
  
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 2480, 3508);

  ctx.fillStyle = "#333";
  ctx.strokeStyle = "#333";

  ctx.textAlign = "start";
  ctx.fillText(`<DAY        >`, 300, 400);
  ctx.textAlign = "center";
  ctx.fillText(`(        / ${wordsList.length})`, 1240, 400);
  ctx.textAlign = "end";
  ctx.fillText(`(        /        )`, 2180, 400);

  ctx.strokeRect(300, 550, 440, 100);
  ctx.strokeRect(740, 550, 440, 100);
  ctx.strokeRect(1300, 550, 440, 100);
  ctx.strokeRect(1740, 550, 440, 100);
  
  ctx.font = "bold 50px NotoSans";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  
  ctx.fillText(`ENGLISH`, 520, 600);
  ctx.fillText(`뜻`, 960, 600);
  ctx.fillText(`ENGLISH`, 1520, 600);
  ctx.fillText(`뜻`, 1960, 600);

  let height = Math.floor(2600 / (mixed.length / 2));

  if(height > 100) height = 100;

  for(let i = 0; i < mixed.length; i += 2) {
    const tr = document.createElement("tr");
    const en1 = document.createElement("td");
    const ko1 = document.createElement("td");
    const none = document.createElement("td");
    const en2 = document.createElement("td");
    const ko2 = document.createElement("td");
    let type = Math.random();

    ctx.strokeRect(300, 650 + (Math.ceil(height / 2) * i), 440, height);
    ctx.strokeRect(740, 650 + (Math.ceil(height / 2) * i), 440, height);
    ctx.strokeRect(1300, 650 + (Math.ceil(height / 2) * i), 440, height);
    ctx.strokeRect(1740, 650 + (Math.ceil(height / 2) * i), 440, height);

    if(type < 0.27) type = false;
    else if(type < 0.5) type = true;
    else if(type < 0.77) type = false;
    else type = true;
  
    let next = false;
    let fontSize = 45;
    while(!next) {
      ctx.font = `${fontSize}px NotoSans`;
      fontSize--;
      if(type) {
        en1.innerText = mixed[i].en;
        if(ctx.measureText(mixed[i].en).width <= 400) {
          next = true;
          ctx.fillText(mixed[i].en, 520, 650 + (Math.ceil(height / 2)) + (Math.ceil(height / 2) * i));
        }
      } else {
        ko1.innerText = mixed[i].ko;
        if(ctx.measureText(mixed[i].ko).width <= 400) {
          next = true;
          ctx.fillText(mixed[i].ko, 960, 650 + (Math.ceil(height / 2)) + (Math.ceil(height / 2) * i));
        }
      }
    }
    
    if(i < mixed.length - 1) {
      let type2 = Math.random();
      
      if(type2 < 0.27) type2 = false;
      else if(type2 < 0.5) type2 = true;
      else if(type2 < 0.77) type2 = false;
      else type2 = true;
      
      let next = false;
      let fontSize = 45;
      while(!next) {
        ctx.font = `${fontSize}px NotoSans`;
        fontSize--;
        if(type2) {
          en2.innerText = mixed[i + 1].en;
          if(ctx.measureText(mixed[i + 1].en).width <= 400) {
            next = true;
            ctx.fillText(mixed[i + 1].en, 1520, 650 + (Math.ceil(height / 2)) + (Math.ceil(height / 2) * i));
          }
        } else {
          ko2.innerText = mixed[i + 1].ko;
          if(ctx.measureText(mixed[i + 1].ko).width <= 400) {
            next = true;
            ctx.fillText(mixed[i + 1].ko, 1960, 650 + (Math.ceil(height / 2)) + (Math.ceil(height / 2) * i));
          }
        }
      }
    } 

    tr.append(en1);
    tr.append(ko1);
    tr.append(none);
    tr.append(en2);
    tr.append(ko2);

    $output.append(tr);
  }
})

$en.addEventListener("input", e => {
  let words = $en.value.split("");
  let result = [];

  console.log(words);
  for(let i = 0; i < words.length; i++) {
    let key = words[i];

    if(key.match(/[ㄱ-ㅎ]|[ㅏ-ㅣ]/g)) {
      result = result.concat(koToEn(key));
    }else if(key.match(/[가-힣]/g)) {
      let ko = cho(key);

      for(let j = 0; j < ko.length; j++) {
        ko[j] = koToEn(ko[j])
      }

      result = result.concat(ko);
    }else {
      result.push(key);
    }
  }

  console.log(result);

  result = result.join("");

  console.log(result);

  $enToKo.innerText = result;
})

$en.addEventListener("blur", e => {
  $en.value = $enToKo.innerText;
  $enToKo.innerText = "";
})

document.addEventListener("keydown", e => {
  if(e.key === "Shift") {
    shift = true;
  }
})

document.addEventListener("keyup", e => {
  if(e.key === "Shift") {
    shift = false;
  }
})

document.addEventListener("blur", e => {
  shift = false;
})