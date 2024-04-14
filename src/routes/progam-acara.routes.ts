import { Router } from 'express'
import authToken from '../middlewares/authToken'
import {
  createProgamAcara,
  deleteProgamAcara,
  getProgamAcara,
  getProgamAcaraById,
  updateProgamAcara
} from '../controllers/progam-acara.controller'

export const ProgamAcaraRouter: Router = Router()

ProgamAcaraRouter.post('/', authToken, createProgamAcara)
ProgamAcaraRouter.get('/', getProgamAcara)
ProgamAcaraRouter.get('/:id', getProgamAcaraById)
ProgamAcaraRouter.put('/:id', authToken, updateProgamAcara)
ProgamAcaraRouter.patch('/:id', authToken, updateProgamAcara)
ProgamAcaraRouter.delete('/:id', authToken, deleteProgamAcara)
