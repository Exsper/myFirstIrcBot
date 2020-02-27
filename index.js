
const IRC = require("irc-framework");

let bot = new IRC.Client();
bot.connect({
    host: 'cho.ppy.sh',
    port: 6667,
    nick: 'ExSPer',
    password: '******'   // https://osu.ppy.sh/p/irc
});

let buffers = [];
function getChannel(channelName) {
    return buffers.find(item => item.name === channelName);
}

bot.on('registered', function () {
    var channel = bot.channel('#chinese');
    buffers.push(channel);

    channel.join();
    //channel.join("mp_31339974");

    //channel.say('Hi!');

    //channel.updateUsers(function() {
    //    console.log(channel.users);
    //});

    // Or you could even stream the channel messages elsewhere
    // var stream = channel.stream();
    // stream.pipe(process.stdout);
});


bot.on('join', function (event) {
    console.log(event.nick + " joined " + event.channel);
});

/*
bot.on('quit', function(event) {
    console.log(event.nick + " quit");
});
*/

bot.on('action', function (event) {
    console.log(event.nick + " action: " + event.message);
});

bot.on('privmsg', function (event) {
    console.log(event.nick + " say: " + event.message);
});


function say(channelName, words) {
    let channel = getChannel(channelName);
    if (!channel) {
        console.log("not in " + channelName);
        return;
    }
    channel.say(words);
}

process.stdin.on('data', (input) => {
    input = input.toString().trim();
    say("#chinese", input);
});