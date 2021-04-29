const express = require('express')
const puppeteer = require('puppeteer')

const server = express()

server.get('/', async (request, response) => {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        page.goto('https://www.alura.com.br/')

        const pageContent = await page.evaluate(() => {
            return {
                title: document.querySelector('body .home .container .home__titles__main-title').innerHTML
            }
        })
        await browser.close()

        response.send({
            title: pageContent.title
        })
    } catch (err) {
        console.log(err)
        response.send({
            status: 500,
            message: 'Ooops, an erros has occurred...'
        })
    }
})

server.listen(3000, () => {
    console.log('>>> Server is running on http://localhost:3000');
})