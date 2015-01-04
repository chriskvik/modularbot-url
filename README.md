Modularbot-URL
==============

Simple url-parsing module for your [ModularBot](https://github.com/Xstasy/modular-bot) installation. This module looks for url's posted in the channel and cleanly formats them to an appropiate format. We then provide the description for the posted link, if no description is available we use the site-title. If the user posts an incorret URL, like "nytimes.com" the module also output a fully working link.

### Matching URL-formats
 - http://www.google.no
 - http://google.no
 - www.google.no
 - google.no

### How it looks
###### With appropiate formated link
```
<User> http://www.nytimes.com/pages/world/index.html
<ModularBot> Find breaking news, world news and multimedia on Africa...
```
###### With lazy linking
```
<User> nytimes.com/pages/world/index.html
<ModularBot> Link | http://nytimes.com/pages/world/index.html
<ModularBot> Find breaking news, world news and multimedia on Africa...
```
### Installation

```
1. Install dependencies :
   npm install lets-get-meta
   npm install utf8
2. Copy the Links.js into your /modules directory.
3. Issue the reload command, either from CLI or channel (.reload).
```
