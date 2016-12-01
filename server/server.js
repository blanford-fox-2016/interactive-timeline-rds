const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

app.use(morgan())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const models = require ('./models')
const Users = models.Users
const Timelines = models.Timelines
const Comments = models.Comments

// get all timelines
app.get('/api/timelines', (req, res) => {
  Timelines.findAll({
    include: [{
      model: Users
    },{
      model: Comments,
      include: {
        model: Users
      }
    }],
    order: '"id" DESC, "Comments.id" ASC'
  })
  .then((all_data, err) => {
      if(err){
        console.error(err);
      }else{
        res.json(all_data)
      }
  })
})

// get 1 username by timeline
app.get('/api/timelines/:id', (req, res) => {
  Timelines.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Users
    }]
  })
  .then((timeline, err) => {
      if(err){
        console.error(err);
      }else{
        res.json(timeline)
        // timeline.getUsers().then((user, err) => {
        //   console.log(user);
        //   res.json({username: user.username})
        // })
      }
  })
})

//create new timeline
app.post('/api/timelines', (req, res) => {
  Timelines.create({
    UserId: 1, //default nanti sesuati user login
    content: req.body.content
  }).then((new_data, err) => {
    // console.log(new_data.id);
    if(err){
      console.error(err);
    }else{
      Timelines.findOne({
        where: {
          id: new_data.id
        },
        include: [{
          model: Users
        },{
          model: Comments,
          include: {
            model: Users
          }
        }]
      }).then((timeline, err) => {
        console.log(timeline.id);
        if(err){
          console.error(err);
        }else{
          // console.log(timeline);
          res.json(timeline)
        }
      })
    }
  })
})

// edit a timeline
app.put('/api/timelines/:id', (req, res) => {
  Timelines.findOne({
    where: {
      id: req.params.id
    }
  }).then((edited_data, err) => {
    edited_data.content = req.body.content
    edited_data.save()
    if(err){
      console.error(err);
    }else{
      res.json(edited_data)
    }
  })
})

// delete a timeline
app.delete('/api/timelines/:id', (req, res) => {
  Timelines.destroy({
    where: {
      id: req.params.id
    }
  }).then((deleted_data, err) => {
    if(err){
      console.error(err);
    }else{
      res.json(deleted_data)
    }
  })
})

// get all comments in a timeline
app.get('/api/comments', (req, res) => {
  Comments.findAll({
    // where: {
    //   id: req.params.timelineId
    // },
    // include: [{
    //   model: Comments
    // },
    include: [{
      model: Users
    }],
    order: '"id" ASC'
  }).then((comment, err) => {
    if(err){
      console.log(err);
    }else{
      res.json(comment);
      // timeline.getComments({
      //   include: {
      //     model: Users
      //   }
      // }).then((comment, err) => {
      //   let result = []
      //   for (var i = 0; i < comment.length; i++) {
      //     result.push(comment[i].dataValues);
      //   };
      //
      //   res.json(result);
      // })
    }
  })
})

// create new comment in a timeline
app.post('/api/timelines/:timelineId/comments', (req, res) => {
  Timelines.findOne({
    where: {
      id : req.params.timelineId
    }
  }).then((timeline, err) => {
    if(err){
      console.log(err);
    }else{
      Comments.create({
        content: req.body.content,
        TimelineId: timeline.id,
        UserId: 1
      }).then((comment, err) => {
        if(err){
          console.log(err);
        }else{
          Comments.findOne({
            where: {
              id: comment.id
            },include: {
              model: Users
            }
          }).then((err, comment_user) => {
              if(err){
                console.log(err);
                res.json(err)
              }else{
                res.json(comment_user)
              }
          })
        }
      })
    }
  })
})

app.listen(3000, function(){
  console.log(`Server is running in port 3000`);
})
/*
db_timelines_rds
sequelize model:create --name Users --attributes "username:string,password:string,email:string"
sequelize model:create --name Timelines --attributes "content:string"
sequelize model:create --name Comments --attributes "content:string"

FK
sequelize migration:create --name add_FK_UserId_to_Timelines_table
sequelize migration:create --name add_FK_UserId_to_Comments_table
sequelize migration:create --name add_FK_TimelineId_to_Comments_table

*/
