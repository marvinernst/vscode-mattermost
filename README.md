Visual Studio Code Mattermost extension
=========================

![Screenshot](icon.png)


https://marketplace.visualstudio.com/items/devilop3rz.mattermost

This extension is not created by, affiliated with, or supported by Mattermost, Inc.

### Installation
You can install this extension by pressing F1 in Visual Studio Code, then typing "ex install" and selecting it from the list.

### Configuration
Go to User Settings (File > Preferences > User Settings) and add the following 
```
  "mattermost.channels": {
    "name": "<your channel name>",
    "url": "<your channel url>"
  }
```

* ##### `"channel url"` (required)
    * You can get the url from (https://docs.mattermost.com/developer/webhooks-incoming.html#enabling-incoming-webhooks)


### Features
* Send messages to
    * public channels
    * private channels
* Can send message:
    * from selected code
    * from user input
* @user supported (at the beginning of message)

    
### Upcoming features
* Send files


### Feedback / Bug report / feature request
https://github.com/devilop3rz/vscode-mattermost/issues


#### Credits
* Logo by [Mattermost, Inc.](https://about.mattermost.com/)
* Heavily inspired by Sozercan's Slack plugin: https://github.com/sozercan/vscode-slack