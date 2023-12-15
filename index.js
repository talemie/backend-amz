const express = require('express')
const cors = require('cors')
require('dotenv').config()
const stripe = require("stripe")(
	process.env.CLIENT_SECRET
);
const port = 10000
// app config
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Home route -> for test
app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

// for client secret fetch
app.get("/payments/create", async (req, res) => {
	const total = req.query.total
	console.log(`Payment request received ${total/100}`); 
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,//subu_nits of the currency
			currency: 'usd'
		})
		res.status(201).send({clientSecret:paymentIntent.client_secret})
	} catch (error) {
		console.log(error.message);
	}
});

app.listen(port, (err) => {
	if (err) {
		console.log(err.message);
	} else {
		console.log(`App listening to: http://localhost:${port}`);
	}
});