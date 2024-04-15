import mongoose, { Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const KabarBerita = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

KabarBerita.plugin(mongoosePaginate)

KabarBerita.method('toJSON', function (this: Document) {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

interface InstitutionDocument extends Document {
  title: string
  image: string
  content: string
  time: string
}

export const KabarBeritaModel = mongoose.model<InstitutionDocument, mongoose.PaginateModel<InstitutionDocument>>(
  'KabarBerita',
  KabarBerita
)
