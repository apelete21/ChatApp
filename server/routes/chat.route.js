const express = require('express');
const { createChat, findChat, findUserChats } = require('../controllers/chat.controller');

const router = express.Router()

router.post('/', createChat)
router.get('/:userId', findUserChats)
router.get('/find/:fistId/:secondId', findChat)

module.exports = router