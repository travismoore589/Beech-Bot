const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');

const BOT = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

console.log(new Date().getDate())

BOT.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    BOT.commands.set(command.data.name, command);
}

BOT.once('ready', () => {
BOT.user.setStatus('available');
    BOT.user.setActivity('cursed quotes', { type: 'LISTENING',
    
    });
    console.log('Ready!');
});

BOT.login("MTA0MjY5MzAxNTczMjQ5ODQ3Mg.G-WnuZ.k8B5LXS1R6M2l8DgjQVhYurEURaQP6cSE1qPL8").then(() => {
    console.log('bot successfully logged in');
});

BOT.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = BOT.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});
