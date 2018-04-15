/*
*   Return latest 3 service notices
* */
var request = require('request');

function getServiceNotices(body, gRes) {
  // TODO fix this part. It is hardcoded now.
  const APIKey = "E0CA7D29754DBC1A2945AC2B353206DD";
  const apiEndpoint = "http://api.actransit.org/transit/servicenotices/?token=" + APIKey;
  var option = {
    method: 'GET',
    url: apiEndpoint,
  };

  request(option, function(err, res, body) {
    var noticies = JSON.parse(body).slice(0, 3);
    getServiceNoticesHelper(noticies, gRes);
  });
}

function getServiceNoticesHelper(noticies, gRes) {
  var msg = "";
  msg += "Today's notices\n";
  msg += "Here are 3 latest notices\n\n";
  for (var i = 0; i < noticies.length; i++) {
    var notice = noticies[i];
    var postDate = notice.PostDate;
    var title = notice.Title;
    var text = textFormatting(notice.NoticeText);
    var impactedRoutes = impactedRoutesFormatting(notice.ImpactedRoutes);
    msg += i + 1 + "." + " " + postDate + "\n";
    msg += "Title : " + title + "\n";
    msg += text + "\n";
    msg += "" + impactedRoutes + "\n\n\n";
  }
  return gRes.json({
    speech: msg,
    displayText: msg
  });
}

// util
function impactedRoutesFormatting(impactedRoutes) {
  var formattedString = "";
  impactedRoutes.forEach(function(route) {
    formattedString += route + " ";
  });
  formattedString += "will be affected";
  return formattedString;
}

function textFormatting(text) {
  text = text.split("---").join('\n');
  text = text.split("<hr />").join('');
  text = text.split('\r\n\r\n');
  return text.join('\n');
}

module.exports = {
  getServiceNotices: getServiceNotices
};