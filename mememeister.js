// Initialize bot.
const Discord = require('discord.js');
const client = new Discord.Client();

// Message thats printed to chat when user requests which templates are available. 
const MemeCodes = "odns - one does not simply\n"
                + "2buttons - two buttons\n"
                + "mocksponge - mocking spongebob\n"
                + "aliens - aliens guy\n"
                + "xeverywhere - buzz lightyear everywhere\n"
                + "pika - surprised pickachu";

// When bot receives message, check if message uses specified commands.
client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return;
    }

    // Check if help command.
    if (receivedMessage.content.startsWith("!MMHelp")) {
        receivedMessage.channel.send("!MMMemeCodes - display a list of memes you can create.\n!MMMeme - create a meme by using a meme " 
        + "code and two text variables. (!MMMeme,memecode,text2,text2)");

      // Check if code code requests.
    } else if (receivedMessage.content.startsWith("!MMMemeCodes")) {
        receivedMessage.channel.send(MemeCodes);

      // Check if meme request.
    } else if (receivedMessage.content.startsWith("!MMMeme")) {

        // Get meme request and split message into single values.
        var fullCommand = receivedMessage.content.substr(8); // Remove command from front and save string.
        var splitCommand = fullCommand.split(","); // Split command by commas and save in array.
        var template = splitCommand[0]; // Index 0 specifies the type meme requested.
        var textZero = splitCommand[1]; // The first text for the meme.
        var textOne = splitCommand[2]; // The second text for the meme.
        var tempID = "";
      
        // Check which code requested meme is.
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

        // Make POST request to imgflip API.
        var request = require('request');
        request.post({
          headers: {'content-type' : 'application/x-www-form-urlencoded'},
          url:     'https://api.imgflip.com/caption_image',
          
          // Replace USERNAME and PASSWORD with your actual imgflip account credentials.
          body: "template_id=" + tempID + "&username=USERNAME&password=PASSWORD&text0=" + textZero + "&text1=" + textOne
        }, function(error, response, body){
            // Parse response into json.
            var json = JSON.parse(body);
            // Extract img url from response.
            var memeURL = json.data.url;
            // Tag user and post link.
            receivedMessage.channel.send(receivedMessage.author.toString() + " here's your spicy meme!\n" + memeURL);
        });        
    }
})

// Login bot. Enter your discord bot token here. This is needed to actually login the bot.
client.login("");
