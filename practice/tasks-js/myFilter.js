Array.prototype.myFilter = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

const arr = [1, 2, 3, 4, 5, 6];
const filterArr = arr.myFilter((x) => x > 2);
console.log(filterArr); // [3, 4, 5, 6]
