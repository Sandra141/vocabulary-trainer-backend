//
// Überschreibt die console.log
//

const PREFIX = "😜"

const printDate = () => {
    const dt = new Date()

    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1).toString().padStart(2, "0");
    const day = dt.getDate().toString().padStart(2, "0");

    const hours = dt.getHours()
    const minutes = dt.getMinutes()
    const seconds = dt.getSeconds()

    return "[" + year + "-" + month + "-" + day + " - " + hours + ":" + minutes + ":" + seconds + "]"
}


const log = console.log;

console.log = function () {

    // 1. Convert args to a normal array
    var args = Array.from(arguments);
    // OR you can use: Array.prototype.slice.call( arguments );

    // 2. Prepend log prefix log string
    args.unshift(PREFIX + '\x1b[34m' + printDate() + '\x1b[35m');

    // 3. Pass along arguments to console.log
    log.apply(console, args);
}