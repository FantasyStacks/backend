import log from 'ololog'

import db from '../../db/models'
import passport from '../middleware/localPassport'

let controller = {
  post: {},
  get: {},
}

controller.get.checkSignin = (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: 'user signed in',
      user: req.user,
    })
  } else {
    res.status(404).json({message: 'user not signed in'})
  }
}

controller.post.signup = (req, res) => {
  return db.User.create(req.body)
    .then(() => {
      req.login(req.body, (err) => {
        if (err) {
          log('there was an error in automatic signin', err)
          return res.status(401).send('User created but problem logging in')
        }
        return res.status(200).json({
          message: 'user created successfully'
        })
      })
    })
    .catch((err) => {
      res.status(401).send({
        message: 'there was an error signing up',
        err: err.errors[0].message
      })
    })
}

controller.post.logout = (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
}

controller.post.signin = (req, res) => {
  
  passport.authenticate('local', (err, user/*, info*/) => {
    
    if (err || !user) {
      return res.status(422).send(!user 
        ? 'username does not exist'
        : 'password is incorrect'
      )
    }
    
    user = user.dataValues

    delete user.password
    delete user.salt

    req.login(user, (err) => {
      if (err) {
        return res.status(400).send({
          message: 'unable to log in user',
          err
        })
      }
      return res.json(user)
    })
  })(req, res)
}

export default controller