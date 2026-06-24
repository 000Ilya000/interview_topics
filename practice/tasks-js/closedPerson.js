// 1 - занятое место
// 0 - свободное место
// нужно найти максимальное расстояние до первого занятого места
const input1 = [1, 0, 0, 0, 1, 0, 1]; //2
const input2 = [1, 0, 0, 0]; //3
const input3 = [1, 0, 1, 1]; //1
const input4 = [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1]; //6
const input5 = [1, 0, 0, 1, 1]; //2
const input6 = [0, 0, 0, 0, 0]; //4
const input7 = [1, 1, 1, 1, 1]; //0

const maxDistToClosed = (seats) => {
    let maxDist = 0;
    let lastOccupied = -1;

    for (let i = 0; i < seats.length; i++) {
        if (seats[i] === 1) {
            if (lastOccupied === -1) {
                // Левый край — все нули до первой единицы
                maxDist = i;
            } else {
                // Внутри массива — между двумя единицами
                let dist = Math.floor((i - lastOccupied) / 2);
                maxDist = Math.max(maxDist, dist);
            }
            lastOccupied = i;
        }
    }

    // Правый край — все нули после последней единицы
    if (seats[seats.length - 1] === 0) {
        let dist = seats.length - 1 - lastOccupied;
        maxDist = Math.max(maxDist, dist);
    }

    return maxDist;
};

// 1 1 0 1 1 0 0

console.log(maxDistToClosed(input1));
console.log(maxDistToClosed(input2));
console.log(maxDistToClosed(input3));
console.log(maxDistToClosed(input4));
console.log(maxDistToClosed(input5));
console.log(maxDistToClosed(input6));
console.log(maxDistToClosed(input7));
