const express = require('express')
const stripe = require('stripe')('sk_test_51HrS4KJKmVlFmiJDOm1NWy4pDJV0wPaHfNU2OjPvcEQQrSWzflwWUmttLzycdDi5MnioeMitN1Huo9OeupeWXkqx00AwviYiXz');

const app = express()
const port = 3000

app.engine("html", require("ejs").renderFile);
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('login.html')
})

app.post('/login', async (req, res) => {
  const customer = await stripe.customers.create({
    email: "test@email.com",
    description: 'My First Test Customer (created for API docs)',
  });
  res.send("customer created:" + JSON.stringify(customer));
})

app.get('/account', (req, res) => {
  res.render('account.html')
})

app.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription", 
    payment_method_types: ["card"],
    customer: "cus_ISNXi0HLkDzbyV",
    line_items: [
      {
        price: "price_1HrSnOJKmVlFmiJDCqOzSyoK",
        quantity: 1
      }
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  })

  console.log(session);
  
  res.send({sessionId: session.id});
})

app.get('/success', (req, res) => {
  res.send('Payment successful')
})

app.get('/cancel', (req, res) => {
  res.send('Payment cancelled')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})