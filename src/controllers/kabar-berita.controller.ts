/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { KabarBeritaModel } from '../models/kabar-berita.model'

export const createKabarBerita = async (req: Request, res: Response) => {
  const { title, image, content } = req.body
  try {
    const KabarBeritaValidation = await KabarBeritaModel.findOne({ title })

    if (KabarBeritaValidation) {
      logger.error('KabarBerita already exists')
      return res.status(400).send('KabarBerita already exists')
    }

    const KabarBerita = await KabarBeritaModel.create({ title, image, content })

    logger.info('KabarBerita created success')
    res.status(201).send({
      message: 'KabarBerita created success',
      data: KabarBerita
    })
  } catch (error) {
    logger.error('Err: KabarBerita - create', error)
    res.status(400).send({
      message: 'KabarBerita created failed',
      data: {}
    })
  }
}

export const getKabarBerita = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = '' } = req.query

  try {
    const KabarBerita = await KabarBeritaModel.paginate(
      {
        // @ts-ignore
        title: { $regex: search, $options: 'i' }
      },
      { page: +page, limit: +limit, sort: { createdAt: -1 } }
    )

    const { docs: results, limit: limitPerPage, totalPages, prevPage, nextPage, page: currentPage } = KabarBerita

    logger.info('Get KabarBerita success')
    return res.status(200).send({
      message: 'Get KabarBerita success',
      data: {
        currentPage,
        limitPerPage,
        totalPages,
        prevPage,
        nextPage,
        results
      }
    })
  } catch (error) {
    logger.error('Err: KabarBerita - get', error)
    res.status(400).send({
      message: 'KabarBerita get failed',
      data: {}
    })
  }
}

export const getKabarBeritaById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const KabarBerita = await KabarBeritaModel.findById(id)

    if (!KabarBerita) {
      logger.error('KabarBerita not found')
      return res.status(404).send('KabarBerita not found')
    }

    const recentKabarBerita = await KabarBeritaModel.find().sort({ createdAt: -1 }).limit(5)

    logger.info('Get KabarBerita by id success')
    res.status(200).send({
      message: 'Get KabarBerita by id success',
      data: KabarBerita,
      recent: recentKabarBerita
    })
  } catch (error) {
    logger.error('Err: KabarBerita - get by id', error)
    res.status(400).send({
      message: 'KabarBerita get by id failed',
      data: {}
    })
  }
}

export const updateKabarBerita = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, image, content } = req.body

  try {
    const KabarBerita = await KabarBeritaModel.findByIdAndUpdate(id, { title, image, content }, { new: true })

    if (!KabarBerita) {
      logger.error('KabarBerita not found')
      return res.status(404).send('KabarBerita not found')
    }

    logger.info('KabarBerita updated success')
    res.status(200).send({
      message: 'KabarBerita updated success',
      data: KabarBerita
    })
  } catch (error) {
    logger.error('Err: KabarBerita - update', error)
    res.status(400).send({
      message: 'KabarBerita updated failed',
      data: {}
    })
  }
}

export const deleteKabarBerita = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const KabarBerita = await KabarBeritaModel.findByIdAndDelete(id)

    if (!KabarBerita) {
      logger.error('KabarBerita not found')
      return res.status(404).send('KabarBerita not found')
    }

    logger.info('KabarBerita deleted success')
    res.status(200).send({
      message: 'KabarBerita deleted success'
    })
  } catch (error) {
    logger.error('Err: KabarBerita - delete', error)
    res.status(400).send({
      message: 'KabarBerita deleted failed',
      data: {}
    })
  }
}
