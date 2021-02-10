const express = require('express');
const router = express.Router();

//@ROUTE GET api/profile
//@desc TEST Profile
//@access Public
router.get('/',(req,res) => res.send('Profile route'));

module.exports = router;