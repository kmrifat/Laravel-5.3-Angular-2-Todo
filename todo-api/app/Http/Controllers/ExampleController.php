<?php

namespace App\Http\Controllers;

use App\Todo;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ExampleController extends Controller
{
    private $pagi_length = 5;

    public function index(){
        $todos = Todo::paginate($this->pagi_length);
        return response()->json($todos);
    }

    public function createTodo(Request $request){
        $this->validate($request, [
            'title' => 'required|unique:todos|max:255',
        ]);

        $todo = new Todo();
        $todo->title = $request->get('title');
        $todo->status = 0;
        if($todo->save()){
            $todos = Todo::paginate($this->pagi_length);
            return response()->json($todos);
        }else{
            $success = ['success'=>'no'];
            return response()->json($success);
        }
    }

    public function completeTodo($id){

        $todo = Todo::find($id);
        $todo->status = 1;
        if($todo->save()){
            $success = ['success'=>'yes'];
            return response()->json($success);
        }else{
            $success = ['success'=>'no'];
            return response()->json($success);
        }
    }

    public function incompleteTodo($id){
        $todo = Todo::find($id);
        $todo->status = 0;
        if($todo->save()){
            $success = ['success'=>'yes'];
            return response()->json($success);
        }else{
            $success = ['success'=>'no'];
            return response()->json($success);
        }
    }

    public function deleteTodo($id){
        $todo = Todo::destroy($id);
        $todos = Todo::paginate($this->pagi_length);
        if($todo){
            return response()->json($todos);
        }else{
            $success = ['success'=>'no'];
            return response()->json($success);
        }
    }

    public function search($todo){
        $todo = Todo::where('title',$todo)->orWhere('title','like','%'.$todo.'%')->paginate($this->pagi_length);
        return response()->json($todo);
    }

    public function update($id,Request $request){

        $this->validate($request,[
            'title' => 'required|unique:todos,id|max:40'.$id,
        ]);

        $todo = Todo::find($id);
        $todo->title = $request->get('title');
        $todo->status = 0;
        if($todo->save()){
            return response()->json($todo);
        }else{
            $success = ['success'=>'no'];
            return response()->json($success);
        }
    }

}
