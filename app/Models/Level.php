<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MeetingRoom;

class Level extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function getMeetingRoom(){
        return $this->hasMany(MeetingRoom::class);
    }

    public function getMeetingRoomBooking(){
        return $this->hasMany(MeetingRoomBooking::class);
    }
}
