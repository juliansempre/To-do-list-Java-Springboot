import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
    }

    componentDidMount() {
        fetch('/api/v1/tasks')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }

    async remove(id) {
        await fetch(`/api/v1/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }

    render() {
        const {clients} = this.state;

        const clientList = clients.map(client => {
            return <tr key={client.id}>
                <td>{client.title}</td>
                <td>{client.description}</td>
                <td>{client.deadLine}</td>
                    <ButtonGroup>
                        <Button  color="primary" tag={Link} to={"/api/v1/tasks/" + client.id}>Editar</Button>
                        <Button  color="danger" onClick={() => this.remove(client.id)}>Apagar</Button>
                    </ButtonGroup>
                
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div classtitle="float-right">
                        <Button color="success" tag={Link} to="/api/v1/tasks/new" >Adicionar Tarefa</Button>
                    </div>
                    <h3>Tarefas</h3>
                    <Table classtitle="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Tarefa</th>
                            <th width="30%">Descrição</th>
                            <th width="30%">Data</th>
                            <th width="40%">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ClientList;