const connection = require('../database/db')
const title = 'Bonos'


const index = (req, res) => {
    connection.query('SELECT bono.*, date(bono.fecha) as fecha_format, user.user FROM bono INNER JOIN user ON user.id_user = bono.id_user', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./bonoViews/index', {title: title, results:results})        
        }
    })
}

const create = (req, res) => {
    connection.query('SELECT * FROM user', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./bonoViews/create', {title: title, results:results})

        }
    })
}

const edit = (req, res) => {
    const id = req.params.id
    connection.query('SELECT bono.*, date(bono.fecha) as fecha_format, user.user FROM bono INNER JOIN user ON user.id_user = bono.id_user WHERE id_bono = ? ',[id] , (error, results) => {
        if(error){
            throw error
        }else{
            connection.query('SELECT * FROM user', (err, result) => {
                if(err){
                    throw err
                }else{
                    res.render('./bonoViews/edit', {bono:results[0], user:result, title: title})        

                }
            })
        }
    })
}

const remove = (req, res) => {
    const id = req.params.id
    // console.log(id)
    
    connection.query('DELETE FROM bono WHERE id_bono = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/bonos')
        }
    })
}

const save = (req,res) => {
    const id_user = req.body.user
    const tipo_bono = req.body.tipo_bono
    const desc = req.body.desc
    const valor = req.body.valor
    const fecha = req.body.fecha
    // console.log(id_user, tipo_bono, desc, valor, fecha)
    connection.query('INSERT INTO bono SET ?', {id_user, tipo_bono, desc, valor, fecha}, (error, results) => {
        if(error){
            console.log(error)            
        }else{
            res.redirect('/bonos')
        }
    })
    // connection.query('INSERT INTO user SET ?',{user:user, password:password}, (error, results) => {
    //     if(error){
    //         console.error(error)
    //     }else{
    //         res.redirect('/users')
    //     }
    // })
}   

const update = (req, res) => {
    const id = req.body.id
    const user = req.body.user
    const password = req.body.password
    connection.query('UPDATE user SET ? WHERE id_user = ?', [{user:user, password:password}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/bonos')
        }
    } )
}

const comparacion = (req, res) => {
    res.render('./bonoViews/comparacion')
}

const resultados = (req, res) => {
    //res.send('comparacion')
    const fecha1 = req.body.fecha1
    const fecha2 = req.body.fecha2
    console.log(fecha1, fecha2)
    
    connection.query("SELECT bono.*, date(bono.fecha) as fecha_format, user.user FROM bono INNER JOIN user ON user.id_user = bono.id_user WHERE fecha BETWEEN '"+fecha1+ "' AND '"+fecha2+"'", (error, results) => {
        if(error){
            throw error
        }else{
            let total = 0
            for(i=0; i<results.length; i++){
                total = total + parseFloat(results[i].valor)
            }

            res.render('./bonoViews/resultados', {results, total})
        }
    })
}

module.exports = {
    index,
    create,
    edit,
    remove,
    save,
    update,
    comparacion,
    resultados
}