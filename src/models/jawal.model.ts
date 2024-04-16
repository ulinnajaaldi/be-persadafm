import mongoose, { Document } from 'mongoose'

const EventSchema = new mongoose.Schema({
  hours: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  }
})

const JadwalAcaraSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true
    },
    events: {
      type: [EventSchema],
      required: true
    }
  },
  {
    timestamps: true
  }
)

JadwalAcaraSchema.method('toJSON', function (this: Document) {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

export const JadwalAcaraModel = mongoose.model('JadwalAcara', JadwalAcaraSchema)
