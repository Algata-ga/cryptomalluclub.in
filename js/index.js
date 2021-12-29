const accordian = document.getElementsByClassName("contents");

for(i=0;i<accordian.length;i++){
    accordian[i].addEventListener('click',function(){
        this.classList.toggle('active')
    })
}