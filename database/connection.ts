import mongoose, {ConnectOptions} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
    } as ConnectOptions);
    isConnected = db.connections[0].readyState === 1;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}