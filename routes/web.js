/**************************
 *  IMPORT DE MIDDLEWARE multer
 *  Multer => Gestion upload (file)
 **************************/
let multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.substring(6))
  }
})
let upload = multer({ storage: storage })


/**************************
 *  Import des controllers
 **************************/
let AuthController = require('../controllers/AuthController')
let ProfilController = require('../controllers/ProfilController')
let CommentaireController = require('../controllers/CommentaireController')

// Webservice
let MessagesController = require('../controllers/webservice/MessagesController')
let UsersController = require('../controllers/webservice/UsersController')
/**************************
 *  Routes
 **************************/
module.exports = function(app){
    /**
     * Authentification : 
     * Login => GET, POST 
     * Register => GET, POST
     */
    app.get('/', AuthController.getLogin)
    app.post('/login', AuthController.login)
    app.get('/register', AuthController.getRegister)
    app.post('/register', AuthController.register)
    app.get('/logout', AuthController.logout)
    app.get('/forgotPassword', AuthController.getForgotPassword)
    app.post('/forgotPassword', AuthController.forgotPassword)
    

    /**
     * Commentaire :
     * Index => GET, POST, PUT, DELETE
     * Show => GET
     */
    app.get('/commentaire', CommentaireController.getCommentaire)
    app.post('/commentaire', CommentaireController.commentaire)
    app.get('/show/:id', CommentaireController.getShowCommentaire)
    app.post('/delete/:id', CommentaireController.deleteCommentaire)
    app.post('/commentaire/:id', CommentaireController.updateCommentaire)
    /**
     * Profil : 
     * ChangePassword => GET, PUT
     * Profil => GET, PUT
     */
    app.get('/changePassword/:id', ProfilController.getChangePassword)
    app.post('/changePassword/:id', ProfilController.changePassword)
    app.get('/profil/:id', ProfilController.getProfil)
    app.post('/profil/:id', upload.single("monimage"), ProfilController.profil)
    

    /**
     * Webservice Node.js
     * GET
     * POST
     * PUT
     * DELETE
     * PATCH
     * Comments => relation avec Users
     * Table => Comments
     * return json.stringify()
     */
    app.get('/webservice/messages', MessagesController.get)
    app.get('/webservice/messages/:id', MessagesController.find)
    app.post('/webservice/messages', MessagesController.create)
    app.put('/webservice/messages/:id', MessagesController.update)
    app.delete('/webservice/messages/:id', MessagesController.delete)

    app.get('/webservice/users', UsersController.get)
    app.get('/webservice/users/:id', UsersController.find)
    app.post('/webservice/users', UsersController.create)
    app.put('/webservice/users/:id', UsersController.update)
    app.delete('/webservice/users/:id', UsersController.delete)
    
    // Authentification
    app.post('/webservice/login', UsersController.login)

    // Profil
    app.put('/webservice/changePassword/:id', UsersController.changePassword)

}