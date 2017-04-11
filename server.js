// set up ========================
   var express = require('express');
    var fs = require('fs');
    var request = require('request');
    var cheerio = require('cheerio');
    var app     = express();

    // configuration =================

    //mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
    var https = require('https');
      var router = express.Router();

      // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/scrape', function(req, res){

  var driver = require('node-phantom-simple');

driver.create({ path: require('phantomjs').path }, function (err, browser) {
  return browser.createPage(function (err, page) {
    return page.open("http://sfbay.craigslist.org/search/sss?query=gizzard|radiohead&sort=date", function (err,status) {
      console.log("opened site? ", status);
      page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function (err) {
        // jQuery Loaded.
        // Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
        setTimeout(function () {
          return page.evaluate(function () {
            //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
              var linkArr = [];
                        $('a').each(function() {

                            linkArr.push($(this).text());

                        });

                        return {
                            links: linkArr,
                        };



          }, function (err,result) {
            console.log(result);
                               if(result && result.links){
                        console.log(result.links);
                        var strArray = result.links;

                        for (var j=0; j<strArray.length; j++) {

                        if (strArray[j].match(/gizzard/i) || strArray[j].match(/radiohead/i)){

                        console.log('found a match!');

                            fs.readFile("/Users/kdi/Documents/GitHub/CLScrape/RereScraper/reres.txt", "utf-8", function(err, data) {
                                  if(!data.match(strArray[j])){

                                    // Twilio Credentials
var accountSid = 'AC024e1e3dffb6212a444aec99024e8fb0';
var authToken = 'f6a8241ff434edc483e93a092bf5b109';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

client.messages.create({
    to: "+14152508533",
    from: "+14159657220",
    body: strArray[j],
}, function(err, message) {
    console.log(err);
});


                            // var TMClient = require('textmagic-rest-client');
                            //
                            // var c = new TMClient('jamesanderson', '9EMv5uk1Jwu0IOHFMvXIaR6CiErzDy');
                            //  c.Messages.send({text: 'CL alert: ' + strArray[j], phones:'4152508533'}, function(err, res){
                            //         console.log('Messages.send()', err, res);
                            //      });

                            console.log('found a new post! ' + strArray[j]);
                            fs.appendFile("/Users/kdi/Documents/GitHub/CLScrape/RereScraper/reres.txt", strArray[j] + "; ", function (err) {});

                              }

                            });
                           break;


                                //res.json({ message: 'found a hit:' + strArray[j] });
                        }
                      }
                    }
            browser.exit();
          });
        }, 5000);
      });
      });
  });
});


    /* the page actions */




 //        if(result.indexOf('SF') > -1){
 //        page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
 //                //jQuery Loaded.
 //                //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
 //                setTimeout(function() {
 //                    return page.evaluate(function() {

 //                        //Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
 //                        var linkArr = [];
 //                        $('a').each(function() {

 //                            linkArr.push($(this).text());

 //                        });

 //                        return {
 //                            links: linkArr,
 //                        };



 //                    }, function(result) {

 //                        if(result && result.links){
 //                        console.log(result.links);
 //                        var strArray = result.links;

 //                         for (var j=0; j<strArray.length; j++) {
 //                        if (strArray[j].match(/joe/i) || strArray[j].match(/jrad/i)){

 //                            fs.readFile("/rere/RereScraper/reres.txt", "utf-8", function(err, data) {
 //                                  if(!data.match(strArray[j])){


 //                            var TMClient = require('textmagic-rest-client');

 //                            var c = new TMClient('jamesanderson', 'obI0Vv5Epr85Jmn9XcmqSsPw52JNVJ');
 //                             c.Messages.send({text: 'CL alert: ' + strArray[j], phones:'14152508533'}, function(err, res){
 //                                    console.log('Messages.send()', err, res);
 //                                 });

 //                            console.log('found a new post! ' + strArray[j]);
 //                            fs.appendFile("/rere/RereScraper/reres.txt", strArray[j] + "; ", function (err) {});

 //                              }

 //                            });
 //                           break;


 //                                //res.json({ message: 'found a hit:' + strArray[j] });
 //                        }
 //                    };
 //                                 }
 //                        ph.exit();


 //                    });
 //                }, 5000);
 //    })
 //     }
 // }
 //    })
 //          });

});//end get scrape

    // REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

    app.listen(8080);
    console.log("App listening on port 8080");
