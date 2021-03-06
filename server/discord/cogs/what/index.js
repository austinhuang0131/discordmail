const dmail = require('./../../utils.js').dmail;
const config = require('config');

module.exports.info = {
	name: 'Check DMail',
	category: 'mail',
	aliases: [
		'what',
		'check',
		'email'
	]
};

module.exports.command = (message) => {
	if (message.context === 'guild' && !message.channel.guild) {
		message.channel.createMessage('You can only use this context within a guild!');
	} else {
		dmail.check(message.inbox)
			.then((details) => {
				if (message.context === 'guild') {
					message.channel.createMessage(`The Guild's email is \`${details.email}@${config.get('api').mailgun.domain}\``);
				} else if (message.context === 'user') {
					message.channel.createMessage(`Your email is \`${details.email}@${config.get('api').mailgun.domain}\``);
				} else {
					message.channel.createMessage('Invalid context!');
				}
			})
			.catch((err) => {
				message.channel.createMessage(err);
			});
	}
};
