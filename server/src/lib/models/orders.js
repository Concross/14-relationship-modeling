'use strict';

import mongoose from 'mongoose';
import Customers from './customers';
const Schema = mongoose.Schema;

const orderSchema = Schema({
  orderDate: { type: Date, required: true, default: Date() },
  orderTotal: { type: Number },
  itemQuantity: { type: Number, required: true, default: 1 },
  shippingOption: { type: String, default: 'ground', enum: ['ground', '2-day air', 'freight'] },
  customer: { type: Schema.Types.ObjectId, ref: 'Customers', required: true },
});

orderSchema.pre('findById', function (next) {
  this.populate('customers');
  next();
});

orderSchema.pre('save', function (next) {
  let orderId = this._id;
  let customerId = this.customer;

  Customers.findById(customerId)
    .then(customer => {
      if (!customer) {
        return Promise.reject('Sorry, invalid customer');
      } else {
        Customers.findByIdAndUpdate(
          customerId,
          { $addToSet: { orders: orderId } }
        )
          .then(Promise.resolve())
          .catch(err => Promise.reject(err));
      }
    })
    .then(next())
    .catch(next);
});

export default mongoose.model('orders', orderSchema);