module.exports = function (express) {
	var router = express.Router();
	var dns = require('dns');
	var whois = require('whois-api');
	
	router.get('/dns/:name', function (req, res, next) {
		whois.lookup(req.params.name, (error, result) => {
			return res.json(result);
		});
		// dns.lookup(req.params.name, (err, address, family) => {
		// 	return res.json({
		// 		address: address,
		// 		family: 'IPv' + family
		// 	});
		// });
	})

	return router;
}