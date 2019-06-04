/**
* receives date in julian format and convert in gregorian format
* @param MJD:date in julian format
* @returns {string} : date in gregorian format
*/            
function jdToGregorian(MJD) {
    var JD = Number(MJD) + 2400000.5;
    const y = 4716;
    const v = 3;
    const j = 1401;
    const u = 5;
    const m = 2;
    const s = 153;
    const n = 12;
    const w = 2;
    const r = 4;
    const B = 274277;
    const p = 1461;
    const C = -38;
    var f =
    JD + j + Math.floor((Math.floor((4 * JD + B) / 146097) * 3) / 4) + C;
    var e = r * f + v;
    var g = Math.floor((e % p) / r);
    var h = u * g + w;
    var D = Math.floor((h % s) / u) + 1;
    var M = ((Math.floor(h / s) + m) % n) + 1;
    var Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n);
    var day = ("0" + D).slice(-2);
    var month = ("0" + M).slice(-2);
    var year = ("000" + Y).slice(-4);
    var today = year + "-" + month + "-" + day;
    return today;
}

/**
 * receives date in gregorian format and convert in julian format
 * @param gDate:date in gregorian format
 * @returns {number} : date in jualian format
 */
function gregorianToJd(gDate) {
    console.log("kljkjhdjas");
    //MJD = JD − 2400000.5
    var dateObj = new Date(gDate);
    var mjulianDate = dateObj / 86400000 + 40588;
    return mjulianDate;
}

export function example(){
    console.log("kjhsad");
}
