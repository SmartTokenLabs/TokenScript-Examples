//<![CDATA[
class Token {

    constructor(token, card) {
        this.token = token;
        this.card = card;
        this.time = this.formatTimeStampTodayTime(this.card.timestamp.date) + " | " + this.formatTimeStamp(this.card.timestamp.date);
    }

    formatTimeStampTodayTime(time) {
        let a = new Date(time);
        let hours = a.getHours();
        let minutes = a.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    formatTimeStamp(time) {
        let a = new Date(time);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        return date + ' ' + month + ' ' + year;
    }

    render() {
        return`
        <div>
            <div class="headerRectangle">
                <div class="date">
                    <p>${this.time}</p>
                </div>
                
                <div class="icons">
                    <img class="logo" src="data:image/png;base64,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">
                </div>
                
                <div class="depositContainer">
                    <p>Redeemed aETH</p>
                </div>
            </div>
            
            <div class="separator"></div>
             
            <div class="amountBox">
                <p>- ${this.card._valueRedeemed / 1e+18} aETH</p>
            </div>
        </div>
`;
    }
}

web3.tokens.dataChanged = (oldTokens, updated, tokenIdCard) => {
    document.getElementById(tokenIdCard).innerHTML = new Token(updated.token, updated.card).render();
};
//]]>
