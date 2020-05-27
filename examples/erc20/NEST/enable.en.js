//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
    }

    render() {
        let message = "Enable NEST token for deposits";
        return`
        <div class="ui container">
          <div class="ui segment">
            <img src="data:image/png;base64,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">
            <span><bold><h3>${message}</h3></bold></span>
            <br>
            <br>
            <span><bold><h3>for more information about NEST visit <strong>https://nestprotocol.org/</strong></h3></bold></span>
          </div>
        </div>
`;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens, tokenIdCard) => {
    const currentTokenInstance = web3.tokens.data.currentInstance;
    document.getElementById(tokenIdCard).innerHTML = new Token(currentTokenInstance).render();
};
//]]>
