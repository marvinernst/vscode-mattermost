'use strict';

import * as vscode from 'vscode';
import * as request from 'request';

var channelNames = [];

const configuration = vscode.workspace.getConfiguration('mattermost');
const channels = configuration.get('channels');
for (var channel in channels) {
    channelNames.push(channels[channel].name)
}


class Mattermost {

    private SelectChannel(data) {
        vscode.window.showQuickPick(channelNames).then((channel) => {
            if (channel) {
                const channelId = channelNames.indexOf(channel);
                const channelUrl = channels[channelId].url;
                
                this.Send(channelUrl, data);
            }
        });
    }
    
    private Send(url, data) {
      
        request.post({
            url: url,
            body: data,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                vscode.window.showInformationMessage('Succesfully send');
            } else {
                vscode.window.showErrorMessage('Could not send message');
            }
        });
    }

    public SendMessage() {
        const options = {
            prompt: 'Please enter a message',
        }

        vscode.window.showInputBox(options).then((text) => { 
            if (text) {
                this.SelectChannel({
                    text
                })
            }
        })
    }

    public SendSelection() {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        var selection = editor.selection;

        var data = {
            text: '``` \n' + editor.document.getText(selection) + '\n```'
        };

        this.SelectChannel(data);
    }
}

export function activate(context: vscode.ExtensionContext) {
    if (channels) {
        let mattermost = new Mattermost();

        var sendSelection = vscode.commands.registerCommand('mattermost.sendSelection', () => mattermost.SendSelection());
        var sendMessage = vscode.commands.registerCommand('mattermost.sendMessage', () => mattermost.SendMessage());

        context.subscriptions.push(sendSelection, sendMessage);
    } else {
        vscode.window.showErrorMessage('Please enter a valid hook url to use this extension');
    }
    
}

// this method is called when your extension is deactivated
export function deactivate() {
}