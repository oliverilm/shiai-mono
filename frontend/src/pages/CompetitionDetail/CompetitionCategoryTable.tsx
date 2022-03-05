import {
  Box,
  Button,
  Table,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import { ICategoryInCompetition, ICompetition } from '../../@types/api-types';
import usePermissions from '../../hooks/usePermissions';
import ShiaiIcon from '../../components/ShiaiIcon';
import AddEditCategoryModal from './AddEditCategoryModal';

const CatTableHeader = styled(TableRow)`
  background-color: ${(props) => props.theme.palette?.primary.main};
  color: white;
  width: 30rem;
  min-width: 30rem;
`;

const WeightTableRwo = styled(TableRow)`
  border-bottom: 1px solid #d4d4d4;
  > * {
    padding: 0.5rem;
  }
`;

const CompetitionCategoryTable: React.FC<{
  categories: ICategoryInCompetition[];
  competition: ICompetition;
}> = ({ categories, competition }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentCatBeingEdited, setCurrentCatBeingEdited] = useState<
    number | undefined
  >();

  const { isCompetitionOwner } = usePermissions();

  const ageSorter = (a: ICategoryInCompetition, b: ICategoryInCompetition) =>
    Number(a?.categoryObj?.underValue) > Number(b?.categoryObj?.underValue)
      ? 1
      : -1;

  return (
    <Table>
      {categories !== undefined &&
        [...categories].sort(ageSorter).map((cat) => (
          <>
            <Table width="35rem">
              <AddEditCategoryModal
                competition={competition}
                open={currentCatBeingEdited === cat.id}
                category={cat}
                onSave={() => {
                  setCurrentCatBeingEdited(undefined);
                }}
                onClose={() => {
                  setCurrentCatBeingEdited(undefined);
                }}
              />
              <CatTableHeader theme={theme}>
                <TableCell>
                  <Box display="flex" gap="1rem" width="30rem">
                    <div>{cat.categoryObj.value}</div>
                    <div>
                      {cat.startingYear} - {cat.endingYear}
                    </div>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
                >
                  <Box>+{cat.amountOverAllowed}</Box>
                  <ShiaiIcon
                    style={{ padding: 0, margin: 0 }}
                    icon="Info"
                    color="white"
                  />
                  {isCompetitionOwner(competition) && (
                    <ShiaiIcon
                      icon="Edit-Box"
                      color="white"
                      onClick={() => {
                        setCurrentCatBeingEdited(cat.id);
                      }}
                    />
                  )}
                </TableCell>
              </CatTableHeader>
            </Table>
            {(
              ['menWeights', 'womenWeights', 'unisexWeights'] as (keyof Pick<
                ICategoryInCompetition,
                'menWeights' | 'womenWeights' | 'unisexWeights'
              >)[]
            ).map((w) => {
              const letter = w[0].toUpperCase();
              const content = cat[w];

              let parsedContent: string[] = [];
              try {
                parsedContent = JSON.parse(content) as string[];
              } catch (err) {
                // ignore
              }
              if (parsedContent.length > 0) {
                return (
                  <WeightTableRwo>
                    <Box display="flex" alignItems="center" gap="2rem">
                      <Typography variant="h6">{letter}</Typography>
                      <div>{parsedContent.join(', ')}</div>
                    </Box>
                  </WeightTableRwo>
                );
              }
              return null;
            })}
          </>
        ))}
      {isCompetitionOwner(competition) && (
        <>
          <AddEditCategoryModal
            competition={competition}
            open={open}
            onSave={() => {
              setOpen(!open);
            }}
            onClose={() => {
              setOpen(!open);
            }}
          />
          {categories === undefined ||
            (categories.length === 0 && (
              <CatTableHeader theme={theme}>
                <TableCell colSpan={2} align="center">
                  No categories in this competition. Add them below
                </TableCell>
              </CatTableHeader>
            ))}
          <TableRow>
            <TableCell colSpan={2} align="center">
              <Button
                size="small"
                startIcon={<ShiaiIcon icon="Plus" />}
                onClick={() => setOpen(!open)}
              >
                Add new
              </Button>
            </TableCell>
          </TableRow>
        </>
      )}
    </Table>
  );
};

export default CompetitionCategoryTable;
