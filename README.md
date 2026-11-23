# 泡泡毛球 · 宠物洗护

使用 Next.js App Router 构建的中文宠物洗护单页。需要 Node.js 20.9 或更高版本。

## 本地开发

```sh
npm ci
npm run dev
```

在浏览器打开 [本地开发页面](http://localhost:3000)。

## 构建和预览

```sh
npm run build
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

在浏览器打开 [静态构建预览](http://127.0.0.1:4173)。部署时，将整个 `out/` 目录交给静态托管服务。

预约表单仅在当前页面生成摘要。项目根目录的 `index.html` 与 `assets/store/` 是原店内环境网页的备份。
