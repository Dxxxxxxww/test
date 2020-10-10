# Vue.extend() 并通过 new 后产生的子类组件实例的传参方式，事件处理研究之一
## element-ui 关于 this.$message 研究

element-ui 中 this.$message 的命令式调用就是通过在该函数中，动态的挂载子组件来实现的。

```
const MessageBox = function(options, callback) {
  if (Vue.prototype.$isServer) return;
  if (typeof options === 'string' || isVNode(options)) {
    options = {
      message: options
    };
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => { // eslint-disable-line
      msgQueue.push({
        options: merge({}, defaults, MessageBox.defaults, options),
        callback: callback,
        resolve: resolve,
        reject: reject
      });

      showNextMsg();
    });
  } else {
    msgQueue.push({
      options: merge({}, defaults, MessageBox.defaults, options),
      callback: callback
    });

    showNextMsg();
  }
};
```

当调用 MessageBox 函数时，会将参数信息压进 msgQueue 队列。options 键对应的就是包含各种子组件所需的 props 和 data 的对象。然后执行 showNextMsg() 函数。

```
const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = '';

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      let options = currentMsg.options;
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      let oldCb = instance.callback;
      instance.callback = (action, instance) => {
        oldCb(action, instance);
        showNextMsg();
      };
      if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message];
        instance.message = null;
      } else {
        delete instance.$slots.default;
      }
      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });
      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.visible = true;
      });
    }
  }
};
```

在 showNextMsg 函数中，先判断 msgQueue 队列中是否含有数据，再将 options 里的值一一对应赋给子组件 data。最后将子组件挂载到 dom 上。

```
// main.vue
handleAction(action) {
  if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
    return;
  }
  this.action = action;
  if (typeof this.beforeClose === 'function') {
    this.close = this.getSafeClose();
    this.beforeClose(action, this, this.close);
  } else {
    this.doClose();
  }
},

doClose() {
  if (!this.visible) return;
  this.visible = false;
  this._closing = true;

  this.onClose && this.onClose();
  messageBox.closeDialog(); // 解绑
  if (this.lockScroll) {
    setTimeout(this.restoreBodyStyle, 200);
  }
  this.opened = false;
  this.doAfterClose();
  setTimeout(() => {
    if (this.action) this.callback(this.action, this);
  });
},

// main.js
const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action);
      } else {
        callback(action);
      }
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        if (instance.showInput) {
          currentMsg.resolve({ value: instance.inputValue, action });
        } else {
          currentMsg.resolve(action);
        }
      } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
        currentMsg.reject(action);
      }
    }
  }
};
```

当触发了 this.\$message 子组件的事件时（诸如点击确定，取消，关闭），子组件中就会调用 handleAction 函数，而 handleAction 函数中最关键的就是调用了 doClose 函数。

我们来看下 doClose 函数。可以看到，在 doClose 函数中最关键的就是调用 callback 这个属性（这个属性是一个函数）。而 callback 函数的默认值就是 defaultCallback 函数。

所以当我们触发了对应的事件后，并不是 message 子组件通过 $emit 方法来通知父级调用者。而是通过 Promise/callback 的方法。这样做的原因是在几乎所有的场景下 message 就是通过 this.$message 这种命令式的方法调用，而并不是通过组件引入，在 template 中写入的方式来调用。
