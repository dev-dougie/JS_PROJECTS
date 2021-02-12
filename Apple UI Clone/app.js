const introSection = document.querySelector('.intro');
const video = introSection.querySelector('video');
const text = document.querySelector('h1')

//end section
const section = document.querySelector('section')
const end = section.querySelector('h1')

//scrollmagic
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
    duration: 9000,
    triggerElement: introSection,
    triggerHook: 0
})
.addIndicators()
.setPin(introSection)
.addTo(controller)

//Video animation
let accelamount = 0.1
let scrollpos = 0;
let delay = 0;

scene.on('update', e => {
    scrollpos = e.scrollPos / 100
    console.log(scrollpos)
})

setInterval(()=>{
    delay += (scrollpos - delay) * accelamount
    video.currentTime = delay;
}, 33.3)