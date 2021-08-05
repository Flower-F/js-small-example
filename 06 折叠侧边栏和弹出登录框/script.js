//获取节点
const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const close = document.getElementById('close');
const model = document.getElementById('model');

//事件监听

//显示侧边栏
toggle.addEventListener('click', () =>
    document.body.classList.toggle("show-nav"));

//显示登录界面
open.addEventListener('click', () =>
    model.classList.add("show-model"));

//隐藏登录界面
close.addEventListener('click', () =>
    model.classList.remove("show-model"));

window.addEventListener('click', e =>
    e.target==model?model.classList.remove("show-model"):false);