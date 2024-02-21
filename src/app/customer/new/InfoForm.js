
import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import clienteInstance from "@/helper/axios-instance";
import LoadingComponent from "@/util/Loading";
import InputMask from 'react-input-mask'; // Importando a biblioteca para máscara de CNPJ
import { cnpj } from 'cpf-cnpj-validator'; // Importando a biblioteca para validação de CNPJ

export default function AddressForm() {
  const [cnpjValue, setCnpjValue] = useState("");
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValidCnpj, setIsValidCnpj] = useState(true); // Estado para indicar se o CNPJ é válido ou não
  const cnpjInputRef = useRef(null); // Ref para o input de CNPJ
  const [valido, setValido] = useState(false);
  const [razaoSocial, setRazaoSocial] = useState('');
  const [razaoSocialValida, setRazaoSocialValida] = useState(true);
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [nomeFantasiaValido, setNomeFantasiaValido] = useState(true);
  const [areaAtuacao, setAreaAtuacao] = useState('');
  const [areaAtuacaoValida, setAreaAtuacaoValida] = useState(true);
  const [usuarioCriador, setUsuarioCriador] = useState('');
  const [usuarioCriadorValido, setUsuarioCriadorValido] = useState(true);
  //const i = false
  const handleChange = (event) => {
 
    setCnpjValue(event.target.value);
  };

  const handleBlur = async () => {
   
    checkCnpjStatus();
    setLoading(true);
    try {
      if (cnpjValue.trim() === "") {
        setError("CNPJ não pode estar vazio");
        setLoading(false);
        return;
      }
  
      const response = await clienteInstance.get(`externo/busca/${cnpjValue}`);
      setClientData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
     // Chama a função checkCnpjStatus quando o campo perde o foco
  };

  const verificacaoAreaAtuacao = () => {
    if (!areaAtuacao) {
      setAreaAtuacaoValida(false);
    } else {
      setAreaAtuacaoValida(true);
    }
  };

  const verificacaoNomeFantasia = () => {
    if (!nomeFantasia) {
      setNomeFantasiaValido(false);
    } else {
      setNomeFantasiaValido(true);
    }
  };

  const verificacaoUsuarioCriador = () => {
    if (!usuarioCriador) {
      setUsuarioCriadorValido(false);
    } else {
      setUsuarioCriadorValido(true);
    }
  };

  const verificacaoElementos = () => {
    if (!razaoSocial) {
      setRazaoSocialValida(false);
    } else {
      setRazaoSocialValida(true);
    }
  };

  const handleCnpjChange = (event) => {
    const newCnpjValue = event.target.value;
    setCnpjValue(newCnpjValue);
  };

  const handleValidateCnpj = () => {
    setIsValidCnpj(cnpj.isValid(cnpjValue)); // Validando o CNPJ quando a validação é ativada
  };

  const checkCnpjStatus = () => {
    if (cnpjValue.trim() === "") {
      setValido(true)
      console.log("O campo CNPJ está vazio.");
    } else if (cnpj.isValid(cnpjValue)) {
      setValido(false)
      console.log("O campo CNPJ está completo.");
      setIsValidCnpj(true);
    } else {
      setValido(true)
      console.log("O campo CNPJ está incompleto.");
      setIsValidCnpj(false);
    }
  };

  return (
    <React.Fragment>
      {/* {loading ? <LoadingComponent /> : null} */}
      <Typography variant="h6" gutterBottom>
        Informações do cliente
      </Typography>

      <Grid item xs={12}>
        <InputMask
          mask="99.999.999/9999-99"
          value={cnpjValue}
          onChange={handleCnpjChange}
          onBlur={handleBlur}
          // Adicionando a ref ao input de CNPJ
          ref={cnpjInputRef}
        >
          {(inputProps) => (
            <TextField
              error={valido}
              {...inputProps}
              required
              id="cnpj"
              name="cnpj"
              label="CNPJ"
              fullWidth
              autoComplete="cnpj"
              variant="standard"
              style={{ marginBottom: '20px', borderColor: isValidCnpj ? 'green' : 'red' }} // Estilo da borda baseado na validade do CNPJ
              InputLabelProps={{ }} // Estilo diretamente na label
              InputProps={{ style: { 
                borderRadius: '5px',
               
              }}} // Estilo diretamente no input
            />
          )}
        </InputMask>
       

    
      </Grid>
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
        onBlur={verificacaoNomeFantasia}
        value={nomeFantasia}
        onChange={(e) => setNomeFantasia(e.target.value)}
        error={!nomeFantasiaValido}
        helperText={!nomeFantasiaValido && "Por favor, preencha o nome fantasia"}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="lastName"
        name="lastName"
        label="Razão social"
        fullWidth
        onBlur={verificacaoElementos}
        value={razaoSocial}
        onChange={(e) => setRazaoSocial(e.target.value)}
        autoComplete="family-name"
        variant="standard"
        error={!razaoSocialValida}
        helperText={!razaoSocialValida && "Por favor, preencha a razão social"}
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
        onBlur={verificacaoAreaAtuacao}
        value={areaAtuacao}
        onChange={(e) => setAreaAtuacao(e.target.value)}
        error={!areaAtuacaoValida}
        helperText={!areaAtuacaoValida && "Por favor, preencha a área de atuação"}
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
            onBlur={verificacaoUsuarioCriador}
            value={usuarioCriador}
            onChange={(e) => setUsuarioCriador(e.target.value)}
            error={!usuarioCriadorValido}
            helperText={!usuarioCriadorValido && "Por favor, preencha o usuário criador"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
