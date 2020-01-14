const express = require('express')

const router = express.Router()

const url = require('../models/url')

//@route GET /:code

//@desc // redirect sort url to long url

router.get('/:code', async (req, res) => {
    try {
        console.log(req.params.code)
        const url_request = await url.findOne({ urlCode: req.params.code })
        
        if (url_request) {
            return res.redirect(url_request.longUrl)
        }
        else {
            return res.status(404).json("No url found")
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).json("Server error")
    }
})


module.exports = router