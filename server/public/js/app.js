var client = new WebTorrent()
var socket = io.connect("http://" + window.location['hostname'] + ":3000");

DragDrop('body', function (files) {
  client.seed(files, function (torrent) {
    log('拖拽文件:' + torrent.name)
    log('正在做种:' + torrent.magnetURI)
    log('Hash:' + torrent.infoHash)
  })
})

client.on('error', function (err) {
  console.error('ERROR: ' + err.message)
})

$('#download').on('click', function (e) {
  e.preventDefault()
  var torrentId = document.querySelector('form input[name=torrentId]').value
  // var url = "http://" + window.location['hostname'] + ":3000/download?url=" + torrentId
  socket.emit('download', { torrentId: torrentId })

})

socket.on('showInfo', function (data) {
  var json = JSON.parse(data)
  var tmp = (json.progress * 100).toFixed(1);
  $('.progress-bar').attr('aria-valuenow', tmp)
  $('.progress-bar').attr('style', 'width:' + tmp + '%')
  $('.progress-bar').html(tmp + '%')
  $('#speed').html(json.downSpeed+'/S')
})


$('#online').on('click', function (e) {
  e.preventDefault()
  var torrentId = document.querySelector('form input[name=torrentId]').value
  log('Adding ' + torrentId)
  client.add(torrentId, onTorrent)
})

function onTorrent(torrent) {
  log('Got torrent metadata!')
  log(
    'Torrent info hash: ' + torrent.infoHash + ' ' +
    '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
    '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
  )

  // Print out progress every 5 seconds
  var interval = setInterval(function () {
    var tmp = (torrent.progress * 100).toFixed(1);
    $('.progress-bar').attr('aria-valuenow', tmp)
    $('.progress-bar').attr('style', 'width:' + tmp + '%')
    $('.progress-bar').html(tmp + ' %')
    $('#speed').html(prettyBytes(torrent.downloadSpeed)+'/S')
    // log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
  }, 5000)

  torrent.on('done', function () {
    log('Progress: 100%')
    clearInterval(interval)
  })

  // Render all files into to the page
  torrent.files.forEach(function (file) {
    file.appendTo('.log')
    log('(Blob URLs only work if the file is loaded from a server. "http//localhost" works. "file://" does not.)')
    file.getBlobURL(function (err, url) {
      if (err) return log(err.message)
      log('File done.')
      log('<a href="' + url + '">Download full file: ' + file.name + '</a>')
    })
  })
}

function log(str) {
  var p = document.createElement('p')
  p.innerHTML = str
  var para = document.createElement("p");
  para.appendChild(p);
  var element = document.querySelector('.log');
  element.insertBefore(para, element.firstChild);
}

/**
 * 转换并显示下载速度
 * show the downloadSpeed for human
 */
function prettyBytes(num) {
  var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (neg) num = -num
  if (num < 1) return (neg ? '-' : '') + num + ' B'
  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
  num = Number((num / Math.pow(1000, exponent)).toFixed(2))
  unit = units[exponent]
  return (neg ? '-' : '') + num + ' ' + unit
}
