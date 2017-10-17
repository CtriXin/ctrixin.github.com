# Git 操作

以命令行为主 sourcetree为辅

## 增加分支

`git branch XXX`

此操作将会创建XXX的分支

`git branch xxx/ccc`

此操作将会创建xxx文件夹并创建ccc分支





## release合并分支

1. checkout想要合并的分支

`git checkout xxx`

2. 创建一个干净的分支，以便合并到release没有中间的点点过程

`git branch moving`

3. 切换到release

`git checkout release`

4. 合并

`git merge moving`

5. 删除moving

`git branch -d moving`