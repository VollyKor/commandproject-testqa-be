"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getuniqueQns = void 0;
function getuniqueQns(array) {
    const newArray = [];
    (function getItem() {
        const randomNumber = Math.round(Math.random() * (array.length - 1));
        if (newArray.length >= 12)
            return;
        if (newArray.includes(array[randomNumber])) {
            return getItem();
        }
        newArray.push(array[randomNumber]);
        return getItem();
    })();
    return newArray;
}
exports.getuniqueQns = getuniqueQns;
//# sourceMappingURL=getuniqueQn.js.map