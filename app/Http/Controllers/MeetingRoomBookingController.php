<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MeetingRoomBooking;
use Carbon\Carbon;

class MeetingRoomBookingController extends Controller
{
    public function store(Request $req)
    {
        // $startDate = $req->start_date->toTimeString();
        // $startTime = $req->end_time->toTimeString();
        // $endTime = $req->end_time->toTimeString();
        $booking = new MeetingRoomBooking;
        $booking->host = $req->host;
        $booking->purpose = $req->purpose;
        $booking->pax = $req->pax;
        $booking->level_id = $req->level_id;
        $booking->start_date = $req->start_date;;
        $booking->start_time = $req->start_time;
        $booking->duration = $req->duration;
        $booking->end_time = $req->end_time;
        $booking->meeting_room_id = $req->meeting_room_id;
        $booking->status_id = $req->status_id;
        $booking->save();
        return redirect("/");
        // return MeetingRoomBooking::create($req->all());
    }

    public function showAll()
    {
        return MeetingRoomBooking::all();
    }
}
