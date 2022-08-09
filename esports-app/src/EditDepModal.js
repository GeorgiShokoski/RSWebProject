import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class EditDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventdefault();
        fetch(process.env.REACT_APP_API+'team',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                TeamID:event.target.TeamID.value,
                Name:event.target.Name.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{alert('Failed')})
    }

    render(){
        return(
            <div className='container'>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header clooseButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Edit Team
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col sm={6}>
                                    <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="TeamID">
                                            <Form.Label>TeamID</Form.Label>
                                            <Form.Control type="text" name="TeamID" required
                                            disabled
                                            defaultValue={this.props.teamid}
                                            placeholder="TeamID"/>
                                        </Form.Group>
                                        <Form.Group controlId="Name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name="Name" required
                                            defaultValue={this.props.teamname}
                                            placeholder="Name"/>
                                        </Form.Group>

                                        &nbsp;
                                        &nbsp;
                                        
                                        <Form.Group>
                                            <Button variant = "primary" type="submit">
                                                Update Team
                                            </Button>
                                        </Form.Group>
                                    </Form>
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