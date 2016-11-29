var express = require('express');
var router = express.Router();
const timelinesController = require('../controllers/controllers.api.timelines')

/* GET home page. */
router.get('/', timelinesController.getAllTimeline)
router.get('/:id', timelinesController.getTimelineById)
router.post('/', timelinesController.createTimeline)
router.put('/', timelinesController.updateTimeline)
router.delete('/', timelinesController.deleteTimeline)

module.exports = router;
