const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('cookie-session')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = 3000

app.use(session({ secret: process.env.SECRET }))
  .use(function (req, res, next) {
    if (typeof (req.session.todolist) == 'undefined') {
      req.session.todolist = []
  }
    next()
  })

  .get ('/todo', function (req, res) {
    res.render('todo.ejs', { todolist: req.session.todolist })
  })

  .post ('/todo/add/', urlencodedParser, function (req, res) {
    if (req.body.newtodo != '') {
      req.session.todolist.push(req.body.newtodo)
    }
    res.redirect('/todo')
  })

  .get ('/todo/delete/:id', function (req, res) {
    if (req.params.id != '') {
      req.session.todolist.splice(req.params.id, 1)
    }
    res.redirect('/todo')
  })

  .use (function (req, res, next) {
    res.redirect('/todo')
  })


  .listen(port, () => console.log(`MyTodo app is listening on port ${port}!`))