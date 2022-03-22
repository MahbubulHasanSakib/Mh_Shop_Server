const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoose=require('mongoose')
const path = require('path');
const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
const shippingRoutes=require('./routes/shippingRoutes')
const orderRoutes=require('./routes/orderRoutes')
dotenv.config()

const app=express()
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.json())


mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('mongoose is connected'))
.catch((err)=>console.log(err))

app.use(cors())

///routes
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/shipping',shippingRoutes)
app.use('/api/order',orderRoutes)

app.all('*', function(req, res) {
    res.redirect("/api/products/");
  });






const PORT=process.env.PORT;

app.listen(PORT,(err)=>
{
    if(err) console.log(err)
    else console.log(`Server is running at ${PORT}`)
})