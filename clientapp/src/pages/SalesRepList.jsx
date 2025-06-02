import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { useAuth } from '../providers/AuthProvider';
import { getSalesReps, deleteSalesRep } from '../services/api';

const SalesRepList = () => {
  const { token } = useAuth();
  const [salesReps, setSalesReps] = useState([]);
  const [error, setError] = useState('');
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalesReps = async () => {
      if (!token) return;
      try {
        const data = await getSalesReps(token);
        setSalesReps(data);
      } catch {
        setError('Failed to load sales reps.');
        setErrorDialogOpen(true);
        setSalesReps([]);
      }
    };

    fetchSalesReps();
  }, [token]);

  const handleDelete = async (id) => {
    if (!token) return;
    if (window.confirm('Are you sure you want to delete this sales rep?')) {
      try {
        await deleteSalesRep(id, token);
        const updatedData = await getSalesReps(token);
        setSalesReps(updatedData);
      } catch {
        setError('Failed to delete sales rep.');
        setErrorDialogOpen(true);
      }
    }
  };

  const handleCloseErrorDialog = () => setErrorDialogOpen(false);

  const columns = [
    {
      name: 'Name',
      selector: row => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Region',
      selector: row => row.region,
      sortable: true,
    },
    {
      name: 'Platform',
      selector: row => row.platform,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate(`/salesreps/edit/${row.salesRepId}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(row.salesRepId)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div style={{ marginTop: '24px', marginBottom: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/salesreps/new')}
        >
          Add Sales Rep
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={salesReps}
        pagination
        highlightOnHover
        striped
        responsive
        noDataComponent="No sales representatives found."
      />

      <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SalesRepList;
