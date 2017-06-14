var mysql = require('mysql');
var configDB = require('./config');
var pool = mysql.createPool(configDB.mysql_config);

function query(sql, data, callback) {
	pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err);
			callback({
				data: null,
				message: err,
				success: false
			});
			return;
		}
		connection.query(sql, data, function (err, rows) {
			if (err) {
				callback({
					data: null,
					message: err,
					success: false
				});
				return;
			}

			callback({
				data: rows,
				message: '',
				success: true
			});
		});
	});
}
module.exports = {
	query: query
}