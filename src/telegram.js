const { config } = require('dotenv-safe');
config()
const Telegraf = require('telegraf')
// const Composer = require('telegraf/composer')
// const session = require('telegraf/session')
// const Stage = require('telegraf/stage')
// const { enter, leave } = Stage
// const Extra = require('telegraf/extra')
// const Markup = require('telegraf/markup')
// const WizardScene = require('telegraf/scenes/wizard')
// const Scene = require('telegraf/scenes/base')

// const axios = require('axios');
// const { promises: fs } = require("fs");
const schedule = require('node-schedule')
const { get_premios } = require('./sorteio')


const bot = new Telegraf(process.env.BOT_TOKEN)


const emptyChar = "‎";
const spaceChar = '&#160;'

function getHiddenLink(url, parse_mode = "markdown") {
    switch (parse_mode) {
        case "markdown":
            return `[${emptyChar}](${url})`;
        case "HTML":
            return `<a href="${url}">${emptyChar}</a>`;
        default:
            throw new Error("invalid parse_mode");
    }
}

const notificacao = new schedule.scheduleJob('*/10 * * * * *', async () => {
    const { name, description, img, links: inline_keyboard } = await get_premios()
    const spaces = spaceChar.repeat(10)
    try{
    bot.telegram.sendMessage(
        process.env.GROUP_ID,
        `${spaces}<b>${name}</b>\n${description}\n${getHiddenLink(img, "HTML")}
          `,
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard
            },
        }
    );
}catch{
    console.log('erro')
}
})

bot.use((ctx, next) => {
    console.log(ctx.message)
    if (ctx.message?.chat?.type == 'private') {
        return next()
    }
})

bot.startPolling()

module.exports = { bot }