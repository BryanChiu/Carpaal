import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button, Form, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import {ReactBingmaps} from 'react-bingmaps';
import Clock from 'react-live-clock';
import './App.css';
import carpaal_logo from './images/carpaal_logo.png'
import avatar0 from './images/avatar0.png'
import avatar1 from './images/avatar1.png'
import avatar2 from './images/avatar2.png'
import avatar3 from './images/avatar3.png'
import avatar4 from './images/avatar4.png'
import avatar5 from './images/avatar5.png'
import avatar6 from './images/avatar6.png'
import avatar7 from './images/avatar7.png'
import avatar8 from './images/avatar8.png'
import avatar9 from './images/avatar9.png'
import avatar10 from './images/avatar10.png'
import avatar11 from './images/avatar11.png'
import avatar12 from './images/avatar12.png'
import heart from './images/heart.png'
import mtheart from './images/heart_empty.png'
import pencil from './images/pencil.png'
import clone from './images/clone.png'
import trash from './images/trash.png'

let globalState = {
  Today: null,
  Now: null,
}

let globalSearch = {
  Date: null,
  From: null,
  To: null
}

function Ride(id, toMac, date, time, loc, lat, lon, name, contact, img) {
  this.id = id;
  this.toMac = toMac;
  this.date = date;
  this.time = time;
  this.loc = loc;
  this.lat = lat;
  this.lon = lon;
  this.name = name;
  this.contact = contact;
  this.img = img;
}

let globalRides = [
  new Ride(0, false, "2020-12-11", "19:00", "University of Waterloo", 43.472340, -80.544718, "Jon Johnson", "email: jojo6@mcmaster.ca", avatar1),
  new Ride(1, false, "2020-12-11", "19:30", "Markham Civic Center", 43.856522, -79.336754, "Bob DaBilder", "text: 647-555-1234", avatar2),
  new Ride(2, false, "2020-12-12", "08:00", "Bramalea GO Station", 43.700685, -79.690276, "Becky Peters", "call: 416-555-0987", avatar3),
  new Ride(3, false, "2020-12-14", "13:00", "Downtown Toronto", 43.642551, -79.385502, "Greg Lincoln", "text: 647-555-7831", avatar7),
  new Ride(4, false, "2020-12-15", "11:00", "Richmond Hill GO Station", 43.875087, -79.426163, "Charles Boyle", "text: 905-555-4567", avatar8),
  new Ride(5, false, "2020-12-15", "16:00", "Guelph University", 43.532792, -80.225215, "Jim McDonald", "text: 416-555-3732", avatar9),
  new Ride(6, true, "2020-12-11", "22:00", "Stoney Creek", 43.227094, -79.716637, "Andy Andrews", "text: 905-555-4444", avatar4),
  new Ride(7, true, "2020-12-12", "09:00", "Square One Starbucks", 43.594191, -79.647778, "Hannah Banana", "email: bananah@mcmaster.ca", avatar5),
  new Ride(8, true, "2020-12-12", "12:00", "York University", 43.773755, -79.501861, "Rick Richards", "text: 333-555-2468", avatar6),
  new Ride(9, true, "2020-12-14", "15:00", "Square One", 43.594140, -79.644954, "Wayne Wilson", "text: 416-555-4568", avatar10),
  new Ride(10, true, "2020-12-15", "17:00", "Square One", 43.594540, -79.641574, "Tom Thompson", "text: 647-555-3484", avatar11),
  new Ride(11, true, "2020-12-15", "18:00", "Brock University", 43.118202, -79.246048, "Sal Montegomery", "text: 905-555-2367", avatar12),
]

let globalRideCount = 12;

let globalEditRide = null;

let globalEditBool = false;

let favRides = [];

let myOfferedRides = [];

let me = {
  Name: "Carpaal Tester",
  Contact: "email: tester@carpaal.ca",
  Img: avatar0
}

function SortRides() {
  globalRides.sort(function(x,y) {
    if ((x.date+x.time) === (y.date+y.time)) return 0;
    return (x.date+x.time) < (y.date+y.time) ? -1 : 1;
  });
}

function toggleFav(id) {
  var idx = favRides.indexOf(id);
  if (idx>-1) favRides.splice(idx,1);
  else favRides.push(id);
}

function tConvert(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  time = time.slice(1); // Remove full string match value
  time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
  time[0] = +time[0] % 12 || 12; // Adjust hours

  return time.join(''); // return adjusted time or original string
}

function addDay(date) {
  var d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d;
}

function RideEntry(that, {id, toMac, date, time, loc, lat, lon, name, contact, img}) {
  return (
    <Row className="ride" key={id}>
      <Col className="my-auto" xs={5}>
        <span>{toMac ? "From" : "To"}: <b>{loc}</b></span><br />
        <span>Date: <b>{addDay(date).toString().substr(4,3)+"-"+date.substr(-2,2)+"-"+date.substr(0,4)}</b></span><br />
        <span>Time: <b>{tConvert(time)}</b></span></Col>
      <Col className="my-auto avatarContainer" xs={2}><img src={img} className="avatar" /></Col>
      <Col className="my-auto"><span><b>{name}</b></span><br /><span>{contact}</span></Col>
      <span onClick={()=>{toggleFav(id);that.forceUpdate()}}>
        <img className="heart" src={favRides.includes(id) ? heart : mtheart} />
      </span>
    </Row>
  );
}

function MyRideEntry(that, {id, toMac, date, time, loc, lat, lon, name, contact, img}) {
  return (
    <Row className="ride" key={id}>
      <Col className="my-auto" xs={5}>
        <span>{toMac ? "From" : "To"}: <b>{loc}</b></span><br />
        <span>Date: <b>{addDay(date).toString().substr(4,3)+"-"+date.substr(-2,2)+"-"+date.substr(0,4)}</b></span><br />
        <span>Time: <b>{tConvert(time)}</b></span></Col>
      <Col className="my-auto avatarContainer" xs={2}><img src={img} className="avatar" /></Col>
      <Col className="my-auto"><span><b>{name}</b></span><br /><span>{contact}</span></Col>
      <span onClick={()=>EditRide(id)}>
        <NavLink className="maroon" exact to="/offerride">
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>Edit</Tooltip>}>
            <img className="pencil" src={pencil} />
          </OverlayTrigger>
        </NavLink>
      </span>
      <span onClick={()=>CloneRide(that, id)}>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Clone</Tooltip>}>
          <img className="clone" src={clone} />
        </OverlayTrigger>
      </span>
      <span onClick={()=>DeleteRide(that, id)}>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Delete</Tooltip>}>
          <img className="trash" src={trash} />
        </OverlayTrigger>
      </span>
    </Row>
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Date: globalState["Today"],
      From: globalState["Now"],
      To: "23:59",
      AllPushPins: [],
      ShowPushPins: [],
      ShowModal: false,
      ModalRide: globalRides[0]
    }
    this.AddPins();
  }

  AddPins() {
    var temp = []
    for (const r of globalRides) {
      temp.push({
        "location":[r.lat, r.lon],
        "option":{title: r.loc, color: r.toMac?"red":"blue", date: r.date, time: r.time},
        "addHandler": {"type" : "click", callback: this.ShowRideModal.bind(this, r) }
      });
    }
    this.state.AllPushPins = temp;
  }

  UpdatePins() {
    this.setState({
      ShowPushPins: this.state.AllPushPins.filter((p)=>{
        return p.option.date==this.state.Date && p.option.time>=this.state.From && p.option.time<=this.state.To;
      })
    })
  }

  ShowRideModal(r) {
    this.setState({ModalRide: r, ShowModal: true});
  }

  render() {
  	return (
      <div>
        <br />
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h5 className="alignright">Upcoming Rides</h5>
              <span className="font18 alignright">Leaving Mac</span>
              {globalRides.filter((r)=>!r.toMac).slice(0,3).map(
                (r) => RideEntry(this, r)
              )}
              <div className="alignright"><Router>
                <NavLink exact to="/leavingmacrides"><Button variant="maroon2">View more</Button></NavLink>
              </Router></div>
              <br />
              <span className="font18 alignright">Reaching Mac</span>
              {globalRides.filter((r)=>r.toMac).slice(0,3).map(
                (r) => RideEntry(this, r)
              )}
              <div className="alignright"><Router>
                <NavLink exact to="/reachingmacrides"><Button variant="maroon2">View more</Button></NavLink>
              </Router></div>
            </Col>
            <span className="border-right"></span>
            <Col>
              <h5>Search</h5>
              <span className="font18">Date</span><br />
              <input type="date" defaultValue={globalState["Today"]} 
                onChange={(e)=>this.setState({Date: e.target.value}, this.UpdatePins)}>
              </input><br /><br />
              <span className="font18">Time Range</span><br />
              <span className="whitespace92">From</span><span>To</span><br />
              <input className="whitespace20" type="time" defaultValue={globalState["Now"]} value={this.state.From}
                onChange={(e)=>this.setState({From: [[this.state.To, e.target.value].sort()[0]]}, this.UpdatePins)}>
              </input>
              <input type="time" defaultValue="23:59" value={this.state.To}
                onChange={(e)=>this.setState({To: [[this.state.From, e.target.value].sort()[1]]}, this.UpdatePins)}>
              </input><br /><br />
              <div className="mapContainer">
                <ReactBingmaps 
                  center={[43.261355, -79.919348]}
                  zoom={10}
                  navigationBarMode={"minified"}
                  bingmapKey={"AiyAg_18lKJGEiTUbjVm9WAAMAWea0C4P1kAljijIoUC9WK5daWfuw6LibQaR309"}
                  pushPins={this.state.ShowPushPins}>
                </ReactBingmaps>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal
          show={this.state.ShowModal}
          onHide={()=>this.setState({ShowModal: false})}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              { RideEntry(this, this.state.ModalRide) }
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

function PushPinRideModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ride added
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          {RideEntry}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

class OfferRide extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br />
        <Container>
          <Row className="justify-content-center">
            <Col xs={5}>
              <Row className="break"></Row>
              <img src={carpaal_logo} className="logo2 alignright" alt="carpaal logo" />
              <Row className="justify-content-center thanks"><b>Thank you for carpooling!</b></Row>
            </Col>
            <span className="border-right"></span>
            <Col>
              <h5>Submit a ride</h5>
              <SubmitForm />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function EditRide(id) {
  globalEditRide = globalRides.filter((r)=>r.id==id)[0];
  globalEditBool = true;
}

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = !globalEditBool ? {
      ToMac: true,
      Date: "",
      Time: "",
      Loc: "",
      Lat: "",
      Lon: "",
      Conf: false,
      ShowModal: false,
      PushPins: []
    }:{
      ToMac: globalEditRide.toMac,
      Date: globalEditRide.date,
      Time: globalEditRide.time,
      Loc: globalEditRide.loc,
      Lat: globalEditRide.lat,
      Lon: globalEditRide.lon,
      Conf: false,
      ShowModal: false,
      PushPins: [{
        "location":[globalEditRide.lat, globalEditRide.lon],
        "option":{title: globalEditRide.loc, color: globalEditRide.toMac?"red":"blue"},
      }]
    };
    this.AddRide = this.AddRide.bind(this);
    this.ResetSubmit = this.ResetSubmit.bind(this);
  }

  AddRide(event) {
    event.preventDefault();
    event.stopPropagation();
    globalRides.push(new Ride(
      globalRideCount,
      this.state.ToMac,
      this.state.Date,
      this.state.Time,
      this.state.Loc,
      this.state.Lat,
      this.state.Lon,
      me.Name,
      me.Contact,
      me.Img
    ));
    SortRides();
    this.setState({ShowModal: true});
    myOfferedRides.push(globalRideCount);
    globalRideCount++;
  }

  ResetSubmit() {
    this.setState({
      ToMac: true,
      Date: "",
      Time: "",
      Loc: "",
      Lat: "",
      Lon: "",
      Conf: false,
      ShowModal: false,
      PushPins: []
    });
    if (globalEditBool) {
      globalEditBool = false;
      var idx = globalRides.indexOf(globalEditRide);
      globalRides.splice(idx, 1);
    }
  }

  UpdatePinCallback() {
    this.setState({
      PushPins: [{
        "location":[this.state.Lat, this.state.Lon],
        "option":{title: this.state.Loc, color: this.state.ToMac?"red":"blue"},
      }]
    });
  }

  GetLocationHandled(location){
    this.setState({
      Lat: location.latitude,
      Lon: location.longitude,
      PushPins: [{
        "location":[location.latitude, location.longitude],
        "option":{title: this.state.Loc, color: this.state.ToMac?"red":"blue"},
      }]
    });
  }

  render() {
    return (
      <Form onSubmit={this.AddRide}>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label column xs={3}>
              Travelling
            </Form.Label>
            <Col xs={2}>
              <Form.Check
                type="radio"
                label="From"
                name="formRadio"
                required
                defaultChecked = {this.state.ToMac ? true : false}
                onChange={(e)=>this.setState({ToMac: e.target.checked}, this.UpdatePinCallback)}
              />
              <Form.Check
                type="radio"
                label="To"
                name="formRadio"
                required
                defaultChecked = {this.state.ToMac ? false : true}
                onChange={(e)=>this.setState({ToMac: !e.target.checked}, this.UpdatePinCallback)}
              />
            </Col>
            <Col xs={5}>
              <Form.Control type="text" required value={this.state.Loc}
                placeholder={this.state.ToMac?"Starting point":"Destination"}
                onChange={(e)=>this.setState({Loc: e.target.value}, this.UpdatePinCallback)} />
            </Col>
            <Col xs={2}>
              {this.state.ToMac?"to":"from"} Mac
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} >
          <Form.Label column xs={3}>
            Departure Date
          </Form.Label>
          <Col xs={5}>
            <Form.Control type="date" required value={this.state.Date}
              onChange={(e)=>this.setState({Date: e.target.value})} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} >
          <Form.Label column xs={3}>
            Departure Time
          </Form.Label>
          <Col xs={4}>
            <Form.Control type="time" required value={this.state.Time}
              onChange={(e)=>this.setState({Time: e.target.value})} />
          </Col>
        </Form.Group>

        <div className="mapContainer">
          <ReactBingmaps 
            center={[43.261355, -79.919348]}
            zoom={10}
            bingmapKey={"AiyAg_18lKJGEiTUbjVm9WAAMAWea0C4P1kAljijIoUC9WK5daWfuw6LibQaR309"}
            getLocation={{addHandler: "click", callback:this.GetLocationHandled.bind(this)}}
            pushPins={this.state.PushPins}>
          </ReactBingmaps>
        </div>
        <br />
        {!(this.state.ToMac==null||this.state.Date==""||this.state.Time==""||
           this.state.Loc==""||this.state.Lat==""||this.state.Lon=="")?
          <Form.Group as={Row}>
            <Col xs={1}>
              <Form.Control type="checkbox" required checked={this.state.Conf}
                onChange={(e)=>this.setState({Conf: e.target.checked})} />
            </Col>
            <Form.Label column xs={11}>
              I am driving {this.state.ToMac?"from":"to"}{" "}
              {this.state.Loc}{" "}{this.state.ToMac?"to":"from"}{" "}
              Mac on {addDay(this.state.Date).toString().substr(0,7)}{" "}
              {this.state.Date.substr(-2,2)+", "+this.state.Date.substr(0,4)}{" "}
              at {tConvert(this.state.Time)}.
            </Form.Label>
          </Form.Group>
        : <span>Please ensure you have added a pushpin to the map to allow others to find
            your ride easier, and that all fields are filled in.<br /><br /></span>}
        <Form.Group as={Row}>
          <Col xs={{ span: 10, offset: 1 }}>
            <Button variant="maroon1" type="submit" active={this.state.Conf} disabled={!this.state.Conf}>
              {globalEditBool?"Edit":"Submit"}</Button>
          </Col>
        </Form.Group>
        <RideAddedModal
          show={this.state.ShowModal}
          onHide={this.ResetSubmit}
        />
      </Form>
    );
  }
}

function RideAddedModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {globalEditBool?"Ride edited":"Ride added"}
        </Modal.Title>
      </Modal.Header>
      {globalEditBool?null:
        <Modal.Body>
          <p>Thanks for submitting a ride!</p>
        </Modal.Body>}
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

class LeavingMacRides extends React.Component {
  render() {
    return (
      <div>
        <Container><br />
          <Row className="justify-content-center">
            <Col xs={7}>
              <div className="overlap"><div className="alignright"><Router>
                <NavLink exact to="/"><Button variant="maroon2">Back</Button></NavLink>
              </Router></div></div>
              <h5>Rides Leaving Mac</h5><br />
              {globalRides.filter((r)=>!r.toMac).map(
                (r) => RideEntry(this, r)
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class ReachingMacRides extends React.Component {
  render() {
    return (
      <div>
        <Container><br />
          <Row className="justify-content-center">
            <Col xs={7}>
              <div className="overlap"><div className="alignright"><Router>
                <NavLink exact to="/"><Button variant="maroon2">Back</Button></NavLink>
              </Router></div></div>
              <h5>Rides Reaching Mac</h5><br />
              {globalRides.filter((r)=>r.toMac).map(
                (r) => RideEntry(this, r)
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class MyRides extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <br />
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h5 className="alignright">My Favourited Rides</h5>
              {globalRides.filter((r)=>favRides.includes(r.id)).length>0?
                globalRides.filter((r)=>favRides.includes(r.id)).map((r) => RideEntry(this, r))
                :
                <span className="font18 alignright">No favourited rides</span>
              }
            </Col>
            <span className="border-right"></span>
            <Col>
              <h5>My Offered Rides</h5>
              {globalRides.filter((r)=>myOfferedRides.includes(r.id)).length>0?
                globalRides.filter((r)=>myOfferedRides.includes(r.id)).map((r) => MyRideEntry(this, r))
                :
                <span className="font18">No offered rides</span>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function CloneRide(that, id) {
  var r = globalRides.filter((r)=>r.id==id)[0];
  globalRides.push(new Ride(globalRideCount, r.toMac, r.date, r.time, r.loc, r.lat, r.lon, r.name, r.contact, r.img));
  SortRides();
  myOfferedRides.push(globalRideCount);
  globalRideCount++;
  that.forceUpdate();
}

function DeleteRide(that, id) {
  var r = globalRides.filter((r)=>r.id==id)[0];
  var die = globalRides.indexOf(r);
  globalRides.splice(die, 1);
  die = myOfferedRides.indexOf(id);
  myOfferedRides.splice(die, 1);
  that.forceUpdate();
}

class App extends React.Component {
  constructor(props) {
    super(props);
    globalState["Today"] = this.today();
    globalState["Now"] = this.now();
    globalSearch["Date"] = globalState["Today"];
    globalSearch["From"] = globalState["Now"];
    globalSearch["To"] = "23:59";
    SortRides();
  }

  today() {
    let date = new Date().toISOString().substr(0, 10);
    return date;
  }

  now() {
    let time = new Date().toString().substr(16,5);
    return time;
  }

  render() {
    return (
      <div><Router>
        <div className="header">
          <Row className="justify-content-center">
            <Col xs={{span:2,offset:1}} lg={{span:2,offset:1}} className="my-auto d-flex justify-content-end">
                <NavLink exact to="/" onClick={()=>{globalEditRide=null;globalEditBool=false;}}>
                  <img src={carpaal_logo} className="logo" alt="carpaal logo" />
                </NavLink>
            </Col>
            <Col xs={{span:4,offset:0}} lg={{span:3,offset:0}} className="my-auto vertmaroonline">
              <Clock format={'dddd MMMM Do, YYYY'} ticking={true} timezone={'US/Eastern'} /><br />
              <Clock format={'h:mm A'} ticking={true} timezone={'US/Eastern'} />
            </Col>
            <Col xs={{span:5,offset:0}} lg={{span:4,offset:1}} className="my-auto">
              <NavLink className="maroon" exact to="/offerride"><Button variant="maroon1">Offer a ride!</Button></NavLink>
              <NavLink className="maroon" exact to="/myrides" onClick={()=>{globalEditRide=null;globalEditBool=false;}}>
                <Button variant="maroon1">My rides</Button>
              </NavLink>
            </Col>
          </Row>
        </div>
        <Route exact path="/" exact render={(props) => <HomePage /> } />
        <Route path="/leavingmacrides" exact render={(props) => <LeavingMacRides {...props} /> } />
        <Route path="/reachingmacrides" exact render={(props) => <ReachingMacRides {...props} /> } />
        <Route path="/myrides" exact render={(props) => <MyRides {...props} /> } />
        <Route path="/offerride" exact render={(props) => <OfferRide {...props} /> } />
      </Router><br /></div>
    );
  }
}

export default App;
