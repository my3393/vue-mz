<template>
        <div class="swiper-container billboards">
           <div class="swiper-wrapper">
                <div class="swiper-slide"
                 v-for="(item,index) in banners "
                 :key="index"
                >
                   <img :src="item.imgUrl"  >  
                </div>
               
           </div>
           <div class="swiper-pagination"></div>
     </div>
</template>
<script>
export default {
    props:{
        banners:{
        type: Array
        }
    },
     updated() {
         if (!this.swiper) {
           this.swiper =  new Swiper('.swiper-container',{
             autoplay: {
                    delay: 1000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                    },
             loop:true,
             pagination: {
                    el: '.swiper-pagination',
                },
         })
         }
     },
}
</script>
<style lang="less">
 .swiper-container{
     width: 100%;
     height: 210px;
   
   img{
       width: 100%;
   }

 }
   

</style>
