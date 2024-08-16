import mongoose from 'mongoose';
import { DeliveryPartner } from './user.js';

const branchSchema = new mongoose.Schema({
  //ye branch scehma mein jo  jitne bhi same areas k user hai wo aajenge
  name: {type: String, required: true},
  liveLocation: {
    latitude: {type: Number},
    longitude: {type: Number},

  },
  address: {type : String},
  DeliveryPartners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPartner",
    },
  ],

})

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;

