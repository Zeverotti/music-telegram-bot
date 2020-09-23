module.exports = {
    name: 'start',
    description: 'Receive a greeting from the bot',
    public: true, 
    execute(ctx){
        ctx.replyWithMarkdown('Welcome.                            Thanks to this bot you can simply download your favorite songs and listen to them whenever you want, even offline. World');
    }
}