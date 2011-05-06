var apimaker = require("../apimaker/apimaker.js");
apimaker.enableDebug(true);
var tupalo_token = '';

var tupconf = {
  "spots":'http://tupalo.com/en/api/easy/v1/spots?origin=&name=&spot_id&latitude=&longitude=&radius=&excludecategories=&includecategories=&map_size=&token='+tupalo_token,
  "spot":'http://tupalo.com/en/api/easy/v1/spots?origin=&name=&spot_id&latitude=&longitude=&radius=&excludecategories=&includecategories=&map_size=&token='+tupalo_token,
  
  "review": "http://tupalo.com/en/api/easy/v1/review-widget?spot_id=&token="+tupalo_token,
  "match": "http://tupalo.com/de/api/easy/v1/match?&spot_id=&phone=&website=&category=&name=&street=&zip=&city=&countrycode=&sourceurl=&token="+tupalo_token

}
var spotsAPI = apimaker(tupconf.spots);
var spots = function(data, callback){ return spotsAPI.GET.apply(spotsAPI, arguments); };
var spotAPI = apimaker(tupconf.spot);
var spot = function(data, callback){ return spotAPI.GET.apply(spotsAPI, arguments); };
var reviewAPI = apimaker(tupconf.review);
var review = function(data, callback){ return reviewAPI.GET.apply(spotsAPI, arguments); };
var matchAPI = apimaker(tupconf.match);
var match = function(data, callback){ return matchAPI.GET.apply(spotsAPI, arguments); };
var setToken = function(token){
  tupalo_token=token;
  return true;
};

module.exports = function(){ return "tupalo rules" };
module.exports.setToken = setToken;
module.exports.spotsAPI = spotsAPI;
module.exports.spotAPI = spotAPI;
module.exports.reviewAPI = reviewAPI;
module.exports.matchAPI = matchAPI;
module.exports.spots = spots;
module.exports.spot = spot;
module.exports.review = review;
module.exports.match = match;

/*spots({
  origin:"Yppenplaz, Wien, Oesterreich",
  includecategories: "bar,club,restaurant,wine,wine-bars"
}, function(data){
  console.log(data);
});*/

