import { Router } from 'express'

import auth from './controller/auth'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json('The key to success in DFS is to play badly but run hot')
})

router.get('/auth/user', auth.get.checkSignin)
router.post('/user/signup', auth.post.signup)
router.post('/user/signin', auth.post.signin)
router.post('/user/signout', auth.post.logout)

export default router