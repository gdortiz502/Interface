import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Add, Delete, Edit, PictureAsPdf, TableView } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { useReactToPrint } from "react-to-print";
import { CSVLink } from 'react-csv'

const Providers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [proveedores, setProveedor] = useState([])

  const componentPDF = useRef();

  useEffect(() => {
    axios.get('http://localhost:8081/get/proveedores')
    .then(res => setProveedor(res.data))
    .catch(err => console.log(err));
  }, [])

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Clientes",
    onAfterPrint: ()=> alert("Documento guardado en PDF")
  });

  const handleDelete = async(id) => {
    try {
      await axios.delete('http://localhost:8081/delete/proveedores/' + id)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROVEEDORES" subtitle="Bienvenido al modulo de clientes" />

        <Box>
          <Button
            href="/new_provider"
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
            Nuevo Proveedor
          </Button>
        </Box>
      </Box>
      <Box>
        <div ref={ componentPDF } style={{width: '100%', '.texto':{color: "#000000"}}}>
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
                {proveedores.map((row) => (
                  <TableRow
                    key={row.nombre}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>{row.id_proveedor}</TableCell>
                      <TableCell>{row.nit}</TableCell>
                      <TableCell>{row.nombre}</TableCell>
                      <TableCell>{row.correo}</TableCell>
                      <TableCell>{row.telefono}</TableCell>
                      <TableCell>{row.direccion}</TableCell>
                      <TableCell>
                        <Button
                          href= {`/edit_provider/${row.id_proveedor}`}
                          sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            fontSize: "12px",
                            fontWeight: "bold",
                            margin: "5px"
                          }
                          }><Edit/></Button>
                          <Button
                          onClick={e => handleDelete(row.id_proveedor)}
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
        </div>
        <Button
          onClick={ generatePDF }
          sx={{
            backgroundColor: colors.redAccent[700],
            color: colors.grey[100],
            fontSize: "12px",
            fontWeight: "bold",
          }
          }><PictureAsPdf/> Export PDF</Button>
          
          <Button
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
            fontSize: "12px",
            fontWeight: "bold",
          }
          }><TableView/> <CSVLink data={proveedores} filename="proveedores" style={{color: "#fff", textDecoration: "none"}}>Exportar CSV</CSVLink></Button>
        </Box>
    </Box>
  );
};

export default Providers;
