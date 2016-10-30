let connection = require('../config/db')
let moment = require('../config/moment')


class ws_users {


    constructor(row){
        this.row = row
    }


    static create(email, nom, prenom, date_naissance, password, cb){
        connection.query('INSERT INTO users SET email = ?, nom = ?, prenom = ?, date_naissance = ?, password = md5(?), created_at = ?', [email, nom, prenom, date_naissance, password, new Date()], (err, results) => {
            if(err) throw err

            cb(results)
        })
    }



    static login(email, password, cb){
        connection.query('SELECT * FROM users WHERE email = ? AND password = md5(?) LIMIT 1', [email, password], (err, rows) => {
            if(err) throw err

            cb(rows)
        })
    }


    static update(id, email, nom, prenom, date_naissance, avatar, monimage = null, choixImage, cb){
        connection.query('UPDATE users SET email = ?, nom = ?, prenom = ?, date_naissance = ?, avatar = ?, monimage = ?, choixImage = ? WHERE id = ?', [email, nom, prenom, date_naissance, avatar, monimage, choixImage, id], (err, results) => {
            if(err) throw err

            cb(results)
        })
    }

    static all(cb){
        connection.query('SELECT * FROM users', (err, rows) => {
            if(err) throw err

            cb(rows)
        })
    }

    static get(id, cb){
        connection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
            if(err) throw err

            cb(rows)
        })
    }


    static changePassword(id, password, cb){
        connection.query('UPDATE users SET password = md5(?) WHERE id = ?', [password, id], (err, results) => {
            if(err) throw err

            cb(results)
        })
    }


    static uniqueEmail(email, cb){
        connection.query('SELECT COUNT(email) AS nbr_email FROM users WHERE email = ?', [email], (err, nbr) => {
            if(err) throw err

            cb(nbr)
        })
    }

    static generatePassUpdate(pass, email, cb){
        connection.query('UPDATE users SET password = md5(?) WHERE email = ?', [pass, email], (err, results) => {
            if(err) throw err

            cb(results)
        })
    }

    static delete(id, cb){
        connection.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if(err) throw err

            cb(result)
        })
    }


}


module.exports = ws_users