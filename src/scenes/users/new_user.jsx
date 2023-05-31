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

const New_user = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [nit, setNit] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const navigate = useNavigate();
  
    function handleSubmit(event){
      event.preventDefault();
      axios.post('http://localhost:8081/create/usarios', {nit, nombre, correo, telefono, direccion})
      .then(res => {
        console.log(res);
        navigate("/users");
      }).catch(err => console.log(err));
    }
    
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const handleFormSubmit = (values) => {
      console.log(values);
    };
  
    return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="NUEVO USUARIO" subtitle="Bienvenido al modulo de usuarios" />
  
          <Box>
            <Button
              href="/users"
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
                  label="NIT"
                  type="text" 
                  variant="filled"
                  onChange={e => setNit(e.target.value)}
                  name="nit"
                  sx={{ gridColumn: "span 2" }} />
                  <TextField 
                  fullWidth 
                  id="filled-basic"  
                  label="Nombre"
                  type="text" 
                  variant="filled"
                  onChange={e => setNombre(e.target.value)}
                  name="nombre"
                  sx={{ gridColumn: "span 2" }} />
                  <TextField 
                  fullWidth 
                  id="filled-basic" 
                  label="Correo"
                  type="text" 
                  variant="filled"
                  onChange={e => setCorreo(e.target.value)}
                  name="correo"
                  sx={{ gridColumn: "span 2" }} />
                  <TextField 
                  fullWidth 
                  id="filled-basic" 
                  label="Telefono"
                  type="text" 
                  variant="filled"
                  onChange={e => setTelefono(e.target.value)}
                  name="telefono"
                  sx={{ gridColumn: "span 2" }} />
                  <TextField 
                  fullWidth 
                  id="filled-basic" 
                  label="Direccion"
                  type="text" 
                  variant="filled"
                  onChange={e => setDireccion(e.target.value)}
                  name="direccion"
                  sx={{ gridColumn: "span 4" }} />
                
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  CREAR NUEVO USUARIOS
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
export default New_user;
