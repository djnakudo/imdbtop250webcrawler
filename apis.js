let express = require('express');
let app = express();
let apikey='thewdb';
const uri = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.text%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22dallas%2C%20tx%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
let request = require('request');
app.get('/weather',(req,res)=>{
request(uri,(error,response,body)=>{
    if(!error&&response.statusCode===200){
        let parsedData = JSON.parse(body);
       res.send(parsedData.query.results);
    }
});
});
app.listen(3000,()=>{
    console.log('server started in port 3000');
})