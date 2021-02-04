//imports
const express = require('express')
const app = express()


/*Read and create files */
const fs = require('fs')
/*Upload the files for the server */
const multer = require('multer')
/*Read our images */
const { TesseractWorker } = require('tesseract.js');

/*Analyze the images */
const worker = new TesseractWorker();

//STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname);
    }
})

//ROUTES
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/upload', (req, res) => {
    upload(req, res, err =>{
       fs.readFile(`./uploads/${req.file.originalname}`, (err, data) => {
           if(err) return console.log('Deu zebra' + err)

           worker
           .recognize(data, 'eng', {tessjs_create_pdf: '1'})
           .progress(progress => {
               console.log(progress)
            })
            .then(result =>{
                res.redirect('/download')
            })
            .finally(()=> {worker.terminate()})
       })
    })
})

const upload = multer({storage:storage}).single('avatar')
app.set('view engine', 'ejs')
app.use(express.static('public'))


app.get('/uploads', (req, res) => {
    console.log('HEY, I RAN')
})

app.get('/download', (req, res) =>{
    const file = `${__dirname}/pdfconverter.pdf`
    res.download(file)
})

//Start server
const PORT = 5000 || process.env.PORT
app.listen(PORT, () => console.log('IM RUNNING IN ' + PORT))