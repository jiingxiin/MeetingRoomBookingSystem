<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status; 

class StatusController extends Controller
{
    public function dropDownStatus()
    {
        $statuses = Status::all();
        // return view('welcome', ['statuses'=>$statuses]);
        return view('welcome')->with('statuses', json_encode($statuses));
    }
}
