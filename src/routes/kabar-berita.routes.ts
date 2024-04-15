import { Router } from 'express'
import authToken from '../middlewares/authToken'
import {
  createKabarBerita,
  deleteKabarBerita,
  getKabarBerita,
  getKabarBeritaById,
  updateKabarBerita
} from '../controllers/kabar-berita.controller'

export const KabarBeritaRouter = Router()

KabarBeritaRouter.post('/', authToken, createKabarBerita)
KabarBeritaRouter.get('/', getKabarBerita)
KabarBeritaRouter.get('/:id', getKabarBeritaById)
KabarBeritaRouter.put('/:id', authToken, updateKabarBerita)
KabarBeritaRouter.patch('/:id', authToken, updateKabarBerita)
KabarBeritaRouter.delete('/:id', authToken, deleteKabarBerita)
