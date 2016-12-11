import { Component } from '@angular/core';
import { LumenService } from './services/lumen.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './model-basic';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LumenService],
})

export class AppComponent {

  title1 = 'Todo List!';
  title: string;
  id: number;
  todos: any;
  uniqueTitle = true;
  last_page: any;
  _last_page: number;
  current_page: number;
  total_todo: number;
  per_page: number;
  searchText: string;
  selectedTodo: string;


  disablePrev: boolean;
  disableNext: boolean;
  showSearchBox: boolean;
  inputFocused: boolean;
  isInEdit: boolean;
  index: number;


  constructor(private _lumenService: LumenService) {
    this.onLoad();
    this.showSearchBox = false;
    this.inputFocused = false;
    this.index = 0;
  }



  onLoad() {
    var result = this._lumenService.getTodos();
    result.subscribe((data) => {
      this.last_page = Array(data.last_page);
      this._last_page = data.last_page;
      this.current_page = data.current_page;
      this.per_page = data.per_page;
      this.todos = data.data;
      this.disableNext = true;
      this.disablePrev = false;
      this.total_todo = data.total;

    });

  }

  newTodo() {
    var result;
    var newTodo = {
      id: this.id,
      title: this.title,
      status: 0
    };
    result = this._lumenService.saveTodo(newTodo);
    result.subscribe((data) => {
      this.current_page = data.current_page;
      this.todos = data.data;
      this.total_todo = this.total_todo + 1;
      this.title = '';
      this.uniqueTitle = true;
      this.last_page = Array(data.last_page);
      this._last_page = data.last_page;
    },
      (errorData) => {
        this.uniqueTitle = false;
      });

  }

  compleateTodo(todo) {
    var result;
    result = this._lumenService.compleateTodo(todo);
    result.subscribe((data) => {
      todo.status = 1;
    });

  }

  incompleateTodo(todo) {
    var result;
    result = this._lumenService.incompleateTodo(todo);
    result.subscribe((data) => {
      todo.status = 0;
    });
  }

  editTodo(todo) {
    console.log("worked" + todo.id);
    this.index = todo.id;
    this.selectedTodo = todo.title;
    this.id = todo.id;
    this.isInEdit = false;
  }

  updateTodo(id) {
    var todo = {
      id: this.id,
      title: this.selectedTodo
    };
    var result = this._lumenService.updateTodo(todo);
    result.subscribe((data) => {
      this.todos.forEach(element => {
        if (element.id == id) {
          element.title = todo.title;
          this.index = 0;
        }
      });
    },
      (errorData) => {
        this.index = id;
        this.isInEdit = true;
      });
  }

  cancleEdit(todo) {
    this.index = 0;
  }

  deleteTodo(todo) {
    var result;
    result = this._lumenService.deleteTodo(todo);
    result.subscribe((data) => {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
      this.todos = data.data;
      this.total_todo = data.total;
      this.last_page = Array(data.last_page);
      this._last_page = data.last_page;
      this.current_page = data.current_page;
    });
  }

  pageNumber(_number) {
    this.current_page = _number;
    if (this.current_page == 1) {
      this.disablePrev = false;
      this.disableNext = true;
    } else if (this.current_page == this._last_page) {
      this.disableNext = false;
      this.disablePrev = true;
    } else {
      this.disablePrev = true;
      this.disableNext = true;
    }
    var result = this._lumenService.getMoreTodos(this.current_page);
    result.subscribe((data) => {
      this.todos = data.data;
    });

  }

  toggleSearch() {
    this.showSearchBox = !this.showSearchBox;
    this.inputFocused = !this.inputFocused;
  }

  search() {
    if (this.searchText != undefined) {
      var result = this._lumenService.searchTodo(this.searchText);
      result.subscribe((data) => {
        if (data.total != 0) {
          this.last_page = Array(data.last_page);
          this._last_page = data.last_page;
          this.current_page = data.current_page;
          this.per_page = data.per_page;
          this.todos = data.data;
          this.disableNext = true;
          this.disablePrev = false;
          this.total_todo = data.total;
        } else {
          var emptyResult = {
            title: "Noting Found",
            status: 3
          };
          this.todos = Array(emptyResult);
          this.total_todo = 0;
        }
      });
    }


  }





}
