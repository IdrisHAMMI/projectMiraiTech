import mongoose , { Schema }from 'mongoose';


export interface ITransactionSchema {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

export interface TransactionID {
  ownerId: mongoose.Types.ObjectId;
  paypalTransactionId: string;
  totalPrice: number;
  items: ITransactionSchema[];
}


export const transactionSchema = new mongoose.Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Users'
  },
  paypalTransactionId: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "product" },
      quantity: { type: Number }
    }
  ]
}, { timestamps: true });


export interface ITransactionDocument extends ITransactionSchema, Document {}

export const TransactionModel = mongoose.model<ITransactionSchema>('Transaction', transactionSchema);
