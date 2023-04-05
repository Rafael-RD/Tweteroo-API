import express from 'express';

const PORT=5000;

const app=express();

app.get('/tweets', (req, res)=>{
    
});

app.listen(PORT, ()=>console.log(`Server Running on ${PORT}`));