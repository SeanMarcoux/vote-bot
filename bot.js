const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');

var dailyVoteTimer;
var channel;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Voting");
    var channels = client.channels.array();
    
    findVoteChannel();
    startDailyVoteTimer();
});

client.on('message', msg => {
    
});

function findVoteChannel() {
    var channels = client.channels.array();
    for(var j = 0; j < channels.length; j++)
    {
        if(channels[j].name && channels[j].name.toLowerCase().includes("bot"))
        {
            channel = channels[j];
            break;
        }
    }
}

function startDailyVoteTimer() {
    var millis = getMillisTilMidnight();
    dailyVoteTimer = setTimeout(vote, millis);
}

function getMillisTilMidnight() {
    var midnight = new Date();
    midnight.setHours( 24 );
    midnight.setMinutes( 2 );
    midnight.setSeconds( 0 );
    midnight.setMilliseconds( 0 );
    var currentTime = new Date().getTime();
    return (midnight.getTime() - currentTime);
}

function vote() {
    var fileText = fs.readFileSync("votes.txt");
    var lines = fileText.split("\n");
    
    for(var i = 0; i < lines.length; i++) {
        if(lines[i].length == 0)
            break;
        
        channel.send(lines[i]);
    }
}

var key = fs.readFileSync("key.txt");
client.login(key.toString());