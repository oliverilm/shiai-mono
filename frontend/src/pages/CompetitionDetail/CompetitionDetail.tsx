/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import usePermissions from '../../hooks/usePermissions';
import { ICategoryInCompetition, ICompetition } from '../../@types/api-types';
import { fetchWeightCategoriesInCompetitionThunk } from '../../redux/competition/actions';
import CompetitionCategoryTable from './CompetitionCategoryTable';
import CompetitionInformationTable from './CompetitionInformationTable';
import ShiaiIcon from '../../components/ShiaiIcon';
import RegisteredJudokasTable from './RegisteredJudokasTable';

const useWeightCategoriesInCompetition = (
  comp: ICompetition | undefined,
): ICategoryInCompetition[] => {
  const { weightCategories } = useAppSelector((s) => s.competitions);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (comp !== undefined) {
      dispatch(fetchWeightCategoriesInCompetitionThunk({ competition: comp }));
    }
  }, [dispatch, comp]);
  if (comp) {
    const vals = weightCategories[comp.slug];
    if (vals !== undefined) {
      return vals;
    }
  }
  return [];
};

const CompetitionDetail: React.FC = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { competitions } = useAppSelector((state) => state.competitions);
  const competition = competitions.find((c) => c.slug === id);
  const { isCompetitionOwner } = usePermissions();
  const weightCategories = useWeightCategoriesInCompetition(competition);

  const isRegistrationOpen = (endDate: Date): boolean =>
    new Date().getTime() - endDate.getTime() > 0;

  if (competition) {
    return (
      <Box>
        {isCompetitionOwner(competition) && !competition.isPublished && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding="1rem"
            borderBottom="1px solid #ccc"
          >
            <div>
              This competition is not published and not visible to others
            </div>
            <Button
              variant="outlined"
              size="small"
              onClick={() => toast('Publishing competition')}
              color="primary"
            >
              Publish
            </Button>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem 2rem',
            background: theme.palette.primary.light,
            color: 'white',
            margin: '1rem',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ display: 'flex', alignItems: 'baseline' }}
            variant="h4"
            fontWeight="normal"
          >
            {competition.name}
            <Typography
              sx={{ marginLeft: '.6rem', fontStyle: 'italic' }}
              variant="subtitle2"
            >
              by {competition.clubName}
            </Typography>
          </Typography>
          <Typography variant="h5" fontWeight="normal">
            {new Date(competition.start).toDateString()}
          </Typography>
        </Box>

        {isCompetitionOwner(competition) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: ' .5rem 1rem',
              paddingTop: 0,
              margin: '1rem',
              alignItems: 'center',
              borderBottom: '1px solid #d4d4d4',
            }}
          >
            <Typography>Actions</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '1rem',
              }}
            >
              <ShiaiIcon size={26} title="Export" icon="Cloud-Download" />
              <ShiaiIcon size={26} title="Get Mailing list" icon="Email" />
              <ShiaiIcon size={26} title="Edit" icon="Edit-Box" />
              <ShiaiIcon size={26} title="Edit" icon="More-Vertical" />
            </Box>
          </Box>
        )}

        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          <Box
            className="details"
            width="500px"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Box
              dangerouslySetInnerHTML={{ __html: competition.description }}
            />
            <CompetitionInformationTable competition={competition} />
          </Box>
          <Box>
            {weightCategories !== undefined && (
              <CompetitionCategoryTable
                competition={competition}
                categories={weightCategories}
              />
            )}
          </Box>
        </Box>
        {isRegistrationOpen(new Date(competition.registrationEndDate)) && (
          <Button variant="outlined" color="primary">
            Register judokas
          </Button>
        )}
        <RegisteredJudokasTable competition={competition} />
      </Box>
    );
  }
  return <>...Loading</>;
};

export default CompetitionDetail;
