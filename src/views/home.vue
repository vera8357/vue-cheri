<template>
  <div>
    <!-- 輪播大圖 -->
    <div class="row">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/images/carousel_1.png" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="../assets/images/carousel_2.png" class="d-block w-100" />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>

    <!-- 優惠卷 -->
    <div class="row bg-light p-5 my-4">
      <div class="col-12 col-md-8 text-center text-md-left">
        <h4>限量優惠卷</h4>
        <small
          class="Kalam-font"
        >Lorem ismallsum, dolor amet consectetur adismallisicing elit. Nam natus et eveniet 。</small>
      </div>
      <div class="col-12 col-md-4 flex-center mt-3 mt-md-0">
        <a href="#/discount" class="btn btn-sm btn-info coupont-btn text-white">立即領取</a>
      </div>
    </div>

    <!-- 分類選項 -->
    <section class="my-4">
      <div class="row">
        <div class="col text-center p-2">
          <h4>精選商品</h4>
          <i class="fas fa-sort-down animated infinite fadeInDown"></i>
        </div>
      </div>
      <div class="row">
        <div class="col-6 col-md-4 p-0">
          <div class="product-list">
            <a href="#/product/-M44cBiIqLIVvLHDAYek">
              <img src='../assets/images/b-3.png' alt />
              <div class="item-hover-cover flex-center">
                <p>14K金鑽石三葉草手鏈</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-md-4 p-0">
          <div class="product-list">
            <a href="#/product/-M44ZXAY_kUmmDfmCBRq">
              <img src="../assets/images/r-1.png" alt />
              <div class="item-hover-cover flex-center">
                <p>14K金甜粉碧璽復古戒指</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-md-4 p-0">
          <div class="product-list">
            <a href="#/product/-M44XspwGQ3DH63JbSB2">
              <img src="../assets/images/n-1.png" alt />
              <div class="item-hover-cover flex-center">
                <p>18K金簡約微笑排珍珠項鍊</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-md-4 p-0">
          <div class="product-list">
            <a href="#/product/-M44_nXVHEj_T3tTl8ep">
              <img src="../assets/images/e-1.png" alt />
              <div class="item-hover-cover flex-center">
                <p>14K特色鑲嵌紅寶石耳環</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-md-4 p-0">
          <div class="product-list">
            <a href="#/product/-M44bnNToEuGjdrkAi7O">
              <img src="../assets/images/b-1.png" alt />
              <div class="item-hover-cover flex-center">
                <p>14K金菱形祖母綠雙層手鍊</p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-6 col-md-4 p-0">
          <div class="product-list">
            <a href="#/product/-M44YwKWLyufsKoan0gh">
              <img src="../assets/images/n-5.png" alt />
              <div class="item-hover-cover flex-center">
                <p>14K金絕美花紋歐泊項鍊</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- 訂閱email -->
    <div class="row">
      <div class="joinus bg-cover bg-fixed text-center w-100">
        <div class="joinus-content">
          <p>不錯過優惠，加入我們</p>
          <input type="email" name="email" class="form-control" placeholder="Enter your email*" />
          <button class="form-control btn btn-info mt-3">即刻加入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.coupont-btn {
  width: 100%;
}

h4{
  letter-spacing: 4px;
}

.product-list {
  width: 100%;
  height: 100%;
  text-align: center;
}

.product-list img {
  width: 100%;
}

.item-hover-cover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  background-color: rgba(101, 131, 159, 1);
  color: #fff;
  font-size: 0.7rem;
  letter-spacing: 0.2rem;
  border:1px solid #fff;
}

.joinus {
  padding: 8rem;
  background-image: url("../assets/images/joinbg.png");
}
.joinus-content {
  padding: 20px 16px;
  background: rgba(230, 223, 215, 0.9);
  border-radius: 10px;
}
.fa-shopping-cart {
  font-size: 1.3rem;
}
// 最小768 768以上
@media (min-width: 768px) {
  .coupont-btn {
    width: 80%;
  }
  .product-list img {
    width: 100%;
  }
  .item-hover-cover {
    top: 0;
    height: 100%;
    font-size: 1.5rem;
    transition: 1s;
    opacity: 0;
  }
  .item-hover-cover:before {
    content: "";
    display: block;
    width: 85%;
    height: 2px;
    background-color: #fff;
    position: absolute;
    bottom: 45%;
    left: 0;
    right: 0;
    margin: auto;
    transform: scaleX(0);
    transition: 1.2s;
  }
  .product-list:hover .item-hover-cover {
    opacity: 1;
  }
  .product-list:hover .item-hover-cover:before {
    transform: scaleX(1);
  }
}
</style>
