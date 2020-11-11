
//蛇自调用
(function () {
  //创建一个数组用于移动时删除旧蛇
  var elements = [];
  function Snake(width, height, direction) {
    //每个方块的宽高
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || 'right';
    this.body = [
      {x: 3,y: 2,color: 'red'},//头
      {x: 2,y: 2,color: 'orange'},//身体
      {x: 1,y: 2,color: 'orange'},
    ]
  }

  //蛇初始化函数
  Snake.prototype.init = function (map) {
    //删除旧蛇
    remove();
    //因为蛇身体是单独的小方块，所以使用循环创建
    for (let i = 0; i < this.body.length; i++) {
      //创建元素
      var div = document.createElement('div');
      map.appendChild(div);
      
      var obj = this.body[i];
      //元素赋属性
      div.style.position = 'absolute';
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';
      div.style.backgroundColor = obj.color;
      div.style.left = obj.x * this.width + 'px';
      div.style.top = obj.y * this.height + 'px';

      //将蛇存入数组 为了删除
      elements.push(div);
    }
  }
  
  //蛇move
  Snake.prototype.move = function (food, map) {
    var i = this.body.length - 1;
    for (; i > 0; i--) {
      //将蛇身体的位置赋值给蛇尾位置，这样就相当于移动了。不包括蛇头，蛇头的位置通过按键控制
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    //判断方向
    switch (this.direction) {
      case 'right':
        this.body[0].x += 1;
        break;
      case 'bottom':
        this.body[0].y += 1;
        break;
      case 'left':
        this.body[0].x -= 1;
        break;
      case 'top':
        this.body[0].y -= 1;
        break;
      default:
        break;
    }

    //吃食物 
    //小蛇头坐标
    var headX = this.body[0].x * this.width;
    var headY = this.body[0].y * this.height;
    if (headX == food.x && headY == food.y) {
      //蛇尾巴方块
      var tail = this.body[this.body.length - 1];
      console.log(tail);
      this.body.push({
        x: tail.x,
        y: tail.y,
        color: 'orange'
      });
      food.init(map);
    }
  }

  //删除旧蛇函数
  function remove() {
    //从蛇尾开始删除，因为蛇移动后旧蛇是先出现蛇尾。
    for (let i = elements.length - 1; i >= 0; i--) {
      elements[i].parentNode.removeChild(elements[i]);
      elements.splice(i,1);
      // elements.pop();
    }
  }
  window.Snake = Snake;
})();

