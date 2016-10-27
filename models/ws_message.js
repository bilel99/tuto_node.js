let connection = require('../config/db')
let moment = require('../config/moment')

class ws_message{
    constructor(){

    }

    static create (users_id, content, cb){
        connection.query('INSERT INTO messages SET users_id = ?, content = ?, created_at = ?', [users_id, content, new Date()], (err, results) => {
            if(err) throw  err

            cb(results)
        })
    }


    static get(cb){
        connection.query('SELECT m.id as id, u.id as idUser, m.users_id, m.content, m.created_at as created_at, u.email, u.nom, u.prenom, u.date_naissance, u.password, u.avatar, u.monimage, u.choixImage, u.token, u.created_at as created_atUser FROM messages m INNER JOIN users u ON (u.id = m.users_id) ORDER BY id DESC', (err, rows) => {
            if(err) throw err

            cb(rows)
        })
    }


    static find(id, cb){
        connection.query('SELECT m.id as id, u.id as idUser, m.users_id, m.content, m.created_at as created_at, u.email, u.nom, u.prenom, u.date_naissance, u.password, u.avatar, u.monimage, u.choixImage, u.token, u.created_at as created_atUser FROM messages m INNER JOIN users u ON (u.id = m.users_id) WHERE m.id = ? LIMIT 1', [id], (err, rows) => {
            if(err) throw err

            cb(rows)
        })
    }


    static delete(id, cb){
        connection.query('DELETE FROM messages WHERE id = ?', [id], (err, results) => {
            if(err) throw err

            cb(results)
        })
    }


    static update(id, content, cb){
        connection.query('UPDATE messages SET content = ? WHERE id = ?', [content, id], (err, results) => {
            if(err) throw err

            cb(results)
        })
    }
}

module.exports = ws_message