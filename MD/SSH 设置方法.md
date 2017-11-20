# SSH 设置方法

## 创建ssh key

1. 在需要使用的机器上 执行命令

```
ssh-keygen
```

2. 一路回车
3. copy 创建的pub文件 `cat ~/.ssh/id_rsa.pub`
4. 进入bitbuket的 添加刚才创建的key 以完成对电脑的授权



## 开发发布机和生产发布机策略

1. 创建完key之后 复制RSA key

```
cat ~/.ssh/id_rsa
```

2. 复制到同样位置 
3. 完成