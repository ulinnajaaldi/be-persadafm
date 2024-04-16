/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { JadwalAcaraModel } from '../models/jawal.model'

export const createJadwalAcara = async (req: Request, res: Response) => {
  const { day, events } = req.body
  try {
    const JadwalAcaraValidation = await JadwalAcaraModel.findOne({ day })

    if (JadwalAcaraValidation) {
      logger.error('JadwalAcara already exists')
      return res.status(400).send({
        message: 'JadwalAcara already exists',
        data: {}
      })
    }

    const JadwalAcara = await JadwalAcaraModel.create({ day, events })

    logger.info('JadwalAcara created success')
    res.status(201).send({
      message: 'JadwalAcara created success',
      data: JadwalAcara
    })
  } catch (error) {
    logger.error('Err: JadwalAcara - create', error)
    res.status(400).send({
      message: 'JadwalAcara created failed',
      data: {}
    })
  }
}

export const getJadwalAcara = async (req: Request, res: Response) => {
  const { search = '' } = req.query

  try {
    const JadwalAcara = await JadwalAcaraModel.find({
      // @ts-ignore
      day: { $regex: search, $options: 'i' }
    })

    logger.info('Get JadwalAcara success')
    return res.status(200).send({
      message: 'Get JadwalAcara success',
      data: {
        results: JadwalAcara
      }
    })
  } catch (error) {
    logger.error('Err: JadwalAcara - get', error)
    res.status(400).send({
      message: 'Get JadwalAcara failed',
      data: {}
    })
  }
}

export const getJadwalAcaraById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const JadwalAcara = await JadwalAcaraModel.findById(id)

    if (!JadwalAcara) {
      logger.error('JadwalAcara not found')
      return res.status(404).send({
        message: 'JadwalAcara not found',
        data: {}
      })
    }

    logger.info('Get JadwalAcara by id success')
    res.status(200).send({
      message: 'Get JadwalAcara by id success',
      data: JadwalAcara
    })
  } catch (error) {
    logger.error('Err: JadwalAcara - get by id', error)
    res.status(400).send({
      message: 'Get JadwalAcara by id failed',
      data: {}
    })
  }
}

export const updateJadwalAcara = async (req: Request, res: Response) => {
  const { id } = req.params
  const { day, events } = req.body

  try {
    const JadwalAcara = await JadwalAcaraModel.findById(id)

    if (!JadwalAcara) {
      logger.error('JadwalAcara not found')
      return res.status(404).send({
        message: 'JadwalAcara not found',
        data: {}
      })
    }

    await JadwalAcaraModel.findByIdAndUpdate(id, { day, events })

    logger.info('JadwalAcara updated success')
    res.status(200).send({
      message: 'JadwalAcara updated success',
      data: { day, events }
    })
  } catch (error) {
    logger.error('Err: JadwalAcara - update', error)
    res.status(400).send({
      message: 'JadwalAcara updated failed',
      data: {}
    })
  }
}

export const deleteJadwalAcara = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const JadwalAcara = await JadwalAcaraModel.findById(id)

    if (!JadwalAcara) {
      logger.error('JadwalAcara not found')
      return res.status(404).send({
        message: 'JadwalAcara not found',
        data: {}
      })
    }

    await JadwalAcaraModel.findByIdAndDelete(id)

    logger.info('JadwalAcara deleted success')
    res.status(200).send({
      message: 'JadwalAcara deleted success',
      data: {}
    })
  } catch (error) {
    logger.error('Err: JadwalAcara - delete', error)
    res.status(400).send({
      message: 'JadwalAcara deleted failed',
      data: {}
    })
  }
}
