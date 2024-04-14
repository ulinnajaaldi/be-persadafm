/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { ProgamAcaraModel } from '../models/progam-acara.model'

export const createProgamAcara = async (req: Request, res: Response) => {
  const { title, image, content, time, highlight = false } = req.body
  try {
    const ProgamAcaraValidation = await ProgamAcaraModel.findOne({ title })

    if (ProgamAcaraValidation) {
      logger.error('ProgamAcara already exists')
      return res.status(400).send('ProgamAcara already exists')
    }

    const ProgamAcara = await ProgamAcaraModel.create({ title, image, content, time, highlight })

    logger.info('ProgamAcara created success')
    res.status(201).send({
      message: 'ProgamAcara created success',
      data: ProgamAcara
    })
  } catch (error) {
    logger.error('Err: ProgamAcara - create', error)
    res.status(400).send({
      message: 'ProgamAcara created failed',
      data: {}
    })
  }
}

export const getProgamAcara = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = '' } = req.query

  try {
    const ProgamAcara = await ProgamAcaraModel.paginate(
      {
        // @ts-ignore
        title: { $regex: search, $options: 'i' }
      },
      { page: +page, limit: +limit, sort: { createdAt: -1 } }
    )

    const { docs: results, limit: limitPerPage, totalPages, prevPage, nextPage, page: currentPage } = ProgamAcara

    logger.info('Get ProgamAcara success')
    return res.status(200).send({
      message: 'Get ProgamAcara success',
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
    logger.error('Err: ProgamAcara - get', error)
    res.status(400).send({
      message: 'ProgamAcara get failed',
      data: {}
    })
  }
}

export const getProgamAcaraById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const ProgamAcara = await ProgamAcaraModel.findById(id)

    if (!ProgamAcara) {
      logger.error('ProgamAcara not found')
      return res.status(404).send('ProgamAcara not found')
    }

    logger.info('Get ProgamAcara by id success')
    res.status(200).send({
      message: 'Get ProgamAcara by id success',
      data: ProgamAcara
    })
  } catch (error) {
    logger.error('Err: ProgamAcara - get by id', error)
    res.status(400).send({
      message: 'ProgamAcara get by id failed',
      data: {}
    })
  }
}

export const updateProgamAcara = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, image, content, time, highlight } = req.body

  try {
    const ProgamAcara = await ProgamAcaraModel.findByIdAndUpdate(
      id,
      { title, image, content, time, highlight },
      { new: true }
    )

    if (!ProgamAcara) {
      logger.error('ProgamAcara not found')
      return res.status(404).send('ProgamAcara not found')
    }

    logger.info('ProgamAcara updated success')
    res.status(200).send({
      message: 'ProgamAcara updated success',
      data: ProgamAcara
    })
  } catch (error) {
    logger.error('Err: ProgamAcara - update', error)
    res.status(400).send({
      message: 'ProgamAcara updated failed',
      data: {}
    })
  }
}

export const deleteProgamAcara = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const ProgamAcara = await ProgamAcaraModel.findByIdAndDelete(id)

    if (!ProgamAcara) {
      logger.error('ProgamAcara not found')
      return res.status(404).send('ProgamAcara not found')
    }

    logger.info('ProgamAcara deleted success')
    res.status(200).send({
      message: 'ProgamAcara deleted success'
    })
  } catch (error) {
    logger.error('Err: ProgamAcara - delete', error)
    res.status(400).send({
      message: 'ProgamAcara deleted failed',
      data: {}
    })
  }
}
