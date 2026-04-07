import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.get("/", (req,res) => {
    res.render("index.ejs");
})

// About Us page 
app.get("/views/about.ejs", (req,res) => {
    res.render("about");
})

// Contact Us page
app.get("/views/contact.ejs", (req,res) => {
    res.render("contact");
})

// Services Page
app.get("/views/services.ejs", (req,res) =>{
    res.render("services");
})

// On Submit in Contact Page
app.post("/submit",(req,res) => {
    res.send(`Thank you ${req.body.name} for Contacting us. We will get back to you soon.`);
})

app.listen(port, () =>{
    console.log(`Server is running at port ${port}`);
})
