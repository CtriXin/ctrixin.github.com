# webpack4 && vue2.x && express 4.x demo





## 安装依赖

```
yarn || npm install
```

推荐yarn安装 快速~

1.1 升级更新yarn 

```
curl -o- -L https://yarnpkg.com/install.sh | bash
```

1.2 检查你的node版本

```
node -v
```

1.2.1 如果你的node版本低于9 推荐你执行下面的操作



1.2.1.1 安装nvm

```
nvm ls-remote
nvm install v9
# Set 6.1.0 (or another version) as default
nvm alias default 9.xx.xx
nvm ls

查看node version
node -v
如果还低于9 

sudo npm cache clean -f 
nvm use default 
nvm current  (应该显示你所选择的v9.xx)

```





## 运行

```
npm run dev
npm run devserver -- 将会开启127.0.0.1:8089
npm run server -- 自动开启 8888端口
npm run build  -- 生产环境
```

