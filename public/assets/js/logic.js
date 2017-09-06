//New York Times
var dataForWeather=[];
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

$("#searchBtn").on("click", function(event){
    event.preventDefault();
    let query = $("#searchField").val();
    url += '?' + $.param({
      'api-key': "d4a45b6e145a424ba8a4730581bc76a6",
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
              //If there are any keywords containing location data
              if(result.response.docs[i].keywords[k].name === "glocations")
              {
                  //Convert data to a validated address
                  date = result.response.docs[i].pub_date;
                  getAddress(result.response.docs[i].keywords[k].value, date);
              }
          }
      }
    }).fail(function(err) {
      throw err;
    });
})

//Address Validation
function getAddress(value, date) {
    var CurrentAddress = value;
    CurrentAddress = CurrentAddress.replace(/\n/g, "");
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': CurrentAddress
        }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            address = results[0].formatted_address;
            numCommas = address.match(/,/g).length;
            var obj = {
                address: address,
                date: date
            };
            dataForWeather.push(obj);
            console.log(dataForWeather);
        }
	});
}
