const Octokit = require('@octokit/rest')
let octokit
if (process.argv[5] !== undefined) {
   octokit = new Octokit({
      auth: process.argv[5]
   })
} else {
   octokit = new Octokit()
}
const fs = require('fs')
const req = require('request')
const fetch = require('node-fetch')

main()


async function main() {

   let pr
   try {
      pr = await getPR(process.argv[2], process.argv[3], Number(process.argv[4]))
   } catch (e) {
      console.log(e)
   }

   let compare
   try {
      compare = await getCompare(process.argv[2], process.argv[3], pr.data.base.sha, pr.data.head.sha)
   } catch (e) {
      console.log(e)
   }

   diffFiles = compare.data.files

   fileName = 'article.md'
   fs.writeFileSync(fileName, '# ')
   fs.appendFileSync(fileName, pr.data.title + '\n\n')
   fs.appendFileSync(fileName, '# 方法\n\n')
   fs.appendFileSync(fileName, pr.data.body + '\n\n')
   fs.appendFileSync(fileName, '# 実装\n\n')

   for (var i = 0; i < diffFiles.length; i++) {
      fs.appendFileSync(fileName, '```\n' + diffFiles[i].patch + '\n```\n\n')
   }
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
