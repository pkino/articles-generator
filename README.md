# articles-generator
You can generate an artilce(`.md` file) form your github Pull Requests.

## set up
```
npm i 
```

## run with CLI
If you generate from private repogitories, you need a personal access token.

```
node main.js :owner :repositry :pullRequestNumber :token(option)
```

## run with chrome extension
- You have to load this directory from chrome.
- If you generate from private repogitories, you insert a personal access token into menu bar of chrome.
- You can copy a draft into your clipboard if you access arbitrary git pull requests pages("https://github.com/*/*/pull/*").
