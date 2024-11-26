const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors = require('cors');


const app=express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/Recipes')
.then( ()=>{
     console.log('DB connected')})
.catch((err)=>{
    console.log(err)
})


app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from your frontend origin
}));


//Recipe Schema

const recipeSchema= new mongoose.Schema({
    name:String,
    ingredients:String,
    recipe:String,
    author:String

})

const Recipe=mongoose.model('Recipe',recipeSchema)



app.post('/recipes',async (req,res)=>{
    
const {name,ingredients,recipe,author}=req.body
const newRecipe=new Recipe({name,ingredients,recipe,author})
try {
    // Save the new recipe to the database
    await newRecipe.save();
    res.status(201).json({ message: 'Recipe added successfully!', recipe: newRecipe });
  } catch (err) {
    res.status(500).json({ message: 'Error saving recipe', error: err.message });
  }

})


app.get('/display',(req,res)=>{
    Recipe.find().then((recipes)=>{
        res.json(recipes)
    })
})


const port=process.env.PORT || 3001
app.listen(3000,  ()=>{
    console.log(`server is running `)
})