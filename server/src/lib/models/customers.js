'use strict';

import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const customerSchema = Schema({
  name: { type: String, required: true },
  age: { type: Number, max: 120, min: 0 },
  gender: { type: String, required: true, enum: ['m', 'M', 'f', 'F'] },
  salary: { type: Number, min: 0 },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Orders' }],
});

customerSchema.pre('findById', function (next) {
  this.populate('orders');
  next();
});

export default mongoose.model('customers', customerSchema);