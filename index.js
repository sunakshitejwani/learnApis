const express = require('express');
const app = express();

app.get('/',(req,res) => {
    //to get excess to all the props expressjs.com
    res.send("hello world")
});

app.get('/api/courses', (req,res)=>{
    res.send([1,2,3]);
})
app.listen(3000, () => {
    console.log('Listening on port 3000')
});
//app.post();
//app.put();
//app.delete();