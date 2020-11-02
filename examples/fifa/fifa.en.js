//<![CDATA[
(function() {
    'use strict'

    function GeneralizedTime(generalizedTime) {
        this.rawData = generalizedTime;
    }

    GeneralizedTime.prototype.getYear = function () {
        return parseInt(this.rawData.substring(0, 4), 10);
    }

    GeneralizedTime.prototype.getMonth = function () {
        return parseInt(this.rawData.substring(4, 6), 10) - 1;
    }

    GeneralizedTime.prototype.getDay = function () {
        return parseInt(this.rawData.substring(6, 8), 10)
    }

    GeneralizedTime.prototype.getHours = function () {
        return parseInt(this.rawData.substring(8, 10), 10)
    }

    GeneralizedTime.prototype.getMinutes = function () {
        var minutes = parseInt(this.rawData.substring(10, 12), 10)
        if (minutes) return minutes
        return 0
    }

    GeneralizedTime.prototype.getSeconds = function () {
        var seconds = parseInt(this.rawData.substring(12, 14), 10)
        if (seconds) return seconds
        return 0
    }

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
    }

    GeneralizedTime.prototype.getTimeZone = function () {
        let time = this.rawData;
        var length = time.length
        var symbolIdx
        if (time.charAt(length - 1 ) === 'Z') return 0
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
    }

    if (typeof exports === 'object') {
        module.exports = GeneralizedTime
    } else if (typeof define === 'function' && define.amd) {
        define(GeneralizedTime)
    } else {
        window.GeneralizedTime = GeneralizedTime
    }
}())

class Token {
    constructor(tokenInstance) {
        this.props = tokenInstance
    }

    formatGeneralizedTimeToDate(str) {
        const d = new GeneralizedTime(str)
        return new Date(d.getYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds()).toLocaleDateString()
    }
    formatGeneralizedTimeToTime(str) {
        const d = new GeneralizedTime(str)
        return new Date(d.getYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }

    render() {
        let time;
        let date;
        if (this.props.time == null) {
            time = ""
            date = ""
        } else {
            time = this.formatGeneralizedTimeToTime(this.props.time.generalizedTime)
            date = this.props.time == null ? "": this.formatGeneralizedTimeToDate(this.props.time.generalizedTime)
        }
        return `
        <div class="ticket">
          <div class="ticket_inner">

            <div class="country_container">
              <span class="tbml-country">${this.props.numero}x ${this.props.countryA} vs ${this.props.countryB}</span>
            </div>

            <div class="datetime_container">
              <span class="tbml-date">${date} | ${time}</span>
            </div>

            <div class="venue_container">
                <span class="tbml-venue">${this.props.venue} | ${this.props.locality}</span>
            </div>

            <div class="category_container">
              <span class="tbml-category">${this.props.category}, M${this.props.match}</span>
            </div>

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
