var client = new WebTorrent()

DragDrop('body', function (files) {
  client.seed(files, function (torrent) {
    log('拖拽文件:'+torrent.name)
    log('正在做种:'+torrent.magnetURI)
    log('hash:'+torrent.infoHash)
  })
})

client.on('error', function (err) {
  console.error('ERROR: ' + err.message)
})

$('button').on('click', function (e) {
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
    log('Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
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
  document.querySelector('.log').appendChild(p)
}
