import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, autoIndex: true })
export class OrderDocument extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
// OrderSchema.index({ name: 1 }, { unique: true });

OrderSchema.index({ name: 1, price: 1 });
OrderSchema.index({ name: 1, phoneNumber: 1 }, { unique: true });

OrderSchema.index({ '$**': 'text' }, { name: 'textIndex' });
