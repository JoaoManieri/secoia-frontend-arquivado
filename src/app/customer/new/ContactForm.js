import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ContactList from "./ContactList";
import ContatctDialog from "./NewContactDialog";

export default function ContactForm({ cliente }) {
  const [rows, setRows] = React.useState([]);

  function createData(nome, cargo, email) {
    return { nome, cargo, email };
  }

  const addNewContact = (nome, cargo, email) => {
    const newRows = [...rows, createData(nome, cargo, email)];
    setRows(newRows);
  };

  React.useEffect(() => {
    setRows([
      ...rows,
      createData(cliente.nome, cliente.telefone, cliente.email),
    ]);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informações de contato
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <ContactList rows={rows} />
          <ContatctDialog addNewContact={addNewContact} />
        </Grid>
      </Grid>
      <hr></hr>
      <Typography variant="h6" gutterBottom>
        Informações de Endereço
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <ContactList rows={rows} />
          <ContatctDialog addNewContact={addNewContact} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
