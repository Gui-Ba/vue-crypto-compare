
<template>
  <div class="container-fluid">
    <div class="example">
      Veuillez sélectionner les crytpomonnaies à afficher
      <form>
        <div class="form-group">
          Select All<input type="checkbox" @click='selectAll()' v-model='isSelectAll'>
          <ul>
            <li v-for="coin in coins">
              {{ coin.name }}
              <input type="checkbox" v-model="coin.active" @change='updateSelectall()'>
            </li>
          </ul>


        </div>
      </form>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="example">
          <table class="table table-hover">
            <thead>
              <tr>
                <td>Rank</td>
                <td>Name</td>
                <td>Symbol</td>
                <td>Price (USD)</td>
                <td>1H</td>
                <td>1D</td>
                <td>1W</td>
                <td>Market Cap (USD)</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="coin in coins">
                <div v-if="coinactive === true">
                  <td>{{ coin.rank }}</td>
                  <td><img v-bind:src="getCoinImage(coin.symbol)"> {{ coin.name }}</td>
                  <td>{{ coin.symbol }}</td>
                  <td>{{ coin.price_usd | currency }}</td>
                  <td v-bind:style="getColor(coin.percent_change_1h)">
                    <span v-if="coin.percent_change_1h > 0">+</span>{{ coin.percent_change_1h }}%
                  </td>
                  <td v-bind:style="getColor(coin.percent_change_24h)">
                    <span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%
                  </td>
                  <td v-bind:style="getColor(coin.percent_change_7d)">
                    <span v-if="coin.percent_change_7d > 0">+</span>{{ coin.percent_change_7d }}%
                  </td>
                  <td>{{ coin.market_cap_usd | currency }}</td>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";

const CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com";
const COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/";
const BASE_IMAGE_URL = "https://www.cryptocompare.com"
const UPDATE_INTERVAL = 60 * 1000;

export default {
  name: 'Home',
  data () {
    return {
      coins: [],
      coinData: {},
      isSelectAll: false,
      
    }
  },
  created: function() {
    this.getCoinData();
  },
  methods: {
  //   selectAll : function(){
  //     this.isSelectAll = !this.isSelectAll;
  // },
  // updateSelectall: function(){
  //   if(this.isSelectAll == true ){
  //     this.coin.active = true;
  //   }else{
  //     this.coin.active = false;
  //   }
  // },


  getCoinData : function() {
    console.log('Getting Coin Data')

    axios.get(CRYPTOCOMPARE_API_URI + "/data/all/coinlist")
    .then((resp) => {
      console.log('got Data')
      this.coinData = resp.data.Data;
      this.getCoins();
    })
    .catch((err) => {
      this.getCoins();
      console.log('Error', err.message);
    })
  },
  getCoins: function() {
    axios.get(COINMARKETCAP_API_URI + 'v1/ticker/?limit=10')
    .then((resp) => this.coins = resp.data)
    .catch(err => console.log(err))
  },
  getCoinImage: function(symbol) {
    try {
      return BASE_IMAGE_URL + this.coinData[symbol]['ImageUrl'];
    } catch (err) {
      return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
    }
  },
  getColor: (num) => {
    return num > 0 ? "color:green;" : "color:red;";
  }
},
created: function() {
  this.getCoinData();
  this.getCoins();
}
}
</script>
>
