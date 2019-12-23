// 闭包的数据结构定义，包含一个函数定义 f 和它定义时所在的环境
class Closure {
    constructor(arg, body, env) {
        this.arg = arg
        this.body = body
        this.env = env
    }
}

function isSymbol(exp) {
    return typeof exp == 'string'
}
function isNumber(exp) {
    return typeof exp == 'number'
}
function isFunction(exp) {
    let [op, ...rest] = exp
    return op == 'lambda'
}
function isBind(exp) {
    let [op, ...rest] = exp
    return op == 'let'
}
function isBranch(exp) {
    let [op, ...rest] = exp
    return op == 'if'
}
function isDefine(exp) {
    let [op, ...rest] = exp
    return op == 'define'
}
function isCall(exp) {
    return exp.length == 2
}
function isOp(exp) {
    let [op, e1, e2] = exp
    let ops = new Set(['+', '-', '*', '/', 'eq'])
    return ops.has(op)
}

/**
 * 解释器的递归定义（接受两个参数，表达式 exp 和环境 env）
 * 共 5 种情况（变量，函数，绑定，调用，数字，算术表达式）
 *
 * @param {array}  ast
 * @param {env}    Env
 *
 * Example:
 *      let ast = ['let', [['x', '1']], ['+', 1, 'x']]
 *      let env = new Env([['+', (x,y)=>x+y]])
 *      eval(ast, env) => 2
 */
function evaluate(exp, env) {
    if (isSymbol(exp)) {  // 变量
        return env.lookup(exp)
    } else if (isNumber(exp)) {  // 数字
        return exp
    } else if (isFunction(exp)) {  // 函数 ['lambda', ['x'], exp]
        let [_, [arg], body] = exp
        return new Closure(arg, body, env)
    } else if (isBind(exp)) {  // 绑定 ['let', [['x', e1]], e2]
        let [_, [[x, e1]], e2] = exp
        let v1 = evaluate(e1, env)
        return evaluate(e2, env.extEnv(x, v1))
    } else if (isBranch(exp)) {  // 分支 [if, test, conseq, alt]
        let [_, test, conseq, alt] = exp
        let e = evaluate(test, env) ? conseq : alt
        return evaluate(e, env)
    } else if (isDefine(exp)) {  // 定义 [define, symbol, exp]
        let [_, symbol, e] = exp
        env.set(symbol, evaluate(e, env))
    } else if (isCall(exp)) {  // 调用 [proc, arg]
        let [proc, arg] = exp
        let p = evaluate(proc, env)
        let a = evaluate(arg, env)
        return evaluate(p.body, p.env.extEnv(p.arg, a))
    } else if (isOp(exp)) {  // 算术表达式 ['+', 1, 3]
        let [op, e1, e2] = exp
        let v1 = evaluate(e1, env)
        let v2 = evaluate(e2, env)
        return env.lookup(op)(v1, v2)
    } else {
        throw 'Error syntax'
    }
}

export default evaluate
