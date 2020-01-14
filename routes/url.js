const express = require('express')

const router = express.Router()

const validUrl = require('valid-url')

const shortid = require('shortid')

const config = require('config')

const url = require('../models/url')

// @route POST /api/url/shorten

//@desc create short url

router.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');
    //console.log(longUrl)

    // check base url

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json("Invalid Base Url")
    }
    
    // create url code

    const urlCode = shortid.generate()

    // check long url

    if (validUrl.isUri(longUrl)) {

        try {

            let url_request = await url.findOne({ longUrl })
            
            if (url_request) {
                res.json(url_request)
            }
            else {
                const shortUrl = baseUrl + '/' + urlCode

                // save it in mongodb

                url_request = new url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date:new Date()
                })

                await url_request.save() // save the url to database
            }
            
        } catch (err) {
            console.err(err)
            res.status(500).json("Server error occured")
        }
        
    } else {
        res.status(401).json("Invalid Long URL")
    }
})


module.exports = router