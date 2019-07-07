var github = require('octonode');

var client = github.client('');
var ghissue = client.issue('sesta/alexa-koigakubo', 14);
try {
   (async function () {
      await ghissue.info(function (err, data, headers) {
         console.log(data.title)
         var title = data.title
         var body = data.body
      })
   })()
} catch (e) {
   console.log(e)
}
