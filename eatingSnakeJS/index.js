const sw = 20, //一个方块的宽度
  sh = 20,    //一个方块的高度
  tr = 30,    //行数
  td = 30;    //列数

let snake; //蛇 对象
let egg;  //蛋 对象

let startBtn = null;  //开始游戏按钮
let integralDom = null;  //积分dom
let count = 0; //积分总数

let timer = null; //定时器

/**
 * 蛇的每一个部分都是一个正方形
 * @param {*} x 水平所在索引
 * @param {*} y 垂直所在索引
 * @param {*} className class名称，区别是蛇头还是蛇身体，还是蛋
 */
function Square(x, y, className) {
  this.x = x * sw;  // x 轴
  this.y = y * sh;  // y 轴

  this.domView = document.createElement("div");
  this.className = className;

  this.parentDom = document.getElementById("snakeWrap");

}

//创建一个方块的元素
Square.prototype.create = function () {
  this.domView.style.position = "absolute";
  this.domView.style.left = this.x + "px";
  this.domView.style.top = this.y + "px";
  this.domView.style.width = sw + "px";
  this.domView.style.height = sh + "px"

  this.domView.className = this.className;
  this.parentDom.appendChild(this.domView)
}

//清除一个方块的元素
Square.prototype.remove = function () {
  this.parentDom.removeChild(this.domView);
}

//蛇的对象
function Snake() {
  this.head = null;  //蛇头信息
  this.tail = null //蛇尾信息
  this.pos = [] //存储蛇身上每一个方块的位置  

  this.directionNum = {  //存储蛇走的方向，用一个对象来表示
    left: { //往左走
      x: -1,
      y: 0
    },
    right: { //往右走
      x: 1,
      y: 0
    },
    up: { //往上走
      x: 0,
      y: -1
    },
    down: { //往下走
      x: 0,
      y: 1
    }

  }
}

//蛇对象的初始化
Snake.prototype.init = function () {

  //构建蛇头
  const head = new Square(2, 0, "snakeHead");
  head.create();
  this.head = head;
  this.pos.push([2, 0])

  //构建第一个蛇身
  const body1 = new Square(1, 0, "snakeBody");
  body1.create();
  this.pos.push([1, 0])

  //构建第二个蛇身
  const body2 = new Square(0, 0, "snakeBody");
  body2.create();
  this.tail = body2
  this.pos.push([0, 0])

  //形成链表关系
  head.last = null
  head.next = body1

  body1.last = head
  body1.next = body2

  body2.last = body1
  body2.next = null

  this.direction = this.directionNum.right;
}

//获取走一步后的位置
Snake.prototype.getNextPos = function () {

  const nextPos = {
    x: this.head.x / sw + this.direction.x,
    y: this.head.y / sh + this.direction.y
  }

  let isSelf = false; //是自己

  //1. 判断是否撞到了自己
  this.pos.forEach(val => {
    if (nextPos.x === val[0] && nextPos.y === val[1]) {
      isSelf = true;
    }
  })
  if (isSelf) {
    this.strategies.die.call(this);
    return;
  }
  //2. 判断是否撞到了墙

  if (nextPos.x < 0 || nextPos.x > td - 1 || nextPos.y < 0 || nextPos.y > tr - 1) {
    this.strategies.die.call(this);
    return;
  }
  //3. 判断是否吃到了蛋
  if (nextPos.x === egg.pos.x && nextPos.y === egg.pos.y) {
    this.strategies.eat.call(this, nextPos);
    return;
  }

  //4. 什么都没有，往下一步走

  this.strategies.move.call(this, nextPos);

}

//处理移动后做的事
Snake.prototype.strategies = {
  //移动
  move: function (nextPos) {
    //1. 创建新的头
    const newHead = new Square(nextPos.x, nextPos.y, "snakeHead"); //新的头
    const oldHead = this.head;
    if (this.direction.x < 0) {
      newHead.className = "snakeHead left"
    } else if (this.direction.y < 0) {
      newHead.className = "snakeHead up"
    } else if (this.direction.y > 0) {
      newHead.className = "snakeHead down"
    }
    newHead.create();
    newHead.next = oldHead
    newHead.last = null

    oldHead.last = newHead
    this.head = newHead

    this.pos.unshift([nextPos.x, nextPos.y]);

    //2. 把旧的头改为身体
    oldHead.className = "snakeBody";
    oldHead.domView.className = newHead.next.className

    //3.删掉尾巴
    const oldTail = this.tail;
    this.tail = oldTail.last;
    oldTail.remove()  //删除dom元素
    this.pos.pop()  //删除最后一位

  },

  //吃
  eat: function (nextPos) {
    //积分加1
    count++;
    integralDom.innerText = count

    //1. 创建新的头
    const newHead = new Square(nextPos.x, nextPos.y, "snakeHead"); //新的头
    const oldHead = this.head;
    if (this.direction.x < 0) {
      newHead.className = "snakeHead left"
    } else if (this.direction.y < 0) {
      newHead.className = "snakeHead up"
    } else if (this.direction.y > 0) {
      newHead.className = "snakeHead down"
    }
    newHead.create();
    newHead.next = oldHead
    newHead.last = null

    oldHead.last = newHead
    this.head = newHead

    this.pos.unshift([nextPos.x, nextPos.y]);

    //2. 把旧的头改为身体
    oldHead.className = "snakeBody";
    oldHead.domView.className = newHead.next.className

    //3. 清除旧的蛋，创建新的蛋
    egg.body.remove()
    egg.create()

  },

  //游戏结束
  die: function () {
    clearInterval(timer)
    timer = null;
    alert("游戏结束，刷新页面重新开始")
  }
}

Snake.prototype.control = function () {
  const This = this;
  document.onkeydown = function (e) {
    if (e.key === "ArrowDown" || e.key === "s") {  //下
      This.direction = This.directionNum.down;
      snake.getNextPos()

    } else if (e.key === "ArrowUp" || e.key === "w") { //上
      This.direction = This.directionNum.up;
      snake.getNextPos()

    } else if (e.key === "ArrowLeft" || e.key === "a") { //左
      This.direction = This.directionNum.left;
      snake.getNextPos()

    } else if (e.key === "ArrowRight" || e.key === "d") { //右
      This.direction = This.directionNum.right;
      snake.getNextPos()

    }
  }
}

//蛋 类
function Egg() {
  this.pos = {
    x: 0, //蛋的x坐标，没有加 sw 的
    y: 0  //y 坐标，没有加 sh 的
  }
  this.body = null;  //一个方块对象
}

//创建蛋
Egg.prototype.create = function () {
  this.pos = this.getPos(0, sw);
  this.body = new Square(this.pos.x, this.pos.y, "egg");
  this.body.create();
}

//获取一个可创建蛋的坐标 x,y
Egg.prototype.getPos = function (max, min) {
  let dis = max - min;
  const x = Math.floor(Math.random() * dis + min);
  const y = Math.floor(Math.random() * dis + min);
  if (!canCreateEgg(x, y)) {
    return this.getPos(0, sw);
  }
  return {
    x,
    y,
  }
}

/**
 * 判断是否可以在坐标位x,y的位置创建蛋
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function canCreateEgg(x, y) {
  for (let i = 0; i < snake.pos.length; i++) {
    if (x === snake.pos[i][0] && y === snake.pos[i][1]) {
      return false
    }
  }
  return true
}

//游戏初始化
function gameInit() {
  //启动蛇
  snake = new Snake();  //蛇
  snake.init();
  snake.control()

  egg = new Egg();
  egg.create()

  timer = setInterval(() => {
    snake.getNextPos()
  }, 1000)
}

startBtn = document.getElementsByClassName("start")[0];
integralDom = document.getElementsByClassName("integral")[0];

//开始游戏点击事件
startBtn.onclick = function () {
  gameInit()
  startBtn.parentElement.style.display = "none"
}




