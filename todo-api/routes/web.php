<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/todos', 'ExampleController@index');
Route::post('/api/add-todo', 'ExampleController@createTodo');
Route::put('/api/complete-todo/{id}', 'ExampleController@completeTodo');
Route::put('/api/incomplete-todo/{id}', 'ExampleController@incompleteTodo');
Route::delete('/api/delete-todo/{id}', 'ExampleController@deleteTodo');
Route::get('/api/search-todo/{todo}','ExampleController@search');
Route::post('/api/update-todo/{id}','ExampleController@update');
