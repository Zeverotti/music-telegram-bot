const JMongo = require('jmongo');
const jmongo = new JMongo(process.env.DB_URL, process.env.DB_NAME);

module.exports = {
    name: 'music',
    description: 'Visualizza la tua musica',
    public: true, 
    execute(ctx){
        jmongo.loadAll('songs', { owner: ctx.from.id }).then((result) => {
            for(let i=0; i<result.length; i++){
                ctx.replyWithAudio(result[i].file_id);
            }
        })
    }
}