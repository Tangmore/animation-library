## 说明

## 实现 gitee 与 github 同步更新

- 修改项目根目录下的`.git/config.js`文件
- [remote "origin"]
  - url = https://gitee.com/tangmore/animation-library.git
  - url = git@github.com:Tangmore/animation-library.git
  - fetch = +refs/heads/_:refs/remotes/origin/_
