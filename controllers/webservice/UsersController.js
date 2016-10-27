class UsersController {
    constructor(){

    }

    static get(request, response){
        let Users = require('../../models/users')
        Users.all((rows) => {
            response.end(JSON.stringify(rows))
        })
    }

    static find(request, response){
        let Users = require('../../models/users')
        Users.get(request.params.id, (rows) => {
            response.end(JSON.stringify(rows))
        })
    }

    static create(request, response){
        let Users = require('../../models/users')
        Users.create(request.body.email, request.body.nom, request.body.prenom, request.body.date_naissance, request.body.password, (rows) => {
            response.end(JSON.stringify({"Error" : false, "Message" : "Enregistrement avec succès de l'utilisateur", "resultat" : rows}))
        })
    }

    static update(request, response){
        let Users = require('../../models/users')
        Users.update(request.params.id, request.body.email, request.body.nom, request.body.prenom, request.body.date_naissance, request.body.avatar, request.body.monImageFile, request.body.choixImage, (rows) => {
            response.end(JSON.stringify({"Error" : false, "Message" : "Modification de l'utilisateur efféctuer avec succès", "resultat" : rows}))
        })
    }

    static delete(request, response){
        let Users = require('../../models/users')
        Users.delete(request.params.id, (rows) => {
            response.end(JSON.stringify({"Error" : false, "Message" : "Suppression effectué avec succès", "resultat" : rows}))
        })
    }
}

module.exports = UsersController