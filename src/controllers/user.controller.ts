import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { logger } from '../utils/logger'
import { JWT_SECRET } from '../constants/config'
import { UserModel } from '../models/user.model'
import { createUserValidation } from '../validations/user.validation'

export const register = async (req: Request, res: Response) => {
  const { error, value } = createUserValidation(req.body)

  if (error) {
    logger.error('Validation error: ', error)
    return res.status(400).send({ message: 'Invalid input', data: {} })
  }

  try {
    const exitingUser = await UserModel.findOne({ email: value.email })
    if (exitingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    await UserModel.create(value)

    logger.info('Create user success')
    return res.status(201).send({
      message: 'Create user success',
      data: {}
    })
  } catch (error) {
    logger.error('Err: user - create ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}

export const login = async (req: Request, res: Response) => {
  const { usernameOrEmail, password } = req.body
  try {
    const User = await UserModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    })
    if (!User) {
      logger.error('User not found')
      return res.status(400).send({ message: 'User not found', data: {} })
    }

    const isMatch = await bcrypt.compare(password, User.password)

    if (!isMatch) {
      logger.error('Invalid login')
      return res.status(400).send({ message: 'Invalid login', data: {} })
    }

    const token = jwt.sign({ id: User.id }, JWT_SECRET!, { expiresIn: '1d' })

    return res.status(200).send({
      message: 'Login success',
      data: {
        username: User.username,
        token
      }
    })
  } catch (error) {
    logger.error('Err: user - create ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const currentUser = await UserModel.findById(req.body.user.id)

    if (!currentUser || currentUser.role !== 'Superadmin') {
      return res.status(403).send({ message: 'Only superadmin can create admin', data: {} })
    }

    const { username, password, email } = req.body

    const newUser = await UserModel.create({ username, password, email, role: 'Admin' })

    return res.status(201).send({
      message: 'Admin created successfully',
      data: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    })
  } catch (error) {
    logger.error('Err: user - create admin ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}

export const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const currentUser = await UserModel.findById(req.body.user.id)

    if (!currentUser || currentUser.role !== 'Superadmin') {
      return res.status(403).send({ message: 'Only superadmin can get all admin', data: {} })
    }

    const allAdmin = await UserModel.find({ role: 'Admin' })

    return res.status(200).send({
      message: 'Get all admin success',
      data: allAdmin.map((admin) => ({
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }))
    })
  } catch (error) {
    logger.error('Err: user - get all admin ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const currentUser = await UserModel.findById(req.body.user.id)

    if (!currentUser || currentUser.role !== 'Superadmin') {
      return res.status(403).send({ message: 'Only superadmin can update admin', data: {} })
    }

    const { id } = req.params
    const { username, password, email } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { username, password: hashedPassword, email },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(400).send({ message: 'User not found', data: {} })
    }

    return res.status(200).send({
      message: 'Admin updated successfully',
      data: {
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role
      }
    })
  } catch (error) {
    logger.error('Err: user - update admin ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const currentUser = await UserModel.findById(req.body.user.id)

    if (!currentUser || currentUser.role !== 'Superadmin') {
      return res.status(403).send({ message: 'Only superadmin can delete admin', data: {} })
    }

    const { id } = req.params

    const deletedUser = await UserModel.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(400).send({ message: 'User not found', data: {} })
    }

    return res.status(200).send({
      message: 'Admin deleted successfully',
      data: {
        username: deletedUser.username,
        role: deletedUser.role
      }
    })
  } catch (error) {
    logger.error('Err: user - delete admin ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const User = await UserModel.findById(req.body.user.id)

    if (!User) {
      return res.status(400).send({ message: 'User not found', data: {} })
    }

    return res.status(200).send({
      message: 'Get me success',
      data: {
        username: User.username,
        email: User.email,
        role: User.role
      }
    })
  } catch (error) {
    logger.error('Err: user - get me ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}
