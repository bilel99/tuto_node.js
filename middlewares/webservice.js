module.exports = (request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Authorization');

    next()
}