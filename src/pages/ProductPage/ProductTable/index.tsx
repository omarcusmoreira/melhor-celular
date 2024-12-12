import React, { useState } from "react"
import { ProductData } from "../../../types"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmationDialog } from "../ConfirmationDialog";

const TABLE_HEADER_STYLES = "py-4 px-4 text-left font-medium text-[14px]";
const TABLE_ROW_STYLES = "py-3 px-4 text-[14px] font-medium";
const TABLE_BORDER_STYLES = "border-b border-[#1D1D1D]";

type ProductTableProps = {
  products: ProductData[]
  onEdit: (product: ProductData) => void
  onDelete: (product: ProductData) => void
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete }) => {
  const headers = [
    { key: 'code', label: 'Código' },
    { key: 'model', label: 'Modelo' },
    { key: 'price', label: 'Preço' },
    { key: 'brand', label: 'Marca' },
    { key: 'color', label: 'Cor' }
  ];
  const [productToDelete, setProductToDelete] = useState<ProductData | null>(null);
  const handleDeleteClick = (product: ProductData) => {
    setProductToDelete(product);
  };
  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete);
      setProductToDelete(null);
    }
  };
  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  return (
            <>
            <div className="border border-[#1D1D1D] rounded-lg overflow-hidden">
                <table className="w-full bg-white">
                <thead>
                    <tr className={TABLE_BORDER_STYLES}>
                    {headers.map(header => (
                        <th 
                        key={header.key} 
                        className={TABLE_HEADER_STYLES}
                        >
                        {header.label}
                        </th>
                    ))}
                    <th className={`${TABLE_HEADER_STYLES} text-red text-center w-48`}></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                    <tr key={product.code} className={TABLE_BORDER_STYLES}>
                        {headers.map(header => (
                        <td 
                            key={header.key} 
                            className={TABLE_ROW_STYLES}
                        >
                            {product[header.key as keyof ProductData]}
                        </td>
                        ))}
                        <td className={TABLE_ROW_STYLES}>
                        <div className="flex items-center justify-end gap-6 mr-4">
                            <button
                            onClick={() => onEdit(product)}
                            className="text-[#1D1D1D] hover:text-gray-900"
                            >
                            <EditIcon className="h-4 w-4" />
                            </button>
                            <button
                            onClick={() => handleDeleteClick(product)}
                            className="text-[#1D1D1D] hover:text-gray-900"
                            >
                            <DeleteIcon className="h-4 w-4" />
                            </button>
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <ConfirmationDialog
            open={!!productToDelete}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            title="Confirmar Exclusão"
            message={`Tem certeza que deseja excluir o produto ${productToDelete?.model ?? ''}?`}
        />
    </>
  )
}