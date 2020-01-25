// Create constant variables that initialise bot.
const Discord = require('discord.js');
const client = new Discord.Client();
const MemeCodes = "odns - one does not simply\n"
                + "2buttons - two buttons\n"
                + "mocksponge - mocking spongebob\n"
                + "aliens - aliens guy\n"
                + "xeverywhere - buzz lightyear everywhere\n"
                + "pika - surprised pickachu";

// When bot receives message, check that its not from bot and starts with !mememeister.
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return;
    }

    if (receivedMessage.content.startsWith("!MMHelp")) {
        receivedMessage.channel.send("!MMMemeCodes - display a list of memes you can create.\n!MMMeme - create a meme by using a meme " 
        + "code and two text variables. (!MMMeme,memecode,text2,text2)");

    } else if (receivedMessage.content.startsWith("!MMMemeCodes")) {
        receivedMessage.channel.send(MemeCodes);

    } else if (receivedMessage.content.startsWith("!MMMeme")) {

        var fullCommand = receivedMessage.content.substr(13);
        var splitCommand = fullCommand.split(",");
        var template = splitCommand[0];
        var textZero = splitCommand[1];
        var textOne = splitCommand[2];
        var tempID = "";

        switch (template) {
            case "odns":
                tempID += "61579";
                break;
        
            case "2buttons":
                tempID += "87743020";
                break;
                
            case "mocksponge":
                tempID += "102156234";
                break;

            case "aliens":
                tempID += "101470";
                break;

            case "xeverywhere":
                tempID += "91538330";
                break;

            case "pika":
                tempID += "155067746";
                break;
        }

        var request = require('request');
        request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url:     'https://api.imgflip.com/caption_image',
          body: "template_id=" + tempID + "&username=fotogi&password=123456789!Abc&text0=" + textZero + "&text1=" + textOne
        }, function(error, response, body){
            var json = JSON.parse(body);
            var memeURL = json.data.url;
            receivedMessage.channel.send(receivedMessage.author.toString() + " here's your spicy meme!\n" + memeURL);
        });        
    }
})

// Login bot.
client.login("NjcwNDU5MTU4OTczMzgyNjU2.Xiu0Gw.jJRr_zBvDAPWoyKxui0P7z9WyP4");