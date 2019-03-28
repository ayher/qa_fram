# QA System 重构（WEB前端）
**基于React 16.7.0**

---
| 目录 | 主要作用 | 备注 |
| ------- | ----------- | ---------- |
| public  | 存放模板文件，是整个项目的根目录，所有的html都渲染到其中的index.html中 | index.html |

---
# JavaScript 开发规范
**西南科技大学 数据与知识工程实验室 自动问答团队2018-2019**

---
# 目录
### 1.[命名规范](#1命名规范-1)
### 2.[注释规范](#2注释规范-1)
### 3.[框架开发规范](#3框架开发规范-1)
### 4.[团队开发规范](#4团队开发规范-1)
### 4.[=>官方说明](#官方说明)

---

# 1.命名规范
**驼峰式命名法介绍：**
驼峰式命名法由小(大)写字母开始，后续每个单词首字母都大写
按照第一个字母是否大写，分为：
①. Pascal Case 大驼峰式命名法：首字母大写。eg：StudentInfo、UserInfo、ProductInfo
②. Camel Case 小驼峰式命名法：首字母小写。eg：studentInfo、userInfo、productInfo
### 1.1 变量
**命名方法：**
小驼峰式命名法。

**命名规范：**
前缀应当是名词。(函数的名字前缀为动词，以此区分变量和函数)

**命名建议：**
尽量在变量名字中体现所属类型，如:length、count等表示数字类型；而包含name、title表示为字符串类型。
**示例：**

```
// 好的命名方式
var maxCount = 10;
var tableTitle = 'LoginTable';

// 不好的命名方式
var setCount = 10;
var getTitle = 'LoginTable';
```
### 1.2 函数
**命名方法：**
小驼峰式命名法。

**命名规范：**
前缀应当为动词。

**命名建议：**
可使用常见动词约定。


| 动词    | 含义    | 返回值 |
| ----------- | ----------- | ----------- |
| can | 判断是否可执行某个动作(权限) | 函数返回一个布尔值。true：可执行；false：不可执行 |
| has | 判断是否含有某个值 | 函数返回一个布尔值。true：含有此值；false：不含有此值 |
| is | 判断是否为某个值 | 函数返回一个布尔值。true：为某个值；false：不为某个值 |
| get | 获取某个值 | 函数返回一个非布尔值 |
| set | 设置某个值 |无返回值、返回是否设置成功或者返回链式对象 |
| load | 加载某些数据 |无返回值或者返回是否加载完成的结果 |
**示例：**

```
// 是否可阅读
function canRead() {
    return true;
}

// 获取名称
function getName() {
    return this.name;
}
```
### 1.3 常量
**命名方法：**
名称全部大写。

**命名规范：**
使用大写字母和下划线来组合命名，下划线用以分割单词。

**命名建议：**
无。

**示例：**

```
var MAX_COUNT = 10;
var URL = 'http://www.baidu.com';
```
### 1.4 构造函数
**介绍：**
在JS中，构造函数也属于函数的一种，只不过采用new 运算符创建对象。

**命名方法：**
大驼峰式命名法，首字母大写。

**命名规范：**
前缀为名称。

**命名建议：**
无。

**示例：**

```
function Student(name) {
    this.name = name;
}
var st = new Student('tom');
```
### 1.5 类的成员
**类的成员包含：**

① 公共属性和方法：跟变量和函数的命名一样。

② 私有属性和方法：前缀为_(下划线)，后面跟公共属性和方法一样的命名方式。

**示例：**


```
function Student(name) {
    var _name = name; // 私有成员

    // 公共方法
    this.getName = function () {
        return _name;
    }

    // 公共方式
    this.setName = function (value) {
        _name = value;
    }
}
var st = new Student('tom');
st.setName('jerry');
console.log(st.getName()); // => jerry：输出_name私有变量的值
```
### 1.6 css的命名
**class**
用小驼峰命名法。
如： .homeBackground
**id**
用小驼峰命名法。
如： #qqImage
### 1.7 action常量的命名
统一用GET 或者 PUT 开头，单词分割用 _ ；
# 2.注释规范
## 2.1单行注释
**说明：** 单行注释以两个斜线开始，以行尾结束。
**语法：** // 这是单行注释
**使用方式：**

① 单独一行：//(双斜线)与注释文字之间保留一个空格。

② 在代码后面添加注释：//(双斜线)与代码之间保留一个空格，并且//(双斜线)与注释文字之间保留一个空格。

③ 注释代码：//(双斜线)与代码之间保留一个空格。
**示例：**


```
// 调用了一个函数；1)单独在一行
setTitle();

var maxCount = 10; // 设置最大量；2)在代码后面注释

// setName(); // 3)注释代码
```
## 2.2多行注释
**说明：** 以/*开头，*/结尾

**语法：** /* 注释说明 */

**使用方法：**
① 若开始(/\*)和结束(*\/)都在一行，推荐采用单行注释。

② 若至少三行注释时，第一行为/\*，最后行为\*/，其他行以\*开始，并且注释文字与*保留一个空格。

## 2.3函数(方法)注释
**说明：**函数(方法)注释也是多行注释的一种，但是包含了特殊的注释要求。

**语法：**

/\**
\* 函数说明
\* @关键字
\*/

**常用注释关键字：**(只列出一部分，并不是全部)
| 注释名   | 语法    | 含义 | 示例 |
| ----------- | ----------- | ----------- | ----------- |
| @param | @param 参数名 {参数类型}  描述信息 | 描述参数的信息 | @param name {String} 传入名称 |
| @return | @return {返回类型} 描述信息 | 描述返回值的信息 | @return {Boolean} true:可执行;false:不可执行 |
| @author | @author 作者信息 [附属信息：如邮箱、日期] | 描述此函数作者的信息 | @author 张三 2015/07/21  |
| @version | @version XX.XX.XX | 描述此函数的版本号 | @version 1.0.3 |
| @example | @example 示例代码 | 演示函数的使用 | @example setTitle('测试') |
**示例：**

```
/**
* 合并Grid的行
* @param {Grid grid 需要合并的Grid
* @param {Array} cols 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
* @param {Boolean} isAllSome 是否2个tr的cols必须完成一样才能进行合并。true：完成一样；false(默认)：不完全一样
* @return void
* @author polk6 2015/07/21
* @example
* _________________                             _________________
* |  年龄 |  姓名 |                             |  年龄 |  姓名 |
* -----------------      mergeCells(grid,[0])   -----------------
* |  18   |  张三 |              =>             |       |  张三 |
* -----------------                             -  18   ---------
* |  18   |  王五 |                             |       |  王五 |
* -----------------                             -----------------
*/
function mergeCells(grid, cols, isAllSome) {
    // Do Something
}
}
```
# 3.框架开发规范
## 3.1 命名空间
+ **思维导图**：
+ **文件命名**：组件（component）、类（class）使用大驼峰命名，其他文件命名根据实际情况可使用小驼峰、全小写中划线（-）、全小写下划线（_）。

## 3.2 样式开发（less）

## 3.3 变量作用域

# 4.团队开发规范
## 4.1 开发流程
+ ### **任务分配及讨论**
>+ 开发者任务在Tower项目管理平台上进行分配、指定（一般在会议上指定）。开发者在收到开发任务后，需要与相应项目负责人进行讨论，约定自己的影响范围（如需要增加哪些文件，需要修改哪些文件等等）。
>+ tower平台：https://tower.im
+ ### **基于接口文档开发**
>+ 开发者基于接口文档开发，根据接口文档中的输入、输出进行相应功能开发。
>+ 自动问答系统接口文档V1：https://www.easyapi.com/api/?documentId=17799
+ ### **功能开发**
>+ 开发者进行功能开发，开发过程中如有疑问请联系相应项目负责人。
+ ### **功能测试**
>+ 开发结束后进行功能测试，测试通过后优化代码，然后准备提交到GIT。
+ ### **提交合并**
>+ 开发、测试、优化完成后，将代码提交并推送到你的GIT分支，然后发起代码合并请求。同时联系项目负责人审核代码，合并到maser。
>+ GIT地址：http://git.ksust.com

## 4.2 开发原则

## 4.3 团队协作
+ ### **使用Tower进行项目管理**
+ ### **使用EasyAPI进行接口管理**
+ ### **使用GIT进行代码管理**

# 参考
+ [JavaScript 开发规范](https://www.cnblogs.com/polk6/p/4660195.html)
+ [Markdown基础语法](https://github.com/younghz/Markdown/blob/master/README.md)



---
# 官方说明

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
