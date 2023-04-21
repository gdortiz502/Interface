import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [clients, setClient] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/get/clientes')
    .then(res => setClient(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleDelete = async(id) => {
    try {
      await axios.delete('http://localhost:8081/delete/clientes/' + id)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CLIENTES" subtitle="Bienvenido al modulo de clientes" />

        <Box>
          <Button
            href="/new_client"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }
            }
          >
            <Add sx={{ mr: "10px" }} />
            Nuevo Cliente
          </Button>
        </Box>
      </Box>
      <Box>
        <TableContainer>
          <Table sx={{minWidth:650}} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NIT</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Direccion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((row) => (
                <TableRow
                  key={row.nombre}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.id_cliente}</TableCell>
                    <TableCell>{row.nit}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.correo}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
                    <TableCell>{row.direccion}</TableCell>
                    <TableCell>
                      <Button
                        href= {`/edit_client/${row.id_cliente}`}
                        sx={{
                          backgroundColor: colors.greenAccent[700],
                          color: colors.grey[100],
                          fontSize: "12px",
                          fontWeight: "bold",
                          margin: "5px"
                        }
                        }><Edit/></Button>
                        <Button
                        onClick={e => handleDelete(row.id_cliente)}
                        sx={{
                          backgroundColor: colors.redAccent[700],
                          color: colors.grey[100],
                          fontSize: "12px",
                          fontWeight: "bold",
                        }
                        }><Delete/></Button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Clients;
