const photoFile = document.querySelector('#photo-file')
let photoPreview = document.querySelector('#photo-preview')
let image;
let selection = document.querySelector('#selection-tool')
let photoName

document.querySelector('#select-image').addEventListener('click', () => {
     photoFile.click()
})

window.addEventListener('DOMContentLoaded', () => {
     photoFile.addEventListener('change', () => {
          let file = photoFile.files.item(0)
          photoName = file.name
          //Read file
          let reader = new FileReader()
          //BLOB file reading
          reader.readAsDataURL(file)
          reader.onload = function(event){
               image = new Image()
               image.src = event.target.result
               image.onload = onLoadImage
          }
     })
})

let startX, startY, relativeStartX, relativeStartY, 
endX, endY, relativeEndX, relativeEndY
let startSelection = false
const events = {
     mouseover(){
          //This = target that dispair the property [image]
          this.style.cursor = 'crosshair'
     },
     //Event = datas related to selection
     mousedown(event){
         const { clientX, clientY, offsetX, offsetY } = event
         /*console.table({
              'client' : [clientX, clientY],
              'offset' : [offsetX, offsetY]
         })*/
         startX = clientX
         startY = clientY
         relativeStartX = offsetX
         relativeStartY = offsetY

         startSelection = true
     },
     mousemove(event){
          endX = event.clientX
          endY = event.clientY

          if(startSelection){
               selection.style.display = 'initial'
               selection.style.top = startY + 'px'
               selection.style.left = startX + 'px'

               selection.style.width = (endX - startX) + 'px'
               selection.style.height = (endY - startY) + 'px'
          } 
     },
     mouseup(event){
          startSelection = false

          relativeEndX = event.layerX
          relativeEndY = event.layerY

          cropButton.style.display = 'initial     '
     }
}

Object.keys(events)
.forEach(eventName => {
          photoPreview.addEventListener(eventName, events[eventName])
})

let canvas = document.createElement('canvas')
let ctx = canvas.getContext('2d')

function onLoadImage(){
     const {width, height} = image
     canvas.width = width
     canvas.height = height

     ctx.clearRect(0, 0, width, height)
     ctx.drawImage(image, 0, 0)
     photoPreview.src = canvas.toDataURL()
}

//Crop image
const cropButton = document.querySelector('#crop-image')
cropButton.onclick = () => {
     const { width: imgW, height: imgH } = image
     const { width: previewW, height: previewH } = photoPreview

     const [ widthFactor, heightFactor ] = [ +(imgW / previewW), +(imgH / previewH) ]

     const [ selectionWidth, selectionHeight ] = [
          +selection.style.width.replace('px', ' '),
          +selection.style.height.replace('px', ' ')
     ]

     const [ croppedWidth, croppedHeight ] = [
          +(widthFactor * selectionWidth),
          +(heightFactor * selectionHeight)  
     ]

     const [ actualX, actualY ] = [
          +(relativeStartX * widthFactor),
          +(relativeStartY * heightFactor)
     ]

     const croppedImage = ctx.getImageData(actualX, actualY, croppedWidth, croppedHeight)

     ctx.clearRect(0, 0, ctx.width, ctx.height)

     image.width = canvas.width = croppedWidth
     image.height = canvas.height = croppedHeight

     ctx.putImageData(croppedImage, 0, 0)

     selection.style.display = "none"

     photoPreview.src = canvas.toDataURL()

     btnDowload.style.display = "initial"

}

const btnDowload = document.querySelector('#download')
btnDowload.onclick = function(){   
     const a = document.createElement('a')
     a.download = photoName + '-cropped.png'
     a.href = canvas.toDataURL()
     a.click()
}