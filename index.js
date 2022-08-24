const express = require('express');
const app = express();
const cors = require("cors");
const executeQuery = require('./utility/executeQuery');
app.use(cors());
app.use(express.json());


app.post('/addfaq',async (req,res)=>{
    console.log(req.body);
    let curtime = new Date().getTime();
    console.log(curtime);
    const result = await executeQuery.executeQuery(`Insert into faq Values ('${req.body.title}','${req.body.description}','${curtime}');`);
    res.json(result);
});

app.get('/latestfaqs',async (req,res)=>{
    const result = await executeQuery.executeQuery(`SELECT * FROM faq ORDER BY timeCreated DESC LIMIT 10;`);
    res.json(result);
});

app.post('/searchfaqs',async (req,res)=>{
    let searchText = req.body.searchText;
    const result = await executeQuery.executeQuery(`select * from faq where title like '%${searchText}%' OR descript like '%${searchText}%';`);
    res.json(result);
});

app.post('/addhelparticle', async (req,res)=>{
    console.log(req.body);
    let curtime = new Date().getTime();
    console.log(curtime);
    const result = await executeQuery.executeQuery(`Insert into article Values ('${req.body.title}','${req.body.subtitle}','${req.body.imgurl}','${req.body.description}','${curtime}');`);
    res.json(result);
});

app.get('/latesthelparticle',async (req,res)=>{
    const result = await executeQuery.executeQuery(`SELECT * FROM article ORDER BY timeCreated DESC LIMIT 10;`);
    res.json(result);
});

app.post('/searchhelparticle',async (req,res)=>{
    let searchText = req.body.searchText;
    const result = await executeQuery.executeQuery(`select * from article where title like '%${searchText}%' OR subtitle like '${searchText}' OR descript like '%${searchText}%';`);
    res.json(result);
});

app.listen(3001, () => {
    console.log("App Started at 3001");
});

