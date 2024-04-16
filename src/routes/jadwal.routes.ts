import { Router } from 'express'
import authToken from '../middlewares/authToken'
import {
  createJadwalAcara,
  deleteJadwalAcara,
  getJadwalAcara,
  getJadwalAcaraById,
  updateJadwalAcara
} from '../controllers/jadwal.controller'

export const JadwalAcaraRouter: Router = Router()

JadwalAcaraRouter.post('/', authToken, createJadwalAcara)
JadwalAcaraRouter.get('/', getJadwalAcara)
JadwalAcaraRouter.get('/:id', getJadwalAcaraById)
JadwalAcaraRouter.put('/:id', authToken, updateJadwalAcara)
JadwalAcaraRouter.patch('/:id', authToken, updateJadwalAcara)
JadwalAcaraRouter.delete('/:id', authToken, deleteJadwalAcara)
