# articles-generator
You can generate an artilce(`.md` file) from github Pull Requests.

## set up
```
npm i 
```
## run with chrome extension
- You have to load this directory from chrome.
- If you want to generate from private repogitories, you have to insert a personal access token into menu bar of chrome.
- You can copy an article draft to your clipboard if you access arbitrary github Pull Request pages(https://github.com/*/*/pull/*).

## run with CLI
If you want to generate from private repogitories, you need a personal access token.

```
node main.js owner repositry pullRequestNumber token(option)
```
