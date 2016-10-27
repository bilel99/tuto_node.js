class MessagesController {

    constructor(){

    }

    static get(request, response){
        let ws_message = require('../../models/ws_message')
        ws_message.get((raws) => {
            response.end(JSON.stringify(raws)) 
        })
    }

    static find(request, response){
        let ws_message = require('../../models/ws_message')
        ws_message.find(request.params.id, (message) => {            
            response.end(JSON.stringify(message))
        })
    }

    static create(request, response){
        let ws_message = require('../../models/ws_message')
        console.log(request.body.content)
        ws_message.create(request.body.users_id, request.body.content, (rows) => {
            response.end(JSON.stringify({"Error" : false, "Message" : "Enregistrement éffectué avec succès", "Resultat" : rows}))
        })
    }

    static update(request, response){
        let ws_message = require('../../models/ws_message')
        ws_message.update(request.params.id, request.body.content, (rows) => {
            response.end(JSON.stringify({"Error" : false, "Message" : "Modification éffectué avec succès", "Resultat" : rows}))
        })
    }

    static delete(request, response){
        let ws_message = require('../../models/ws_message')
        ws_message.delete(request.params.id, (rows) => {
            response.end(JSON.stringify({"Error" : false, "Message" : "Suppression éfféctué avec succès", "Resultat" : rows}))
        })
    }
    
}

module.exports = MessagesController