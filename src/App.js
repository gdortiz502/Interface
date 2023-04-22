import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Clients from "./scenes/clients";
import New_Client from "./scenes/clients/new_client";
import Providers from "./scenes/providers";
import New_Provider from "./scenes/providers/new_provider";
import Products from "./scenes/products";
import New_product from "./scenes/products/new_product";
import { Inventory } from "@mui/icons-material";
import New_inventory from "./scenes/inventory/new_inventory";
import Inventario from "./scenes/inventory";
import Bodega from "./scenes/warehouse";
import New_warehouse from "./scenes/warehouse/new_warehouse";
import Usuarios from "./scenes/users";
import New_user from "./scenes/users/new_user";
import Shopping from "./scenes/shopping";
import New_shopping from "./scenes/shopping/new_shopping";
import Edit_Client from "./scenes/clients/edit_client";
import Categories from "./scenes/categories";
import New_Category from "./scenes/categories/new_category";
import Edit_Category from "./scenes/categories/edit_category";
import Edit_Provider from "./scenes/providers/edit_provider";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/new_client" element={<New_Client />} />
              <Route path="/edit_client/:id" element={<Edit_Client />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/new_category" element={<New_Category />} />
              <Route path="/edit_category/:id" element={<Edit_Category />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/new_provider" element={<New_Provider />} />
              <Route path="/edit_provider/:id" element={<Edit_Provider />} />
              <Route path="/products" element={<Products />} />
              <Route path="/new_product" element={<New_product />} />
              <Route path="/inventory" element={<Inventario />} />
              <Route path="/new_inventory" element={<New_inventory />} />
              <Route path="/warehouse" element={<Bodega />} />
              <Route path="/new_warehouse" element={<New_warehouse />} />
              <Route path="/users" element={<Usuarios />} />
              <Route path="/new_user" element={<New_user />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/new_shopping" element={<New_shopping />} />
              <Route path="/form" element={<Form />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
