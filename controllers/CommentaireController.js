class CommentaireController {

    constructor(){

    }

    static getCommentaire(request, response){
        let Message = require('../models/message')
        Message.get((messages) => {
            response.render('pages/index', {messages : messages})
        })
    }

    static commentaire(request, response){
        if(request.body.message === '' | request.body.message === undefined){
            request.flash('error', 'Aucun message n\'a ête rendu :-(')
            response.redirect('/commentaire')
        }else{
            let Message = require('../models/message')
            Message.create(request.session.user[0].id ,request.body.message, () => {
                request.flash('success', 'Merci :-)')
                response.redirect('/commentaire')
            })
        }
    }

    static getShowCommentaire(request, response){
        let Message = require('../models/message')
        Message.find(request.params.id, function (message){
            response.render('messages/show', {message : message})
        })
    }

    static deleteCommentaire(request, response){
        let Message = require('../models/message')
        Message.delete(request.params.id, () => {
            request.flash('success', 'Suppression effectué avec succès !')
            response.redirect('/commentaire')
        })
    }

    static updateCommentaire(request, response){
        if(request.body.content === undefined || request.body.content === ''){
            request.flash('error', 'le champs message est obligatoire :-(')
            response.redirect('/commentaire')
        }else{
            let Message = require('../models/message')
            Message.update(request.body.id, request.body.content, () => {
                request.flash('success', 'Mise à jour effectué avec succès :-)')
                response.redirect('/commentaire')
            })
        }
    }

}

module.exports = CommentaireController