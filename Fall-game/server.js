const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'public'))
.engine('html', require('ejs').renderFile)
.set('view engine', 'html')
    
app.use('/', (req, res) => {
    res.render('index.html')
})

const PORT = process.env.PORT || 8080
app.listen(PORT)