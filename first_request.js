var rp = require('request-promise');
var express = require('express');
var app = express();
var cheerio = require('cheerio');
const baseUrl = 'http://www.imdb.com';
var options = {
    uri: 'http://www.imdb.com/chart/top',
    transform: function (body) {
        return cheerio.load(body);
    }
};


app.get('/',(req,res)=>{
    rp(options)
    .then(($)=> {
        // Process html like you would with jQuery...
        let resp=[];
        let singleurl='',movietitle='';
        let list = $('.lister-list').find('.titleColumn a');
       for(i=0;i<list.length;i++){
        singleurl=baseUrl + $(list[i]).attr('href');
        movietitle = $(list[i]).text();
        resp.push({title:movietitle,url:singleurl});
        //  $(list[i]).attr('href',baseurl+$(list[i]).href);
         
       };
       res.json(resp);
    })
    .catch((err) => {
        // Crawling failed or Cheerio choked...
        res.send(err);
    });
});
app.listen(process.env.PORT||3000,()=>{
    console.log('server on port 3000');
})