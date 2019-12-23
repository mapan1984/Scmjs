const empty = /\s+/
const reLeft = /\(/g
const reRight = /\)/g

/**
 * Convert a string of characters into a list of tokens
 *
 * @param  {string} s表达式
 * @return {array}  tokens
 *
 * Example:
 *      let s = '(lambda (x) (+ 1 x))'
 *      scanner(s) => ['(', 'lambda', '(', 'x', ')', '(', '+', '1', 'x', ')', ')']
 */
function scanner(str) {
    return str.replace(reLeft, '( ').replace(reRight, ' )').split(empty)
}

/**
 * Convert a list of tokens into a abstract-syntax-tree
 *
 * @param  {array}  tokens
 * @return {array}  ast
 *
 * Example:
 *      let tokens = ['(', 'lambda', '(', 'x', ')', '(', '+', '1', 'x', ')', ')']
 *      parser(tokens) => ['lambda', ['x'], ['+', 1, 'x']]
 */
function parser_(tokens) {
    if (!tokens.length) {
        throw 'Unexpected EOF'
    }
    let token = tokens.shift()
    if (token == '(') {
        let ast = []
        while (tokens[0] != ')') {
            ast.push(parser_(tokens))
        }
        tokens.shift()  // pop off ')'
        return ast
    } else if (token == ')') {
        throw 'Unexpected `)`'
    } else {
        return atom(token)
    }
}

function* parser(tokens) {
    if (!tokens.length) {
        throw 'Unexpected EOF'
    }
    while (tokens.length) {
        let token = tokens.shift()
        if (token == '(') {
            let ast = []
            while (tokens[0] != ')') {
                ast.push(parser(tokens).next().value)
            }
            tokens.shift()  // pop off ')'
            yield ast
        } else if (token == ')') {
            throw 'Unexpected `)`'
        } else {
            yield atom(token)
        }
    }
}

/**
 * Numbers become numbers. Every other token is a symbol.
 *
 * Example:
 *      atom('1') => 1
 *      atom('a') => 'a'
 */
function atom(token) {
    let result = +token
    if (isNaN(result)) {
        return token
    } else {
        return result
    }
}


export { scanner, parser }
