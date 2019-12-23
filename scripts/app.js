import {interp} from './core/interp.js'


let programText = document.querySelector('.program>textarea')
let output = document.querySelector('.output>div')


// 运行并且输出
let runBtn  = document.querySelector('#run')
runBtn.addEventListener('click', () => {
  let program = programText.value
  let results = interp(program)
  output.innerText = results.join('\n')
})


// 清除输入
let clearBtn  = document.querySelector('#clear')
clearBtn.addEventListener('click', () => {
    programText.value = ""
})


// 填写示例输入
let examples = document.querySelector('#examples')
examples.addEventListener('click', (event) => {
    let target = event.target
    if (target.nodeName == 'A') {
        let program = target.dataset.program
        programText.value = program
    }
})
