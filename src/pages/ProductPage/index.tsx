import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { ProductTable } from "./ProductTable";
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AddIcon from '@mui/icons-material/Add';

export const ProductPage: React.FC = () => {
  const { products, loading, deleteProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/form");
  };

  const handleEdit = (product: any) => {
    navigate(`/form?id=${product.id}`);
  };

  const handleDelete = async (product: any) => {
    await deleteProduct(product.id);
  };

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-medium">Produtos</h2>
        <button
          onClick={handleAdd}
          className="flex h-[40px] items-center border-[1px] border-[#1D1D1D] font-bold text-[14px] px-4 py-2 rounded shadow bg-[#DAE3ED] text-[#1D1D1D] hover:bg-[#1D1D1D] hover:text-white"
        >
          <AddIcon className="mr-[-4px]" />
          <SmartphoneIcon className="mr-2" />
          ADICIONAR
        </button>
      </div>
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};
