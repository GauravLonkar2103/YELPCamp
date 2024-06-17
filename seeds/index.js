const mongoose=require('mongoose')
const Campground=require('../models/campground');
const cities = require('./cities');
const {places,descriptors}=require("./seedHelpers")
mongoose.connect('mongodb://localhost:27017/yelp_camp',{})
.then(()=>{
    console.log("Connection Open")
})
.catch((err)=>{
    console.log("Ohh ERROR");
    console.log(err)
})


const sample=(arr)=>arr[Math.floor(Math.random()*arr.length)];

const seedDB=async ()=>{
    await Campground.deleteMany({})
    for(i=0;i<50;i++){
        const rand1000=Math.floor(Math.random()*100)
        const newCamp=await new Campground({
            
            title:`${sample(descriptors)} ${sample(places)}`,
            location:`${cities[rand1000].city},${cities[rand1000].state}`,
            image:"https://source.unsplash.com/collection/9046579",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium recusandae vero quaerat laborum ut libero, ratione eaque. Aperiam, mollitia rerum.",
            price:Math.floor(Math.random()*5000)+1000
        })
        await newCamp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});