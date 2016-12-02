(function () {

  let List = new mokit.Component({
    template: `<ul>
      <li m:each="item of list" class="{{item.editing&&!item.done?'editing':''}}">
        <input type="checkbox" m:model="item.done"/>
        <span m:if="!item.editing||item.done" m:on:click="edit(item,true,$event)" class="{{item.done?'done':''}}">
          {{item.text}}
        </span>
        <input m:on:change="edit(item,false,$event)" m:on:blur="edit(item,false,$event)" type="text" m:if="item.editing&&!item.done" m:model="item.text"/>
        <a m:on:tap="del(item)">DEL</a>
      </li>
    </ul>`,
    properties: {
      list: null
    },
    edit: function (item, state, event) {
      let itemEl = event.target.parentNode;
      item.editing = state;
      setTimeout(function () {
        let box = itemEl.querySelector('input[type="text"]');
        box && box.focus();
      }, 10);
      this.$emit('edit', item);
    },
    del: function (item) {
      this.$emit('del', item);
    }
  });

  window.todo = mokit({
    element: document.getElementById('app'),
    components: { List: List },
    data: function () {
      return {
        text: '',
        list: []
      };
    },
    onInit: function () {
      let list = localStorage.getItem('todo://list');
      if (list) this.list = JSON.parse(list);
      let type = localStorage.getItem('todo://type');
      if (type) this.type = type;
    },
    onReady: function () {
    },
    properties: {
      type: 'all',
      filteredList: function () {
        if (this.type == 'active')
          return this.list.filter(function (item) { return !item.done });
        else if (this.type == 'done')
          return this.list.filter(function (item) { return item.done });
        else
          return this.list;
      },
      doneCount: function () {
        return this.list.filter(function (item) { return item.done }).length;
      }
    },
    watches: {
      list: function (list) {
        localStorage.setItem('todo://list', JSON.stringify(list));
      },
      type: function (type) {
        localStorage.setItem('todo://type', type);
      }
    },
    del: function (item) {
      let index = this.list.indexOf(item);
      this.list.splice(index, 1);
    },
    add: function () {
      if (!this.text) return;
      this.list.push({
        text: this.text,
        done: false,
        editing: false
      });
      this.text = ''
    }
  }).start();

})();