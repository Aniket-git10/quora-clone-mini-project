const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))

let posts = [
    {
        id : uuidv4(),
        username : 'Ani',
        content : 'Posting before something crashes',
    },
    {
       id : uuidv4(),
       username : 'Aniket',
       content : 'Just testing… again'
    },
    {
        id : uuidv4(),
        username : 'Anikettt.10',
        content : 'Create. Edit. Delete. Mildly unstoppable'
    }
]

app.get('/posts',(req,res)=>{
    res.render('index.ejs',{posts})
})

app.get('/posts/new',(req,res)=>{
    res.render('new.ejs')
})

app.post('/posts',(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4()
    posts.push({id,username,content})
    res.redirect('/posts')
})

app.get('/posts/:id',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id)
    res.render('show.ejs',{post});
})

app.get('/posts/:id/edit',(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id)
    res.render('edit.ejs',{post})
})

app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.redirect('/posts');
    }

    post.content = newcontent;
    res.redirect('/posts');
});

app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect('/posts');
});

app.listen(port , ()=>{
    console.log(`app is listening ${port}`)
})