//<![CDATA[
class Token {

    constructor(token, card) {
        this.token = token;
        this.card = card;
        this.time = this.formatTimeStamp(this.card.timestamp.date);
    }

    formatTimeStamp(time) {
        let a = new Date(time);
        let hours = a.getHours();
        let minutes = a.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    render() {
        return`
        <div>
            <div class="container">
                <div class="logo">
                    <img src="data:image/png;base64,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">
                </div>
                <div class="info">
                    - ${(this.card._valueRedeemed / 1e+18).toFixed(4)} ETH<br/>
                    <div class="time">${this.time}</div>
                </div>
                <div class="title">
                    Withdrew <strong>ETH</strong>
                </div>
                <div class="subtitle">
                    from Aave
                </div>
            </div>
        </div>
`;
    }
}

web3.tokens.dataChanged = (oldTokens, updated, tokenIdCard) => {
    document.getElementById(tokenIdCard).innerHTML = new Token(updated.token, updated.card).render();
};
//]]>
