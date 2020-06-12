//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
    }

    render() {
        window.onConfirm = function() { window.close(); };
        let message = "The migration tool for SAI to DAI is now closed. <br><br> You may be able to exchange it on Uniswap" +
            " by opening this website in the AlphaWallet browser <br><br><strong>https://uniswap.exchange/swap?use=v1</strong>";
        return`
        <div class="ui container">
          <div class="ui segment">
            <span><bold><h3>${message}</h3></bold></span>
          </div>
        </div>
`;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens, tokenCardId) => {
    const currentTokenInstance = updatedTokens.currentInstance;
    document.getElementById(tokenCardId).innerHTML = new Token(currentTokenInstance).render();
};
//]]>
