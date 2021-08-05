//获取节点
const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateTotal = document.getElementById('calculate-total');

let data = [];

// getRandomUser(); getRandomUser(); getRandomUser();

//获取随机用户
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // console.log(data);
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

//财产翻倍
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    })
    updateDOM();
}

//富豪排行榜
function sortByMoney() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

//展示百万富翁
function showMilli() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

function calTotal() {
    const total = data.reduce((prev, cur) => (prev += cur.money), 0);
    console.log(formatMoney(total));
    const elem = document.createElement('div');
    elem.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(elem);
}

//添加对象到data数组
function addData(user) {
    data.push(user);
    updateDOM();
}

function updateDOM(providedData = data) {
    //清空main
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    providedData.forEach(item => {
        const elem = document.createElement('div');
        elem.classList.add("person");
        elem.innerHTML = `<strong>${item.name}
        </strong>${formatMoney(item.money)}`;
        main.appendChild(elem);
    })
}

//使用正则表达式转换为货币格式
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//事件监听
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleMoney);
sort.addEventListener('click', sortByMoney);
showMillionaires.addEventListener('click', showMilli);
calculateTotal.addEventListener('click', calTotal);