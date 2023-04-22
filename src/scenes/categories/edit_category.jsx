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
import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect} from 'react';

const Edit_Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {id} = useParams();
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    axios.put('http://localhost:8081/update/categorias/'+id, {descripcion})
    .then(res => {
      console.log(res);
      navigate("/categories");
    }).catch(err => console.log(err));
  }
  
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="EDITAR CATEGORIA" subtitle="Bienvenido al modulo de categorias" />

        <Box>
          <Button
            href="/categories"
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
                label="Descripcion"
                type="text" 
                variant="filled"
                onChange={e => setDescripcion(e.target.value)}
                name="nit"
                sx={{ gridColumn: "span 4" }} />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                EDITAR CATEGORIA
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

export default Edit_Category;
