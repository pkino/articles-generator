$("#btn").on("click", () => {
    chrome.storage.sync.set(
        {
            "token": $('textarea').val()
        }
    )
})
