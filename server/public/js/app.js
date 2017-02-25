var client = new WebTorrent()
var socket = io.connect('http://' + window.location['hostname'] + ':3000')

DragDrop('body', function (files) {
  client.seed(files, function (torrent) {
    log('拖拽文件:' + torrent.name)
    log('正在做种:' + torrent.magnetURI)
    log('Hash:' + torrent.infoHash)
  })
})

client.on('error', function (err) {
  log(err.message)
})

$('#download').on('click', function (e) {
  e.preventDefault()
  $('.log').html('')
  log('正在添加下载任务 .. ')
  var torrentId = document.querySelector('form input[name=torrentId]').value
  // var url = "http://" + window.location['hostname'] + ":3000/download?url=" + torrentId
  socket.emit('download', { torrentId: torrentId })
})

socket.on('showDownloadInfo', function (data) {
  $('.log').html('')
  var json = JSON.parse(data)
  console.log(json)
  if (json.isDownloading) {
    $('.log').html('正在下载 ...')
    var tmp = (json.progress * 100).toFixed(1)
    $('.progress-bar').attr('aria-valuenow', tmp)
    $('.progress-bar').attr('style', 'width:' + tmp + '%')
    $('.progress-bar').html(tmp + '%')
    $('#speed').html(json.downSpeed + '/S')
  } else {
    console.log('im ok')
    $('.progress-bar').attr('aria-valuenow', 100)
    $('.progress-bar').attr('style', 'width:100%')
    $('.progress-bar').html('100% 下载完成')
    $('#speed').html('访问 http://' + window.location['hostname'] + ':8888 进行查看')
    $('.log').html('下载完成.')
  }
})

function log (str) {
  var p = document.createElement('p')
  p.innerHTML = str
  var para = document.createElement('p')
  para.appendChild(p)
  var element = document.querySelector('.log')
  element.insertBefore(para, element.firstChild)
}

/**
 * 转换并显示下载速度
 * show the downloadSpeed for human
 */
function prettyBytes (num) {
  var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  if (neg) num = -num
  if (num < 1) return (neg ? '-' : '') + num + ' B'
  exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
  num = Number((num / Math.pow(1000, exponent)).toFixed(2))
  unit = units[exponent]
  return (neg ? '-' : '') + num + ' ' + unit
}

$('#online').on('click', function (e) {
  e.preventDefault()
  $('.log').html('')
  log('正在添加任务 .. ')
  var torrentId = document.querySelector('form input[name=torrentId]').value
  client.add(torrentId, onTorrent)
})

function onTorrent (torrent) {
    // Print out progress every 5 seconds
  var interval = setInterval(function () {
    var tmp = (torrent.progress * 100).toFixed(1)
    $('.progress-bar').attr('aria-valuenow', tmp)
    $('.progress-bar').attr('style', 'width:' + tmp + '%')
    $('.progress-bar').html(tmp + ' %')
    $('#speed').html(prettyBytes(torrent.downloadSpeed) + '/S')
    // log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
  }, 5000)

  log(
    'Torrent info hash: ' + torrent.infoHash + ' ' +
    '<a href="' + torrent.magnetURI + '" target="_blank">[Magnet URI]</a> ' +
    '<a href="' + torrent.torrentFileBlobURL + '" target="_blank" download="' + torrent.name + '.torrent">[Download .torrent]</a>'
  )

  torrent.on('done', function () {
    clearInterval(interval)
  })

  // Render all files into to the page
  torrent.files.forEach(function (file) {
    // file.appendTo('.log')
    log(file.name)
    file.getBlobURL(function (err, url) {
      if (err) return log(err.message)
      log('File done.')
      log('<a href="' + url + '">Download full file: ' + file.name + '</a>')
    })
  })
}
