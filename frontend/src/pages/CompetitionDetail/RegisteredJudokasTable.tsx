import React, { useEffect } from 'react';
import { Box, TableCell, TableRow } from '@mui/material';

import { ICompetition } from '../../@types/api-types';
import ResponsiveTable from '../../components/ResponsiveTable';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getCompetitionJudokasThunk } from '../../redux/competition/actions';

const useCompetitionJudokas = (competition: ICompetition) => {
  const competitionJudokas =
    useAppSelector((s) => s.competitions.registeredJudokas[competition.slug]) ??
    [];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCompetitionJudokasThunk({ slug: competition.slug }));
  }, [competition, dispatch]);

  return competitionJudokas;
};

const RegisteredJudokasTable: React.FC<{ competition: ICompetition }> = ({
  competition,
}) => {
  const judokas = useCompetitionJudokas(competition);
  const headerValues = [
    'Firstname',
    'Surname',
    'Club',
    'Belt',
    'Category',
    'Weight',
  ];
  return (
    <Box>
      <ResponsiveTable>
        <TableRow>
          {headerValues.map((val) => (
            <TableCell>{val}</TableCell>
          ))}
        </TableRow>
        {judokas.length === 0 ? (
          <TableRow>
            <TableCell align="center" colSpan={headerValues.length}>
              no judokas
            </TableCell>
          </TableRow>
        ) : (
          judokas.map((row) => {
            const { judokaObj } = row;
            return (
              <TableRow>
                <TableCell>{judokaObj.firstName}</TableCell>
                <TableCell>{judokaObj.lastName}</TableCell>
                <TableCell>{row.clubName}</TableCell>
                <TableCell>{row.beltObj.color}</TableCell>
                <TableCell>
                  {row.fightingSex}-{row.categoryObj.categoryObj.value}
                </TableCell>
                <TableCell>{row.weight}</TableCell>
              </TableRow>
            );
          })
        )}
      </ResponsiveTable>
    </Box>
  );
};
export default RegisteredJudokasTable;
