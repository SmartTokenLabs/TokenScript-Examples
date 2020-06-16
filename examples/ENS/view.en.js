//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
        this.props.baseNode = ".eth";
        this.props.fullName = this.props.ensName + this.props.baseNode;
        let namehash = require("eth-ens-namehash");
        if(this.props.fullName === ".eth" || this.props.fullName === "undefined.eth") {
            // if ENS name cannot be retrieved by events because it is legacy, use the opensea format
            this.props.fullName = this.props.name;
        }
        web3.action.setProps({
            nodeHash: namehash.hash(this.props.fullName)
        });
    }

    formatTimeStamp(timestamp) {
        let a = new Date(timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        return date + ' ' + month + ' ' + year;
    }

    daysLeft(timestamp) {
        const oneDay = 24 * 60 * 60 * 1000;
        let date = new Date(timestamp * 1000);
        const today = new Date();
        return Math.round(Math.abs((date - today) / oneDay));
    }

    resolvedImage() {
        let element = document.getElementById("resolvedImage");
        if(parseInt(this.props.resolverAddress, 16) !== 0) {
            element.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABCFBMVEUAAAB5tklwuEd2ukVxvUJ2tkByuUZ3u0R4t0BzuUJ1uUN0uUJ2ukF2uUN1uUR2uUN1ukN2uEJ1uUR0uUN1ukN2uUN1uUN1uUN1uEN2uUN0ukR0ukR1uUR1uUR2uUN1uUN0uEN1uUJ1uUN2uEN0uUR1uUN1uUN0uUN1uUN1uUN1uUN1uUN1uUN3ukV3ukZ4u0d6u0p6vEp+vU9+vlB/vlCEwFeFwViJw16MxWOOxmWSyGqSyGuVyW6VyW+WynCeznqfznyq1Iu53KDG4rHI47TK5LfS6MHT6cPU6cTa7M3f79Pn897o8+Du9ujw9+rw+Ov0+fD1+vH2+vL3+/X4+/X5/Pf9/vz///91iZ+mAAAALHRSTlMAFRkaGxwdHiBJTE1OUGlqa2xtbm+RmJmbnJ6iqrW2t7jX2Nnb8fLz9Pv8/R/3l70AAAABYktHRFd9CtkfAAAA7UlEQVQYGW3Bh0KCUAAF0JuJNrBU2kUqBU95t7237WllZe///yTGi0A7B1qxWneaTadeKSAtP+tTk0sjSJQEUzwT2pRkhrQQKUn2kSYChuAAbxjAAv8xBxR9Zlx+XZD0DVjMaH+rNgNl1Jh20lNXDNlYZcrBu7phxIFg6Pp2g+ReRz2sMSIgGOqo+3VuP6unTcZcrDB01FV3W4/qZZdaAzVGjj/Vm3rd5y8bFcZOe+rjkIkJFHzGzrrnTLQMYJ7aDv/MAMh7HODmEBj12UeOI2JJZsgqNNNjijuGxNB0i5pczCHNKC83hGjYkwZiP8OEUpHyjBkvAAAAAElFTkSuQmCC";
        } else {
            element.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAzFBMVEUAAAD/OS//Ny7/Piz/PDP/ODD/Pi7/OS//PDL/OzH/PC//PC7/OjD/PTD/PDD/PDD/Oy//OjH/OjH/OzH/OjD/PDD/OzD/Oi//PDD/OzD/OzD/Oy//OzD/OzD/OjD/OzD/OzD/PDD/OzD/OzD/OzD/OzD/OzD/OzD/OzD/OzD/PDH/PTL/S0H/TEL/TUP/TkT/WVD/a2P/bGT/bmb/eHH/fHT/k43/pJ7/qaT/rqr/tK//y8n/3Nr/3dv/4N//9PT/9fT/9/b/9/f////fda20AAAAKXRSTlMAGxwdHiAhR0hJTE1PUGprbG1umJmam6K0tba32Nna29zw8fLz9Pv8/dNkKy8AAAABYktHRENn0A1iAAAA+UlEQVQoz3VS6VrCQAwMtIgISosiUO6WxUbuG4GqkPd/J3Y3LYe18yfzTXa/TA4AhmnX20K0HMuAW6Tf+hiiX3m46rku3sB7jnTbxzv4NuuPH/gHfl7phocxuGmZeMd/UJY+tZ9lMNPCaL9lbyaUNFnTca70gPb8xYK6jp9fdFrg8EDfY07UoMNksKPjKqBgFBZpgQiZ/EOX94g96EV0/EO0urYP7ZDJur/sQKMJDhNVd6IdMKpgRe9lXeWA+8EXMHSDG/YjMwduUK6lrMh0M2TX66WOr2pJbnxU3ZQabzY+9qeERVkJqy0kHEPm7k7MotMUolErRudzBmGRTFZJf51RAAAAAElFTkSuQmCC";
        }
    }

    resolvedText() {
        let element = document.getElementById("resolvedText");
        if(parseInt(this.props.resolverAddress, 16) !== 0) {
            element.innerText = "Set Correctly";
        } else {
            element.innerText = "Not Set - Action Required";
            element.style.color = "#ff3b30";
        }
    }

    render() {
        return`
        <div id="view">
            <div class="title-container">
              <img class="ENS-logo" src="data:image/png;base64,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"/>
              <h1 class="ensNameContainer">${this.props.fullName}</h1>
              <h3 class="expiry-information">Expires on: ${this.formatTimeStamp(this.props.nameExpires)} (${this.daysLeft(this.props.nameExpires)} days left)</h3>
            </div>
            
            <div class="separator">
            </div>

            <div class="resolver-title-box">
              <h1 class="resolver-title-text">Resolver</h1>
            </div>
            
            <div id="statusBox">
                <h3 class="status-title">Status</h3>
                <img id="resolvedImage"> <h3 id="resolvedText"></h3>
            </div>
            
            <div id="resolverAddressBox">
                <p class="subtitle">Resolver Address</p>
                <p class="viewText">${this.props.resolverAddress}</p>
            </div>
       
            <div id="description">
                <p class="subtitle">Description</p>
                <p class="viewText">${this.props.description}</p>
            </div>
        </div>
        `;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens, tokenCardId) => {
    const currentTokenInstance = updatedTokens.currentInstance;
    let token = new Token(currentTokenInstance);
    document.getElementById(tokenCardId).innerHTML = token.render();
    token.resolvedText();
    token.resolvedImage();
};

//]]>
