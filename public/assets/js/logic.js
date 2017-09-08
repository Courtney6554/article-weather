//Initialize variables
var articles=[];
var url0 = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
var dateStart = "20170801";
var dateEnd = "20170901";

//Initialize Date range selection
$(function() {
    $('#daterange').daterangepicker();
});

//Apply Date range selection
$('#daterange').on('apply.daterangepicker', function(ev, picker) {
    dateStart = picker.startDate.format('YYYYMMDD').toString();
    dateEnd = picker.endDate.format('YYYYMMDD').toString();
});

//Query New York Times API with our data
$("#searchBtn").on("click", function(event){
    articles=[];
    event.preventDefault();
    let query = $("#searchField").val();
    url = url0 + '?' + $.param({
      'api-key': "d4a45b6e145a424ba8a4730581bc76a6",
      'begin_date': dateStart,
      'end_date': dateEnd,
      'q': query,
      'fl': "web_url,snippet,multimedia,headline,byline,keywords,pub_date"
    });

    $.ajax({
      url: url,
      method: 'GET',
    }).done(function(result) {
      //For each article from query
      for(i = 0; i < result.response.docs.length; i++)
      {
          //For each keyword in that article metadata
          for(k = 0; k < result.response.docs[i].keywords.length; k++)
          {
              //Only get articles containing location data
              if(result.response.docs[i].keywords[k].name === "glocations")
              {
                  //Create article data
                  var data = result.response.docs[i];
                  var article = {
                      headline: data.headline.main,
                      snippet: data.snippet,
                      date: moment(data.pub_date).format("YYYYMMDD"),
                      address: data.keywords[k].value,
                      state: null,
                      abbr: null,
                      city: null,
                      temp: null
                  }

                  verifyAddress(article);
                  articles.push(article);
              }
          }
      }
    }).fail(function(err) {
      throw err;
    });
})

function verifyAddress(article) {
    var currentAddress = article.address;
    currentAddress = currentAddress.replace(/\n/g, "");
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': currentAddress
        }, function (results, status) {

        if (status === google.maps.GeocoderStatus.OK)
        {
            var address = results[0].formatted_address;
            article.address = address;

            $.each(cityByName, function(index, value) {
                var states = index.toString();
                var stateIndex = address.search(states);
                var currentState = address.substring(stateIndex, address.indexOf(','));

                if(index === currentState)
                {
                  article.state = index;
                  article.city = value;
                  convertState();
                }
            }); 

            function convertState()
            {
                $.each(stateAbbr, function(index, value) {
                  if(article.state === value)
                  {
                    article.abbr = index;
                    weatherHistory(article);
                  }
                });
            }

            $.each(cityByAbbr, function(index, value) {
                var abbr = index.toString();
                var abbrIndex = address.search(abbr);

                if(abbrIndex !== -1)
                {
                  article.abbr = index;
                  article.city = value;
                  weatherHistory(article);
                }
            }); 
        }
	});
}

function weatherHistory(article) {
  var apikey = "0819f869898c0096";
  var queryURL = "http://api.wunderground.com/api/" 
               + apikey 
               + "/history_" + article.date 
               + "/q/" + article.abbr 
               + "/" + article.city + ".json"
      $.ajax({
          url: queryURL,
          method: "GET"
      }).done(function(response) {
          response = response.history.observations;
          article.temp = response[0].tempi;         
          console.log(articles);
      });
}
