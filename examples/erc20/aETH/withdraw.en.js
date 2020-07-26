//<![CDATA[
class Token {

    constructor(token, card) {
        this.token = token;
        this.card = card;
    }

    render() {
        const decimals18 = 1e+18;
        let aTokenBalance = (this.token.aTokenBalance / decimals18).toFixed(2);
        let totalBorrows = (this.token.totalBorrows / decimals18).toFixed(2);
        let withdrawable = (this.token.availableBorrowsETH / decimals18);
        //if you have other assets that add to your collateral, your withdrawable could be larger than your aETH balance
        if(withdrawable > aTokenBalance) {
            withdrawable = aTokenBalance;
        }

        return `<div class="withdraw action">
           <h1>Withdraw</h1>
           <h2><img src="data:image/png;base64,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"></h2>
           <input id="redeemAmount" type="number" placeholder="0">
           <p class="hint">Available to withdraw ${withdrawable.toFixed(4)} ETH</p> 
           <table>
              <caption>Deposits</caption>
              <tbody>
                 <tr>
                    <th>Total Deposited + Interest </th>
                    <td>${aTokenBalance}</td> 
                 </tr>
                 <tr>
                    <th>Borrowed</th>
                    <td>${totalBorrows} ETH</td> 
                 </tr>
                 <tr>
                    <th>Available to withdraw</th>
                    <td>${withdrawable.toFixed(3)} ETH</td> 
                 </tr>
              </tbody>
           </table>
        </div>`;
    }
}

web3.tokens.dataChanged = (oldTokens, updated, tokenIdCard) => {
    document.getElementById(tokenIdCard).innerHTML = new Token(updated.token, updated.card).render();
};

//]]>
