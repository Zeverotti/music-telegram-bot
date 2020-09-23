class defaultResponses{
	constructor(telegraf){
		telegraf.on('new_chat_members', (ctx) => {
			if(ctx.botInfo.id===ctx.update.message.new_chat_member.id){
				ctx.reply('Thanks for adding me to this group');
			}	
		})

		return telegraf;
	}
}

// Define responses here
class myResponses{
	constructor(telegraf, jmongo){
		// Default responses, comment out if not needed
		telegraf = new defaultResponses(telegraf);

		// Dynamic commands
		const fs = require('fs');
		const files = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

		const commands = [];
		for(let i=0; i<files.length; i++){
			const command = require('./commands/'+files[i]);
			telegraf.command(command.name, (ctx) => {
				// If access is not private then just execute, else check if the user is an admin
				command.access != 'private' ? command.execute(ctx, { jmongo }) : 
				jmongo.load('admins', { id: ctx.from.id }).then((result) => {
					// If admin not found, reply. Else execute
					result === null ? ctx.reply('You must be an admin to execute this command') : command.execute(ctx, { jmongo });
				})
			});
			if(command.public===true){ commands.push({ command: command.name, description: command.description }) };
		}
		telegraf.telegram.setMyCommands(commands);

		return telegraf;
	}
}

class Responses{
	constructor(telegraf, jmongo){
		telegraf = new myResponses(telegraf, jmongo);
		
		return telegraf;
	}
}

module.exports = Responses;