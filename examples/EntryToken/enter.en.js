//<![CDATA[
class Token {
    constructor(tokenInstance) {
        this.props = tokenInstance
        document.getElementById("contractAddress").value = this.props.EntryToken;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens, tokenCardId) => {
    const currentTokenInstance = updatedTokens.currentInstance;
    document.getElementById(tokenCardId).innerHTML = new Token(currentTokenInstance).render();
};

document.addEventListener("DOMContentLoaded", function() {
    window.onload = function startup() {
        // 1. call API to fetch challenge
        fetch('http://stormbird.duckdns.org:8080/api/getChallenge')
            .then(function (response) {
                return response.text()
            })
            .then(function (response) {
                document.getElementById('msg').innerHTML = 'Challenge: ' + response
                window.challenge = response
            })
    }

    window.onConfirm = function onConfirm(signature) {
        if (window.challenge === undefined || window.challenge.length == 0) return
        const challenge = window.challenge
        document.getElementById('status').innerHTML = 'Wait for signature...'
        // 2. sign challenge to generate response
        web3.personal.sign({ data: challenge }, function (error, value) {
            if (error != null) {
                document.getElementById('status').innerHTML = error
                window.onload();
                return
            }

            document.getElementById('status').innerHTML = 'Verifying credentials ...'
            // 3. open door
            let contractAddress = document.getElementById("contractAddress").textContent;
            fetch(`http://stormbird.duckdns.org:8080/api/checkSignature?contract=${contractAddress}&challenge=${challenge}&sig=${value}`)
                .then(function (response) {
                    return response.text()
                })
                .then(function (response) {
                    if (response == "pass") {
                        document.getElementById('status').innerHTML = 'Entrance granted!'
                        window.close()
                    } else {
                        document.getElementById('status').innerHTML = 'Failed with: ' + response
                    }
                })
        });
        window.challenge = '';
        document.getElementById('msg').innerHTML = '';
    }
});
//]]>
