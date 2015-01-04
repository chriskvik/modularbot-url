Modularbot-URL
==============

Simple url-parsing module for your [ModularBot](https://github.com/Xstasy/modular-bot) installation. This module looks for url's posted in the channel and cleanly formats them to an appropiate format. The link with an page-title will then be posted to the channel.

### Matching regex's
 - http://www.google.no
 - http://google.no
 - www.google.no
 - google.no

### How it looks

```
<Exclusive>  http://github.com.
<ModularBot> Link | GitHub · Build software better, together. - http://github.com
```
### Installation
- Copy the Links.js into your /modules directory.
- Issue the reload command, either from CLI or channel (.reload).
