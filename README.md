# Telegraf Bot Template

This is a template for [Telegraf.js](https://telegraf.js.org/#/) with the purpose of facilitating the development of bots.

It contains a pre-configured environment and you will be able to launch your bot in a few minutes.

The bot's commands are dynamic, you can add your own without interacting with the internal code.

## Getting started

Use git to clone the template.

```bash
git clone https://github.com/jz-software/telegram-bot-template
```

Install dependencies.
```bash
npm install
```

Change the content in ```package.json``` to the information you want.

Set the environment variables (create an .env file or configure them depending on the server type).
```
TOKEN=your_bot_token # can be received from @botfather
```

## Usage

Run the bot using ```npm start```.

## Adding commands
An example file is already created in the ```src/commands``` folder:
```javascript
module.exports = {
    name: 'start',
    description: 'Receive a greeting from the bot',
    public: true, 
    execute(ctx){
        ctx.replyWithMarkdown('Hello World');
    }
}
```

```name```: The name of the command, the keyword that triggers the execution of this block.

```description```: A description of the command. Used when the user gets a list of the commands.

```public```: If set to true, it will be shown to the user in the bot's command list.

```execute```: The code to run. Ctx is always passed. To read more go [here](https://telegraf.js.org/#/?id=context).

## Adding scenes
You can create a scene by adding a file in ```src/scenes``` folder.
There is an example file which you can copy paste and customize.

When you created a scene you can enter it by: ```ctx.scene.enter('sceneName')```.

## License
[MIT](https://choosealicense.com/licenses/mit/)