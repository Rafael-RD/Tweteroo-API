import express, { json } from 'express';
import cors from 'cors';

const PORT=5000;
const app=express();
app.use(cors());
app.use(json());


const users=[];
const tweets=[];


app.get('/sign-up', (req, res)=>{
    res.send(users);
})

app.post('/sign-up', (req, res)=>{
    console.log(req.body);
    const {username, avatar}=req.body;
    if((!username || typeof(username)!=='string') || (!avatar || typeof(avatar)!=='string')) return res.status(400).send('Todos os campos são obrigatórios!');
    else {
        users.push({username, avatar});
        return res.status(201).send('OK');
    }
})

app.post('/tweets', (req,res)=>{
    const {username, tweet}=req.body;
    if((!username || typeof(username)!=='string') || (!tweet || typeof(tweet)!=='string')) return res.status(400).send('Todos os campos são obrigatórios!');
    if(users.length===0 || !users.some((e)=>e.username===username)) return res.status(401).send('UNAUTHORIZED');
    tweets.push({username, tweet});
    return res.status(201).send('OK')
})

app.get('/tweets', (req, res)=>{
    const last10=[];
    for(let i=0; i<10 && i<tweets.length; i++){
        const {username, tweet}=tweets[tweets.length-1-i];
        const {avatar}=users.find(e=>e.username===username)
        last10.push({username, tweet, avatar});
    }
    res.send(last10);
});

app.get('/tweets/:user',(req, res)=>{
    const {user}=req.params;
    if(!users.some(e=>e.username===user)) return res.send([]);
    const userTweets=tweets.filter((e)=>e.username===user);
    const {avatar}=users.find(e=>e.username===user);
    for(let i=0; i<userTweets.length; i++){
        userTweets[i].avatar=avatar;
    }
    res.send(userTweets);
})

app.listen(PORT, ()=>console.log(`Server Running on ${PORT}`));