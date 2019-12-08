# Toto Notifier Bot
Repository for [@TotoNotifierbot](https://t.me/TotoNotifierbot) 

A bulk notification telegram bot for upcoming Toto Jackpot Prize (Singapore)

## Main Tech used

The main tech used were:

* **Netlify Functions** - Serverless compute function
* **Telegraf** - Framework to create Telegram bot on Node.js
* **FaunaDB** - Serverless Database 

They are easy to use, doesn't have much additional cost to take into consideration and easier tie-in with web development. Lastly, it has a **generous free tier limit** 👍👍 

## Overcoming Constraints
A main problem with bulk notification is the limitation imposed by Telegram - [30 message/s](https://core.telegram.org/bots/faq#broadcasting-to-users) and Netlify Function - [10 second execution limit](https://docs.netlify.com/functions/overview/#manage-your-serverless-functions). This bot **overcame** these constraints, making it suitable for high scalability, which also can be used as a starting point for other bulk notification Telegram bot (that are using this stack).

## Getting Started

To be updated

## Disclaimer

I am not affiliated, associated, authorized, endorsed by, or in any way officially related with Singapore Pools, or any of its subsidiaries or its affiliates.