<template>
  <div class="row">
    <div class="col-12">
        <span class="d-block text-center h4">
            <i class="fas fa-ticket-alt text-secondary"></i>
            優惠活動
        </span>
    </div>
    <div class="col-12 mt-3 flex-center">
     <div class="discount-wrap p-4 flex-center">
         <div class="content">
            <h2 class="text-center discount-title">開幕優惠!!</h2>
            <p class="text-center discount-text">輸入以下代碼，即可獲得結帳金額8折優惠</p>
            <p class="text-center discount-num">0080</p>
         </div>
         <div class="discount-img">
             <img src="../assets/images/speaker_1130102.png" alt="">
         </div>
         <div class="shiny-bg"></div>
     </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.discount-wrap{
    position: relative;
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    background-color: rgb(84, 166, 187);
}
.content{
    min-width: 200px;
}
.discount-title{
    color:rgb(245, 162, 39);
}
.discount-text{
    color:#616060;
    font-size: 1.2rem;
}
.discount-num{
    color:#f1f1f1;
    font-size: 3rem;
    text-shadow: 0 2px 3px #bdbdbd;
}
.discount-img{
    max-width: 250px;
}
.shiny-bg{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
}
.shiny-bg::after{
    display: block;
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    transform: translateX(100%);
    background: linear-gradient(90deg,hsla(0,0%,70%,0) 0,hsla(0,0%,100%,.5) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0));
    z-index: 1;
    animation: ba-move 3s 1s infinite;
}

@keyframes ba-move{
    0% {transform: translateX(100%);}
    100%{transform: translateX(-100%);}
}

// 最小992 992以上
@media (min-width: 992px) {
  .discount-wrap{
    width: 70%;
  }
}
</style>
