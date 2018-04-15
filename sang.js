/*
*   Return latest 3 service notices
* */
var request = require('request');

function getServiceNotices(body, gRes) {
  const APIKey = "E0CA7D29754DBC1A2945AC2B353206DD";
  const apiEndpoint = "http://api.actransit.org/transit/servicenotices/?token=" + APIKey;
  var option = {
    method: 'GET',
    url: apiEndpoint
  };

  request(option, function(err, res, body) {
    var notices = JSON.parse(body).slice(0, 2);
    getServiceNoticesHelper(notices, gRes);
  });
}

function getServiceNoticesHelper(notices, gRes) {
  var msg = "";
  var displayMsg = "";
  msg += "Here are the " + notices.length + "latest notices\n\n";

  for (var i = 0; i < notices.length; i++) {
    var notice = notices[i];
    var postDate = notice.PostDate;
    var title = notice.Title;
    var text = textFormatting(notice.NoticeText);
    var noticeURL = notice.Url;
    var impactedRoutes = impactedRoutesFormatting(notice.ImpactedRoutes);

    msg += writeSpeechMessage(i, postDate, title, text, impactedRoutes);
    msg += writeNewLine(2);
    displayMsg += writeDisplayMessage(i, postDate, title, text, impactedRoutes, noticeURL);
    displayMsg += writeNewLine(2);
  }
  console.log(msg);
  console.log(displayMsg);
  /*return gRes.json({
    speech: msg,
    displayText: displayMsg
  });*/
}

function writeSpeechMessage(index, postDate, title, text, impactedRoutes) {
  /* return the message for a speaker to speak */
  var msg = "";
  msg += index + 1 + "." + " " + postDate + "\n";
  msg += "Title : " + title + "\n";
  msg += text + "\n";
  msg += "" + impactedRoutes + "\n";
  return msg;
}

function writeDisplayMessage(index, postDate, title, text, impactedRoutes, noticeURL) {
  /* return the message that will be displayed in the chat */
  var displayMsg = "";
  displayMsg += writeSpeechMessage(index, postDate, title, text, impactedRoutes);
  displayMsg += "For more information, please check " + noticeURL + "\n";
  return displayMsg;
}

function writeNewLine(numberOfNewLine) {
  /* write the new line as many as numberOfNewLine */
  var newLine = "";
  for (var i = 0; i < numberOfNewLine; i++) {
    newLine += '\n';
  }
  return newLine;
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
  text = [text.split("<hr />")[0]].join('');
  text = [text.split('\r\n\r\n')[0]].join('');
  return text;
}

getServiceNotices(null, null)

module.exports = {
  getServiceNotices: getServiceNotices
};