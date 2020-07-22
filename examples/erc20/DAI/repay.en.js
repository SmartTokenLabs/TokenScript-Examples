//<![CDATA[
class Token {

    constructor(token, card) {
        this.token = token;
        this.card = card;
    }

    render() {
        const decimals18 = 1e+18;
        let totalBorrows = this.token.borrowBalance / decimals18;
        let interestAccrued = this.token.borrowInterestAccrued / decimals18;
        let daiPriceInEth = this.token.assetPriceDAI / decimals18;
        return`
        <div class="repay action">
           <h1>Repay</h1>
           <h2><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABVdJREFUWAnNWV1oHFUUPmcys+vu5getVlwbtVkr8QfF5KUWKhXBtE81paKIUioiGlsQ4oOC2EYo+NBShKIvYu2DQm21+CCmirQoTSt2g/hTKiYWE0yxqWLS3c3+zvWcu7mzM7tz9ydu416YzJnzc++3d+ace84JwhJH+qv+mJ21N9sI/TRFFAREEelOQwiYAaQLYMYQEDcCxqfXPByfZFmjAxsxEMfXrUyJhR0CcJBQ3NOILSD+hCCOhTF0AAfGLtVrWxdAcWJDeyo7P0ygXqbdaa93cj892uUEgd0bDnTuw4dOJvx03LyaAFOf922xUbxNr/BGt+F/phH+NAQOhTeNf1JtLkMnFEJg8njfLoHiaNPB8aL0g3luuQatpcPhKxBjD4RSc5lDAsRjOsNm8hHwSLgruA3XnV4on7diB3nnlhMcA+KNkGv67GQFwNQX/a8v1865d0uCpLXdPKY9r5gdgr8L8lQPnxWD9+4BM7qJyapDFDIgcvMgFmbAnvsZCpdPywvArmrHQvJwWh63uh3HAcKhJJmZm9A5RL0A/VDYmcuQ++0Q5KcO0/vM+6mUeOTdkWDX7SoEmUpSjHP1hZLs5Hu0IVll6rmj1QEYupmuKBjtPYCGCUbwegjeOQzWqs2QPrsDRKZKnCbvllgARnhiuYOLJ8RktSDs3sHkl+sBCkkPML8HDN4AZvdWsLq3AAZXSBWbXn36uyEQqSk/E8njYE4nToxPHOkkKcjsrAZOO1MNgcjMQm7iHUh9Mwh5+hZ5GLSzobUHASOrtdaMhY9Uqc9/KLQ8qtVuhiCfgMzZnZCbLh4aGLgWgvftoffXpp1dnvckNTgrafjg105bTWBD9tybYF+ZkEptnb1grhrUG1AywthMTpl0WkbnXSWR1eXQRlcvQL4i6DvyakRu6ggE735Vqli3PUWh6Jyjbs+XaGYyNkyM3v8BhZYnHS0XEdk47nq6+mRytM+7CMKH7CQyyfRKWuYpatLuaQHmpj5ykLatWAtG5Bb5LD/2WgHXsawkkD4X86YBKbCTv0Phr28rlZhD2ExO08mtfQd/1GpwHFQAs+f31xUHlW35nYO4A/DKr9J5ynX4mbEZlEBo4PmZNIvnXtJNe+dnbHTUiYvE7vCKik9W7FmHbXTEHNrq2aY96hylKgQGiqcKq2C4G9Q6ucl3y6zERfbiE/SuN5RJ5GMLePFJ9mIuD1t1zJhct1Km5hsH0/GXHODW6qeh7TougQHS379CTpJ2ZI0QRscaCNzxojSxExcg+8tbWnPGZnJRTRF7n59WYfZrh628jhmF2VNL82I6e601zztz5i68T3OV1nAEiwRjM2TFT0V1ubD5zwiB3mHgM5hH4Z8fIf/HZ/plCBNj42+QkkJxTK/ZBElbBIJ9+8G69Qk5GWfYmR9eI1pfBihMEqBsR3DF3+SBlElbsecgtP5jMFc+WASXmob0me2UsE5rV1tMWA+wgkz5OXOlAnovpV27tVYugRV7hn58zsUpkWi2y3TfnfIraWH+vEz5Ifu3YvnfqTWi+jdOTcK9EiqaXqCYWLPFEejZ7j+xhmunL1HRdBDy00fpXChotBbZVDQxFqXkAOQqisrOIV3ZqQxq3SvLzjEqO8+Qmf57U3PSq+Wyc0hVdMyXRZNS4Lvsldj1vWq3XTNoNHB3ZGB8xD1XBUDZ+hjtP7zc3QXZn9kYfxzRm7xIL/YgJgXZyKGGjpt/NWmneVQGjtes2EEFRO4k90qE2EX5olZP6S/lzt8cJX0j4Ufib5TvnJqv5sL/dwOzJkD+JS3dAlZbLYFyE112IajQb6Umuhukopfr3xD/AsXlPp3EbzwjAAAAAElFTkSuQmCC"> DAI</h2>
           <input id="redeemAmount" type="number" placeholder="0">
           <p class="hint">Remaining to Repay: ${totalBorrows / daiPriceInEth} DAI</p>
           <table>
              <caption>Details</caption>
              <tbody>
                 <tr>
                    <th>Total to repay </th>
                    <td>${totalBorrows / daiPriceInEth}</td>
                 </tr>
                 <tr>
                    <th>Borrowed</th>
                    <td>${(totalBorrows - interestAccrued) / daiPriceInEth} DAI</td>
                 </tr>
                 <tr>
                    <th>Interest to Repay</th>
                    <td>${interestAccrued}</td>
                 </tr>
              </tbody>
           </table>
        </div>
`;
    }
}

web3.tokens.dataChanged = (oldTokens, updated, tokenIdCard) => {
    document.getElementById(tokenIdCard).innerHTML = new Token(updated.token, updated.card).render();
};
//]]>
