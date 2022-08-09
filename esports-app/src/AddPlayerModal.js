import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddPlayerModal extends Component{
    constructor(props){
        super(props);
        this.state={teams:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'team')
        .then(response=>response.json())
        .then(data=>{
            this.setState({teams:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'player',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:event.target.Name.value,
                Surname:event.target.Surname.value,
                Rating:event.target.Rating.value,
                Age:event.target.Age.value,
                Country:event.target.Country.value,
                Team:event.target.Team.value,
                PhotoFileName:this.photofilename

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'player/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Player
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="Name" required 
                        placeholder="Name"/>
                    </Form.Group>

                    <Form.Group controlId="Team">
                        <Form.Label>Team</Form.Label>
                        <Form.Control as="select">
                        {this.state.teams.map(team=>
                            <option key={team.TeamID}>{team.Name}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Surname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" name="Surname" required 
                        placeholder="Surname"/>
                    </Form.Group>

                    <Form.Group controlId="Rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control type="text" name="Rating" required 
                        placeholder="Rating"/>
                    </Form.Group>

                    <Form.Group controlId="Age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="text" name="Age" required 
                        placeholder="Age"/>
                    </Form.Group>

                    <Form.Group controlId="Country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="Country" required 
                        placeholder="Country"/>
                    </Form.Group>

                    &nbsp;
                    &nbsp;

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Player
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}