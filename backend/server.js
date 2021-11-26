/** @format */

const express = require('express')
const { MongoClient } = require('mongodb')
require('dotenv').config()
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId

const app = express()
const port = process.env.PORT

// middleware
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`
  })
)
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function run() {
  try {
    await client.connect()
    const database = client.db(`${process.env.DB_NAME}`)
    const servicesCollection = database.collection('insurance')
    const orderCollection = database.collection('orders')

    //get all services
    app.get('/services', async (req, res) => {
      const cursor = servicesCollection.find({})
      const services = await cursor.toArray()
      res.send(services)
    })

    // create a service
    app.post('/service', async (req, res) => {
      const service = req.body
      const result = await servicesCollection.insertOne(service)
      res.json(result)
    })

    //create a new order
    app.post('/order/:id', async (req, res) => {
      const id = req.params.id
      const order = req.body
      const query = { _id: ObjectId(id) }
      const service = await servicesCollection.findOne(query)
      //   const product = { ...service }
      const status = 'Pending'

      let mergedObj = { status, ...order, product: { ...service } }
      const result = await orderCollection.insertOne(mergedObj)
      res.json(result)
    })

    //get all orders
    app.get('/orders', async (req, res) => {
      const cursor = orderCollection.find({})
      const orders = await cursor.toArray()
      res.send(orders)
    })

    //get my orders
    app.get('/my-orders', async (req, res) => {
      const cursor = orderCollection.find({ email: req.headers.email })
      const orders = await cursor.toArray()
      res.send(orders)
    })

    // Delete Order by user
    app.delete('/order/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await orderCollection.deleteOne(query)
      res.json(result)
    })

    //Update order by User
    app.put('/order/:id', async (req, res) => {
      const id = req.params.id
      const updatedUser = req.body
      const filter = { _id: ObjectId(id) }
      const chckStatus = await orderCollection.findOne(filter)
      if (chckStatus.status === 'Pending') {
        const options = { upsert: true }
        const status = 'Completed'
        const updateOrderStatus = {
          $set: {
            status: status
          }
        }
        const result = await orderCollection.updateOne(
          filter,
          updateOrderStatus,
          options
        )
        res.json(result)
      } else {
        const options = { upsert: true }
        const status = 'Pending'
        const updateOrderStatus = {
          $set: {
            status: status
          }
        }
        const result = await orderCollection.updateOne(
          filter,
          updateOrderStatus,
          options
        )
        res.json(result)
      }
    })
  } finally {
    // await client.close()
  }
}
run().catch(console.dir)

app.get('/', async (req, res) => {
  await client.connect()
  res.send('Server Already Connect With Database')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
