import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LumenService{

  constructor(private _http: Http){
    console.log("Lumen Service Ready............");

  }

  getTodos(){
    return this._http.get('/api/todos').map(res => res.json());
  }

  saveTodo(todo){
    var headers = new Headers();
    headers.append('Content-type','application/json');
    return this._http.post('/api/add-todo', JSON.stringify(todo),{headers:headers})
    .map(res => res.json());
  }

  updateTodo(todo){
    var headers = new Headers();
    headers.append('Content-type','application/json');
    return this._http.post('/api/update-todo/'+todo.id, JSON.stringify(todo),{headers:headers})
    .map(res=>res.json());
  }
  
  compleateTodo(todo){
    var headers = new Headers();
    headers.append('Content-type','application/json');
    return this._http.put('/api/complete-todo/'+todo.id, JSON.stringify(todo), {headers:headers}).map(res=> res.json());
  }

  incompleateTodo(todo){
    var headers = new Headers();
    headers.append('Content-type','application/json');
    return this._http.put('/api/incomplete-todo/'+todo.id, JSON.stringify(todo), {headers:headers}).map(res=> res.json());
  }

  deleteTodo(todo){
    return this._http.delete('/api/delete-todo/'+todo.id).map(res=> res.json());
  }

  getMoreTodos(id){
    return this._http.get('/api/todos?page='+ id).map(res => res.json());
  }

  searchTodo(title){
    if(title.length != 0){
      return this._http.get('/api/search-todo/'+ title).map(res=> res.json());
    }else{
      return this._http.get('/api/todos').map(res => res.json());
    }
  }

}