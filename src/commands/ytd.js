const nanoid = require('nanoid');
const JMongo = require('jmongo');
const jmongo = new JMongo(process.env.DB_URL, process.env.DB_NAME);

module.exports = {
    name: 'ytd',
    description: 'Download youtube video',
    public: true, 
    execute(ctx){
        const fs = require('fs');
        const ytdl = require('ytdl-core');

        if(ytdl.validateURL(ctx.state.command.args)){
            const filename = 'files/'+nanoid.nanoid()+'.mp4';
            ytdl.getInfo(ctx.state.command.args).then((info) => {
                ytdl(ctx.state.command.args, { format: 'audioonly' })
                .pipe(fs.createWriteStream(filename)).on('finish', () => {
                    ctx.replyWithAudio({ source: filename, filename: info.title }, { title: info.title, thumb: { url: 'https://i.imgur.com/DxFEJ9A.jpg' } }).then((message) => {
                        jmongo.insertDocument('songs', { title: info.title, song_id: nanoid.nanoid().replace('-', ''), owner: ctx.from.id, file_id: message.audio.file_id, });
                        fs.unlink(filename, () => {});
                    });
                });
            });
        }
        else{
            ctx.reply('Url invalido');
        }
    }
}