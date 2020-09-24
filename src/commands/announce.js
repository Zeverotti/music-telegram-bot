const JMongo = require('jmongo');
const jmongo = new JMongo(process.env.DB_URL, process.env.DB_NAME);

module.exports = {
    name: 'announce',
    description: 'Announce a message to all user',
    public: false,
    access: 'private',
    execute(ctx){
        jmongo.loadAll('songs', {}, { owner: '' }).then((result) => {
            const uniqueUsers = Array.from(new Set(result.map(a => a.owner)))
             .map(owner => {
               return result.find(a => a.owner === owner)
             })
            for(let i=0; i<uniqueUsers.length; i++){
                ctx.telegram.sendMessage(uniqueUsers[i].owner, ctx.state.command.args);
            }
        })
    }
}