import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  image: string;
  shippingPolicy?: string;
  returnPolicy?: string;
}

export interface Grade {
  name: string;
  products: Product[];
}

export interface School extends Document {
  name: string;
  grades: Grade[];
}

const ProductSchema = new Schema<Product>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, required: true },
  shippingPolicy: { type: String },
  returnPolicy: { type: String },
});

const GradeSchema = new Schema<Grade>({
  name: { type: String, required: true },
  products: { type: [ProductSchema], default: [] },
});

const SchoolSchema = new Schema<School>({
  name: { type: String, required: true },
  grades: { type: [GradeSchema], default: [] },
});

const SchoolModel = models.School || model<School>('School', SchoolSchema);
export default SchoolModel;
