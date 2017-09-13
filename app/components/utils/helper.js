var axios = require("axios");

// Geocoder API
var NYTreactAPI = "08c1909600aa49f0aafcc5da530f8a29";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery(title, startYear, endYear) {

    console.log(title, startYear, endYear);

    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NYTreactAPI + "&q=" + title + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
    return axios.get(queryURL).then(function(response) {
        console.log(response);
      // If get get a result, return that result's formatted address property
      var newResults =[];
      var fullResults = response.data.response.docs;
      var counter = 0;

      for (var i=0; i , fullResults.length; i++) {
          if (counter >4) {
              return newResults;
          }
          if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
            newResults.push(fullResults[counter]);
            counter++;
      }
    }
    return newResults;
    });
  },

  // This function hits our own server to retrieve the record of query results
  getArticle: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postArticle: function(news) {
    return axios.post("/api", { title: news });
  }
};

// We export the API helper
module.exports = helper;
