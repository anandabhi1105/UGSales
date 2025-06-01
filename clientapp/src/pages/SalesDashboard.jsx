import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getSales } from '../services/api';
import { useAuth } from '../providers/AuthProvider';
import {
  Box,
  Typography,
  OutlinedInput,
  FormLabel,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const SalesDashboard = () => {
  const { token } = useAuth();
  const [filters, setFilters] = useState({ product: '', region: '', platform: '' });
  const [sales, setSales] = useState([]);

  const loadSales = async () => {
    if (!token) return;

    try {
      const data = await getSales(filters, token);
      setSales(data);
    } catch (error) {
      console.error('Error loading sales:', error);
      setSales([]);
    }
  };

  useEffect(() => {
    loadSales();
  }, [filters, token]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const columns = [
    { name: 'Product', selector: (row) => row.product, sortable: true },
    { name: 'Amount', selector: (row) => `$${row.amount.toFixed(2)}`, sortable: true },
    { name: 'Sale Date', selector: (row) => new Date(row.saleDate).toLocaleDateString(), sortable: true },
    { name: 'Sales Rep', selector: (row) => row.salesRepName, sortable: true },
    { name: 'Region', selector: (row) => row.region, sortable: true },
    { name: 'Platform', selector: (row) => row.platform, sortable: true },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Box maxWidth="lg" mx="auto">
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          📊 UG Sales Dashboard
        </Typography>

        {/* Filters */}
        <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <FormGrid item xs={12} md={4}>
              <FormLabel htmlFor="product">Filter by Product</FormLabel>
              <OutlinedInput
                id="product"
                name="product"
                value={filters.product}
                onChange={handleChange}
                placeholder="Product"
                size="small"
              />
            </FormGrid>

            <FormGrid item xs={12} md={4}>
              <FormLabel htmlFor="region">Filter by Region</FormLabel>
              <OutlinedInput
                id="region"
                name="region"
                value={filters.region}
                onChange={handleChange}
                placeholder="Region"
                size="small"
              />
            </FormGrid>

            <FormGrid item xs={12} md={4}>
              <FormLabel htmlFor="platform">Filter by Platform</FormLabel>
              <OutlinedInput
                id="platform"
                name="platform"
                value={filters.platform}
                onChange={handleChange}
                placeholder="Platform"
                size="small"
              />
            </FormGrid>
          </Grid>
        </Paper>

        {/* Data Table */}
        <Paper elevation={2}>
          <DataTable
            columns={columns}
            data={sales}
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent="No sales data available."
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default SalesDashboard;
