//获取节点
const currency1=document.getElementById('currency1');
const currency2=document.getElementById('currency2');
const amount1=document.getElementById('amount1');
const amount2=document.getElementById('amount2');
const swap=document.getElementById('swap');
const rate=document.getElementById('rate');

//通过fetch获取汇率并实现dom更新
function calculate(){
    const cur1=currency1.value;
    const cur2=currency2.value;
    //console.log(cur1,cur2);
    fetch(`https://api.exchangerate-api.com/v4/latest/${cur1}`)
    .then(res=>res.json())
    .then(data=>{
        const temp=data.rates[cur2];
        console.log(temp);

        rate.innerHTML=`1${cur1}=${temp}${cur2}`;
        amount2.value=(amount1.value*temp).toFixed(2);
    })
}
calculate();

//事件监听
currency1.addEventListener('change',calculate);
currency2.addEventListener('change',calculate);
amount1.addEventListener('input',calculate);
amount2.addEventListener('input',calculate);

swap.addEventListener('click',()=>{
    const temp=currency1.value;
    currency1.value=currency2.value;
    currency2.value=temp;
    calculate();
})