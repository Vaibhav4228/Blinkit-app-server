import mongoose from 'mongoose';
import Counter from './counter.js'; // Assuming 'counter.js' defines the Counter model

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true, // Ensure orderId is always generated
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPartner',
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      item: { // Consider using a single 'productId' field for clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
  ],
  deliveryLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
  },
  pickupLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
  },
  deliveryPersonLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
    address: { type: String },
  },
  status: {
    type: String,
    enum: ['available', 'In Progress', 'Completed', 'Cancelled', 'confirmed', 'arriving'],
    default: 'available',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { name: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}

orderSchema.pre('save', async function (next) {
  if (!this.orderId) { // Check if orderId is already set (avoid overwriting)
    const sequenceValue = await getNextSequenceValue("orderId");
    this.orderId = `ORDR${sequenceValue.toString().padStart(6, '0')}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;