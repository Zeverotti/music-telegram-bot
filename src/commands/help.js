module.exports = {
    name: 'help',
    description: 'Receive help from the bot',
    public: true, 
    execute(ctx){
        ctx.replyWithMarkdown('How to use JZM: \n\n/ytd link \n_Download the audio from the video_ \n\n/music \n_See downloaded music_');
    }
}