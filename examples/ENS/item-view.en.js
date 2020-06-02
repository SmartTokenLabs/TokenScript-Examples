//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
        this.props.baseNode = ".eth";
        this.props.fullName = this.props.ensName + this.props.baseNode;
        if(this.props.fullName === ".eth" || this.props.fullName === "undefined.eth") {
            // if ENS name cannot be retrieved by events because it is legacy, use the opensea format
            this.props.fullName = this.props.name;
        }
    }

    displayWarningNotOnLatestRegistry() {
        if(this.props.fullName === ".eth" || this.props.fullName === "undefined.eth") {
            document.getElementById("ensNameText").innerText = "INVALID ENS NAME";
            document.getElementById("ensNameText").style.color = "#ff0000";
        }
    }

    render() {
        return`
        <div class="item-view-container">
            <div class="ENS-logo">
               <img src="data:image/png;base64,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">
            </div>
            <div class="ensInfoBox">
                <div class="ens-title">
                  <h2 id="ensNameText">${this.props.fullName}</h2>
                </div>
                <div class="token-interface-details">
                  <h4 id="ensInfo">Ethereum Name Service | ERC721</h4>
                </div>
            </div>
            <div class="arrow">
                <!-- TODO un-hide this, at the moment it is causing issues on different devices -->
                <img hidden src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAIVBMVEUAAAAyMjIwMDAvLy8uLi4wMDAvLy8vLy8vLy8vLy////97NsRsAAAACXRSTlMAKUtSf4CI+Ppq55EJAAAAAWJLR0QKaND0VgAAACxJREFUGNNjYKA6YE1A4khMReIwVSJLqU8jTspiCoLN3OlAhASKpawBDDQAACvrCHWekQMTAAAAAElFTkSuQmCC">
            </div>
        </div>`;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens, tokenCardId) => {
    const currentTokenInstance = updatedTokens.currentInstance;
    let token = new Token(currentTokenInstance);
    document.getElementById(tokenCardId).innerHTML = token.render();
    token.displayWarningNotOnLatestRegistry();
};

//]]>
