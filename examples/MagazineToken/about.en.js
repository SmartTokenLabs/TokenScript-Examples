//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
        this.setConfirm();
    }

    setConfirm() {
        window.onConfirm = function() {
            window.close();
        }
    }

    render() {
        let message = "Future Cryptoeconomics describe a future of knowledge systems, which address the need to articulate information and its regimes beyond the modern paradigm of indexicality." +
            " We explore how the historico-political current manifestation of data politics forbids speculation about the future (public) internet as a place for freedom and democracy." +
            " The project proposes that a different approach is needed to navigate this new universe politically as well as aesthetically";
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
