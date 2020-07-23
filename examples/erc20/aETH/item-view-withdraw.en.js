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
                    - ${this.card._valueRedeemed / 1e+18} ETH<br/>
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
