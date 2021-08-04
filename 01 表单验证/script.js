//获取dom节点
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//输入错误
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className=("form-control error");
    const small = formControl.querySelector("small");
    small.innerHTML = message;
}

//输入正确
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className=("form-control success");
}

//邮箱确认函数
function checkEmail(input) {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "邮箱格式错误");
    }
}

//获取关键词
function getKeywords(input) {
    return input.placeholder.slice(3);
}

//验证输入是否为空
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        //console.log(input.value);
        if (input.value.trim() === '') {
            showError(input, `${getKeywords(input)}为必填项`);
        } else {
            showSuccess(input);
        }
    })
}

//验证输入长度是否达标
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getKeywords(input)}至少为${min}个字符`);
    } else if (input.value.length > max) {
        showError(input, `${getKeywords(input)}必须少于${max}个字符`);
    } else {
        showSuccess(input);
    }
}

//验证输入密码是否匹配
function checkPasswordMatch(input1,input2){
    if(input1.value!==input2.value){
        showError(input2,"密码不匹配");
    }
}

//事件监听
form.addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log(username.value);
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 12);
    checkEmail(email);
    checkPasswordMatch(password,password2);
})