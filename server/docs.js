const express = require('express');
const marked = require('marked');
const fs = require('fs');
const path = require('path');
const config = require('config');

const router = express.Router();

router.get('/', (req, res) => {
	fs.readFile(path.join(__dirname, '/markdown/index.md'), 'utf8', (err, data) => {
		res.render('markdown.html', {
			domain: config.get('api').mailgun.domain,
			markdown: marked(data)
		});
	});
})
	.get('/:page', (req, res, next) => {
		if (fs.existsSync(path.join(__dirname, '/markdown/', `${req.params.page}.md`))) {
			fs.readFile(path.join(__dirname, '/markdown/', `${req.params.page}.md`), 'utf8', (err, data) => {
				res.render('markdown.html', {
					domain: config.get('api').mailgun.domain,
					markdown: marked(data)
				});
			});
		} else {
			next();
		}
	});

module.exports = router;
