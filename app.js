const { json } = require('express')
const express = require('express')
const app = express()
const port = 3000

//Motor Plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.urlencoded({extended: false}))
app.use(express(json))
app.use(express.static(__dirname + '/public'))

app.use('/users', require('./router/user'))
app.use('/bonos', require('./router/bono'))

//Activar Servidor
app.listen(port, ()=>{
    console.log('Active Server on port ', port)

})