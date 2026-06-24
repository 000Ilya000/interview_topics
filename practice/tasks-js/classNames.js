let classNames = [
    "header",
    "menu",
    "menu-item",
    "menu-item",
    "menu-item",
    "footer",
    "menu",
    "link",
    "link",
    "link",
    "link",
];

//только уникальные класснеймы и отсортированы по количеству использования -  сначала link, потом menu-item и тд
// let result = ["link", "menu-item", "menu", "header", "footer"];

const sortedClassNames = (arr) => {
    let classNamesCount = {};
    for (let i = 0; i < arr.length; i++) {
        let current = classNames[i];
        if (classNamesCount[current]) {
            classNamesCount[current] += 1;
        } else {
            classNamesCount[current] = 1;
        }
    }

    return Object.keys(classNamesCount).sort(
        (a, b) => classNamesCount[b] - classNamesCount[a]
    );
};

console.log(sortedClassNames(classNames));
