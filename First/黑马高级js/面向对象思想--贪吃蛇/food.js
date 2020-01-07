   //食物自调用
   (function () {
    var elements = [];
    //食物构造函数
    function Food(width, height, color) {
      this.width = width || 20;
      this.height = height || 20;
      this.color = color || 'yellow';
      this.x = 0;
      this.y = 0;
    }
    //在地图上初始化食物
    Food.prototype.init = function (map) {
      //每次初始化前先删除元素，确保只有一个食物
      remove();
      var div = document.createElement('div');
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';
      div.style.backgroundColor = this.color;
      div.style.position = 'absolute';

      //随机食物坐标
      this.x = Math.floor(Math.random()*(map.offsetWidth / this.width)) * this.width;
      this.y = Math.floor(Math.random()*(map.offsetHeight / this.height)) * this.height;
      div.style.left = this.x + 'px';
      div.style.top = this.y + 'px';
      map.appendChild(div);
      elements.push(div);
    };
    //删除元素节点
    function remove() {
      for (let i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
        elements.splice(i,1);
      }
    }

    window.Food = Food;
  })();
