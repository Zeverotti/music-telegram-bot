const nanoid = require('nanoid');

module.exports = {
    name: 'ytd',
    description: 'Download youtube video',
    public: true, 
    execute(ctx){
        const fs = require('fs');
        const ytdl = require('ytdl-core');

        const filename = 'files/'+nanoid.nanoid()+'.mp4';
        
        ytdl(ctx.state.command.args, { format: 'audioonly' })
            .pipe(fs.createWriteStream(filename)).on('finish', () => {
                ctx.replyWithAudio({ source: filename, filename: 'music-telegram-bot' }).then(() => {
                    fs.unlink(filename, () => {});
                });
            });
    }
}