import express from "express";
import path from "path";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

// Get coordinates from user input
app.post("/submit-coordinates", (req,res) => {
    const lat =req.body.lat;
    const lon = req.body.lon;
    res.redirect(`/?lat=${lat}&lon=${lon}`);
})

// using axios to get data from weather api
app.get("/" , async(req,res) => {
    try{
        const lat =req.query.lat;
        const lon =req.query.lon;
        // weather api
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto`);

        // Reverse geocoding api
        const geoResponse = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            {
                headers: {
                    "User-Agent": "Aasman Darshan"
                }
            }
        );
        const locationName =geoResponse.data.display_name || geoResponse.data.address.city 
            || geoResponse.data.address.town 
            || geoResponse.data.address.village 
            || "Unknown Location";
        // console.log(geoResponse.data.display_name);
        res.render("index.ejs", {
            time : response.data.hourly.time,
            temp : response.data.hourly.temperature_2m,
            location : locationName
            
        });
        // console.log(response);
    }
    catch (error) {
        console.error("Failed to make request: ", error.message);
        res.status(500).send("Failed to fetch activity. Please try again.")
    }
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
