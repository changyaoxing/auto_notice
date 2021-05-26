### 配置
检查是否有新的学术讲座通知
如果有自动给相关人员发送邮件

### 安装依赖和运行
0. 安装好node.js
1. cd到目录下
2. `npm install`   安装依赖
3. `node get_notice.js`

### 关于定时启动
- linux下用crontab
- windows下用任务计划程序，定时运行`schedule.bat`这个脚本即可
- - 设置任务计划程序时，在操作这一步时必须在设置“起始于”这一栏填写项目文件夹地址，如图：

![image](https://user-images.githubusercontent.com/32767305/119652768-19d9c100-be59-11eb-99e1-c5a5fcd3c2f5.png)

