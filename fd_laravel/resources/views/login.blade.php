@extends('layouts.main2')

@section('title', 'LOGIN')
@section('css')
    @vite(['resources/css/form.css']);
@endsection

@section('content')
    <div class="content">

        <div class="content-logo">
            <div class="logo">
                <img src="{{ asset('storage/icons/logo_FD.png') }}" alt="">
            </div>
        </div>

        <div class="content-form">
            <form action="{{ route('login.logueo')}}" method="POST">
                @csrf
            <h2>LOGIN</h2>
            <label>CORREO</label>
            <input type="email" placeholder="INGRESE SU CORREO" name="email" required>
            <label>CONTRASEÑA</label>
            <input type="password" placeholder="INGRESE SU CONTRASEÑA" name="password" required>
            @if (session('message_error'))
              <p id="error"> {{ session('message_error') }}</p>
         @endif
            <button type="submit">ENTRAR</button>
            <a href="{{ route('register') }}">No tengo cuenta</a>
        </form>
        </div>



    </div>


@endsection

@section('js')
    @vite(['resources/js/login.js'])
@endsection
