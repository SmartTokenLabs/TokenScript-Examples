//<![CDATA[
    (function() {
        'use strict'
        function GeneralizedTime(generalizedTime) {
            this.rawData = generalizedTime;
        }

        GeneralizedTime.prototype.getYear = function () {
            return parseInt(this.rawData.substring(0, 4), 10);
        };

        GeneralizedTime.prototype.getMonth = function () {
            return parseInt(this.rawData.substring(4, 6), 10) - 1;
        };

        GeneralizedTime.prototype.getDay = function () {
            return parseInt(this.rawData.substring(6, 8), 10)
        };

        GeneralizedTime.prototype.getHours = function () {
            return parseInt(this.rawData.substring(8, 10), 10)
        };

        GeneralizedTime.prototype.getMinutes = function () {
            var minutes = parseInt(this.rawData.substring(10, 12), 10)
            if (minutes) return minutes
            return 0
        };

        GeneralizedTime.prototype.getSeconds = function () {
            var seconds = parseInt(this.rawData.substring(12, 14), 10)
            if (seconds) return seconds
            return 0
        };

        GeneralizedTime.prototype.getMilliseconds = function () {
            var startIdx
            if (time.indexOf('.') !== -1) {
                startIdx = this.rawData.indexOf('.') + 1
            } else if (time.indexOf(',') !== -1) {
                startIdx = this.rawData.indexOf(',') + 1
            } else {
                return 0
            }

            var stopIdx = time.length - 1
            var fraction = '0' + '.' + time.substring(startIdx, stopIdx)
            var ms = parseFloat(fraction) * 1000
            return ms
        };

        GeneralizedTime.prototype.getTimeZone = function () {
            let time = this.rawData;
            var length = time.length
            var symbolIdx
            if (time.charAt(length - 1 ) === 'Z'){
                return 0
            }
            if (time.indexOf('+') !== -1) {
                symbolIdx = time.indexOf('+')
            } else if (time.indexOf('-') !== -1) {
                symbolIdx = time.indexOf('-')
            } else {
                return NaN
            }
            var minutes = time.substring(symbolIdx + 2)
            var hours = time.substring(symbolIdx + 1, symbolIdx + 2)
            var one = (time.charAt(symbolIdx) === '+') ? 1 : -1
            var intHr = one * parseInt(hours, 10) * 60 * 60 * 1000
            var intMin = one * parseInt(minutes, 10) * 60 * 1000
            var ms = minutes ? intHr + intMin : intHr
            return ms
        };

        if (typeof exports === 'object') {
            module.exports = GeneralizedTime
        } else if (typeof define === 'function') {
            define(GeneralizedTime)
        } else {
            window.GeneralizedTime = GeneralizedTime
        }
    }())

class Token {
    constructor(tokenInstance) {
        this.props = tokenInstance;
    }

    formatGeneralizedTimeToDate(str) {
        const d = new GeneralizedTime(str);
        return new Date(d.getYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds()).toLocaleDateString();
    }

    formatGeneralizedTimeToTime(str) {
        const d = new GeneralizedTime(str);
        return new Date(d.getYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    render() {
        let time;
        let date;
        if (this.props.time == null) {
            time = "";
            date = "";
        } else {
            time = this.formatGeneralizedTimeToTime(this.props.time.generalizedTime);
            date = this.props.time == null ? "": this.formatGeneralizedTimeToDate(this.props.time.generalizedTime);
        }
        return `<div>
            <div>
                <span class="ts-count">x${this.props._count}</span>  <span class="ts-category">${this.props.label}</span>
            </div>
            <div>
                <span class="ts-venue">${this.props.building}</span>
            </div>
                <div style="margin: 0px; padding:0px; clear: both; height: 6px">
                &nbsp;
                </div>
            <div>
                <img src="data:image/png;base64,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" class="data-icon"/>
                <span class="ts-date">${date}</span>
            </div>
            <div>
                <span class="ts-time">${time}, ${this.props.locality}</span>
            </div>
            </div>`;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens, tokenCardId) => {
    const currentTokenInstance = updatedTokens.currentInstance;
    document.getElementById(tokenCardId).innerHTML = new Token(currentTokenInstance).render();
};
