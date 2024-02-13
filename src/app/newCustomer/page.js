import * as React from 'react';

export default function Page() {
    return (
    <React.Fragment>
        <h1>Adicionar Novo Cliente</h1>
        <label for="name">Nome:</label><br/>
        <input type="text" id="name" name="name" required/><br/><br/>
        
        <label for="email">E-mail:</label><br/>
        <input type="email" id="email" name="email" required/><br/><br/>
        
        <label for="phoneNumber">Telefone:</label><br/>
        <input type="text" id="phoneNumber" name="phoneNumber" required/><br/><br/>
        
        <button type="submit">Adicionar Cliente</button>
    </React.Fragment>
    )
  }