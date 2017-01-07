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
      var client = new WebTorrent()
      // HTML elements
      var $body = document.body
      var $progressBar = document.querySelector('#progressBar')
      var $numPeers = document.querySelector('#numPeers')
      var $downloaded = document.querySelector('#downloaded')
      var $total = document.querySelector('#total')
      var $remaining = document.querySelector('#remaining')
      var $uploadSpeed = document.querySelector('#uploadSpeed')
      var $downloadSpeed = document.querySelector('#downloadSpeed')

      // Download the torrent
      client.add(torrentId, function (torrent) {

        // Stream the file in the browser
        torrent.files[0].appendTo('#output')

        // Trigger statistics refresh
        torrent.on('done', onDone)
        setInterval(onProgress, 500)
        onProgress()

        // Statistics
        function onProgress() {
          // Peers
          $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')

          // Progress
          var percent = Math.round(torrent.progress * 100 * 100) / 100
          $progressBar.style.width = percent + '%'
          $downloaded.innerHTML = prettyBytes(torrent.downloaded)
          $total.innerHTML = prettyBytes(torrent.length)

          // Remaining time
          var remaining
          if (torrent.done) {
            remaining = 'Done.'
          } else {
            remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
            remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
          }
          $remaining.innerHTML = remaining

          // Speed rates
          $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
          $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
        }
        function onDone() {
          $body.className += ' is-seed'
          onProgress()
        }
      })

      //this.$refs.spinner.hide()
    },
    // Human readable bytes util
    prettyBytes:function (num) {
      var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      if (neg) num = -num
      if (num < 1) return (neg ? '-' : '') + num + ' B'
      exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
      num = Number((num / Math.pow(1000, exponent)).toFixed(2))
      unit = units[exponent]
      return (neg ? '-' : '') + num + ' ' + unit
    }
  }
}
</script>

<style lang="css">
#output video {
  width: 100%;
}
#progressBar {
  height: 5px;
  width: 0%;
  background-color: #35b44f;
  transition: width .4s ease-in-out;
}
body.is-seed .show-seed {
  display: inline;
}
body.is-seed .show-leech {
  display: none;
}
.show-seed {
  display: none;
}
#status code {
  font-size: 90%;
  font-weight: 700;
  margin-left: 3px;
  margin-right: 3px;
  border-bottom: 1px dashed rgba(255,255,255,0.3);
}

.is-seed #hero {
  background-color: #154820;
  transition: .5s .5s background-color ease-in-out;
}
#hero {
  background-color: #2a3749;
}
#status {
  color: #fff;
  font-size: 17px;
  padding: 5px;
}
a:link, a:visited {
  color: #30a247;
  text-decoration: none;
}
</style>
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
      var torrentId= this.link
      var client = new WebTorrent()
      // HTML elements
      var $body = document.body
      var $progressBar = document.querySelector('#progressBar')
      var $numPeers = document.querySelector('#numPeers')
      var $downloaded = document.querySelector('#downloaded')
      var $total = document.querySelector('#total')
      var $remaining = document.querySelector('#remaining')
      var $uploadSpeed = document.querySelector('#uploadSpeed')
      var $downloadSpeed = document.querySelector('#downloadSpeed')

      // Download the torrent
      client.add(torrentId, function (torrent) {

        // Stream the file in the browser
        torrent.files[0].appendTo('#output')

        // Trigger statistics refresh
        torrent.on('done', onDone)
        setInterval(onProgress, 500)
        onProgress()

        // Statistics
        function onProgress() {
          // Peers
          $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')

          // Progress
          var percent = Math.round(torrent.progress * 100 * 100) / 100
          $progressBar.style.width = percent + '%'
          $downloaded.innerHTML = prettyBytes(torrent.downloaded)
          $total.innerHTML = prettyBytes(torrent.length)

          // Remaining time
          var remaining
          if (torrent.done) {
            remaining = 'Done.'
          } else {
            remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
            remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
          }
          $remaining.innerHTML = remaining

          // Speed rates
          $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
          $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
        }
        function onDone() {
          $body.className += ' is-seed'
          onProgress()
        }
      })
      // Human readable bytes util
      function prettyBytes(num) {
        var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        if (neg) num = -num
        if (num < 1) return (neg ? '-' : '') + num + ' B'
        exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
        num = Number((num / Math.pow(1000, exponent)).toFixed(2))
        unit = units[exponent]
        return (neg ? '-' : '') + num + ' ' + unit
      }
      //this.$refs.spinner.hide()
    }
  }
}
</script>

<style lang="css">
#output video {
  width: 100%;
}
#progressBar {
  height: 5px;
  width: 0%;
  background-color: #35b44f;
  transition: width .4s ease-in-out;
}
body.is-seed .show-seed {
  display: inline;
}
body.is-seed .show-leech {
  display: none;
}
.show-seed {
  display: none;
}
#status code {
  font-size: 90%;
  font-weight: 700;
  margin-left: 3px;
  margin-right: 3px;
  border-bottom: 1px dashed rgba(255,255,255,0.3);
}

.is-seed #hero {
  background-color: #154820;
  transition: .5s .5s background-color ease-in-out;
}
#hero {
  background-color: #2a3749;
}
#status {
  color: #fff;
  font-size: 17px;
  padding: 5px;
}
a:link, a:visited {
  color: #30a247;
  text-decoration: none;
}
</style>
