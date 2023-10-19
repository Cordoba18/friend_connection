<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Code;
use App\Mail\SendCode;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{



    public function register()
    {
        $genders = DB::select('SELECT * FROM genders');
        return view('register',compact('genders'));
    }

    public function new_user(Request $request)
    {
        $email = $request->email;
        $name = $request->name;
        $gender = $request->gender;
        $password = Hash::make($request->password);
        $user = new User();
        $user->email = $email;
        $user->password = $password;
        $user ->name = $name;
        $user ->id_gender = $gender;
        $user ->id_state = 1;
        $user->save();
        $credentials = request()->only('email', 'password');
        Auth::attempt($credentials);
        request()->session()->regenerate();
        return response()->json(['message' => true], 200);
    }

    public function validate_email(Request $request){

        if (DB::select("SELECT * FROM users WHERE email = '$request->email'")) {

            return response()->json(['message' => true], 200);
        }else{
            DB::table('codes')->where('email', $request->email)->delete();
            $code = new Code();
            $new_code = UserController::randNumer();
            $code->email = $request->email;
            $code->code =  $new_code;
            $code ->save();
            Mail::to($request->email)->send(new SendCode($new_code, $request->name, " utiliza el codigo de activacion para finalizar la creaciòn de tu cuenta : ", "CREACION DE CUENTA"));
            return response()->json(['message' => $new_code], 200);
        }
}
public static function randNumer() {
    $d=rand(1000,9999);
    return $d;
}

public function delete_user(Request $request){


    $user = User::find(Auth::user()->id);
    $user->id_state = 2;
    $user->save();

    Auth::guard('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => true], 200);


}

public function closed_session(Request $request){


    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => true], 200);


}



}
