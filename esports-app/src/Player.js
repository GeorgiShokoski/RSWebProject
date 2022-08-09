import React,{Component} from 'react';
import {Table} from 'react-bootstrap'

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddPlayerModal } from './AddPlayerModal';
import { EditPlayerModal } from './EditPlayerModal';
export class Player extends Component{
    constructor(props){
        super(props);
        this.state={players:[], addModalShow:false, editModalShow:false};
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'player')
        .then(reponse=>reponse.json())
        .then(data =>{
            this.setState({players:data})
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletePlayer(playerid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'player/'+playerid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {players, playerid, playername, playersurname, playerrating, playerage, playercountry,playerteam, photofilename} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table classname='mt-4' striped bordered hover-size='sm'>
                    <thead>
                        <th>PlayerID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Rating</th>
                        <th>Age</th>
                        <th>Country</th>
                        <th>Team</th>
                        <th>Options</th>
                    </thead>
                    <tbody>
                        {players.map(player=>
                            <tr key={player.PlayerID}>
                                <td>{player.PlayerID}</td>
                                <td>{player.Name}</td>
                                <td>{player.Surname}</td>
                                <td>{player.Rating}</td>
                                <td>{player.Age}</td>
                                <td>{player.Country}</td>
                                <td>{player.Team}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                        playerid:player.PlayerID,playername:player.Name,playersurname:player.Surname,
                                        playerrating:player.Rating,playerage:player.Age, playercountry:player.Country,
                                        playerteam:player.Team, photofilename: player.PhotoFileName})}>
                                            Edit
                                        </Button>

                                        &nbsp;
                                        &nbsp;

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deletePlayer(player.PlayerID)}>
                                            Delete
                                        </Button>

                                        <EditPlayerModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        playerid={playerid}
                                        playername={playername}
                                        playersurname={playersurname}
                                        playerrating={playerrating}
                                        playerage={playerage}
                                        playercountry={playercountry}
                                        playerteam={playerteam}
                                        photofilename={photofilename}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary' 
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Player</Button>

                    <AddPlayerModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddPlayerModal>
                </ButtonToolbar>
                
            </div>
        )
    }
}