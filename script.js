/*=========================================================
    DAD BIRTHDAY TRIBUTE
    SCRIPT.JS
    PART 1
=========================================================*/

"use strict";

/*=========================================================
ELEMENTS
=========================================================*/

const intro = document.getElementById("intro");
const app = document.getElementById("app");

const startBtn = document.getElementById("startBtn");

const slides = document.querySelectorAll(".slide");
const nextButtons = document.querySelectorAll(".next");

let currentSlide = 0;

let isAnimating = false;


/*=========================================================
INIT
=========================================================*/

window.addEventListener("load", () => {

    app.classList.add("hidden");

});


/*=========================================================
START JOURNEY
=========================================================*/

startBtn.addEventListener("click", startJourney);

function startJourney(){

    if(isAnimating) return;

    isAnimating = true;

    startBtn.disabled = true;

    intro.classList.add("hide");

    setTimeout(() => {

        intro.style.display = "none";

        app.classList.remove("hidden");

        app.classList.add("show");

        slides[0].classList.add("active");

        isAnimating = false;

    },1200);

}


/*=========================================================
NEXT BUTTONS
=========================================================*/

nextButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        nextSlide();

    });

});


/*=========================================================
SLIDE SYSTEM
=========================================================*/

function nextSlide(){

    if(isAnimating) return;

    if(currentSlide >= slides.length-1) return;

    isAnimating = true;

    const current = slides[currentSlide];

    current.classList.remove("active");

    current.style.pointerEvents="none";

    currentSlide++;

    setTimeout(()=>{

        const next = slides[currentSlide];

        next.classList.add("active");

        next.style.pointerEvents="auto";

        isAnimating=false;

    },550);

}


/*=========================================================
KEYBOARD SUPPORT
=========================================================*/

document.addEventListener("keydown",(e)=>{

    if(app.classList.contains("hidden")) return;

    if(e.code==="ArrowRight"){

        nextSlide();

    }

    if(e.code==="Enter"){

        nextSlide();

    }

    if(e.code==="Space"){

        e.preventDefault();

        nextSlide();

    }

});


/*=========================================================
DOUBLE CLICK PROTECTION
=========================================================*/

document.addEventListener("click",(e)=>{

    if(e.detail>1){

        e.preventDefault();

    }

});


/*=========================================================
HELPERS
=========================================================*/

function getCurrentSlide(){

    return slides[currentSlide];

}

function isLastSlide(){

    return currentSlide===slides.length-1;

}

/*=========================================================
PART 1 END
=========================================================*/

/*=========================================================
    DAD BIRTHDAY TRIBUTE
    SCRIPT.JS
    PART 2
    (Paste below Part 1)
=========================================================*/


/*=========================================================
SWIPE SUPPORT (MOBILE)
=========================================================*/

let touchStartX = 0;
let touchEndX = 0;

app.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

}, { passive: true });

app.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

}, { passive: true });


function handleSwipe(){

    const distance = touchStartX - touchEndX;

    if(Math.abs(distance) < 60) return;

    if(distance > 0){

        nextSlide();

    }

}


/*=========================================================
SLIDE ENTRANCE ANIMATION
=========================================================*/

function animateSlide(slide){

    slide.animate(

        [

            {
                opacity:0,
                transform:"translateY(40px) scale(.97)"
            },

            {
                opacity:1,
                transform:"translateY(0px) scale(1)"
            }

        ],

        {

            duration:900,
            easing:"cubic-bezier(.22,.61,.36,1)",
            fill:"forwards"

        }

    );

}


/*=========================================================
UPDATE NEXT SLIDE FUNCTION
=========================================================*/

const originalNextSlide = nextSlide;

nextSlide = function(){

    if(isAnimating) return;

    if(currentSlide >= slides.length-1) return;

    isAnimating = true;

    const current = slides[currentSlide];

    current.classList.remove("active");

    current.style.pointerEvents = "none";

    currentSlide++;

    setTimeout(()=>{

        const next = slides[currentSlide];

        next.classList.add("active");

        next.style.pointerEvents = "auto";

        animateSlide(next);

        /* Letter slide special delay */

        if(next.classList.contains("letter-slide")){

            const button = next.querySelector(".next");

            if(button){

                button.style.opacity = "0";
                button.style.pointerEvents = "none";

                setTimeout(()=>{

                    button.style.transition = "opacity .8s ease";
                    button.style.opacity = "1";
                    button.style.pointerEvents = "auto";

                },2500);

            }

        }

        isAnimating = false;

    },650);

};


/*=========================================================
PRELOAD IMAGES
=========================================================*/

window.addEventListener("load",()=>{

    document.querySelectorAll("img").forEach(img=>{

        const preload = new Image();

        preload.src = img.src;

    });

});


/*=========================================================
BUTTON RIPPLE EFFECT
=========================================================*/

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",(e)=>{

        const ripple = document.createElement("span");

        ripple.style.position="absolute";
        ripple.style.width="14px";
        ripple.style.height="14px";
        ripple.style.borderRadius="50%";
        ripple.style.pointerEvents="none";
        ripple.style.background="rgba(255,255,255,.35)";
        ripple.style.left=e.offsetX+"px";
        ripple.style.top=e.offsetY+"px";
        ripple.style.transform="translate(-50%,-50%) scale(0)";
        ripple.style.animation="ripple .7s ease forwards";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});


/*=========================================================
ADD RIPPLE KEYFRAME
=========================================================*/

const rippleStyle = document.createElement("style");

rippleStyle.innerHTML = `

@keyframes ripple{

0%{

transform:translate(-50%,-50%) scale(0);
opacity:.8;

}

100%{

transform:translate(-50%,-50%) scale(15);
opacity:0;

}

}

`;

document.head.appendChild(rippleStyle);


/*=========================================================
PAGE VISIBILITY
=========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        isAnimating = false;

    }

});


/*=========================================================
PART 2 END
=========================================================*/

/*=========================================================
    DAD BIRTHDAY TRIBUTE
    SCRIPT.JS
    PART 3 (FINAL)
    Paste below Part 2
=========================================================*/


/*=========================================================
FINAL SLIDE EFFECT
=========================================================*/

function celebrateFinalSlide(){

    if(!isLastSlide()) return;

    createConfetti(180);

    document.body.animate(

        [

            {
                filter:"brightness(.85)"
            },

            {
                filter:"brightness(1)"
            }

        ],

        {

            duration:1800,
            easing:"ease-out"

        }

    );

}


/*=========================================================
UPDATE NEXT SLIDE
=========================================================*/

const previousNextSlide = nextSlide;

nextSlide = function(){

    previousNextSlide();

    setTimeout(()=>{

        if(isLastSlide()){

            celebrateFinalSlide();

        }

    },700);

};


/*=========================================================
CONFETTI
=========================================================*/

function createConfetti(count){

    for(let i=0;i<count;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"vw";

        piece.style.top="-20px";

        piece.style.opacity=Math.random();

        piece.style.width=(6+Math.random()*6)+"px";

        piece.style.height=(10+Math.random()*12)+"px";

        piece.style.background=
        `hsl(${Math.random()*360},90%,70%)`;

        piece.style.position="fixed";

        piece.style.borderRadius="2px";

        piece.style.pointerEvents="none";

        piece.style.zIndex="9999";

        piece.style.transform=
        `rotate(${Math.random()*360}deg)`;

        document.body.appendChild(piece);

        const duration=3000+Math.random()*3000;

        piece.animate(

            [

                {

                    transform:
                    `translateY(0px) rotate(0deg)`,

                    opacity:1

                },

                {

                    transform:
                    `translateY(${window.innerHeight+200}px)
                    rotate(${720+Math.random()*720}deg)`,

                    opacity:0

                }

            ],

            {

                duration:duration,

                easing:"linear",

                fill:"forwards"

            }

        );

        setTimeout(()=>{

            piece.remove();

        },duration);

    }

}


/*=========================================================
BACKGROUND MUSIC
=========================================================*/

const music = document.querySelector("audio");

if(music){

    music.volume=0;

    startBtn.addEventListener("click",()=>{

        music.play().catch(()=>{});

        let volume=0;

        const fade=setInterval(()=>{

            volume+=0.05;

            if(volume>=0.35){

                volume=0.35;

                clearInterval(fade);

            }

            music.volume=volume;

        },200);

    });

}


/*=========================================================
RESTART
=========================================================*/

function restartJourney(){

    currentSlide=0;

    slides.forEach(slide=>{

        slide.classList.remove("active");

    });

    slides[0].classList.add("active");

}


/*=========================================================
OPTIONAL DOUBLE TAP RESTART
=========================================================*/

let lastTap=0;

document.addEventListener("touchend",()=>{

    const now=Date.now();

    if(now-lastTap<350 && isLastSlide()){

        restartJourney();

    }

    lastTap=now;

});


/*=========================================================
SMOOTH PARALLAX
=========================================================*/

window.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth-.5)*12;

    const y=(e.clientY/window.innerHeight-.5)*12;

    document.querySelectorAll(".slide.active img").forEach(img=>{

        img.style.transform=
        `translate(${x}px,${y}px)`;

    });

});


/*=========================================================
PREVENT IMAGE DRAG
=========================================================*/

document.querySelectorAll("img").forEach(img=>{

    img.draggable=false;

});


/*=========================================================
DISABLE RIGHT CLICK (OPTIONAL)
=========================================================*/

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});


/*=========================================================
WINDOW RESIZE
=========================================================*/

window.addEventListener("resize",()=>{

    document.documentElement.style.setProperty(
        "--vh",
        window.innerHeight*0.01+"px"
    );

});


window.dispatchEvent(new Event("resize"));


/*=========================================================
END MESSAGE
=========================================================*/

console.log(
"%c❤️ Happy Birthday Dad ❤️",
"font-size:20px;font-weight:bold;color:#ff4d6d;"
);

console.log(
"%cMade with love.",
"font-size:14px;color:#ffffff;"
);


/*=========================================================
SCRIPT COMPLETE
=========================================================*/