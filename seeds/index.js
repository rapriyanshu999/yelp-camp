

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');
    

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:"63bfc9ef769993a8569442d7",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry:{
                type:"Point",
                coordinates:[cities[random1000].longitude,cities[random1000].latitude]
              },
            title: `${sample(descriptors)} ${sample(places)}`,
            
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/duuby6wuo/image/upload/v1673707507/YelpCamp/she9izmon7uiyqa4yw8f.jpg',
                  filename: 'YelpCamp/she9izmon7uiyqa4yw8f'
                  
                },
                {
                    url:'https://res.cloudinary.com/duuby6wuo/image/upload/v1673706344/YelpCamp/oqk98w3u3xpb6hgmo1gm.jpg',
                    filename:'YelpCamp/oqk98w3u3xpb6hgmo1gm'
                }
              ]
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
