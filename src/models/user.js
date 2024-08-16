import mongoose from 'mongoose';

// Base user schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  role: {
    type: String,
    enum: ["Customer", "admin", "DeliveryPartner"],
    required: true
  },
  isActivated: { type: Boolean, default: false },
});

// Customer schema
const customerSchema = new mongoose.Schema({
  ...userSchema.obj,
  phone: { type: Number, required: true, unique: true },
  role: {
    type: String,
    enum: ["Customer"], 
    default: "Customer"
  },
  liveLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  address: { type: String },  // Corrected type to String
});

// Delivery partner schema
const deliveryPartnerSchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true, unique: true },
  role: { type: String, enum: ["DeliveryPartner"], default: "DeliveryPartner" },
  liveLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  address: { type: String },  // Corrected type to String
  // Branch reference
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});

// Admin schema
const adminSchema = new mongoose.Schema({
  ...userSchema.obj,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin"], default: "admin" },
});

export const Customer = mongoose.model('Customer', customerSchema);
export const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);
export const Admin = mongoose.model('Admin', adminSchema);
