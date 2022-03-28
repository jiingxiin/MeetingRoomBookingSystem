<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Level;
use App\Models\MeetingRoomBooking;

class MeetingRoom extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function getLevel(){
        return $this->belongsTo(Level::class);
    }

    public function getMeetingRoomBooking(){
        return $this->hasMany(MeetingRoomBooking::class);
    }
}
