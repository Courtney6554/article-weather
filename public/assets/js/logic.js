var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "d4a45b6e145a424ba8a4730581bc76a6",
  'q': "Trump",
  'fl': "web_url,snippet,multimedia,headline,byline,keywords,pub_date"
});

$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
  for(i = 0; i < result.response.docs.length; i++)
  {
      for(k = 0; k < result.response.docs[i].keywords.length; k++)
      {
          if(result.response.docs[i].keywords[k].name === "glocations")
          {
              console.log(result.response.docs[i].keywords[k].value);
          }
      }
  }

}).fail(function(err) {
  throw err;
});
