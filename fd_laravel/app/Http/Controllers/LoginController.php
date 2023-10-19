<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class LoginController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest',['except' => ['destroy']]);
    }

    public function login()
    {
        return view('login');
    }

    public function logueo(Request $request ){

        $email = $request->email;
       $credentials = request()->only('email', 'password');
       if (DB::select("SELECT * FROM users WHERE email='$email' AND id_state = 1")) {
        if (Auth::attempt($credentials)) {
            request()->session()->regenerate();
            return redirect()->route('home');
           }else{

            return redirect()->route('login')->with('message_error', 'Credenciales incorrectas');

           }
       }else {
        return redirect()->route('login')->with('message_error', 'Usted no es un usuario existente');
       }

    }
}
