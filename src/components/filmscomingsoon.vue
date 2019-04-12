<template>
  <div class="film-list-content">
    <div class="nowPlayingList-wrap">
      <ul>
        <li class="item" v-for="item in filmList" :key="item.filmId">
          <router-link :to="{name:'detail', params:{id: item.filmId}}">
            <div class="img">
              <img :src="item.poster">
            </div>
            <div class="info">
              <div class="film-name info-col">
                <span class="name">{{item.name}}</span>
                <span class="item">{{item.filmType.name}}</span>
              </div>
              <div class="film-grade info-col" style="visibility: visible;">
                <span class="label">观众评分</span>
                <span class="grade">{{item.grade}}</span>
              </div>
              <div class="film-actors info-col">
                <span class="label">主演：{{actorsFn(item.actors)}}</span>
              </div>
              <div class="film-detail info-col">
                <span class="label">上映日期 ： </span>
              </div>
            </div>
            <div class="buy">预购</div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="node-more" @click="loadmore" v-if="pageNum < gettatol">加载更多...</div>
    <div class="node-more" v-else>我也是有底线的</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      filmList: [],
      pageNum: 1,
      pageSize: 10,
      tatol: 1
    };
  },
  computed: {
    gettatol() {
      return Math.ceil(this.tatol / this.pageSize);
    }
  },
  methods: {
    getlist() {
      axios
        .get("https://m.maizuo.com/gateway", {
          params: {
            //axios的get请求，如果要传递参数的话，要使用第二个参数里面的params这个选项来设置
            //cityId=440300&pageNum=1&pageSize=10&type=2&k=1864529
            cityId: 310100,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            type: 2,
            k:1864529
          },
          headers: {
            "X-Client-Info":
              '{"a":"3000","ch":"1002","v":"1.0.0","e":"15546141681898375545088"}',
            "X-Host": "mall.film-ticket.film.list"
          }
        })
        .then(res => {
          let data = res.data;
          // console.log(data)
          if (data.status == 0) {
            this.tatol = data.data.total;
            // this.filmList = data.data.films;

            //追加
            //1
            // this.filmList = this.filmList.concat(data.data.films);
            //2
            this.filmList.push(...data.data.films);
            // console.log( this.filmList)
          } else {
            alert(data.msg);
          }
        });
    },

    loadmore() {
      this.pageNum++;
      this.getlist();
    },
    /**
     * 将主演的数组转换成主演的名字
     * @param {Array} actors 主演数组
     * actors = [] 是 es6中 参数默认值的设置
     */
    actorsFn(actors = []) {
      let temp = actors.map(item => {
        return item.name;
      });
      return temp.join("、");
    }
  },

  created() {
    this.getlist();
  }
};
</script>

<style lang="less">
@import "../styles/common/mixins.less";
.film-list-content {
  ul {
    margin-left: 15px;

    li {
      .border-1-bottom;
      padding: 15px 15px 15px 0;
      height: 94px;
      position: relative;
      box-sizing: content-box;
      border-bottom: 1px solid #ccc;

      > a {
        display: flex;
        align-items: center;
      }

      .img {
        flex-shrink: 0;
        width: 66px;
        height: 94px;
        background: rgb(249, 249, 249);
        img {
          width: 100%;
          border-radius: 2px;
        }
      }

      .info {
        flex: 1;
        padding: 0 10px;
        overflow: hidden;

        .info-col {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }

        .film-name {
          .name {
            max-width: calc(100% - 25px);
            color: #191a1b;
            font-size: 16px;
            height: 22px;
            line-height: 22px;
            margin-right: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .item {
            font-size: 9px;
            color: #fff;
            background-color: #d2d6dc;
            height: 14px;
            line-height: 14px;
            padding: 0 2px;
            border-radius: 2px;
          }
        }

        .film-grade {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
          .grade {
            color: #ffb232;
            font-size: 14px;
          }
        }

        .film-actors {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
        }

        .film-detail {
          .label {
            font-size: 13px;
            margin-top: 4px;
            color: #797d82;
          }
        }
      }

      .buy {
        .border-1;
        flex-shrink: 0;
        line-height: 25px;
        height: 25px;
        width: 50px;
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border-radius: 2px;
        position: relative;
      }
    }
  }
  .node-more {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
</style>
