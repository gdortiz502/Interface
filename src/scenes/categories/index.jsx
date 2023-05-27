import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Add, Delete, Edit, PictureAsPdf, TableView } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { useReactToPrint } from "react-to-print";
import { CSVLink } from 'react-csv'

const Categories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [clients, setClient] = useState([])

  const componentPDF = useRef();

  useEffect(() => {
    axios.get('http://localhost:8081/get/categorias')
    .then(res => setClient(res.data))
    .catch(err => console.log(err));
  }, [])

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Categorias",
    onAfterPrint: ()=> alert("Documento guardado en PDF")
  });

  const handleDelete = async(id) => {
    try {
      await axios.delete('http://localhost:8081/delete/categorias/' + id)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CATEGORIAS" subtitle="Bienvenido al modulo de categorias" />

        <Box>
          <Button
            href="/new_category"
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
            Nueva Categoria
          </Button>
        </Box>
      </Box>
      <Box>
        <div ref={componentPDF} style={{width: '100%', '.texto':{color: "#000000"}}}>
          <TableContainer>
            <Table sx={{minWidth:650}} aria-label="a dense table" id="tableExport">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Descripcion</TableCell>
                  <TableCell>Estatus</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((row) => (
                  <TableRow
                    key={row.nombre}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell className="texto">{row.id_categoria}</TableCell>
                      <TableCell className="texto">{row.descripcion}</TableCell>
                      <TableCell>
                        {row.estatus == 1 ? 'Activo' : 'Inactivo'}
                      </TableCell>
                      <TableCell>
                        <Button
                          href= {`/edit_category/${row.id_categoria}`}
                          sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            fontSize: "12px",
                            fontWeight: "bold",
                            margin: "5px"
                          }
                          }><Edit/></Button>
                          <Button
                          onClick={e => handleDelete(row.id_categoria)}
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
          }><TableView/> <CSVLink data={clients} filename="categorias" style={{color: "#fff", textDecoration: "none"}}>Exportar CSV</CSVLink></Button>
      </Box>
    </Box>
  );
};

export default Categories;
