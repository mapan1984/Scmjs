function isNumber(exp) {
    return typeof(exp) == 'number'
}

/*
 *  treeSum([1, 2]) = 3
 *  treeSum([[1, 2], 3]) = 6
 *  treeSum([1, [2, 3]]) = 6
 *  treeSum([[1, 2], [3, 4]]) = 10
 */
function treeSum(exp) {
    if (isNumber(exp)) {
        return exp
    } else {
        let [v1, v2] = exp
        return treeSum(v1) + treeSum(v2)
    }
}

/*
calc([+, 1, 2]) = 3
calc([*, 2, 3]) = 6
calc([*, [+, 1, 2], [+, 3, 4]]) = 21
*/
function calc(exp) {
    if (isNumber(exp)) {
        return exp
    } else {
        let [op, e1, e2] = exp
        let v1 = calc(e1)
        let v2 = calc(e2)
        if (op == '+') {
            return v1 + v2
        } else if (op == '-') {
            return v1 - v2
        } else if (op == '*') {
            return v1 * v2
        } else if (op == '/') {
            return v1 / v2
        }
    }
}

