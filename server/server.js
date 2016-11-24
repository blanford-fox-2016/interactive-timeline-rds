const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    cors = require('cors'),
    port = 8080,

    TIMELINE_FILE = path.join(__dirname, 'timeline.json')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/timeline', function(req, res) {
    fs.readFile(TIMELINE_FILE, function(err, datas) {
        if (err) {
            console.error(err)
        }
        res.json(JSON.parse(datas))
    })
})

app.post('/api/timeline', function(req, res) {
    fs.readFile(TIMELINE_FILE, function(err, datas) {
        if (err) { console.log(err) }
        var timeline = JSON.parse(datas)
        var newPost = {
            id: req.body.id,
            name: req.body.name,
            post: req.body.post
        }
        timeline.push(newPost)
        fs.writeFile(TIMELINE_FILE, JSON.stringify(timeline, null, 4), function(err) {
            if (err) { console.log(err) }
            res.json(newPost)
        })
    })
})

app.delete('/api/timeline', function(req, res) {
    var data = fs.readFileSync(TIMELINE_FILE)
    var timeline = JSON.parse(data)

    for (var i = 0; i < timeline.length; i++) {
        if (timeline[i].id == req.body.id) {
            timeline.splice(i, 1)
            fs.writeFile(TIMELINE_FILE, JSON.stringify(timeline, null, 4), function(err) {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'data not found' })
                } else {
                    res.json(timeline)
                }
            })
        }
    }
})

app.put('/api/timeline', function(req, res) {
    var data = fs.readFileSync(TIMELINE_FILE)
    var timeline = JSON.parse(data)

    for (var i = 0; i < timeline.length; i++) {
        if (timeline[i].id == req.body.id) {
            timeline[i].name = req.body.name
            timeline[i].post = req.body.post

            fs.writeFile(TIMELINE_FILE, JSON.stringify(timeline, null, 4), function(err) {
                if (err) {
                    console.log(err);
                    res.json({'message': 'data not found'})
                } else {
                    res.json(timeline)
                }
            })
        }
    }
})

app.listen(port, function() {
    console.log('eak eneh udah jalan di port', port)
})
