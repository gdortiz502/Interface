import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const New_product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [preciodecompra, setPreciodecompra] = useState('');
  const [preciodeventa, setPreciodeventa] = useState('');
  const [categoria, setCategoria] = useState('');
  const navigate = useNavigate();

 function handleSubmit(event){
    event.preventDefault();
    axios.post('http://localhost:8081/create/productos/', {codigo, descripcion, preciodecompra, preciodeventa, categoria})
    .then(res => {
      console.log(res);
      navigate("/products");
    }).catch(err => console.log(err));
  }
  
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="NUEVO PRODUCTO" subtitle="Bienvenido al modulo de productos" />

        <Box>
          <Button
            href="/products"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }
            }
          >
            <ArrowBack sx={{ mr: "10px" }} />
            REGRESAR
          </Button>
        </Box>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
          <form onSubmit={handleSubmit} method="post">
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField 
                fullWidth 
                id="filled-basic" 
                label="Codigo"
                type="text" 
                variant="filled"
                onChange={e => setCodigo(e.target.value)}
                name="codigo"
                sx={{ gridColumn: "span 2" }} />
                <TextField 
                fullWidth 
                id="filled-basic"  
                label="Descripcion"
                type="text" 
                variant="filled"
                onChange={e => setDescripcion(e.target.value)}
                name="descripcion"
                sx={{ gridColumn: "span 2" }} />
                <TextField 
                fullWidth 
                id="filled-basic" 
                label="precio de compra"
                type="text" 
                variant="filled"
                onChange={e => setPreciodecompra(e.target.value)}
                name="precio de compra"
                sx={{ gridColumn: "span 2" }} />
                <TextField 
                fullWidth 
                id="filled-basic" 
                label="precio de venta"
                type="text" 
                variant="filled"
                onChange={e => setPreciodeventa(e.target.value)}
                name="precio de venta"
                sx={{ gridColumn: "span 2" }} />
                <TextField 
                fullWidth 
                id="filled-basic" 
                label="Categoria"
                type="text" 
                variant="filled"
                onChange={e => setCategoria(e.target.value)}
                name="Categoria"
                sx={{ gridColumn: "span 4" }} />
              
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                CREAR NUEVO PRODUCTO
              </Button>
            </Box>
          </form>
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Requerido"),
  lastName: yup.string().required("Requerido"),
  email: yup.string().email("Correo invalido").required("Requerido"),
  contact: yup
    .string()
    .matches(phoneRegExp, "El numero de telefono no es valido")
    .required("Requerido"),
  address1: yup.string().required("Requerido"),
  address2: yup.string().required("Requerido"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};
export default New_product;
