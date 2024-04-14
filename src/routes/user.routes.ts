import { Router } from 'express'
import {
  getMe,
  login,
  register,
  createAdmin,
  deleteAdmin,
  getAllAdmin,
  updateAdmin
} from '../controllers/user.controller'
import authToken from '../middlewares/authToken'

export const UserRouter: Router = Router()

UserRouter.post('/register', register)
UserRouter.post('/login', login)
UserRouter.get('/me', authToken, getMe)
UserRouter.post('/admin', authToken, createAdmin)
UserRouter.get('/admin', authToken, getAllAdmin)
UserRouter.put('/admin/:id', authToken, updateAdmin)
UserRouter.patch('/admin/:id', authToken, updateAdmin)
UserRouter.delete('/admin/:id', authToken, deleteAdmin)
