<template lang="html">

  <div class="container">

    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="input-group">
          <input id="url" type="text" v-model="link" class="form-control"/>
          <span class="input-group-btn">
            <button id="go" class="btn btn-primary" type="button" v-on:click="go" >Go!</button>
          </span>
        </div>
      </div>
    </div>
    <br>

    <div id="hero">
      <div id="output">
        <div id="progressBar"></div>
      </div>
      <div id="status">
        <div>
          <span class="show-leech">Downloading </span>
          <span class="show-seed">Seeding </span>
          <code>
            <a id="torrentLink" v-bind:href="link" v-model="link">{{link}}</a>
          </code>
          <span class="show-leech"> from </span>
          <span class="show-seed"> to </span>
          <code id="numPeers">0 peers</code>.
        </div>
        <div>
          <code id="downloaded"></code> of <code id="total"></code> — <span id="remaining"></span><br/> &#x2198;
          <code id="downloadSpeed">0 b/s</code> / &#x2197;<code id="uploadSpeed">0 b/s</code>
        </div>
      </div>
    </div>

    <spinner ref="spinner" :size="size" :fixed="fixed" text="I'm doing my work now... " style="display: none;"></spinner>
    <hr/>

    <alert v-model="showRight" placement="top-right" duration="5000" type="info" width="400px" dismissable>
      <span class="icon-ok-circled alert-icon-float-left"></span>
      <strong>Well Done!</strong>
      <p>You successfully read this important alert message :)</p>
    </alert>

    <alert v-model="showRightD" placement="top-right" duration="5000" type="danger" width="400px" dismissable>
      <span class="icon-ok-circled alert-icon-float-left"></span>
      <strong>Something was wrong!</strong>
      <p>Try again latter :(</p>
    </alert>

  </div>
</template>

<script>

import alert from 'vue-strap/src/Alert'
import spinner from 'vue-strap/src/Spinner'
import accordion from 'vue-strap/src/Accordion'
import panel from 'vue-strap/src/Panel'

export default {
  name:'middle',
  components:{
    spinner,
    accordion,
    panel,
    alert
  },
  data(){
    return {
      link:'',
      fixed:true,
      size:'lg',
      selected: 'info',
      checked:true,
      init_info:true,
      showRight:false,
      showRightD:false
    }
  },
  methods:{
    go:function()
    {
      //this.$refs.spinner.show()

      //this.$refs.spinner.hide()
    }
  }
}
</script>

<style lang="css">
</style>
