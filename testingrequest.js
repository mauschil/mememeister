
    var tempID = 112126428;
    var textZero = "This is a test";
    var textOne = "Does it work?";

    createMeme(tempID, textZero, textOne);

function createMeme(tempID, textZero, textOne) {

    
    var request = require('request');
    request.post({
      headers: {'content-type' : 'application/x-www-form-urlencoded'},
      url:     'https://api.imgflip.com/caption_image',
      body: "template_id=" + tempID + "&username=fotogi&password=123456789!Abc&text0=" + textZero + "&text1=" + textOne
    }, function(error, response, body){
      var json = JSON.parse(body);
      let memeURL = json.data.url;
      console.log(memeURL);
    });
}


