const Telegraf = require('telegraf');
const { Markup, Extra } = Telegraf;
const JMongo = require('jmongo');
const jmongo = new JMongo(process.env.DB_URL, process.env.DB_NAME);

module.exports = {
    name: 'music',
    description: 'Visualizza la tua musica',
    public: true, 
    execute(ctx){
        jmongo.loadAll('songs', { owner: ctx.from.id }).then((result) => {
            const buttons = [];
            for(let i=0; i<result.length; i++){
                buttons.push([Markup.callbackButton(result[i].title, `song-${result[i].song_id}`)]);
            }
            ctx.reply('Ecco la tua musica', Extra.markup(Markup.inlineKeyboard(buttons)));
        })
    }
}