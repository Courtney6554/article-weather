//Initialize variables
var articles=[];
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
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
    console.log(dateStart + " " + dateEnd);
    event.preventDefault();
    let query = $("#searchField").val();
    url += '?' + $.param({
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
                      date: data.pub_date,
                      address: data.keywords[k].value
                  }
                  verifyAddress(article);
                  articles.push(article);
                  console.log(articles);
              }
          }
      }
    }).fail(function(err) {
      throw err;
    });
})

//Address Validation
function verifyAddress(article) {
    var currentAddress = article.address;
    currentAddress = currentAddress.replace(/\n/g, "");
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': currentAddress
        }, function (results, status) {

        if (status === google.maps.GeocoderStatus.OK)
        {
            address = results[0].formatted_address;
            article.address = address;
        }
	});
}
