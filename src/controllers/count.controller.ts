/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { ProgamAcaraModel } from '../models/progam-acara.model'
import { KabarBeritaModel } from '../models/kabar-berita.model'
import { GaleriImageModel } from '../models/galeri.model'

export const count = async (req: Request, res: Response) => {
  try {
    const countProgamAcara = await ProgamAcaraModel.countDocuments()
    const countKabarBerita = await KabarBeritaModel.countDocuments()
    const countGaleriImage = await GaleriImageModel.countDocuments()

    logger.info('Count success')
    return res.status(200).send({
      message: 'Count success',
      data: {
        countProgamAcara,
        countKabarBerita,
        countGaleriImage
      }
    })
  } catch (error) {
    logger.error('Err: Count', error)
    res.status(400).send({
      message: 'Count failed',
      data: {}
    })
  }
}
