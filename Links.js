/* Author: Christian Kråkevik
   Mail : christian(a)gmail.com
   Url  : https://github.com/iNzzane/modularbot-url
   Desc : Simple URL-parser for parsing site titles, based on posted url's.
   Usg  : This module is created for usage with ModularBot https://github.com/Xstasy/modular-bot
   Help : Read readme for installation instructions.
*/

var Iconv  = require('iconv').Iconv;

module.exports = {
    Module: function(Bot, Module) {

    // On new message.
    Bot.on('message', function(message) {
        // message.to message.from message.text
        var urls = linkify(message.text);
        var postLink = false;
        // If we got urls in the message.
        if(urls) {
            urls.forEach(function(url) {
                // Put http:// in front if user did not.
                if (!(url.substring(0, 4) == "http")) {

                    url = 'http://' + url;
                    postLink = true;
                }

            Bot.Request(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        // Format response to UTF8
                        console.log(response.headers['content-type']);
                        body = new Buffer(body, 'binary');
                        var iconv = new Iconv('ISO-8859-1', 'UTF-8');
                        body = iconv.convert(body).toString('utf-8');

                        var getMeta = require("lets-get-meta");
                        var siteinfo = getMeta(body);
                        var siteTitle = siteinfo.title;

                        if(!siteTitle) {
                            var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
                            var match = re.exec(body);
                            if (match && match[2]) {
                             siteTitle = match[2];
                            }  
                            else {
                                siteTitle = 'Empty'
                            }
                        }

                        if (postLink) {
                            Bot.Send(message.to, 'Link | ' + url);

                        }
                        if(siteinfo.description) {
                            Bot.Send(message.to, siteinfo.description);
                            if(Bot.Config.irc.verbose)
                            Bot.Console.Log('[Linker] New web-paged parsed : ' + siteinfo.description);
                        }
                        else {
                            Bot.Send(message.to, siteTitle);
                            if(Bot.Config.irc.verbose)
                            Bot.Console.Log('[Linker] New web-paged parsed : ' + siteTitle);

                        }
                    }

                    else {
                        if(Bot.Config.irc.verbose)
                        Bot.Console.Log('[Linker] Error when parsing link, to get title.')
                    }
                })
          }); 
        }
    }); 




// Return all url matches from message.
    function linkify(text) {  
        var urlRegex =/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,5}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;  
    
        return text.match(urlRegex, function(url) {  
            return url;  
        })  
    }

    }
};
