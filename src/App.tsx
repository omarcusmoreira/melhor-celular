import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

const App: React.FC = () => {
  return (
      <Router>
        <AuthProvider>
          <ProductProvider >
          < AppRoutes />
          </ProductProvider>
        </AuthProvider>
      </Router>
  );
};

export default App;
