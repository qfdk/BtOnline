<template>
  <div id="app">
    <top></top>
    <middle></middle>
    <bot></bot>
  </div>
</template>

<script>
import Hello from './components/Hello'
import top from './components/Header'
import middle from './components/Body'
import bot from './components/Footer'

export default {
  name: 'app',
  components: {
    top,
    middle,
    bot
  }
}
</script>

<style>

</style>
