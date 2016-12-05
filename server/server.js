const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')
const app = express()

// JSON Web Tokens
const jwt = require('jsonwebtoken')

// Authentication
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const models = require ('./models')
const Users = models.Users
const Timelines = models.Timelines
const Comments = models.Comments

var nodemailer = require('nodemailer');


app.use(morgan())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

// passport.use(Users.createStrategy());
passport.use(new LocalStrategy(Users.authenticate()))
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

// register user
app.post('/api/users/signup', (req, res, next) => {
  // Users.create({
  //   username: req.body.username,
  //   password: req.body.password,
  //   email: req.body.email,
  //   photo_URL: req.body.photo_URL
  // }).then((user) => {
  //     var user_token = {
  //       sub: user.id,
  //       username: user.username,
  //       email: user.email,
  //       photo_URL: user.photo_URL
  //     }
  //
  //     var token = jwt.sign(user_token, 'secret', { expiresIn: 60 * 60 })
  //
  //     res.status(200).json({
  //       token: token
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(`error`);
  //     res.satatus(400).json(err)
  //   })
  var token = jwt.sign({
                username: req.body.username,
                email: req.body.email,
                photo_URL: req.body.photo_URL
              }, 'secret', { expiresIn: 5 })

  // create reusable transporter object using the default SMTP transport
  // var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kendui94@gmail.com',
        pass: 'efnkquozwbytjxel'
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
  });
  // console.log(token);
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Ken Duigraha Putra ?" <kenduigraha@yahoo.com>', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: 'Verify Register', // Subject line
      text: 'Please click this link to verify your email', // plaintext body
      html: `<a href="http://localhost:3000/api/users/${token}" alt="_target">click this link</a>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          return res.json(error)
      }
      console.log('Message sent: ' + info.response);

      Users.register({
        username: req.body.username,
        email: req.body.email,
        photo_URL: req.body.photo_URL
      },req.body.password, (err, new_user) => {
        if(err){
          console.log(err);
          res.status(400).json(err)
        }else {
          // console.log(new_user.dataValues);
          res.json(new_user)

          // passport.authenticate('local', {}, (err, user, info) => {
          //   if(err){
          //     return res.status(400).json(err)
          //   }else{
          //     return res.status(200).json({
          //       token: jwt.sign({
          //         sub: user.id,
          //         username: user.username,
          //         email: user.email,
          //         photo_URL: user.photo_URL
          //       }, 'secret', { expiresIn: 60*60 })
          //     })
          //   }
          // })(req, res, next)
        }
      })
  });
})

// login user
app.post('/api/users/login', (req, res, next) => {
  // Users.findOne({
  //   where: {
  //     username: req.body.username,
  //     password: req.body.password
  //   }
  // }).then((login_user) => {
  //     console.log(login_user);
  //     if (!login_user) return res.status(400).json('No User Found')
  //     else{
  //       var user_token = {
  //         sub: login_user.id,
  //         username: login_user.username,
  //         email: login_user.email,
  //         photo_URL: login_user.photo_URL
  //       }
  //
  //       var token = jwt.sign(user_token, 'secret', { expiresIn: 60 * 60 })
  //
  //       res.status(200).json({
  //         token: token
  //       })
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err)
  //   })
  passport.authenticate('local', {}, (err, user, info) => {
    if(err){
      return res.status(400).json(err)
    }else{
      if(user != false){
        console.log(user);
        return res.status(200).json({
          token: jwt.sign({
            sub: user.id,
            username: user.username,
            email: user.email,
            photo_URL: user.photo_URL
          }, 'secret', { expiresIn: 60*60 })
        })
      }else{
        return res.status(400).json(info)
      }
    }
  })(req, res, next)
})

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
    UserId: req.body.data_user.sub,
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
        // console.log(timeline.id);
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
        UserId: req.body.data_user.sub
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
          }).then((comment_user, err) => {
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
