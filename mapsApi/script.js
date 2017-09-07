

      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.8283, lng: 98.5795},
          zoom: 5
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };           

            infoWindow.setPosition(pos);
            console.log(pos);
            infoWindow.setContent("Your're here");
            infoWindow.open(map);
           // map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        
      var myLatLng = {lat: 39, lng: -98};
  	  var marker = new google.maps.Marker({
  	    position: myLatLng,
  	    map: map,
  	    title: 'event'
  	  });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
      
      
      var getCity = {
    		  Alabama: "Birmingham",
    		  Alaska: "Anchorage",
    		  Arizona: "Phoenix",
    		  Arkansas: "Little_Rock",
    		  California: "Los_Angeles",
    		  Colorado: "Denver",
    		  Connecticut: "Bridgeport",
    		  Delaware: "Wilmington",
    		  Florida: "Jacksonville",
    		  Georgia: "Atlanta",
    		  Hawaii: "Honolulu",
    		  Idaho: "Boise",
    		  Illinois: "Chicago",
    		  Indiana: "Indianapolis",
    		  Iowa: "Des_Moines",
    		  Kansas: "Wichita",
    		  Kentucky: "Louisville",
    		  Louisiana: "New_Orleans",
    		  Maine: "Portland",
    		  Maryland: "Baltimore",
    		  Massachusetts: "Boston",
    		  Michigan: "Detroit",
    		  Minnesota: "Minneapolis",
    		  Mississippi: "Jackson",
    		  Missouri: "Kansas_City",
    		  Montana: "Billings",
    		  Nebraska: "Omaha",
    		  Nevada: "Las_Vegas",
    		  NewHampshire: "Manchester",
    		  NewJersey: "Newark",
    		  NewMexico: "Albuquerque",
    		  NewYork: "New_York_City",
    		  NorthCarolina: "Charlotte",
    		  NorthDakota: "Fargo",
    		  Ohio: "Columbus",
    		  Oklahoma: "Oklahoma_City",
    		  Oregon: "Portland",
    		  Pennsylvania: "Philadelphia",
    		  RhodeIsland: "Providence",
    		  SouthCarolina: "Charleston",
    		  SouthDakota: "Sioux_Falls",
    		  Tennessee: "Nashville",
    		  Texas: "Houston",
    		  Utah: "Salt_Lake_City",
    		  Vermont: "Burlington",
    		  Virginia: "Virginia_Beach",
    		  Washington: "Seattle",
    		  WestVirginia: "Charleston",
    		  Wisconsin: "Milwaukee",
    		  Wyoming: "Cheyenne"   		  
      }
      

      var getCity = {
    		  AL: "Birmingham",
    		  AK: "Anchorage",
    		  AZ: "Phoenix",
    		  AR: "Little_Rock",
    		  CA: "Los_Angeles",
    		  CO: "Denver",
    		  CT: "Bridgeport",
    		  DE: "Wilmington",
    		  FL: "Jacksonville",
    		  GA: "Atlanta",
    		  HI: "Honolulu",
    		  ID: "Boise",
    		  IL: "Chicago",
    		  IN: "Indianapolis",
    		  IA: "Des_Moines",
    		  KS: "Wichita",
    		  KY: "Louisville",
    		  LA: "New_Orleans",
    		  ME: "Portland",
    		  MD: "Baltimore",
    		  MA: "Boston",
    		  MI: "Detroit",
    		  MN: "Minneapolis",
    		  MS: "Jackson",
    		  MO: "Kansas_City",
    		  MT: "Billings",
    		  NE: "Omaha",
    		  NV: "Las_Vegas",
    		  NH: "Manchester",
    		  NJ: "Newark",
    		  NM: "Albuquerque",
    		  NY: "New_York_City",
    		  NC: "Charlotte",
    		  ND: "Fargo",
    		  OH: "Columbus",
    		  OK: "Oklahoma_City",
    		  OR: "Portland",
    		  PA: "Philadelphia",
    		  RI: "Providence",
    		  SC: "Charleston",
    		  SD: "Sioux_Falls",
    		  TN: "Nashville",
    		  TX: "Houston",
    		  UT: "Salt_Lake_City",
    		  VT: "Burlington",
    		  VA: "Virginia_Beach",
    		  WA: "Seattle",
    		  WV: "Charleston",
    		  WI: "Milwaukee",
    		  WY: "Cheyenne"   		  
      }