import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clienteInstance from "@/helper/axios-instance";

export default function InfoForm({ onDataCliente }) {
  const [cnpj, setCnpj] = useState("01811547000130");
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const handleChange = (event) => {
    setCnpj(event.target.value);
  };

  const handleBlur = async () => {
    setLoading(true);
    try {
      const response = await clienteInstance.get(`externo/busca/${cnpj}`);   
      setClientData(response.data);
      onDataCliente(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
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
            type="text"
            required
            id="nomeFantasia"
            name="nomeFantasia"
            label="Nome fantasia"
            fullWidth
            autoComplete="nome pelo qual conhecemos ex. McDonnald's"
            variant="standard"
            value={clientData ? clientData.fantasia : ""}
            onChange={(e) => setClientData({...clientData, fantasia: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="text"
            required
            id="razaoSocial"
            name="razaoSocial"
            label="Razão social"
            fullWidth
            autoComplete="Nome de registro ex Arcos Dourados"
            variant="standard"
            value={clientData ? clientData.nome : ""}
            onChange={(e) => setClientData({...clientData, fantasia: e.target.value})}
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
            value={cnpj}
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
            value={clientData && clientData.atividade_principal ? clientData.atividade_principal[0].text : ""}
            onChange={(e) => {
              const newAtividadePrincipal = clientData.atividade_principal.map((item, index) => {
                if (index === 0) {
                  return {...item, text: e.target.value};
                }
                return item;
              });
            
              setClientData({...clientData, atividade_principal: newAtividadePrincipal});
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="Status da empresa"
            fullWidth
            variant="standard"
            value={clientData ? clientData.fantasia : ""}
            onChange={(e) => setClientData({...clientData, fantasia: e.target.value})}
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
