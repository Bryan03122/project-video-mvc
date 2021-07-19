const connection = require('../database/db')
const title = 'Usuarios'


const index = (req, res) => {
    connection.query('SELECT * FROM user', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./userViews/index', {title: title, results:results})        
        }
    })
}

const create = (req, res) => {
    res.render('./userViews/create', {title: title})
}

const edit = (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM user WHERE id_user = ?',[id], (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./userViews/edit', {user:results[0], title:title})
        }
    })
}

const remove = (req, res) => {
    const id = req.params.id
    console.log(id)
    
    connection.query('DELETE FROM user WHERE id_user = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/users')
        }
    })
}

const save = (req,res) => {
    const user = req.body.user
    const password = req.body.password
    connection.query('INSERT INTO user SET ?',{user:user, password:password}, (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.redirect('/users')
        }
    })
}   

const update = (req, res) => {
    const id = req.body.id
    const user = req.body.user
    const password = req.body.password
    connection.query('UPDATE user SET ? WHERE id_user = ?', [{user:user, password:password}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/users')
        }
    } )
}

module.exports = {
    index,
    create,
    edit,
    remove,
    save,
    update
}