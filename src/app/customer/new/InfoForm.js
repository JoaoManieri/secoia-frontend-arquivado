import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function AddressForm() {
  const [cnpj, setCnpj] = useState('');

  
  const handleChange = (event) => {
    setCnpj(event.target.value);
  };


  const handleBlur = async () => {
    try {
      const response = await axios.get(`/api/v1/cnpj/${cnpj}`);
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informações do cliente
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nome fantasia"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Razão social"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="cnpj"
            name="cnpj"
            label="CNPJ"
            fullWidth
            autoComplete="cnpj"
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Simples nacional ativo"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Área de atuação"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Status da empresa"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            
            id="zip"
            name="zip"
            label="gestor da conta"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
        
            id="country"
            name="country"
            label="Analista da conta"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
         
            id="country"
            name="country"
            label="Fator competitivo"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Usuário criador"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}