const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const models = require ('./models')
const Users = models.Users
const Timelines = models.Timelines
const Comments = models.Comments

// get all timelines
app.get('/api/timelines', (req, res) => {
  Timelines.findAll()
  .then((all_data, err) => {
      if(err){
        console.error(err);
      }else{
        res.json(all_data)
      }
  })
})

//create new timeline
app.post('/api/timelines', (req, res) => {
  Timelines.create({
    UserId: 1, //default nanti sesuati user login
    content: req.body.content
  }).then((new_data, err) => {
      if(err){
        console.error(err);
      }else{
        res.json(new_data)
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
