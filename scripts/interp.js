let env = new Env([
    ['+', (x, y) => x+y],
    ['-', (x, y) => x-y],
    ['*', (x, y) => x*y],
    ['/', (x, y) => x/y],
    ['eq', (x, y) => x==y],
])

/*
 * Example:
 *      interp('((lambda (x) (+ 1 x)) 3)') => 4
 */
function interp(str) {
    let tokens = scanner(str)
    let asts = parser(tokens)
    let results = []
    for (let ast of asts) {
        // console.log(ast)
        results.push(evaluate(ast, env))
        // console.log(result)
    }
    return results
}
