module.exports = {
    name: 'help',
    description: 'Receive help from the bot',
    public: true, 
    execute(ctx){
        ctx.replyWithMarkdown('How to use JZM: \nList of commands: \n/ytd link for download the audio from the video \n/music for see downloaded music');
    }
}