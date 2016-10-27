module.exports = (request, response, next) => {

    if(request.session.crudSession){
        response.locals.crudSession = request.session.crudSession
    }

    request.crudSession = (type, content) => {
        if(request.session.crudSession === undefined){
            request.session.crudSession = {}
        }
        request.session.crudSession[type] = content
    }
    next()

}