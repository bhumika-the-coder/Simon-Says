let gameSeq = [];
let userSeq = [];

let highScore = 0;
let started = false ;
let level = 0;

let btns = ["yellow","red","purple","green"];

let h2 = document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(!started){
        console.log("Game is started!");
        started = true;

        levelUP();
    }
});

function gameFlash(btn){
    console.log("btn-added");
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },150);
}

function userFlash(btn){
    btn.classList.add("user-flash");
    setTimeout(function(){
        btn.classList.remove("user-flash");
    },150);
}

function levelUP(){
    console.log("level upp");
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let ranIdx = Math.floor(Math.random()*btns.length);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    //adding seq to gameSeq
    gameSeq.push(ranColor);
    console.log(gameSeq);
    gameFlash(ranBtn);
}

function checkAns(idx){
    console.log(`level${level}`);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            if(highScore === 0  || highScore<level){
                highScore=level;
            }
            setTimeout(levelUP,1000);
        }
    }
    else{
        h2.innerHTML = `Game Over! Your Score was <b> ${level}</b> <br>Press <i>"Enter"</i>  key to start. HighScore is ${highScore}`;
        document.querySelector("body").style.backgroundColor  = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150)
       reset();
    }
}

function btnPress(){
    // if(!started) return;
    let btn = this;
    userFlash(btn);

    let userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
    
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
