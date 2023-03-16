// require packages
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require handlebars
const exphbs =  require('express-handlebars')
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurantList.results})
})

//click restaurant and display detailed info
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {restaurant: restaurant})
})

//search, display restaurants
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const searchResult = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })
  res.render('index', {restaurants: searchResult})
})


// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})