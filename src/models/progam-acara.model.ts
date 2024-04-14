import mongoose, { Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ProgamAcaraSchema = new mongoose.Schema(
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
    },
    time: {
      type: String,
      required: true
    },
    highlight: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

ProgamAcaraSchema.plugin(mongoosePaginate)

ProgamAcaraSchema.method('toJSON', function (this: Document) {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

interface InstitutionDocument extends Document {
  title: string
  image: string
  content: string
}

export const ProgamAcaraModel = mongoose.model<InstitutionDocument, mongoose.PaginateModel<InstitutionDocument>>(
  'Berita',
  ProgamAcaraSchema
)
