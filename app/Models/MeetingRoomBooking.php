<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Status;
use App\Models\MeetingRoom;
use App\Models\User;

class MeetingRoomBooking extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['host', 'purpose', 'pax', 'level_id', 'start_date', 'start_time', 
    'duration', 'end_time', 'meeting_room_id', 'status_id'];

    public function getStatus(){
        return $this->belongsTo(Status::class);
    }

    public function getMeetingRoom(){
        return $this->belongsTo(MeetingRoom::class);
    }

    public function getUser(){
        return $this->belongsTo(User::class);
    }
}
