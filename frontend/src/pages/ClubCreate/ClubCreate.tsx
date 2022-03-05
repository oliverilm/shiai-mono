import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { AppRoute } from 'app/routes/AppRoute.enum';
import useDataFulfilled from 'hooks/useDataFulfilled';

import PageHeader from '../../components/PageHeader';
import ShiaiInput from '../../components/ShiaiInput';
import API from '../../API';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getCountriesThunk } from '../../redux/entities/actions';
import usePermissions from '../../hooks/usePermissions';

const StyledShiaiInput = styled(ShiaiInput)`
  max-width: 100%;
  padding-right: 1rem;
  width: 30rem;
`;

const useCountries = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((s) => s.entities);
  useEffect(() => {
    dispatch(getCountriesThunk());
  }, [dispatch]);
  return countries;
};

const ClubCreate: React.FC = () => {
  const { canCreateClub } = usePermissions();

  const navigate = useNavigate();
  const countries = useCountries();
  const [name, setName] = useState('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [country, setCountry] = useState<number>(68);

  const dataFulfilled = useDataFulfilled({ name, email, address });

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const res = await API.club.create({
      email,
      name,
      country,
      location: address,
    });
    if (res.status === 201) {
      navigate(`/clubs/${res.data.slug}`);
    }
  };
  if (!canCreateClub) return <Navigate to="/" />;

  return (
    <form onSubmit={submit}>
      <PageHeader
        title="Create a new Club"
        crumbs={[{ title: 'Create Club', link: AppRoute.clubs_create }]}
        actions={
          <Button
            type="submit"
            disabled={dataFulfilled}
            variant="outlined"
            color="primary"
          >
            Create
          </Button>
        }
      />
      <Box marginTop="1rem">
        <Paper elevation={0}>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="flex-start"
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="1rem"
              padding="1rem"
              marginRight="2rem"
            >
              <Box display="flex" flexDirection="column" gap=".5rem">
                <InputLabel>Club Name</InputLabel>
                <StyledShiaiInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Club Name"
                />
              </Box>

              <Box display="flex" flexDirection="column" gap=".5rem">
                <InputLabel>Club Country</InputLabel>
                <StyledShiaiInput
                  value={country}
                  onChange={(e) => {
                    setCountry(Number(e.target.value));
                  }}
                  placeholder="Country"
                  select
                >
                  {countries.map((cr) => (
                    <MenuItem key={cr.id} value={cr.id}>
                      {cr.name}
                    </MenuItem>
                  ))}
                </StyledShiaiInput>
              </Box>

              <Box display="flex" flexDirection="column" gap=".5rem">
                <InputLabel>Club Address</InputLabel>
                <StyledShiaiInput
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </Box>

              <Box display="flex" flexDirection="column" gap=".5rem">
                <InputLabel>Club Contact Email</InputLabel>
                <StyledShiaiInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap="1rem" margin="1rem">
              <div>
                <Typography variant="h6"> Why create a club?</Typography>
                Having a club means you can create judokas who are training your
                club. You can register them to competitions and buy licences for
                them to compete in the national championships
              </div>
              <div>
                <Typography variant="h6">Overview</Typography>
                With having a club, you have a better overview of the judokas
                data, belts, competition results and more.
              </div>
            </Box>
          </Box>
        </Paper>
      </Box>
    </form>
  );
};

export default ClubCreate;
