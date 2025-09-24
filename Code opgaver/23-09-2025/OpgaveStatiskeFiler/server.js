const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server kører på http://localhost:${PORT}`);
});
console.log(__dirname);

// Vis personlig hilsen baseret på navn i URL
app.get('/hilsen/:navn', (req, res) => {
// TODO: Få navnet fra req.params.navn
// TODO: Send tilbage: "Hej [navn]! Velkommen til vores side!"
        res.send(`Hej <strong> ${req.params.navn} </strong> Velkommen til vores side!`);
});

// Vis hilsner baseret på type
app.get('/hilsner', (req, res) => {
// TODO: Få type fra req.query.type
// TODO: Hvis type er "venlig" - vis venlige hilsner
// TODO: Hvis type er "sjov" - vis sjove hilsner  
// TODO: Ellers vis alle hilsner
    const resType = req.query.type ? req.query.type.toLocaleLowerCase(): req.query.type;
    if(resType === `venlig`){
        res.send(`Venlige hilsner`);
    }else if(resType === `sjov`){
        res.send(`Sjove hilsner`);
    }else{
        res.send(`Alle hilsner`);
    }
});

// Modtag ny hilsen
app.post('/send', (req, res) => {
// TODO: Få navn fra req.body.navn
// TODO: Få besked fra req.body.besked
// TODO: Send tilbage bekræftelse med navn og besked
    if(req.body.navn && req.body.besked){
        res.send(`Navn: ${req.body.navn}  |  Besked: ${req.body.besked}`);

    }else{
        res.send(`Giv dit navn og din besked`);
    }
});