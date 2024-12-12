import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productFormSchema } from './ProductForm.schema';
import { ProductContext } from '../../context/ProductContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const COLORS = {
  PRETO: 'Preto',
  BRANCO: 'Branco',
  DOURADO: 'Dourado',
  ROSA: 'Rosa',
};

type ProductFormData = z.infer<typeof productFormSchema>;

export const ProductForm: React.FC = () => {
  const { products, addProduct, updateProduct } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get('id');

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: 'all',
  });

  useEffect(() => {
    if (productId) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        Object.entries(product).forEach(([key, value]) => {
          setValue(key as keyof ProductFormData, value as any);
        });
      }
    }
  }, [productId, products, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    if (productId) {
      await updateProduct({ id: productId, ...data });
      navigate('/');
    } else {
    await addProduct(data);
    navigate('/');
    }

  };

  const handleBack = () => {
    navigate('/');
  };

  const handleFieldChange = async (fieldName: keyof ProductFormData) => {
    await trigger(fieldName);
  };

  const formatDate = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formatted = cleanedValue
      .replace(/^(\d{2})(\d)/, '$1/$2')
      .replace(/^(\d{2}\/\d{2})(\d)/, '$1/$2');
    return formatted.slice(0, 10);
  };

  const handleDateChange = (fieldName: keyof ProductFormData, value: string) => {
    const formattedValue = formatDate(value);
    setValue(fieldName, formattedValue);
    handleFieldChange(fieldName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6 mt-2 overflow-y-auto">
      <h1 className="text-[20px] font-bold text-center">
       Detalhes do Produto
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Model */}
        <div>
          <label htmlFor="model" className="block text-[14px] font-medium">Modelo</label>
          <input
            id="model"
            type="text"
            {...register('model')}
            onChange={(e) => {
              register('model').onChange(e);
              handleFieldChange('model');
            }}
            className={`w-full border rounded p-2 ${
              errors.model ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.model && <p className="text-red-500 text-[14px]">{errors.model.message}</p>}
        </div>

        {/* Brand */}
        <div>
          <label htmlFor="brand" className="block text-[14px] font-medium">Marca</label>
          <input
            id="brand"
            type="text"
            {...register('brand')}
            onChange={(e) => {
              register('brand').onChange(e);
              handleFieldChange('brand');
            }}
            className={`w-full border rounded p-2 ${
              errors.brand ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.brand && <p className="text-red-500 text-[14px]">{errors.brand.message}</p>}
        </div>

        {/* Color */}
        <div>
          <label htmlFor="color" className="block text-[14px] font-medium">Cor</label>
          <select 
            id="color" 
            {...register('color')}
            onChange={(e) => {
              register('color').onChange(e);
              handleFieldChange('color');
            }}
            className={`w-full border rounded p-2 ${
              errors.color ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione uma cor</option>
            {Object.entries(COLORS).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          {errors.color && <p className="text-red-500 text-[14px]">{errors.color.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-[14px] font-medium">Preço</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            onChange={(e) => {
              register('price').onChange(e);
              handleFieldChange('price');
            }}
            className={`w-full border rounded p-2 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.price && <p className="text-red-500 text-[14px]">{errors.price.message}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-[14px] font-medium">Data de Início</label>
          <input
            id="startDate"
            type="text"
            placeholder="dd/mm/aaaa"
            {...register('startDate')}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className={`w-full border rounded p-2 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && <p className="text-red-500 text-[14px]">{errors.startDate.message}</p>}
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium">Data de Término</label>
          <input
            id="endDate"
            type="text"
            placeholder="dd/mm/aaaa"
            {...register('endDate')}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            className={`w-full border rounded p-2 ${
              errors.endDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
        </div>

        {/* Code */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium">Código</label>
          <input
            id="code"
            type="text"
            {...register('code')}
            onChange={(e) => {
              register('code').onChange(e);
              handleFieldChange('code');
            }}
            className={`w-full border rounded p-2 ${
              errors.code ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
        </div>
        </div>

        <div className="flex justify-end space-x-4">
            <button
                type="button"
                onClick={handleBack}
                className="flex items-center border-[1px] border-[#1d1d1d] font-bold text-sm px-4 py-2 rounded shadow bg-[#DAE3ED] text-[#1d1d1d] hover:bg-[#1d1d1d] hover:text-white"
                >
                Voltar
            </button>
            <button
                type="submit"
                className="flex items-center border-[1px] border-[#1d1d1d] font-bold text-sm px-4 py-2 rounded shadow bg-[#DAE3ED] text-[#1d1d1d] hover:bg-[#1d1d1d] hover:text-white"
                >
                Salvar
            </button>
        </div>
    </form>
);
};
