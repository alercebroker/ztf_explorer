var julian = require('julian');

/**
* receives date in julian format and convert in gregorian format
* @param MJD:date in julian format
* @returns {string} : date in gregorian format
*/
function jdToGregorian(mjd) {
    if (mjd == undefined || mjd == null) return null
    let jd = Number(mjd) + 2400000
    let date = julian.toDate(jd)
    let year = date.getUTCFullYear()
    let month = date.getUTCMonth() + 1
    if (month < 10) month = "0" + month
    let day = date.getUTCDate()
    return year + "-" + month + "-" + day
}

/**
 * receives date in gregorian format and convert in julian format
 * @param dateObj:date Object
 * @returns {number} : date in jualian format
 */
function gregorianToJd(dateObj) {
    if (dateObj == null) return null
    var mjulianDate = dateObj / 86400000 + 40587;
    return mjulianDate;
}

function jdToDate(mjd) {
    if (mjd == undefined || mjd == null || mjd === "") return null
    var date = (mjd - 40587) * 86400000;
    return new Date(date)
}

/* Based in: http://www.bdnyc.org/2012/10/decimal-deg-to-hms/*/
function raDectoHMS(ra, dec) {
    if(dec) {
        var sign = dec < 0 ? '-' : '+';
        dec = Math.abs(dec);
        var deg = Math.floor(dec);
        var decM = Math.abs(Math.floor((dec-deg)*60));
        var decS = Math.floor((Math.abs((dec-deg)*60)-decM)*60);
        dec = `${sign}${deg}d${decM}m${decS}s`;
    }
    if(ra) {
        var sign = ra < 0 ? '-' : '';
        ra = Math.abs(ra);
        var raH = Math.floor(ra/15);
        var raM = Math.floor(((ra/15) - raH)*60);
        var raS = Math.floor(((((ra/15)-raH)*60)-raM)*60);
        ra = `${sign}${raH}h${raM}m${raS}s`;
    }
    return [ra, dec];
}

function HMStoRaDec(hms) {
    let a = hms.split("+");
    var ra = a[0].trim();
    var dec = a[1].trim();
    if(dec) {
        dec = dec.split(/d|m|s/).map(x => Number(x));
        let sign = dec[0] < 0 ? -1 : 1;
        let D = Math.abs(dec[0]);
        let M = dec[1]; 
        let S = dec[2];
        dec = sign * (D + (M/60) + (S/3600));
    }

    if(ra) {
        ra = ra.split(/\h|m|s/).map(x => Number(x));
        let sign = ra[0] < 0 ? -1 : 1;
        let H = Math.abs(ra[0]);
        let M = ra[1];
        let S = ra[2];
        ra = sign * (H*15 + M/4 + S/240);
    }
    return [ra, dec];
    
}

export { gregorianToJd, jdToGregorian, jdToDate, raDectoHMS, HMStoRaDec }
