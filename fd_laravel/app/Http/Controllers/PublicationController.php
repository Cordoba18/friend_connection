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
use Twilio\Rest\Client;

class PublicationController extends Controller
{

    public function __construct()
    {

        $this->middleware('auth');
    }
    public function index()
    {
        $user = Auth::user();
        $my_publications = DB::select("SELECT * FROM publications WHERE id_user =".Auth::user()->id. " AND id_state = 1 LIMIT 5");
        $publications = DB::select("SELECT p.id AS id_publication ,u.id_gender, u.id, u.name, u.picture, p.picture AS picture_publication, p.description, p.date
         FROM publications p
        INNER JOIN users u ON p.id_user = u.id
         WHERE p.id_user <>".Auth::user()->id." AND p.id_state = 1 AND u.id_state = 1 ORDER BY p.id DESC");
        $likes = DB::select("SELECT * FROM likes WHERE id_state = 1");
        $comments = DB::select("SELECT * FROM comments WHERE id_state = 1");
        $city = DB::selectOne("SELECT c.city FROM users u
        INNER JOIN citys c ON u.id_city = c.id
        WHERE u.email = '$user->email'");
        return view('customprofile', compact('user', 'city', 'my_publications', 'publications', 'likes','comments'));
    }

    public function loading_departaments()
    {
        $departaments = DB::select('SELECT * FROM departaments');
        return response()->json(['message' => $departaments], 200);
    }

    public function loading_citys($id)
    {
        $citys = DB::select("SELECT * FROM citys WHERE id_departament = $id");
        return response()->json(['message' => $citys], 200);
    }

    public function loading_dates_user()
    {
        $user = Auth::user();
        return response()->json(['message' => $user], 200);
    }

    public function save_dates_user(Request $request)
    {
        $user = User::find(Auth::user()->id);
        if ($request->name !== null) {

            $user->name = $request->name;
        }
        if ($request->hasFile('image')) {

            $imagen = $request->file('image');
            $fechaHoraActual = now()->format('Y-m-d_H-i-s');
            $nombreImagen = $fechaHoraActual . '.' . $imagen->getClientOriginalExtension();
            $rutaImagen = public_path('storage/imgs/' . $nombreImagen);
            $imagen->move(public_path('storage/imgs'), $nombreImagen);
            $user->picture = $nombreImagen;
        }
        if ($request->phone !== null) {
            $user->phone = $request->phone;
        }
        if ($request->city !== null) {
            $user->id_city = $request->city;
        }
        if ($request->birthdate !== null) {
            $user->birthdate = $request->birthdate;
        }
        $user->save();
        return redirect()->route('home')->with('dates_user', 'bien guardados');
    }

    public function save_publication(Request $request)
    {


        $new_publication = new Publication();

        if ($request->description == null || $request->hasFile('image')==false) {
            return redirect()->route('home')->with('error_dates_publication', 'error de datos');
        }else{
        if ($request->hasFile('image')) {

            $imagen = $request->file('image');
            $fechaHoraActual = now()->format('Y-m-d_H-i-s');
            $nombreImagen = $fechaHoraActual . '.' . $imagen->getClientOriginalExtension();
            $rutaImagen = public_path('storage/imgs/' . $nombreImagen);
            $imagen->move(public_path('storage/imgs'), $nombreImagen);
            $fechaActual = Carbon::now();
            $fechaActual->setLocale('es');
            $fechaColombiana = $fechaActual->format('F d Y');
            $new_publication->description = $request->description;
            $new_publication->picture= $nombreImagen;
            $new_publication->id_user = Auth::user()->id;
            $new_publication->id_state = 1;
            $new_publication->date = $fechaColombiana;
            $new_publication->save();
            return redirect()->route('home')->with('succes_dates_publication', 'good datos');

        }
    }

    }

    public function save_like($id){

        $fechaActual = Carbon::now();
            $fechaActual->setLocale('es');
            $fechaColombiana = $fechaActual->format('F d Y');
        $user = User::find(Auth::user()->id);
        $exist_like = DB::selectOne("SELECT * FROM likes WHERE id_publication = $id AND id_user = $user->id ");
        if ($exist_like) {
        $like = DB::selectOne("SELECT * FROM likes WHERE id_publication = $id AND id_state = 1 AND id_user = $user->id ");

        if ($like) {
            $new_like = Like::find($like->id);
            $new_like->id_state = 2;
            $new_like->date = $fechaColombiana;
            $new_like->save();
            return response()->json(['message' => 'dislike'], 200);
        }else{
            $new_like = Like::find($exist_like->id);
            $new_like->id_state = 1;
            $new_like->date = $fechaColombiana;
            $new_like->save();
            return response()->json(['message' => 'like'], 200);
        }
    }else{
            $new_like = new Like();
            $new_like->id_publication = $id;
            $new_like->id_user = $user->id;
            $new_like->id_state = 1;
            $new_like->date = $fechaColombiana;
            $new_like->save();
            return response()->json(['message' => 'like'], 200);
    }
    }

    public function add_likes($id){
        $likes = DB::select("SELECT * FROM likes WHERE id_publication = $id AND id_state = 1");
        $total = 0;
        foreach ($likes as $key => $value) {
           $total = $total + 1;
        }

        return response()->json(['message' => $total], 200);
    }
    public function save_comment(Request $request){

        $new_comment = new Comment();
        $fechaActual = Carbon::now();
        $fechaActual->setLocale('es');
        $fechaColombiana = $fechaActual->format('F d Y');
        $new_comment->date = $fechaColombiana;
        $new_comment->comment = $request->comment;
        $new_comment->id_publication = $request->id_publication;
        $new_comment->id_user = Auth::user()->id;
        $new_comment->id_state = 1;
        $new_comment->save();
        $comments = DB::select('SELECT * FROM comments WHERE id_state = 1');
        $id_last_comment = 0;

        foreach ($comments as $c){
            $id_last_comment = $c->id;
        }
        return response()->json(['fechaColombiana' => $fechaColombiana, 'id_last_comment' => $id_last_comment], 200);
    }

    public function getcomments($id){

        $comments = DB::select("SELECT c.id, c.comment, c.date, u.name, u.picture, u.id_gender, u.id AS id_user
        FROM comments c
        INNER JOIN users u ON c.id_user = u.id
        WHERE c.id_publication = $id AND c.id_state = 1");
        return response()->json(['message' => $comments], 200);
    }

    public function delete_comment(Request $request){

        $comment = Comment::find($request->id);
        $comment->id_state = 2;
        $comment->save();
        return response()->json(['message' => true], 200);
    }

    public function count_comments($id){

        $comments = DB::select("SELECT * FROM comments WHERE id_publication = $id AND id_state = 1");
        $total = 0;
        foreach($comments as $comment){

            $total = $total + 1;

        }
        return response()->json(['message' => $total], 200);

    }
    public static function randNumer() {
        $d=rand(1000,9999);
        return $d;
    }

    public function verify_number(Request $request){

        $account_sid = getenv('TWILIO_ACCOUNT_SID');
        $auth_token = getenv('TWILIO_AUTH_TOKEN');
        $twilio_number = "+19787850283";
        $code =PublicationController::randNumer();
        $client = new Client($account_sid, $auth_token);
        $client->messages->create(
            // Where to send a text message (your cell phone?)
            '+573043711546',
            array(
                'from' => $twilio_number,
                'body' => 'iNGRESA TU CODIGO DE VERIFICACION PARA VALIDAR TU NUMERO '. $code
            )
        );

        return response()->json(['message' => $code], 200);
    }
}
