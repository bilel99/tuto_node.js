class ProfilController {
    
    constructor(){
        
    }

    static getChangePassword(request, response){
        let Users = require('../models/users')
        Users.get(request.params.id, (results) => {
            response.render('auth/changePassword', {results : results})
        })
    }

    static changePassword(request, response){
        if(request.body.password === undefined || request.body.password === ''){
            request.flash('error', 'Tous les champs sont obligatoires :-(')
            response.redirect('/changePassword/'+request.params.id)
        }
        let Users = require('../models/users')
        if(request.body.password === request.body.password_two){
            if(request.body.password.length > 0 && request.body.password_two.length > 0){
                Users.changePassword(request.params.id, request.body.password, () => {
                    request.flash('success', 'Votre mot de passe à bien été modifié :-)')
                    response.redirect('/commentaire')
                })
            }
        }else{
            request.flash('error', 'Les mot de passe doivent être identique')
            response.redirect('/changePassword/'+request.params.id)
        }
    }

    static getProfil(request, response){
        let Users = require('../models/users')
        Users.get(request.params.id, (results) => {
            response.render('auth/profil', {results : results})
        })
    }

    static profil(request, response, next){
        if(request.body.email === undefined || request.body.email === '' && request.body.nom === undefined || request.body.nom === '' && request.body.prenom === undefined || request.body.prenom === ''){
            request.flash('error', 'Le champs Email | Nom | Prénom sont obligatoires :-(')
            response.redirect('/profil/'+request.params.id)
        }else{
            if(request.file != undefined){
                if(request.file.filename != request.body.monImageFile){
                    console.log(request.file)
                    let Users = require('../models/users')
                    Users.update(request.params.id, request.body.email, request.body.nom, request.body.prenom, request.body.date_naissance, request.body.avatar, request.file.filename, request.body.choixImage, () => {
                        request.flash('success', 'Votre compte à bien été mise à jour :-)')
                        response.redirect('/profil/'+request.params.id)
                    })
                }
            }else{
                let Users = require('../models/users')
                Users.update(request.params.id, request.body.email, request.body.nom, request.body.prenom, request.body.date_naissance, request.body.avatar, request.body.monImageFile, request.body.choixImage, () => {
                    request.flash('success', 'Votre compte à bien été mise à jour :-)')
                    response.redirect('/profil/'+request.params.id)
                })
            }
        }
    }

    

}

module.exports = ProfilController