import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Add, Delete, Edit, PictureAsPdf, TableView } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { CSVLink } from 'react-csv'

const Inventory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Inventory, setInventory] = useState([]);

  const componentPDF = useRef();

  useEffect(() => {
    axios.get('http://localhost:8081/get/inventario')
    .then(res => setInventory(res.data))
    .catch(err => console.log(err));
  }, [])

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Inventario",
    onAfterPrint: ()=> alert("Documento guardado en PDF")
  });

  const handleDelete = async(id) => {
    try {
      await axios.delete('http://localhost:8081/delete/inventario/' + id)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="INVENTARIO" subtitle="Bienvenido al modulo de inventario" />

        <Box>
          <Button
            href="/new_inventory"
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
            Nuevo Inventario
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
                <TableCell>Codigo</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Precio de compra</TableCell>
                <TableCell>Bodega</TableCell>
                <TableCell>Existencia</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Inventory.map((row) => (
                <TableRow
                  key={row.nombre}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.id_inventario}</TableCell>
                    <TableCell>{row.codigo}</TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell>{row.preciodecompra}</TableCell>
                    <TableCell>{row.bodega}</TableCell>
                    <TableCell>{row.existencia}</TableCell>
                    <TableCell>
                      <Button
                        href= {`/edit_inventory/${row.id_inventario}`}
                        sx={{
                          backgroundColor: colors.greenAccent[700],
                          color: colors.grey[100],
                          fontSize: "12px",
                          fontWeight: "bold",
                          margin: "5px"
                        }
                        }><Edit/></Button>
                        <Button
                        onClick={e => handleDelete(row.id_inventario)}
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
          }><TableView/> <CSVLink data={Inventory} filename="inventario" style={{color: "#fff", textDecoration: "none"}}>Exportar CSV</CSVLink></Button>
      </Box>
    </Box>
  );
};

export default Inventory;
