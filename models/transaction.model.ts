import mongoose, { Document, Schema } from 'mongoose';

export interface ITransactionItem {
    name: string;
    quantity: number;
    unit_amount: {
        currency_code: string;
        value: string;
    };
}
export interface ITransaction {
    ownerId: mongoose.Types.ObjectId;
    paypalTransactionId: string;
    totalPrice: number;
    items: ITransactionItem[];
}

export interface ITransactionSchema extends Document {
    items: ITransactionItem[];
    ownerId: string;
    paypalTransactionId: string;
    totalPrice: number;
}

const transactionItemSchema = new Schema({
    name: { type: String },
    quantity: { type: Number },
    unit_amount: {
        currency_code: { type: String },
        value: { type: String }
    }
});

const transactionSchema = new Schema({
    items: [transactionItemSchema],
    ownerId: { type: String, required: true },
    paypalTransactionId: { type: String, required: true },
    totalPrice: { type: Number, required: true }
});

export const TransactionModel = mongoose.model<ITransactionSchema>('Transaction', transactionSchema);

