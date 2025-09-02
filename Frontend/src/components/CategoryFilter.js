// // src/components/CategoryFilter.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// const CategoryFilter = ({ onCategoryChange }) => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       // Consistente com AuthContext.js, o token é 'token'
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError(new Error("Token de autenticação não encontrado."));
//         setLoading(false);
//         return;
//       }

//       try {
//         // Consistente com o resto do app, a rota é /categorias
//         const response = await axios.get(`${API_URL}/categorias`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setCategories(response.data || []);
//       } catch (err) {
//         console.error("Falha ao buscar categorias:", err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []); // Array de dependências vazio para executar apenas uma vez

//   const handleChange = (e) => {
//     const categoryId = e.target.value;
//     setSelectedCategory(categoryId);
//     onCategoryChange(categoryId);
//   };

//   // Estilos consistentes com os outros componentes da aplicação
//   const styles = {
//     filterGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.5rem',
//     },
//     label: {
//       fontWeight: '600',
//       color: '#34495e',
//       fontSize: '0.9rem',
//     },
//     select: {
//       minWidth: '180px',
//       padding: '0.75rem',
//       border: '1px solid #bdc3c7',
//       borderRadius: '8px',
//       backgroundColor: '#fff',
//       fontSize: '1rem',
//     },
//   };

//   if (loading) {
//     return (
//       <div style={styles.filterGroup}>
//         <label htmlFor="category-filter" style={styles.label}>Categoria:</label>
//         <select id="category-filter" style={styles.select} disabled>
//           <option>Carregando...</option>
//         </select>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.filterGroup}>
//       <label htmlFor="category-filter" style={styles.label}>Categoria:</label>
//       <select id="category-filter" value={selectedCategory} onChange={handleChange} style={styles.select}>
//         <option value="">All Categories</option>
//         {categories.map(category => (
//           <option key={category.id} value={category.id}>{category.nome}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default CategoryFilter;

