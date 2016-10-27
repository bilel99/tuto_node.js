class AuthController {

    constructor(){
        
    }

    static getLogin(request, response){
        response.render('auth/login')
    }

    static getRegister(request, response){
        response.render('auth/register')
    }

    static login(request, response){
        if(request.body.email === undefined || request.body.email === '' && request.body.password === undefined || request.body.password === ''){
        request.flash('error', 'Les champs sont vides :-(')
        response.redirect('/')
        }else{
            let Users = require('../models/users')
            Users.login(request.body.email, request.body.password, (user) => {
                if(user.length === 0 || user == []){
                    request.flash('error', 'Identifiant ou mot de passe incorrect :-(')
                    response.redirect('/')
                }else{
                    request.crudSession('user', user)
                    request.session.user = user
                    request.flash('success', 'Bienvenue '+request.session.user[0].nom.substring(0, 1) + ' ' + request.session.user[0].prenom)
                    response.redirect('/commentaire')
                }
            })
        }
    }

    static register(request, response){
        if(request.body.email === undefined || request.body.email === ''  &&
        request.body.nom === undefined || request.body.nom === '' &&
        request.body.prenom === undefined || request.body.prenom === '' &&
        request.body.date_naissance === undefined || request.body.date_naissance === '' &&
        request.body.password === undefined || request.body.password === '' &&
        request.body.password_reload === undefined || request.body.password_reload === ''){

        request.flash('error', 'Tous les champs sont obligatoire :-(')
        response.redirect('/register')
        }else {
            if(request.body.password === request.body.password_reload){
                let Users = require('../models/users')
                // Vérifier si Email existe déjà en bdd si existe alors Message error
                Users.uniqueEmail(request.body.email, (nbr) =>{
                    if(nbr[0].nbr_email > 0){
                        request.flash('error', 'Vous avez déjà un compte, si vous en rappelez plus veuillez-cliquez sur mot de passe oublié :-(')
                        response.redirect('/register')
                    }else{
                        Users.create(request.body.email, request.body.nom, request.body.prenom, request.body.date_naissance, request.body.password, () => {
                            // Envoie du mail
                            let smtpTransport = require('../config/mailer')
                            let mail = {
                                from: "bil.bekkouche@laposte.net",
                                to: request.body.email,
                                subject: "Inscription",
                                html: "<h1> Bienvenue </h1> <p> Merci de vous être inscit sur ce site ! </p>"
                            }

                            smtpTransport.sendMail(mail, function(error, resp){
                                if(error){
                                    console.log("Erreur lors de l'envoie du mail!");
                                    console.log(error);
                                }else{
                                    console.log("Mail envoyé avec succès!")
                                }
                                smtpTransport.close();
                            })

                            request.flash('success', 'Merci de vous avoir enregistrer :-)')
                            response.redirect('/')
                        })
                    }
                })
            }else{
                request.flash('error', 'Les mot de passe doivent être identique :-(')
                response.redirect('/register')
            }
        }
    }

    static logout(request, response){
        // Delete all session : request.session.destroy()
        // Delete session par partie :
        delete request.session.user
        delete request.session.crudSession
        request.flash('success', 'Vous êtes maintenant déconnecter :-)')
        response.redirect('/')
    }

    static getForgotPassword(request, response){
        response.render('Auth/forgotPassword')
    }

    static forgotPassword(request, response){
        if(request.body.email === undefined || request.body.email === ''){
            request.flash('error', 'Le champs Email est obligatoire :-(')
            response.redirect('/forgotPassword')
        }else{
            let Users = require('../models/users')
            Users.uniqueEmail(request.body.email, (nbr) => {
                if(nbr[0].nbr_email === 0){
                    request.flash('error', 'Erreur email innexistant :-(')
                    response.redirect('/forgotPassword')
                }else{
                    // Générer un mot de passe aléatoire
                    let alphabet  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz_-@&'
                    let pass = ''
                    let length = 6
                    for(let i=0; i<=length; i++){
                        let wpos = Math.round(Math.random() * alphabet.length)
                        pass += alphabet.substring(wpos, wpos+1)
                    }

                    // enregistrement du nouveaux mot de passe pour l'utilisateur
                    Users.generatePassUpdate(pass, request.body.email, () => {
                        // Envoie du mail
                        let smtpTransport = require('../config/mailer')
                        let mail = {
                            from: "bil.bekkouche@laposte.net",
                            to: request.body.email,
                            subject: "Mot de passe oublié",
                            html: '<h1> Mot de passe oublié </h1> <p> Merci de vous reconnecter sur ce site avec votre adresse email : <u> '+request.body.email+' </u> et avec ce mot de passe :  </p> <h3> '+ pass +' </h3>'
                        }

                        smtpTransport.sendMail(mail, function(error, resp){
                            if(error){
                                console.log("Erreur lors de l'envoie du mail!");
                                console.log(error);
                            }else{
                                console.log("Mail envoyé avec succès!")
                            }
                            smtpTransport.close();
                        })

                        request.flash('success', 'Merci d\'avoir fait une demande de mot de passe oublié :-)')
                        response.redirect('/')
                    })
                }
            })
        }
    }
    

}

module.exports = AuthController