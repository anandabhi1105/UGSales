import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createSalesRep, getSalesRep, updateSalesRep } from '../services/api';
import {
  Grid,
  OutlinedInput,
  FormLabel,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const SalesRepForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      getSalesRep(id).then((res) => {
        reset(res.data);
      });
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateSalesRep(id, data);
      } else {
        await createSalesRep(data);
      }
      navigate('/salesreps');
    } catch (err) {
      alert('Failed to save Sales Rep');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom align="center">
        {isEdit ? 'Edit Sales Representative' : 'Add Sales Representative'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="firstName" required>
              First Name
            </FormLabel>
            <OutlinedInput
              id="firstName"
              {...register('firstName', { required: true })}
              placeholder="Enter First Name"
              size="small"
            />
            {errors.firstName && (
              <Typography color="error" variant="caption">
                First name is required
              </Typography>
            )}
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="lastName" required>
              Last Name
            </FormLabel>
            <OutlinedInput
              id="lastName"
              {...register('lastName', { required: true })}
              placeholder="Enter Last Name"
              size="small"
            />
            {errors.lastName && (
              <Typography color="error" variant="caption">
                Last name is required
              </Typography>
            )}
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="email" required>
              Email
            </FormLabel>
            <OutlinedInput
              id="email"
              type="email"
              {...register('email', { required: true })}
              placeholder="Enter Email"
              size="small"
            />
            {errors.email && (
              <Typography color="error" variant="caption">
                Email is required
              </Typography>
            )}
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="phone" required>
              Phone
            </FormLabel>
            <OutlinedInput
              id="phone"
              {...register('phone', { required: true })}
              placeholder="Enter Phone No"
              size="small"
            />
            {errors.phone && (
              <Typography color="error" variant="caption">
                Phone is required
              </Typography>
            )}
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="region" required>
              Region
            </FormLabel>
            <OutlinedInput
              id="region"
              {...register('region', { required: true })}
              placeholder="Enter Region"
              size="small"
            />
            {errors.region && (
              <Typography color="error" variant="caption">
                Region is required
              </Typography>
            )}
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="platform" required>
              Platform
            </FormLabel>
            <OutlinedInput
              id="platform"
              {...register('platform', { required: true })}
              placeholder="Enter Platform"
              size="small"
            />
            {errors.platform && (
              <Typography color="error" variant="caption">
                Platform is required
              </Typography>
            )}
          </FormGrid>

          <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ px: 4 }}
            >
              {isEdit ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SalesRepForm;
