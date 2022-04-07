import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from 'reactstrap';
import dateFormat from 'dateformat';
import {Form, FormGroup, Col, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';

export default class AdminHome extends Component {
    constructor(props){
        super(props)
        console.log('data from component', JSON.parse(this.props.data));
        this.state = {
            data: JSON.parse(this.props.data),
            bookings: [],
            status: 1,
            newBookingData: {host_id: "", purpose: "", pax: "", level_id: "", start_date: "", start_time: "", 
            end_time: "", meeting_room_id: "" , status_id: 1},
            updateBookingModal: false,
            updateBookingData: {id: "", host_id: "", purpose: "", pax: "", level_id: "", start_date: "", start_time: "", 
            end_time: "", meeting_room_id: "" , status_id: 1},
            updateNotiModal: false,
            deleteNotiModal: false,
        }
    }
    loadBooking(){
        axios.get('http://127.0.0.1:8000/api/bookings').then((response) => {
            this.setState({
                bookings:response.data
            })
        })
    }
    componentWillMount() {
        this.loadBooking();
    }
    toggleUpdateBookingModal(id, host_id, purpose, pax, level_id, start_date, start_time, end_time, meeting_room_id, status_id) {
        console.log('clikec');
        console.log(this.state.updateBookingModal);
        this.setState({
            updateBookingData: {id, host_id, purpose, pax, level_id, start_date, start_time, end_time, meeting_room_id, status_id},
            updateBookingModal: !this.state.updateBookingModal,
        });
    }
    toggleUpdateModal() {
        this.setState({
            updateNotiModal: false,
        });
    }
    toggleDeleteModal() {
        this.setState({
            deleteNotiModal: false,
        });
    }
    updateBooking(){
        let {id, host_id, purpose, pax, level_id, start_date, start_time, end_time, meeting_room_id, status_id} = this.state.updateBookingData;
        axios.put('http://127.0.0.1:8000/api/bookings/update/'+id, {host_id, purpose, pax, level_id, start_date, start_time, end_time, meeting_room_id, status_id}).then((response) => {
            console.log("execute");
            this.setState({
                updateNotiModal: true,
                updateBookingData: {id: "", host_id: "", purpose: "", pax: "", level_id: "", start_date: "", start_time: "",  
                end_time: "", meeting_room_id: "" , status_id: 1},
                updateBookingModal: false,
            });
            this.loadBooking();
        })
    }
    deleteBooking(id) {
        axios.delete('http://127.0.0.1:8000/api/bookings/delete/'+id).then((response) => {
            this.setState({
                deleteNotiModal: true,
                deleteBookingModal: true,
            });
            this.loadBooking();
        });
    }
    render() {
        let bookings = this.state.bookings.map((booking) => {

            let status_id = booking.status_id
            let status_name = "";
            if (status_id=='1') {
                status_name = <td>Pending</td>
              }
            else if (status_id=='2'){
                status_name = <td>Approve</td>
            }
            else if (status_id=='3'){
                status_name = <td>Cancel</td>
            }
            else if (status_id=='4'){
                status_name = <td>Deny</td>
            }
            else {
                status_name = <td>{booking.status_id}</td>
            }

            return (
                <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.host_id}</td>
                    <td>{booking.start_date}</td>
                    { status_name }
                    <td>
                        <Button onClick={this.toggleUpdateBookingModal.bind(this, booking.id, booking.host_id, booking.purpose, booking.pax, booking.level_id, 
                            booking.start_date, booking.start_time, booking.end_time, booking.meeting_room_id, booking.status_id)} color="success" size="sm">
                        {/* // onClick={this.callUpdateBooking.bind(this, booking.id, booking.host, booking.start_date, booking.status)}> */}
                        Edit</Button>{'  '}
                        <Button onClick={this.deleteBooking.bind(this, booking.id)} color="danger" size="sm">
                        {/* // onClick={this.deleteBooking.bind(this, booking.id)}> */}
                        Delete</Button>
                    </td>
                </tr>
            )
        })

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
        let levels = this.state.data.levels.map((l) => {
            return (
                <option key={l.id} value={l.id}>{l.level}</option>
            )
        })
        
        return (
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Host ID</th>
                            <th>Booking Date</th>
                            <th>Status</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings}
                    </tbody>
                </Table>

                <Modal isOpen={this.state.updateBookingModal} toggle={this.toggleUpdateBookingModal.bind(this)}>
                    <ModalHeader>Update Booking</ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup row>
                                <Label for="host_id" sm={2}>ID</Label>
                                <Col sm={10}>
                                <Input
                                    id="host_id"
                                    name="host_id"
                                    value={this.state.updateBookingData.host_id}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.host_id = e.target.value
                                            this.setState({updateBookingData})
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
                                    value={this.state.updateBookingData.purpose}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.purpose = e.target.value
                                            this.setState({updateBookingData})
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
                                    value={this.state.updateBookingData.pax}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.pax = e.target.value
                                            this.setState({updateBookingData})
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
                                    value={this.state.updateBookingData.level_id}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.level_id = e.target.value
                                            this.setState({updateBookingData})
                                    }}
                                    type="select"
                                >
                                    {levels}
                                    {/* <option>1</option>
                                    <option>2</option>
                                    <option>3</option> */}
                                </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="start-date" sm={2}>Start Date</Label>
                                <Col sm={10}>
                                <Input
                                    id="start-date"
                                    name="start-date"
                                    value={this.state.updateBookingData.start_date}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.start_date = e.target.value
                                            dateFormat(updateBookingData.start_date, "yyyy-mm-dd")
                                            this.setState({updateBookingData})
                                    }}
                                    type="date"
                                />
                                </Col>
                            </FormGroup>
                            <p>{this.state.updateBookingData.start_date}</p>
                            <FormGroup row>
                                <Label for="start-time" sm={2}>Start Time</Label>
                                <Col sm={10}>
                                <Input
                                    id="start-time"
                                    name="start-time"
                                    value={this.state.updateBookingData.start_time}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.start_time = e.target.value
                                            // dateFormat(newBookingData.start_time, "isoTime")
                                            this.setState({updateBookingData})
                                    }}
                                    type="text"
                                />
                                </Col>
                            </FormGroup>
                            {/* <p>{this.state.newBookingData.start_time}</p> */}
                            <FormGroup row>
                                <Label for="end-time" sm={2}>End Time</Label>
                                <Col sm={10}>
                                <Input
                                    id="end-time"
                                    name="end-time"
                                    value={this.state.updateBookingData.end_time}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.end_time = e.target.value
                                            // dateFormat(newBookingData.end_time, "HH:MM:ss")
                                            this.setState({updateBookingData})
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
                                    value={this.state.updateBookingData.meeting_room_id}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.meeting_room_id = e.target.value
                                            this.setState({updateBookingData})
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
                                    value={this.state.updateBookingData.status_id}
                                    onChange={(e) => {
                                            let { updateBookingData } = this.state
                                            updateBookingData.status_id = e.target.value
                                            this.setState({updateBookingData})
                                    }} 
                                    type="select"
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
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateBooking.bind(this)}>Submit</Button>
                        <Button color="danger" onClick={this.toggleUpdateBookingModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.updateNotiModal} toggle={this.toggleUpdateModal.bind(this)}>
                    <ModalHeader>Booking Successfully Updated</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleUpdateModal.bind(this)}>OK</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.deleteNotiModal} toggle={this.toggleDeleteModal.bind(this)}>
                    <ModalHeader>Booking Successfully Deleted</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleDeleteModal.bind(this)}>OK</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
}

// export default UserCreate;

if (document.getElementById('adminhome')) {
    var data = document.getElementById('adminhome').getAttribute('data');
    ReactDOM.render(<AdminHome data={data}/>, document.getElementById('adminhome'));
}

// Date.prototype.addMinutes = function(minutes) {
//     this.setMinutes(this.getMinutes() + minutes);
//     console.log(this);
//     return this;
// };
