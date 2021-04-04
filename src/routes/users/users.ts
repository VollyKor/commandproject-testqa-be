import express from 'express'
import guard from '../../helpers/guard'
import userController from '../../controllers/C_user'
const router = express.Router()

router
    .post('/registration', userController.reg)
    .post('/login', userController.login)
    .post('/logout', guard, userController.logout)
    .get('/current', guard, userController.current)

export default router