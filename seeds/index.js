const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const {places , descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{;
    console.log('Mongo database conected!')
})

const sample = array=>array[Math.floor(Math.random()*array.length)]

const seedDB = async() =>{
    await Campground.deleteMany({});
    
    for(let i=0;i<200;i++)
    {   const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*30);
        const camp = new Campground({  author:'631c360e987e77efa7663752',
                                      location:`${cities[random1000].city},${cities[random1000].state}`,
                                     title:`${sample(descriptors)} ${sample(places)}`,
                                     geometry: { "type" : "Point", "coordinates" : [cities[random1000].longitude,cities[random1000].latitude] },
                                     images: [
                                        {
                                          url: 'https://res.cloudinary.com/dqyaawwp8/image/upload/v1663085936/YelpCamp/xljyrc3hx8kcbfizxzpz.jpg',
                                          filename: 'YelpCamp/xljyrc3hx8kcbfizxzpz'
                                        },
                                        {
                                          url: 'https://res.cloudinary.com/dqyaawwp8/image/upload/v1663085936/YelpCamp/rkbnyoztc0qaj3apfess.jpg',
                                          filename: 'YelpCamp/rkbnyoztc0qaj3apfess'
                                        }
                                      ],
                                     description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, officiis iste. Hic quas nobis eligendi, error eum, amet cupiditate doloremque cumque molestiae provident ratione suscipit quisquam inventore similique nesciunt tempora.',
                                     price:price
                                    });
         
         await camp.save();
    }
    
    
}

seedDB().then(()=>{
    mongoose.connection.close();
})