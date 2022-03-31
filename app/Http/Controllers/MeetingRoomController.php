<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MeetingRoom; 

class MeetingRoomController extends Controller
{
    public function dropDownMeetingRoom()
    {
        $rooms = MeetingRoom::all();
        return view('welcome')->with('rooms', json_encode($rooms));
    }
}
