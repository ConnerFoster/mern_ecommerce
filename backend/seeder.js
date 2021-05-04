import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    //deletes everything from database for use of importing new data
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    //array of users
    const createdUsers = await User.insertMany(users)

    //admin from users array will be first element due to our users.js file
    const adminUser = createdUsers[0]._id

    //sets adminUser in user field of products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    //deletes everything from database for use of importing new data
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Removed'.yellow.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
