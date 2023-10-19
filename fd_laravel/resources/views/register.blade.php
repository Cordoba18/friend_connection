@extends('layouts.main2')

@section('title', 'REGISTER')
@section('css')
    @vite(['resources/css/form.css'])
@endsection

@section('content')


    <div class="content">

        <div class="content-logo">
            <img src="{{ asset('storage/icons/logo_FD.png') }}" alt="">
        </div>
        @csrf
        <div class="content-form">
            <h2>REGISTER</h2>
            <form action="" method="POST">

                <label>NOMBRE</label>
                <input class="active_error" id="name" type="text" placeholder="INGRESE SU NOMBRE" name="name" required>
                <label >GENERO</label>
                <select name="gender" id="gender">
                    <option value="">SELECCIONÈ UN GENERO</option>
                    @foreach ($genders as $g)
                    <option value="{{$g->id }}">{{ $g->gender }}</option>
                    @endforeach
                </select>
                <label>CORREO</label>
                <input id="email" type="email" placeholder="INGRESE SU CORREO" name="email" required>
                <label>CONTRASEÑA</label>
                <input id="password1" type="password" placeholder="INGRESE SU CONTRASEÑA" name="password1" required>
                <label> CONFIRMAR CONTRASEÑA</label>
                <input id="password2" type="password" placeholder="INGRESE SU CONTRASEÑA" name="password2" required>
                <p id="error" hidden></p>
                <button id="btn_save_info_register" type="submit">REGISTRAR</button>
                <a href="{{ route('login') }}">Si tengo cuenta</a>
            </form>
        </div>





    </div>
@endsection

@section('js')
<script>
    let route_login = '{{ route("login") }}';
</script>
    @vite(['resources/js/register.js'])

@endsection
