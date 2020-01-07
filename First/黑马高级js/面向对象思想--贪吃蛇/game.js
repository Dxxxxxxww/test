
//游戏对象
(function () {
  var that = null;

  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }
  Game.prototype.init = function () {
    this.food.init(this.map);
    this.snake.init(this.map);

    this.runSnake(this.food, this.map);

    this.bindKey();
  }
  //游戏运行 蛇自动移动
  Game.prototype.runSnake = function (food, map) {
    var intervalId = setInterval(function () {
      //setInterval 的 this指向的是window，所以需要把game的this存起来
      this.snake.move(food, map);
      this.snake.init(map);

      //获取地图的横纵最大边界
      var maxX = map.offsetWidth / this.snake.width;
      var maxY = map.offsetHeight / this.snake.height;
      //获取蛇头的横纵坐标
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;
      if (headX < 0 || headX >= maxX) {
        alert('Game Over!');
        clearInterval(intervalId);
      }
      if (headY < 0 || headY >= maxY) {
        alert('Game Over!');
        clearInterval(intervalId);
      }
    }.bind(that), 150);
  }
  //绑定按键 -- 更改小蛇移动方向
  Game.prototype.bindKey = function () {
    document.addEventListener('keydown', function (e) {
      console.log(this.snake.direction);
      switch (e.keyCode) {
        //左
        case 37:
          if (this.snake.direction === 'left' || this.snake.direction === 'right') {} else {
            this.snake.direction = 'left';
          }
          break;
          //上
        case 38:
          if (this.snake.direction === 'top' || this.snake.direction === 'bottom') {} else {
            this.snake.direction = 'top';
          }
          break;
          //右
        case 39:
          if (this.snake.direction === 'left' || this.snake.direction === 'right') {} else {
            this.snake.direction = 'right';
          }
          break;
          //下
        case 40:
          if (this.snake.direction === 'top' || this.snake.direction === 'bottom') {} else {
            this.snake.direction = 'bottom';
          }
          break;
      }
    }.bind(that), false)
  };
  window.Game = Game;
})();