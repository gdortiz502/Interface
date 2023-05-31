import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Add, Delete, Edit, PictureAsPdf, TableView } from "@mui/icons-material";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { CSVLink } from 'react-csv'


const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [products, setProducts] = useState([]);

  const componentPDF = useRef();

  useEffect(() => {
    axios.get('http://localhost:8081/get/productos')
    .then(res => setProducts(res.data))
    .catch(err => console.log(err));
  }, [])

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Productos",
    onAfterPrint: ()=> alert("Documento guardado en PDF")
  });

  const handleDelete = async(id) => {
    try {
      await axios.delete('http://localhost:8081/delete/productos/' + id)
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PRODUCTOS" subtitle="Bienvenido al modulo de productos" />

        <Box>
          <Button
            href="/new_product"
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
            Nuevo producto
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
                <TableCell>Precio de venta</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((row) => (
                <TableRow
                  key={row.nombre}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{row.id_producto}</TableCell>
                    <TableCell>{row.codigo}</TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell>{row.preciodecompra}</TableCell>
                    <TableCell>{row.preciodeventa}</TableCell>
                    <TableCell>{row.categoria}</TableCell>
                    <TableCell>
                      <Button
                        href= {`/edit_product/${row.id_producto}`}
                        sx={{
                          backgroundColor: colors.greenAccent[700],
                          color: colors.grey[100],
                          fontSize: "12px",
                          fontWeight: "bold",
                          margin: "5px"
                        }
                        }><Edit/></Button>
                        <Button
                        onClick={e => handleDelete(row.id_producto)}
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
          }><TableView/> <CSVLink data={products} filename="Producto" style={{color: "#fff", textDecoration: "none"}}>Exportar CSV</CSVLink></Button>
      </Box>
    </Box>
  );
};
export default Products;
