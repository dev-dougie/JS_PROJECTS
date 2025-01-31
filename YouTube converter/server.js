//--------------------------------CONFIGURANDO MEU SERVIDOR--------------------------------
const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const app = express()

app.use(cors())

app.listen(4000, ()=>{
    console.log('Servidor subiu!')
})  


//http//localhost:4000/

app.get('/download', (req, res) =>{
    //http//localhost:4000/dowload?URL=
    var URL = req.query.URL

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');

   ytdl(URL, {
        format: 'mp4'
    }).pipe(res)
})

