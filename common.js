const Octokit = require('@octokit/rest');

function getOctokit(token) {
    if (token) {
        return new Octokit({
            auth: token
        });
    } else {
        return new Octokit();
    }
}

async function getPR(octokit, owner, repo, num) {
    const res = await octokit.pulls.get({
        owner: owner,
        repo: repo,
        pull_number: num
    });
    return res;
}

async function getCompare(octokit, owner, repo, base, head) {
    const res = await octokit.repos.compareCommits({
        owner: owner,
        repo: repo,
        base: base,
        head: head
    });
    return res;
}

function generateArticle(pr, diffFiles) {
    let copyText = '# ';
    copyText += pr.data.title + '\n\n';
    copyText += '# 方法\n\n';
    copyText += pr.data.body + '\n\n';
    copyText += '# 実装\n\n';
    for (let i = 0; i < diffFiles.length; i++) {
        copyText += '```\n' + diffFiles[i].patch + '\n```\n\n';
    }
    return copyText;
}

module.exports = {
    getOctokit,
    getPR,
    getCompare,
    generateArticle
};
