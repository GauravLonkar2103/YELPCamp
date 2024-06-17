const express=require('express')
const app=express()
const path=require('path')
const methodOverride=require('method-override')
const mongoose=require('mongoose')
const ejsMate=require("ejs-mate")
mongoose.connect('mongodb://localhost:27017/yelp_camp',{})
.then(()=>{
    console.log("Connection Open")
})
.catch((err)=>{
    console.log("Ohh ERROR");
    console.log(err)
})
const Campground=require('./models/campground')


app.engine("ejs",ejsMate)
app.set("views",path.join(__dirname,'views'))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))


app.get("/campgrounds/:id/update",async (req,res)=>{
    const {id}=req.params
    const upcamp=await Campground.findById(id)
    res.render("campgrounds/update",{upcamp})
})

app.patch('/campgrounds/:id', async (req,res)=>{
    const {id}=req.params
    const {...upcamp}=req.body
    const a=await Campground.findOneAndUpdate({_id:id},{title:upcamp.campground.title,location:upcamp.campground.location,image:upcamp.campground.image,price:upcamp.campground.price,description:upcamp.campground.description},{new:true,runValidators:true})
    res.redirect(`/campgrounds/${a._id}`)
})

app.get('/campgrounds/:id/delete', async (req,res)=>{ 
    await Campground.findOneAndDelete({_id:req.params.id},{new:true,runValidators:true}) 
    res.redirect('/campgrounds')
})  
app.post('/campgrounds', async (req,res)=>{
    const newCamp=await new Campground(req.body.campground)
    await newCamp.save()
    res.redirect(`/campgrounds/${newCamp._id}`)
 })

app.get('/campgrounds/new',(req,res)=>{
    res.render("campgrounds/new")
})


app.get("/campgrounds",async (req,res)=>{
    const campgrounds1=await Campground.find({})
    res.render("campgrounds/index",{campgrounds1})
})

app.get('/campgrounds/:id',async (req,res)=>{
    const {id}=req.params
    const campf=await Campground.findById(id)
    res.render("campgrounds/show",{campf})
})

app.listen(3000,()=>{
    console.log('Listening to port 3000')
})