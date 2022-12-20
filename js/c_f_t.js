//Перевод значений в минуты
const changeMinInInteger = (tgVal) => {
  const tgValue = tgVal.toFixed(2)
    if(Number.isInteger(tgVal)){
      return tgVal
    }else{
      const arrOfInt = tgValue.toString().split('')
      const intOfmin = `${arrOfInt[arrOfInt.length-2]}${arrOfInt[arrOfInt.length-1]}`
      arrOfInt.splice(arrOfInt.length-3,3)
      const degree = Number(intOfmin)/60
      const totalResult = Number(arrOfInt.join(''))+degree
      return totalResult.toFixed(2)
    }
}

 //найти тангенс 
function findTg (D,d,l) {
  const tg = Math.atan((D-d)/(2*l))*180/3.14
  const tang = tg.toFixed(2).toString().split("")
  const min = `${tang[tang.length-2]}${tang[tang.length-1]}`
  tang.splice(tang.length-3,3)
  const minut = Math.ceil(Number(min)*0.6)
  return `${tang.join('')}°${minut.toFixed(0)}' `
}

//найти наибольший диаметр
function findTheLargestDiameter (d,l,tg) {
  const tgR = changeMinInInteger(tg) * (Math.PI/180)
  const lrgstD = tgR*(2*l)+d
  return lrgstD.toFixed(2)
}

  //найти наименьший диаметр
function findTheSmallestDiameter (D,l,tg){
  const tgR = changeMinInInteger(tg) * (Math.PI/180)
  const smllstD = D - tgR*(2*l)
  return smllstD.toFixed(2)
} 

  //найти длину конуса
function findTheLengthOfTheCone (D,d,tg) {
  const tgR = changeMinInInteger(tg) * (Math.PI/180)
  const lngthOfTheCone = (D-d)/(2*tgR)
  return lngthOfTheCone.toFixed(2)
}
  
//кнопки неизвестныx данных
const btnD = document.getElementById('D')
const btn_d = document.getElementById('d')
const btn_l = document.getElementById('L')
const btn_tg = document.getElementById('tg')
const arrBtns = [btnD,btn_d,btn_l,btn_tg]

//тескт для placeholder
const txt ={
  D:'Наибольший D,мм',
  d: 'Наименьший d,мм',
  L: 'Длина конуса L,мм',
  tg: 'Угол* в градусах,tg(ɑ)',
  help: `*Угол не может быть меньше 0° и больше 90°. Введите угол в формате Х.ХХ Например, если дано 15°6', то введите 15.06 Если 7°23', то 7.23`
}

  //стили для input button
const style={
  style: 'margin:7px; padding: 7px; background: #f000; font-size: 1.2em'
}

  // создание html элементов
const form = document.querySelector('form')
const div = document.querySelector('#dv')
const input1 = document.createElement('input')
const input2 = document.createElement('input')
const input3 = document.createElement('input')
const label1 = document.createElement('label')
const label2 = document.createElement('label')
const label3 = document.createElement('label')
const arrLabel = [label1,label2,label3]
const btnInp =  document.createElement('button')
const btnBack=  document.createElement('button')
const answer = document.querySelector('h3')
const arrInpt = [input1,input2,input3]
const unknowValue = document.querySelector('#uv')
const br1 = document.createElement('br')
const br2 = document.createElement('br')
const br3 = document.createElement('br')
const help = document.querySelector('#help')
  
//функция для отрисовки инпута
function renderInput(ph1,ph2,ph3,uv){
  div.remove()
  document.body.style.transform = 'translateY(-500px)'

  answer.textContent=''
  unknowValue.textContent = uv
  btnBack.id = 'btnBack'
  btnBack.textContent='Назад'
  btnBack.style = style.style
  btnInp.textContent = 'Рассчитать'
  btnInp.id = 'btnInput'
  btnInp.style = style.style
  input1.placeholder = ph1
  input2.placeholder = ph2
  input3.placeholder = ph3
  label1.textContent = ph1
  label2.textContent = ph2
  label3.textContent = ph3
  arrLabel.map(label=>label.style = 'font:18pt bold; font-weight: bold;')
  help.textContent = txt.help
  help.style = "width: 300px; color:red"
  arrInpt.map(input=>input.style = style.style)
  arrInpt.map(input=>input.value ='')
 
  div.append(label1)
  div.append(input1)
  div.append(br1)
  div.append(label2)
  div.append(input2)
  div.append(br2)
  div.append(label3)
  div.append(input3)
  div.append(help)
  div.append(br3)
  div.append(btnInp)
  div.append(btnBack)
  form.append(div)
  return div
}
const erorrMessage = 'Некорректный запрос. Используйте только цифры, точки или запятые.'

  //функция всех вычислений
  
  //syntaxValid - изменение запятой на точку
  const syntaxValid = (val) =>{
   const numCor = Number(val.split('').map(v=>v===','?v='.':v).join(''))
   return numCor
 } 
function coneCalculation () {
  btnD.addEventListener('click', (e)=>{
    const {target} = e
    renderInput(txt.d,txt.L,txt.tg,`${target.id}=?`)
    btnInp.addEventListener('click', (e)=>{
      e.preventDefault()
      
      const dValue = syntaxValid(input1.value)
      const lValue = syntaxValid(input2.value)
      const tgValue = syntaxValid(input3.value)
      const lD = findTheLargestDiameter(dValue, lValue, tgValue)
      answer.textContent = lD === 'NaN' ? erorrMessage:`Наибольший диаметр D = ${lD}мм`
      unknowValue.textContent=''
    })
  })
  btn_d.addEventListener('click', (e)=>{
    const {target} = e
    renderInput(txt.D,txt.L,txt.tg, `${target.id}=?`)
    btnInp.addEventListener('click', (e)=>{
    e.preventDefault()
    const lDValue = syntaxValid(input1.value)
    const lValue = syntaxValid(input2.value)
    const tgValue = syntaxValid(input3.value)
    const smD = findTheSmallestDiameter(lDValue,lValue, tgValue)
    answer.textContent = smD === 'NaN' ?erorrMessage:`Наименьший диаметр d = ${smD}мм`
    unknowValue.textContent=''
    })
  })
  btn_l.addEventListener('click', (e)=>{
    const {target} = e 
    renderInput(txt.D,txt.d,txt.tg, `${target.id}=?`)
    btnInp.addEventListener('click', (e)=>{
    e.preventDefault()
    const lDValue = syntaxValid(input1.value)
    const dValue = syntaxValid(input2.value)
    const tgValue = syntaxValid(input3.value)>90 || syntaxValid(input3.value)<=0?syntaxValid('f') :syntaxValid(input3.value)
    const lngth = findTheLengthOfTheCone(lDValue, dValue, tgValue)
    answer.textContent = lngth === 'NaN' ? erorrMessage:`Длина конуса = ${lngth}мм`
    unknowValue.textContent=''
    })
  })
  btn_tg.addEventListener('click', (e)=>{
    const {target} = e
    renderInput(txt.D,txt.L,txt.d, `${target.id}(ɑ)=?`)
    help.textContent=''
    btnInp.addEventListener('click', (e)=>{
    e.preventDefault()
    const lDValue = syntaxValid(input1.value)
    const lValue = syntaxValid(input2.value)
    const dValue = syntaxValid(input3.value)
    const tg = findTg(lDValue, dValue, lValue)
    answer.textContent = tg.split('').includes('N')  ? erorrMessage:`Угол tg(ɑ)  = ${tg}`
    unknowValue.textContent=''
  })
  })
  btnBack.addEventListener('click', (e)=>{
    e.preventDefault()
    e.target?document.body.style.transform = 'translateY(0px)' : ''

  })
}
coneCalculation()
  