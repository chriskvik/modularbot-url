/* Author: Christian Kråkevik
   Mail : christian(a)gmail.com
   Url  : https://github.com/iNzzane/modularbot-url
   Desc : Simple URL-parser for parsing site titles, based on posted url's.
   Usg  : This module is created for usage with ModularBot https://github.com/Xstasy/modular-bot
   Help : Read readme for installation instructions.
*/


module.exports = {
    Module: function(Bot, Module) {

    // On new message.
    Bot.on('message', function(message) {
        // message.to message.from message.text
        var urls = linkify(message.text);
        // If we got urls in the message.
        if(urls) {
            urls.forEach(function(url) {
                console.log(url);
                // Put http:// in front if user did not.
                if (!(url.substring(0, 4) == "http")) {

                    url = 'http://' + url;
                }



                Bot.Request(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
                        var match = re.exec(body);
                        if (match && match[2]) {
                            Bot.Send(message.to, "Link | " + match[2] + ' - ' + url );
                        }       
                    }
                })
          }); 
        }
    }); 



// Return all url matches from message.
    function linkify(text) {  
        var urlRegex =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;  
    
        return text.match(urlRegex, function(url) {  
            console.log(url);
            return url;  
        })  
    }

    }
};
