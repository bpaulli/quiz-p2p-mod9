/// <reference path="../typings/typescript/typescript.d.ts" />


var users = {
	admin: {id: 1, username: "admin", password: "1234", timestamp: new Date()},
	pepe: {id: 2, username: "pepe", password: "5678", timestamp: new Date() },
};

exports.autenticar = function(login, password, callback) {
	if (users[login]) {
		if (password === users[login].password) {
			callback(null, users[login]);
		} else {
			callback(new Error('Password errónea.'));
		}
	} else {
		callback(new Error('No existe el usuario.'));
	}
	
};