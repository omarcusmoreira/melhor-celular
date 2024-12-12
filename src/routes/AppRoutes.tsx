import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { ProductPage } from "../pages/ProductPage";
import { ProductForm } from "../pages/ProductForm"

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductPage />} />
        <Route path="/form" element={<ProductForm />} />
      </Route>
    </Routes>
  );
};
