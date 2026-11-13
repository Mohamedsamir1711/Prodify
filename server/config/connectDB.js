const mongoose = require('mongoose');
const chalk = require('chalk');

let cached = global.mongooseCache;
if (!cached) cached = global.mongooseCache = { conn: null, promise: null };

const connectDB = async () => {
  // إن كان الاتصال موجوداً من طلب سابق، أعد استخدامه
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = (async () => {
      const conn = await mongoose.connect(process.env.MONGO_URL);

      console.log(chalk.green(`MongoDB Connected: ${conn.connection.host}`));
      console.log(chalk.blue(`Database Name: ${conn.connection.name}`));

      try {
        await mongoose.connection.collection('users').dropIndex('name_1');
        console.log(chalk.yellow('Removed legacy users.name_1 index'));
      } catch (dropErr) {
        if (dropErr.code !== 27) {
          console.warn(chalk.yellow(`Legacy index cleanup: ${dropErr.message}`));
        }
      }

      return conn;
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // للسماح بإعادة المحاولة في الطلب القادم
    console.error(chalk.red(`Error connecting to MongoDB: ${error.message}`));
    throw error;
  }

  return cached.conn;
};

module.exports = connectDB;