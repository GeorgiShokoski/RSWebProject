import React,{Component} from 'react';
import {Table} from 'react-bootstrap'

import {Button, ButtonToolbar} from 'react-bootstrap';
import { AddDepModel } from './AddDepModel';
import { EditDepModal } from './EditDepModal';
export class Team extends Component{
    constructor(props){
        super(props);
        this.state={teams:[], addModalShow:false, editModalShow:false};
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'team')
        .then(reponse=>reponse.json())
        .then(data =>{
            this.setState({teams:data})
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteTeam(teamid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'team/'+teamid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {teams, teamid, teamname} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className='mt-4' striped bordered hover-size='sm'>
                    <thead>
                        <tr>
                        <th>TeamID</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>World Ranking</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team=>
                            <tr key={team.TeamID}>
                                <td>{team.TeamID}</td>
                                <td>{team.Name}</td>
                                <td>{team.Country}</td>
                                <td>{team.WorldRanking}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,teamid:team.TeamID,teamname:team.Name})}>
                                            Edit
                                        </Button>

                                        &nbsp;
                                        &nbsp;

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteTeam(team.TeamID)}>
                                            Delete
                                        </Button>

                                        <EditDepModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        teamid={teamid}
                                        teamname={teamname}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary' 
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Team</Button>

                    <AddDepModel show={this.state.addModalShow}
                    onHide={addModalClose}></AddDepModel>
                </ButtonToolbar>
                
            </div>
        )
    }
}