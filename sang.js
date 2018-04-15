/*
*   Return latest 3 service notices
* */
var request = require('request');

function getServiceNotices(gBody, gRes) {
  const APIKey = "E0CA7D29754DBC1A2945AC2B353206DD";
  const apiEndpoint = "http://api.actransit.org/transit/servicenotices/?token=" + APIKey;
  var option = {
    method: 'GET',
    url: apiEndpoint
  };

  request(option, function(err, res, body) {
    var notices = JSON.parse(body).slice(0, 1);
    var source = gBody.originalRequest.source;
    getServiceNoticesHelper(notices, gRes, source);
  });
}

function getServiceNoticesHelper(notices, gRes, source) {
  var msg = "";
  var displayMsg = "";
  msg += "Here are the latest service notice." + writeNewLine(2);

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

  if (source === 'google') {
    var linkSent = {
      destinationName: "more information",
      platform: "google",
      type: "link_out_chip",
      url: noticeURL
    };

    var speechSent = {
      speech: msg,
      type: 0,
    };

    var displayTextSent = {
      displayText: displayMsg,
      platform: "google",
      textToSpeech: "Audio response",
      type: "simple_response"
    };

    var msgObject = {
      messages: [speechSent, displayTextSent, linkSent]
    };

    console.log(JSON.stringify(msgObject));

    return gRes.json(msgObject);
  } else {
    return gRes.json({
      speech: msg,
      displayText: displayMsg
    });
  }
}

function writeSpeechMessage(index, postDate, title, text, impactedRoutes) {
  /* return the message for a speaker to speak */
  var msg = "";
  msg += index + 1 + "." + " " + postDate + "." + writeNewLine(1);
  msg += "Title : " + title + "." + writeNewLine(1);
  msg += text + writeNewLine(1);
  msg += "" + impactedRoutes + "." + writeNewLine(1);
  return msg;
}

function writeDisplayMessage(index, postDate, title, text, impactedRoutes, noticeURL) {
  /* return the message that will be displayed in the chat */
  var displayMsg = "";
  displayMsg += writeSpeechMessage(index, postDate, title, text, impactedRoutes);
  displayMsg += "For more information, please check " + noticeURL + "." + writeNewLine(1);
  return displayMsg;
}

function writeNewLine(numberOfNewLine) {
  /* write the new line as many as numberOfNewLine */
  var newLine = "";
  for (var i = 0; i < numberOfNewLine; i++) {
    newLine += '\n  ';
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

module.exports = {
  getServiceNotices: getServiceNotices
};