<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Carbon\Carbon;
class DetailsProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index($id){

        $user = User::find($id);
        $my_publications = DB::select("SELECT * FROM publications WHERE id_user =".$id. " AND id_state = 1 ");
        $likes = DB::select("SELECT l.id_publication, u.name, l.date, u.picture, u.id_gender
        FROM likes l
        INNER JOIN users u ON l.id_user = u.id WHERE l.id_state=1");
        $comments = DB::select("SELECT u.id, c.comment, c.id_publication, c.id AS id_comment, c.date, u.picture, u.name, u.id_gender
        FROM comments c INNER JOIN users u ON c.id_user = u.id
        WHERE c.id_state = 1");
        $city = DB::selectOne("SELECT c.city FROM users u
        INNER JOIN citys c ON u.id_city = c.id
        WHERE u.email = '$user->email'");
        return view('detailsprofile',compact('user', 'my_publications', 'likes', 'comments', 'city'));
    }

    public function delete_comment_details(Request $request){
        $comment = Comment::find($request->id);
        $comment->id_state = 2;
        $comment->save();
        return redirect()->route('home.details', $request->id_user);
    }
}
