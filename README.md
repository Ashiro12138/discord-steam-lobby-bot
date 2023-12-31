# discord-steam-lobby-bot

This currently works by web scrapping the steam user page and checking for a join lobby link.  
User discord id to steam id is stored in self hosted firestore  
Further updates coming to improve things such as

-   Use local json database instead of remote NoSQL database
-   Create hyperlink for join lobby links

## Config setup

### config.json

```json
{
    "token": "your-token-goes-here",
    "clientId": "your-application-id-goes-here",
    "steamApiKey": "your-steam-api-key-goes-here"
}
```

-   token: Your bot's token (Discord Developer Portal > "Bot" > token)
-   clientId: Your application's client id (Discord Developer Portal > "General Information" > application id)
-   steamApiKey: Get steam api key from here [https://steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
    **Put `config.json` at project root**

### serviceAccountKey.json

1. In the Google Cloud console, go to the Service accounts page.
2. schoolThe remaining steps will appear automatically in the Google Cloud console.
3. Select a project.
4. Click the email address of the service account that you want to create a key for.
5. Click the Keys tab.
6. Click the Add key drop-down menu, then select Create new key.
7. Select JSON as the Key type and click Create.
8. Clicking Create downloads a service account key file. After you download the key file, you cannot download it again.
9. **Rename as `serviceAccountKey.json` and put at project root**

## Special Thanks to C.T. Matthews

This repo is inspired by no longer maintained [Mori Bot](https://github.com/ctmatthews/sglobbylink-discord.py)
