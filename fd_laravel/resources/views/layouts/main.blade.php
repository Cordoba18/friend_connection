<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ asset('storage/icons/logo_FD.png') }}" type="image/x-icon">
    <title> @yield('title')</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    @yield('css')
</head>

<body>
    <div class="contenido">


    </div>

    @if (
        $user->name == null || $user->phone == null || $user->id_city == null || $user->birthdate == null and
            $user->id == Auth::user()->id)
        <p id="info_validate_dates" hidden>TRUE</p>
        <div class="warning">
            <div class="content_warning">
                <i id="btn_x" class="bi bi-x-circle"></i>
                <div class="message_Warning">
                    <div class="content_logo_message_Warning">
                        <img src="{{ asset('storage/icons/logo_FD.png') }}" alt="">
                    </div>
                    <h1>BIENVENIDO A FRIEND CONNECTION!</h1>
                    <p>Porfavor completa tu informacion de perfil para realizar publicaciones.</p>
                </div>
            </div>
        </div>
    @endif
    @include('layouts.components.navbar')
    @yield('content')
    @include('layouts.components.footer')
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous">
</script>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"
    integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
@yield('js')

</html>
