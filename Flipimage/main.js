const img = document.querySelector('img')
const left = document.querySelector('.left')
const right = document.querySelector('.right')
const up = document.querySelector('.up')
const down = document.querySelector('.down')
const link = document.querySelector('.linkImg')
const addImage = document.querySelector('#insertLink')

const changeImg = (i) => {
    let l = link.value;
    return i.setAttribute("src", l)
}

addImage.onclick = () => { changeImg(img) }


const spinImage = (image, directon) => {


    switch (directon) {
        case 'left':
            image.style.transform = 'rotate(90deg)'
            image.style.transition = '0.6s'
            break
        case 'right':
            image.style.transform = 'rotate(-90deg)'
            image.style.transition = '0.6s'
            break
        case 'down':
            image.style.transform = 'rotate(180deg)'
            image.style.transition = '0.6s'
            break
        case 'up': {
            image.style.transform = 'rotate(-180deg)'
            image.style.transition = '0.6s'
            break
        }
    }

}

left.onclick = () => spinImage(img, 'left')
right.onclick = () => spinImage(img, 'right')
down.onclick = () => spinImage(img, 'down')

up.onclick = () => spinImage(img, 'up')






