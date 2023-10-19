@extends('layouts.main')
@section('title', 'HOME')

@section('css')
    @vite(['resources/css/home.css', 'resources/css/detailsprofile.css'])
@endsection


@section('content')
    <p id="my_id" hidden>{{ Auth::user()->id }}</p>
    @csrf

    </div>

    <section class="content-home">

        <div class="content-left">
            <div class="content-profile">
                <div class="content-my-picture">
                    <center>
                        @if ($user->picture == null and $user->id_gender == 1)
                            <img id="my_image" src="{{ asset('storage/imgs/avatar_men.png') }}" alt="">
                        @elseif ($user->picture == null and $user->id_gender == 2)
                            <img id="my_image" src="{{ asset('storage/imgs/avatar_woman.png') }}" alt="">
                        @else
                            <img id="my_image" src="{{ asset('storage/imgs/' . $user->picture) }}" alt="">
                        @endif
                    </center>
                </div>
                <h1 id="my_name">{{ $user->name }}</h1>
            </div>
            <div class="content-info-profile">
                <div>
                    <b>CORREO</b>
                    <p>{{ $user->email }}</p>
                </div>
                <div><b>TÈLEFONO</b>
                    @if ($user->phone == null)
                        <p>NO REGISTRADO</p>
                    @else
                        <p>{{ $user->phone }}</p>
                    @endif

                </div>
                <div> <b>CIUDAD</b>
                    @if ($city == null)
                        <p>NO REGISTRADO</p>
                    @else
                        <p>{{ $city->city }}</p>
                    @endif
                </div>
                <div><b>FECHA DE NACIMIENTO</b>
                    @if ($user->birthdate == null)
                        <p>NO REGISTRADO</p>
                    @else
                        <p>{{ $user->birthdate }}</p>
                    @endif
                </div>




            </div>
        </div>
        <div class="content-right">
            @foreach ($my_publications as $mp)
                <div class="content_publication_edit">
                    <div class="content_publication_edit_header">
                        <b>Descripcion</b>
                        <p>{{ $mp->description }}</p>

                    </div>
                    <div class="content_publication_edit_content_picture">
                        <img src="{{ asset('storage/imgs/' . $mp->picture) }}" alt="">
                    </div>

                    <div class="content_publication_edit_content_info">

                        <div class="content_publication_edit_content_info_left">
                            <div class="content_publication_edit_content_info_left_header">
                                @php
                                    $total = 0;
                                @endphp
                                @foreach ($likes as $l)
                                    @if ($l->id_publication == $mp->id)
                                        @php
                                            $total = $total + 1;
                                        @endphp
                                    @endif
                                @endforeach
                                <h1>LIKES {{ $total }}</h1>
                            </div>
                            <div class="content_publication_edit_content_info_left_all_likes">
                                @foreach ($likes as $l)
                                @if ($l->id_publication == $mp->id)


                                    <div class="content_publication_edit_content_info_left_like">
                                        <div class="content_publication_edit_content_info_left_like_img">
                                            @if ($l->picture == null and $l->id_gender == 1)
                                                <img id="your_picture" src="{{ asset('storage/imgs/avatar_men.png') }}"
                                                    alt="">
                                            @elseif ($l->picture == null and $l->id_gender == 2)
                                                <img id="your_picture" src="{{ asset('storage/imgs/avatar_woman.png') }}"
                                                    alt="">
                                            @else
                                                <img id="your_picture" src="{{ asset('storage/imgs/' . $l->picture) }}"
                                                    alt="">
                                            @endif
                                        </div>
                                        <div class="content_publication_edit_content_info_left_like_info">
                                            <h1>{{ $l->name }}</h1>
                                            <b>{{ $l->date }}</b>
                                        </div>
                                    </div>
                                       @endif
                                @endforeach
                            </div>
                        </div>
                        <div class="content_publication_edit_content_info_right">
                            <div class="content_publication_edit_content_info_right_header">
                                @php
                                    $total = 0;
                                @endphp
                                @foreach ($comments as $c)
                                    @if ($c->id_publication == $mp->id)
                                        @php
                                            $total = $total + 1;
                                        @endphp
                                    @endif
                                @endforeach
                                <h1>COMENTARIOS {{ $total }}</h1>
                            </div>
                            <div class="content_publication_edit_content_info_right_all_comments">
                                @foreach ($comments as $c)
                                @if ($c->id_publication == $mp->id)
                                    <div class="content_publication_edit_content_info_right_comment">
                                        <div class="content_publication_edit_content_info_right_comment_header">
                                            <div class="content_publication_edit_content_info_right_comment_header_picture">
                                                @if ($c->picture == null and $c->id_gender == 1)
                                                    <img id="your_picture" src="{{ asset('storage/imgs/avatar_men.png') }}"
                                                        alt="">
                                                @elseif ($c->picture == null and $c->id_gender == 2)
                                                    <img id="your_picture"
                                                        src="{{ asset('storage/imgs/avatar_woman.png') }}" alt="">
                                                @else
                                                    <img id="your_picture" src="{{ asset('storage/imgs/' . $c->picture) }}"
                                                        alt="">
                                                @endif
                                            </div>
                                            <div
                                                class="content_publication_edit_content_info_right_comment_header_info_person">
                                                <h1>{{ $c->name }}</h1>
                                                <b>{{ $c->date }}</b>
                                            </div>
                                        </div>
                                        <div class="content_publication_edit_content_info_right_comment_full">
                                            {{ $c->comment }}
                                            @if ($mp->id_user == Auth::user()->id)
                                            <form action="{{ route('home.delete_comment_details') }}" method="post">
                                                @csrf
                                                <input type="text" name="id" hidden value="{{$c->id_comment }}">
                                                <input type="text" name="id_user" hidden value="{{$mp->id_user }}">
                                            <button style="border: 0; background-color: white"><i id="btn_delete_comment" class="bi bi-trash-fill btn btn-danger"></i></button>
                                        </form>
                                            @endif

                                        </div>
                                    </div>

                                @endif
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach


        </div>


    </section>


@endsection

@section('js')
    <script>
        let rute_sond = "{{ asset('storage/sonds/sonido_like.mp3') }}";
        let rute_form_dates = "{{ route('home.save_dates_user') }}";
        let rute_form_publication = "{{ route('home.save_publication') }}";
        let = control_rute_imgs = "{{ asset('storage/imgs/') }}" + "/";
    </script>
    @if (session('dates_user'))
        <script>
            Swal.fire(
                'DATOS GURDADOS CON EXISTO',
                'Gracias por tu informaciòn!',
                'success'
            )
        </script>
    @endif

    @if (session('error_dates_publication'))
        <script>
            Swal.fire(
                'ERROR EN LOS DATOS DE PUBLICACIÒN',
                'Hubo un error en la informacion!',
                'error'
            )
        </script>
    @endif

    @if (session('succes_dates_publication'))
        <script>
            Swal.fire(
                'PUBLICACIÒN SUBIDA CON EXISTO',
                'Bien hecho!',
                'success'
            )
        </script>
    @endif
    @vite(['resources/js/header.js'])
@endsection
