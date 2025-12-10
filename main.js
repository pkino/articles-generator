const fs = require('fs');
const { getOctokit, getPR, getCompare, generateArticle } = require('./common.js');

async function main() {
    const owner = process.argv[2];
    const repo = process.argv[3];
    const pullNumber = Number(process.argv[4]);
    const token = process.argv[5];

    const octokit = getOctokit(token);

    try {
        const pr = await getPR(octokit, owner, repo, pullNumber);
        const compare = await getCompare(octokit, owner, repo, pr.data.base.sha, pr.data.head.sha);
        const diffFiles = compare.data.files;
        const article = generateArticle(pr, diffFiles);

        fs.writeFileSync('article.md', article);
        console.log('Article generated successfully: article.md');
    } catch (error) {
        console.error('Error generating article:', error);
    }
}

main();
