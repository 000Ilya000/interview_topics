const removeDublicate = (nums) => {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            nums.splice(i, 1);
            i--;
        }
    }
    return nums.length;
};

const removeDuplicates = (arr) => {
    return [...new Set(arr)];
};

console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
removeDuplicates(["a", "b", "a", "c"]); // ["a", "b", "c"]
