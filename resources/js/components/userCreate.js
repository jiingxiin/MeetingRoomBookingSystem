import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, Col, Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import dateFormat from 'dateformat';
// import Date;

export default class UserCreate extends Component {
    constructor(props){
        super(props);
        console.log('data from component', JSON.parse(this.props.data));
        
        this.state = {
            data: JSON.parse(this.props.data),
            bookings: [],
            available: true,
            status: 1,
            newBookingData: {host: "", purpose: "", pax: "", level_id: "", start_date: "", start_time: "", 
            duration: "", end_time: "", meeting_room_id: "" , status_id: 1},
        }
    }
    checkAvailable(booking_id, meeting_room, start_date, start_time, end_time){
        // get the meeting_room_booking array, get those with approve status
        let records = this.state.data.bookings.map((record) => {
          // if booking_id is not same
          if(record.id != booking_id){
            // if booking meeting room is same
            if(record.meeting_room_id != meeting_room){
                // if date is same
                if(record.start_date = start_date){
                    // if end_time > bookingRecord.start_time  (check crash time)
                    if(end_time > record.start_time){
                        // if start_time < bookingRecord.end_time (check within duration?)
                        if(start_time < record.end_time){
                            let { available } = this.state
                            available = false
                            this.setState({available})
                        }
                    }
                }
            }
          }  
        })
    }
    addBooking(){
        // this.state.newBookingData.start_date = dateFormat(this.state.newBookingData.start_date, "yyyy-mm-dd")
        // this.state.newBookingData.start_time = dateFormat(this.state.newBookingData.start_time, "isoTime")
        // this.state.newBookingData.end_time = dateFormat(this.state.newBookingData.end_time, "isoTime")
        // this.setState({newBookingData})
        // console.log({newBookingData});
        // console.log({newBookingData['start_time']});
        // console.log({newBookingData['end_time']});
        axios.post('http://127.0.0.1:8000/api/booking', this.state.newBookingData).then((response) => {
            console.log("execute");
            let {bookings} = this.state
            // this.loadBooking()
            this.setState({
                bookings: [],
                status: 1,
                newBookingData: {host: "", purpose: "", pax: "", level_id: "", start_date: "", start_time: "",  
                duration: "", end_time: "", meeting_room_id: "" , status_id: 1},
            })
        })
    }
    render() {
        // let statusesData = Array.from(this.props.statuses)
        let status = this.state.data.statuses.map((s) => {
            return (
                <option key={s.id} value={s.id}>{s.status}</option>
            )
        })
        let rooms = this.state.data.rooms.map((r) => {
            return (
                <option key={r.id} value={r.id}>{r.name}</option>
            )
        })
        return (
            <div className="container">
                <h1>Create Booking</h1>
                <Form>
                    <FormGroup row>
                        <Label for="host" sm={2}>Host</Label>
                        <Col sm={10}>
                        <Input
                            id="host"
                            name="host"
                            placeholder="name"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.host = e.target.value
                                    this.setState({newBookingData})
                            }}
                            type="text"
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="purpose" sm={2}>Purpose</Label>
                        <Col sm={10}>
                        <Input
                            id="purpose"
                            name="purpose"
                            placeholder="your meeting's purpose"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.purpose = e.target.value
                                    this.setState({newBookingData})
                            }}
                            type="textarea"
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="pax" sm={2}>Pax</Label>
                        <Col sm={10}>
                        <Input
                            id="pax"
                            name="pax"
                            placeholder="number of pax"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.pax = e.target.value
                                    this.setState({newBookingData})
                            }}
                            type="number"
                        />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="level" sm={2}>Level</Label>
                        <Col sm={10}>
                        <Input
                            id="level"
                            name="level"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.level_id = e.target.value
                                    this.setState({newBookingData})
                            }}
                            type="select"
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="start-date" sm={2}>Start Date</Label>
                        <Col sm={10}>
                        <Input
                            id="start-date"
                            name="start-date"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.start_date = e.target.value
                                    dateFormat(newBookingData.start_date, "yyyy-mm-dd")
                                    this.setState({newBookingData})
                            }}
                            type="date"
                        />
                        </Col>
                    </FormGroup>
                    {/* <p>{this.state.newBookingData.start_date}</p> */}
                    <FormGroup row>
                        <Label for="start-time" sm={2}>Start Time</Label>
                        <Col sm={10}>
                        <Input
                            id="start-time"
                            name="start-time"
                            placeholder="HH:MM (24 hours format)"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.start_time = e.target.value
                                    // dateFormat(newBookingData.start_time, "isoTime")
                                    this.setState({newBookingData})
                            }}
                            type="text"
                        />
                        </Col>
                    </FormGroup>
                    {/* <p>{this.state.newBookingData.start_time}</p> */}
                    <FormGroup row>
                        <Label for="duration" sm={2}>Duration</Label>
                        <Col sm={10}>
                        <Input
                            id="duration"
                            name="duration"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.duration = e.target.value
                                    this.setState({newBookingData})
                                    // let start_datetime = Date(newBookingData.start_time))
                                    // let cal_end_time = (Date.parse(newBookingData.start_time)).getTimes() + newBookingData.duration * 60000
                                    // let cal_end_time = newBookingData.start_time
                                    // let cal_end_time = cal_end_time.getMinutes() + newBookingData.duration
                                    // let cal_end_time = moment().hour('12').minute('44').add(4,'hours').format("HH:mm");
                                    // newBookingData.end_time = cal_end_time
                                    // this.setState({newBookingData})
                            }}
                            type="select"
                        >
                            <option value={0}>Select duration</option>
                            <option value={30}>30 mins</option>
                            <option value={60}>1 hour</option>
                            <option value={90}>1 hour 30 mins</option>
                            <option value={120}>2 hours</option>
                            <option value={150}>2 hours 30 mins</option>
                            <option value={180}>3 hours</option>
                            <option value={210}>3 hours 30 mins</option>
                            <option value={240}>4 hours</option>
                            <option value={270}>4 hours 30 mins</option>
                            <option value={300}>5 hours</option>
                            <option value={330}>5 hours 30 mins</option>
                            <option value={360}>6 hours</option>
                            <option value={390}>6 hours 30 mins</option>
                            <option value={420}>7 hours</option>
                            <option value={450}>7 hours 30 mins</option>
                            <option value={480}>8 hours</option>
                        </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="end-time" sm={2}>End Time</Label>
                        <Col sm={10}>
                        <Input
                            id="end-time"
                            name="end-time"
                            placeholder="HH:MM (24 hours format)"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.end_time = e.target.value
                                    // dateFormat(newBookingData.end_time, "HH:MM:ss")
                                    this.setState({newBookingData})
                            }}
                            type="text"
                        />
                        </Col>
                    </FormGroup>
                    {/* <p>{this.state.newBookingData.end_time}</p> */}
                    <FormGroup row>
                        <Label for="meeting-room" sm={2}>Meeting Room</Label>
                        <Col sm={10}>
                        <Input
                            id="meeting-room"
                            name="meeting-room"
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.meeting_room_id = e.target.value
                                    this.setState({newBookingData})
                            }}
                            type="select"
                        >
                            {rooms}
                            {/* <option value={0}>Select a room</option>
                            <option value={1}>Spiderman</option>
                            <option value={2}>Wonder Woman</option>
                            <option value={3}>Superman</option>
                            <option value={4}>Batman</option>
                            <option value={5}>Hulk</option>
                            <option value={6}>Black Widow</option> */}
                        </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="status" sm={2}>Status</Label>
                        <Col sm={10}>
                        <Input
                            id="status"
                            name="status"
                            value={this.state.status}
                            onChange={(e) => {
                                    let { newBookingData } = this.state
                                    newBookingData.status_id = 1
                                    this.setState({newBookingData})
                            }} 
                            type="select"
                            readOnly
                        >
                            {status}
                            {/* <option value={1}>Pending</option>
                            <option value={2}>Approve</option>
                            <option value={3}>Cancel</option>
                            <option value={4}>Deny</option> */}
                        </Input>
                        </Col>
                    </FormGroup>
                </Form>
                <Button color="primary" onClick={this.addBooking.bind(this)}>Submit</Button>
            </div>
        );
    }
}

// export default UserCreate;

if (document.getElementById('usercreate')) {
    var data = document.getElementById('usercreate').getAttribute('data');
    ReactDOM.render(<UserCreate data={data}/>, document.getElementById('usercreate'));
}

// Date.prototype.addMinutes = function(minutes) {
//     this.setMinutes(this.getMinutes() + minutes);
//     console.log(this);
//     return this;
// };
