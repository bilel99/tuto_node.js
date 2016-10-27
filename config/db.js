let mysql      = require('mysql')
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'tuto_livreor'
});

connection.connect()

module.exports = connection