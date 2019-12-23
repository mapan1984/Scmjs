/**
 * Environments
 *
 * @class
 * @extends Map
 *
 * Example:
 *      let env1 = new Env([['a', 1], ['b', 2]])
 *      env1.lookup('a') => 1
 *      let env2 = env.extEnv('c', 3)
 *      env2.lookup('a') => 1
 *      env2.lookup('c') => 3
 *      let env3 = env.extEnv('a', 4)
 *      env1.lookup('a') => 1
 *      env3.lookup('a') => 4
 */
class Env extends Map {
    constructor(maps=[], outer=null) {
        super(maps)
        this.outer = outer
    }

    /**
     * Find the innermost env where var appears.
     */
    lookup(key) {
        if (this.has(key)) {
            return this.get(key)
        } else {
            if (this.outer) {
                return this.outer.lookup(key)
            } else {
                throw 'Undefined variable: ' + key
            }
        }
    }

    /**
     * Create a new Env
     */
    extEnv(key, value) {
        let newEnv = new Env([[key, value]], this)
        return newEnv
    }
}

export default Env
