import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Divider, Box, styled, Typography } from '@mui/material';

import ShiaiIcon from 'components/ShiaiIcon';

import CompetitionsTable from './CompetitionsTable';
import MembersTable from './MembersTable';
import PendingUsersTable from './PendingUsersTable';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchClubExtraData } from '../../redux/club/actions';
import JudokasTable from './JudokasTable';

const useClubExtraInfo = (slug: string) => {
  const dispatch = useAppDispatch();
  const extraData = useAppSelector((s) => s.clubs.clubExtraInfo);
  useEffect(() => {
    dispatch(fetchClubExtraData({ slug }));
  }, [dispatch, slug]);

  return extraData;
};

const Image = styled('img')`
  width: 14rem;
`;

const InfoRow = styled(Box)`
  display: flex;
  gap: 1rem;
`;

const ClubDetail: React.FC = () => {
  const { id } = useParams();

  const { user } = useAppSelector((state) => state.user);
  const club = useAppSelector((s) => s.clubs.clubs.find((c) => c.slug === id));
  const additionalOrNull = useClubExtraInfo(club?.slug ?? '');
  const members = additionalOrNull?.members;
  const competitions = additionalOrNull?.competitions;

  const isClubOwner = club?.owner === user?.id;

  const { pending: pendingUsersList } = useAppSelector((s) => s.clubs);
  const [image, setImage] = useState<string | null>();

  if (!club) return <Navigate to="/login" />;
  return (
    <div>
      <Box display="flex" justifyContent="flex-start" alignItems="center">
        <Image
          src={
            image ??
            `https://avatars.dicebear.com/api/jdenticon/${club.uuid}.svg`
          }
          onError={() => {
            setImage(
              `https://avatars.dicebear.com/api/jdenticon/${club.uuid}.svg`,
            );
          }}
          alt="test"
        />

        <Box
          display="flex"
          flexDirection="column"
          marginLeft="2rem"
          justifyContent="center"
        >
          <InfoRow sx={{ marginBottom: '1rem' }}>
            <Typography variant="h4">{club.name}</Typography>
          </InfoRow>
          <InfoRow>
            <ShiaiIcon icon="Email" />
            <Box>{club.email}</Box>
          </InfoRow>
          <InfoRow>
            <ShiaiIcon icon="Location" />
            <Box>{club.location}</Box>
          </InfoRow>
        </Box>
      </Box>
      <Divider sx={{ background: '#d4d4d4', margin: '1rem 0' }} />
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {pendingUsersList.length > 0 && isClubOwner && (
          <PendingUsersTable
            updateMembers={() => {}}
            pending={pendingUsersList}
            updatePending={() => {}}
          />
        )}
        <MembersTable members={members ?? []} />
        <CompetitionsTable club={club} competitions={competitions ?? []} />
      </Box>
      <Divider sx={{ background: '#d4d4d4', margin: '1rem 0' }} />
      <Box>
        <JudokasTable />
      </Box>
    </div>
  );
};

export default ClubDetail;
