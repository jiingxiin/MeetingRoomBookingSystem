@extends('layouts.app')
@section('content')
<div class="container">
<div class="row justify-content-center">

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link href="/css/app.css" rel="stylesheet">
        <!-- Styles -->

        <!-- Styles -->
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
            h1{
            text-align:center;
            padding-bottom:30px;
        }
        .backlink{
            font-size:20px;
        }
        </style>
    </head>
    <body class="antialiased">

    <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
            @if (Route::has('login'))
                    @auth
                        <a href="{{ url('/employee/dashboard') }}" class="backlink underline">Back</a>
                    @endauth
            @endif
            <h1>Create Booking</h1>
                 <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                                <div class="card-body">

                                <div id='usercreate' data='{{$data}}'></div>

                                </div>
                        </div>
                    </div>
                </div>
        </div>
    </body>
    <script src="/js/app.js"></script>
        </div>
    </body>
</html>

</div>
</div>
@endsection
