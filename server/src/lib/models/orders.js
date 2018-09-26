'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = Schema({
  orderDate: { type: Date, required: true, default: Date() },
  orderTotal: { type: Number },
  itemQuantity: { type: Number, required: true, default: 1 },
  shippingOption: { type: String, default: 'ground', enum: ['ground', '2-day air', 'freight'] },
  customer: { type: Schema.Types.ObjectId, ref: 'Customers', required: true },
});

export default mongoose.model('orders', orderSchema);