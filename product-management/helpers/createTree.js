let count = 0
const createTreeFunc = (arr, parent_id = "") => {
    const tree = [];
    for (const item of arr) {
        if (item.parent_id === parent_id) {
            count++;
            const newItem = item ;
            newItem.index = count;
            const children = createTreeFunc(arr, item.id);
            if (children.length) newItem.children = children;
            tree.push(newItem);
        }
    }
    return tree;
}

module.exports.createTree = (arr, parent_id = "" ) => {
    count = 0;
    const tree = createTreeFunc(arr, parent_id = "");
    return tree
}

