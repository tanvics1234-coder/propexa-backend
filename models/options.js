// Shared schema options: adds createdAt/updatedAt and returns "id" instead of "_id"
module.exports = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => { delete ret._id; },
  },
};