import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Paper } from '@mui/material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './CreateCompetition.style.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import { AppRoute } from '../../app/routes/AppRoute.enum';
import ShiaiIcon from '../../components/ShiaiIcon';
import useDataFulfilled from '../../hooks/useDataFulfilled';
import ShiaiInput from '../../components/ShiaiInput';
import { ICompetition } from '../../@types/api-types';
import { getEditorValue } from './scripts';
import API from '../../API';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchCompetitionsThunk } from '../../redux/competition/actions';
import { fetchClubExtraData } from '../../redux/club/actions';
import useBreakpoints from '../../hooks/useBreakpoints';

const CreateCompetition: React.FC = () => {
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const clubSlug = useAppSelector((s) => s.user.user?.profile?.club);

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );

  const competitionValues: Partial<ICompetition> = {
    currency: '',
    registrationFee: 0,
    clubName: null,
    name: '',
    location: '',
    registrationEndDate: new Date(),
    description: '',
    isPublished: false,
    image: undefined,
    start: '',
    end: '',
    requireLicence: false,
  } as const;

  const [values, setValues] = useState(competitionValues);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const competitionData: Partial<ICompetition> = {
      ...values,
      start: moment(values.start).format('YYYY-MM-DDThh:mm:ss'),
      end: moment(values.end).format('YYYY-MM-DDThh:mm:ss'),
      description: getEditorValue(editorState),
    };

    const result = await API.competition.createCompetition(competitionData);
    if (result.status === 201) {
      // get club extra data and get all competitions
      // navigate to competition page.
      dispatch(fetchCompetitionsThunk());
      dispatch(fetchClubExtraData({ slug: clubSlug ?? '' }));
      history(`/competitions/${result.data.slug}`);
    }
  };

  const update =
    (stateName: keyof ICompetition) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [stateName]: e.target.value });
    };
  const isDisabled = useDataFulfilled({});
  const { isDownMD, isDownSM, isUpSM } = useBreakpoints();

  if (!clubSlug) {
    return <Navigate to={AppRoute.home} />;
  }

  const sideMargin = isDownMD ? '1rem' : '5rem';
  const textFieldWidth = isUpSM ? '20erm' : 'auto';

  return (
    <Box>
      <form onSubmit={submit}>
        <PageHeader
          title="Create a new Competition"
          crumbs={[
            {
              link: AppRoute.competitions_create,
              title: 'Create a competition',
            },
          ]}
          actions={
            <Button
              startIcon={<ShiaiIcon icon="Plus" />}
              color="primary"
              disabled={isDisabled}
              variant="text"
              size="small"
              type="submit"
            >
              Create
            </Button>
          }
        />
        <Box marginTop="1rem">
          <Paper elevation={0}>
            <Box padding="1rem">
              <Box
                margin={`1rem ${sideMargin}`}
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <ShiaiInput
                  label="Name"
                  required
                  helperText="Name of the competition"
                  onChange={update('name')}
                />
                <ShiaiInput
                  label="Location"
                  required
                  helperText="Exact address where the competition is held"
                  onChange={update('location')}
                />
                <ShiaiInput
                  type="datetime-local"
                  helperText="Registration end date and time"
                  onChange={update('registrationEndDate')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.requireLicence}
                      onChange={({ target: { checked } }) =>
                        setValues({
                          ...values,
                          requireLicence: checked,
                        })
                      }
                      color="primary"
                    />
                  }
                  label="Judokas require a licence to compete"
                />
              </Box>
              <Box marginLeft={sideMargin} marginRight={sideMargin}>
                <Editor
                  editorState={editorState}
                  editorStyle={{
                    backgroundColor: 'white',
                    height: '300px',
                    padding: '1em',
                  }}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(e) => {
                    setEditorState(e);
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                margin={sideMargin}
                gap="1rem"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                  gap="1rem"
                >
                  <ShiaiInput
                    required
                    helperText="Competition start date and time"
                    type="datetime-local"
                    width={textFieldWidth}
                    fullWidth={isDownSM}
                    onChange={update('start')}
                  />
                  <ShiaiInput
                    required
                    helperText="Competition approximate end date and time"
                    type="datetime-local"
                    width={textFieldWidth}
                    fullWidth={isDownSM}
                    onChange={update('end')}
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                  gap="1rem"
                >
                  <ShiaiInput
                    required
                    helperText="Currency in which the registration fee is paid"
                    width={textFieldWidth}
                    fullWidth={isDownSM}
                    label="Currency"
                    onChange={update('currency')}
                  />
                  <ShiaiInput
                    width={textFieldWidth}
                    required
                    helperText="Competition registration fee"
                    fullWidth={isDownSM}
                    label="Registration fee"
                    onChange={update('registrationFee')}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCompetition;
