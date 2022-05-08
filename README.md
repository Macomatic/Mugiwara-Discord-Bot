<div id="top"></div>

<br />
<div align="center">

  <h3 align="center">Mugiwara Discord Bot</h3>

  <p align="center">
    A general-purpose Discord bot with some niche functionality made with Node.js!
  </p>
</div>

<!-- ToC -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- About Section -->
## About The Project

*Mugiwara Discord Bot* is a general-purpose Discord bot made with Node.js. Since I use Discord daily and interact with others on the application, I found that making a Discord bot is both interesting and exciting. I wanted to create more functionality than [This Python Discord Bot I also made.](https://github.com/Macomatic/WilfredDiscordBot) It's a small project I've worked on on my spare time to further my learning and experience with Node.js.

The Discord Bot currently has the following functionality:
* Random Number Generation
* Basic Math Operations
* Getting the weather for a given city
* Search through MyAnimeList (MAL)
  * Find MAL User
  * Load Random MAL information
  * Load top MAL information
  * Load current Anime season
* Find Anime by Picture

The goal of this project is to show my knowledge Node.js as well as my ability to understand and implement different APIs.

### Built With

The following are a list of dependencies/packages that were used in the Discord bot. Links to their installation are also provided.

* [Node.js](https://nodejs.org/en/)
* [Discord.js](https://discord.js.org/#/)
* [Weather.js](https://www.npmjs.com/package/weather-js)
* [Trace.moe.js](https://www.npmjs.com/package/trace.moe)
* [Anilist-Node](https://www.npmjs.com/package/anilist-node)
* [JikanJS](https://github.com/mateoaranda/jikanjs)

## Getting Started

To get started, you first want to make sure you have access to Github or Git to clone the repo. In addition, having npm and node on one's computer is necessary.

### Prerequisites

If you do not have node or npm, go to [The Official Node.js website](https://nodejs.org/en/) to download it. After installing the application, confirm it was successful by running the following in CMD:
  ```sh
  node -v
  ```
  ```sh
  npm -v
  ```
If successful, it should show information about the node and npm versions.

### Installation

To install the Discord bot locally, you must follow these intructions.

1. Clone the repo
   ```sh
   git clone https://github.com/Macomatic/Mugiwara-Discord-Bot.git
   ```
   OR use the *Clone* option at the top of the page alongisde Github Desktop
2. Open CMD in the local repository directory
3. Install NPM packages using CMD
   ```sh
   npm install
   ```
4. In the main repository directory, edit the `config.js`
5. To get the token value, follow [this link](https://discordjs.guide/preparations/setting-up-a-bot-application.html#what-is-a-token-anyway) to create and get the token. After getting the token value, edit it here:
   ```js
   "token": "DISCORD_BOT_AUTH_TOKEN_GOES_HERE"
   ```
6. [Invite the bot you created in *Step 5* to your server](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
7. Follow [this link](https://www.remote.tools/remote-work/how-to-find-discord-id) to get the ID values for the newly-added Discord Bot and the Discord Server's ID
8. Replace the following value with the ID of the Discord bot
   ```js
   "clientId": "DISCORD_BOT_ID_GOES_HERE"
   ```
9. Replace the following value with the ID of the Discord server
   ```js
   "guildId": "DISCORD_SERVER_ID_GOES_HERE"
   ```

## Usage

To run the bot, open the main directory of the repository in CMD. Run the following commands:
   ```sh
   node commands.js
   ```
The command prompt should say *Successfully registered application commands.* Run this command:
   ```sh
   node index.js
   ```
The command prompt should say *Bot is online and running!*. Check your discord server; if the bot is online, you have got it working!

Now type a / in chat, click the bot's icon on the left navbar on the popup, and you should be able to see all of the bots commands. Commands include:

* /animebypicture: Finds the anime based on a given image
* /findmaluser: Gives the MAL account for the provided username
* /getanimeseason: Gets the top 10 anime of the season based on the given parameter
* /getrandom: Finds random information on MAL on the given parameter
* /gettop: Gets the top 25 of the given parameter on MAL
* /math: Computes basic math operations
* /ping: Responds with pong!
* /rng: Generates a number from 0 to a given number
* /weather: Gets the weather for a provided city
   
For all of these commands, it will prompt for parameters when you select them.
  
## Roadmap

- [ ] Add Moderation Commands
    - [ ] Kick
    - [ ] Ban
    - [ ] Mute
    - [ ] Timeout
- [ ] Makes gif with given text and gif url
- [ ] Spin the wheel
    - [ ] Takes in options as parameters
    - [ ] Creates a gif where each option is part of the wheel
    - [ ] Gif shows a wheel spinning and lands on 1 option
    - [ ] Gif is sent in chat

## Contributing

Any contributions and other Discord functionality are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.


## Contact

Email: marco.vethanayagam@gmail.com

## Acknowledgments

Here are some resources that will help with developing the bot!

* [Discord JS Setup](https://discordjs.guide/#before-you-begin)
* [Trace Moe API](https://soruly.github.io/trace.moe-api/#/)
* [Anilist API](https://anilist.gitbook.io/anilist-apiv2-docs/)
* [Weather JS](https://www.npmjs.com/package/weather-js)
* [CanvasJS](https://www.npmjs.com/package/canvas) --> For *Spin the Wheel* functionality
* [Gifencoder](https://www.npmjs.com/package/gifencoder) --> For *Spin the Wheel* functionality


