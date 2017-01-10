# BtOnline

在线直播Bt种子，后端未动 前端先行

![](https://i.imgur.com/nlxWTMV.png)

## 项目目录

```bash
├── README.md
├── StaticWebUI // 简单的前端
│   ├── index.html
│   └── static
├── WebUI // Vue.js 前端
│   ├── README.md
│   ├── build
│   ├── config
│   ├── dist //npm run build 后的文件夹
│   ├── index.html
│   ├── package.json
│   ├── src
│   └── static
└── server //Node.js 服务端
    ├── README.md
    ├── config.js
    ├── package.json
    ├── public
    ├── server.js
    └── views
```

## 如何使用

```bash
# 克隆项目
git clone https://github.com/qfdk/BtOnline.git
# 进入相关的目录，都有相应的说明
```

把里面的`StaticWebUI`复制到服务器http根目录，直接在线访问就好。

## Credit

- [webtorrent](https://github.com/feross/webtorrent)

- [torrent-stream](https://github.com/mafintosh/torrent-stream)

## License

MIT. Copyright (c) [BtOnline](http://bt.qfdk.me), LLC.