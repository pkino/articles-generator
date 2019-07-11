window.Octokit = require('@octokit/rest')
let octokit
let token
chrome.storage.sync.get(["token"], function (items) {
   token = items.token
   if (token !== undefined) {
      octokit = new Octokit({
         auth: token
      })
   } else {
      octokit = new Octokit()
   }

   main()
})


async function main() {
   var path = location.pathname
   var pathArray = path.split('/')

   const owner = pathArray[1]
   const repo = pathArray[2]
   const pl_num = pathArray[4]

   let pr
   try {
      pr = await getPR(owner, repo, pl_num)
   } catch (e) {
      console.error(e)
   }


   let compare
   try {
      compare = await getCompare(owner, repo, pr.data.base.sha, pr.data.head.sha)
   } catch (e) {
      console.error(e)
   }

   diffFiles = compare.data.files

   var copyText = '# '
   copyText = copyText + pr.data.title + '\n\n'
   copyText = copyText + '# 方法\n\n'
   copyText = copyText + pr.data.body + '\n\n'
   copyText = copyText + '# 実装\n\n'
   for (var i = 0; i < diffFiles.length; i++) {
      copyText = copyText + '```\n' + diffFiles[i].patch + '\n```\n\n'
   }

   execCopy(copyText)
}

async function getPR(owner, repo, num) {
   res = await octokit.pulls.get({
      owner: owner,
      repo: repo,
      pull_number: num
   })

   return res
}

async function getCompare(owner, repo, base, head) {
   res = await octokit.repos.compareCommits({
      owner: owner,
      repo: repo,
      base: base,
      head: head
   })

   return res
}



function execCopy(string) {

   var tmp = document.createElement("div");
   var pre = document.createElement('pre');

   pre.style.webkitUserSelect = 'auto';
   pre.style.userSelect = 'auto';

   tmp.appendChild(pre).textContent = string;

   var s = tmp.style;
   s.position = 'fixed';
   s.right = '200%';

   document.body.appendChild(tmp);
   document.getSelection().selectAllChildren(tmp);

   var result = document.execCommand("copy");

   document.body.removeChild(tmp);

   return result;
}


