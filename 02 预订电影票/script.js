const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie');
let ticketPrice = +movie.value;
//console.log(ticketPrice);
//console.log(typeof ticketPrice);
populateUI();

//更新座位数以及总票价
function updateCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //console.log(selectedSeats);
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    //console.log(seatsIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    //console.log(selectedSeatsCount);
    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice;
}

//设置初始座位和总票价
updateCount();

//获取本地数据并渲染样式
function populateUI() {
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
    //console.log(selectedSeats);
    if(selectedSeats!==null&&selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)!=-1){//如果查找到
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');
    //console.log(selectedMovieIndex);
    if(selectedMovieIndex!==null){
        movie.selectedIndex=selectedMovieIndex;
    }
}

//保存电影索引值和票价
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

//电影下拉框的事件监听
movie.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    //console.log(ticketPrice);
    //console.log(e.target.selectedIndex,e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateCount();
})

//座位点击事件
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //console.log(e.target);
        e.target.classList.toggle('selected');

        updateCount();
    }
})