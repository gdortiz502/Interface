import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Add, Delete, Edit, PictureAsPdf, TableView } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { CSVLink } from 'react-csv'

const Shopping = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Shopping, setShopping] = useState([]);

  const componentPDF = useRef();

  useEffect(() => {
    axios.get('http://localhost:8081/get/compras')
    .then(res => setShopping(res.data))
    .catch(err => console.log(err));
  }, [])

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Compras",
    onAfterPrint: ()=> alert("Documento guardado en PDF")
  });

  const handleDelete = async(id) => {
    try {
      await axios.delete('http://localhost:8081/delete/compras/' + id)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SALIDA DE MERCADERIA" subtitle="Bienvenido al modulo de salida de mercaderia" />

        <Box>
          <Button
            href="/new_shopping"
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
            Nueva Salida
          </Button>
        </Box>
      </Box>
      <Box>
        <div ref={componentPDF}>
        <TableContainer>
          <Table sx={{minWidth:650}} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>No DOCUMENTO</TableCell>
                <TableCell>NOMBRE DE CLIENTE</TableCell>
                <TableCell>DESCRIPCION</TableCell>
                <TableCell>PRECIO</TableCell>
                <TableCell>CANTIDAD</TableCell>
                <TableCell>BODEGA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Shopping.map((row) => (
                <TableRow
                  key={row.nombre}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.id_shopping}</TableCell>
                    <TableCell>{row.documento}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell>{row.precio}</TableCell>
                    <TableCell>{row.cantidad}</TableCell>
                    <TableCell>{row.bodega}</TableCell>                    
                    <TableCell>
                      <Button
                        href= {`/edit_shopping/${row.id_shopping}`}
                        sx={{
                          backgroundColor: colors.greenAccent[700],
                          color: colors.grey[100],
                          fontSize: "12px",
                          fontWeight: "bold",
                          margin: "5px"
                        }
                        }><Edit/></Button>
                        <Button
                        onClick={e => handleDelete(row.id_shopping)}
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
          }><TableView/> <CSVLink data={Shopping} filename="Salida de inventario" style={{color: "#fff", textDecoration: "none"}}>Exportar CSV</CSVLink></Button>
      </Box>
    </Box>
  );
};

export default Shopping;
