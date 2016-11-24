const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// get all timelines
app.get('/api/timelines', (req, res) => {
  res.json({test:"test"})
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
