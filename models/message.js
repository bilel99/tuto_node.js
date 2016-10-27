let connection = require('../config/db')
let moment = require('../config/moment')


class Message {

    constructor(row){
        this.row = row
    }

    get content() {
        return this.row.content
    }

    get created_at(){
        return moment(this.row.created_at)
    }

    get users_id(){
        return this.row.users_id
    }

    get id(){
        return this.row.id
    }

    get idUser(){
        return this.row.idUser
    }

    get email(){
        return this.row.email
    }

    get nom(){
        return this.row.nom
    }

    get prenom(){
        return this.row.prenom
    }

    get date_naissance(){
        return moment(this.row.date_naissance)
    }

    get password(){
        return this.row.password
    }

    get avatar(){
        return this.row.avatar
    }

    get monimage(){
        return this.row.monimage
    }

    get choixImage(){
        return this.row.choixImage
    }

    get token(){
        return this.row.token
    }

    get created_atUser(){
        return this.row.created_atUser
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

            cb(rows.map((row) => new Message(row)))
        })
    }


    static find(id, cb){
        connection.query('SELECT m.id as id, u.id as idUser, m.users_id, m.content, m.created_at as created_at, u.email, u.nom, u.prenom, u.date_naissance, u.password, u.avatar, u.monimage, u.choixImage, u.token, u.created_at as created_atUser FROM messages m INNER JOIN users u ON (u.id = m.users_id) WHERE m.id = ? LIMIT 1', [id], (err, rows) => {
            if(err) throw err

            cb(new Message(rows[0]))
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

module.exports = Message