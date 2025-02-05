const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: [true, 'Product name is required'] },
    price: { type: Number, required: [true, 'Product price is required'] },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
    },
    description: { type: String },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = { ProductModel, connectDatabase };
