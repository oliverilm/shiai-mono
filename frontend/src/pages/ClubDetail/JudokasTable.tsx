import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import useBreakpoints from 'hooks/useBreakpoints';

import ShiaiIcon from '../../components/ShiaiIcon';
import { useAppSelector } from '../../hooks/useRedux';
import AddJudokaModal from './AddJudokasModal';
import ImportJudokasModal from './ImportJudokasModal';
import usePermissions from '../../hooks/usePermissions';
import { IClubJudokas } from '../../@types/api-types';

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background: #f0f0f0;
  }
`;

const StyledTableCell = styled(TableCell)`
  height: 3rem;
`;

const JudokasTable: React.FC = (): JSX.Element => {
  const judokas = useAppSelector((s) => s.clubs?.clubExtraInfo?.judokas ?? []);
  const { isTrainer, isClubOwner } = usePermissions();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [multiselectEnabled, setMultiselectEnabled] = useState(false);
  const [selectedJudokas, setSelectedJudokas] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const canSeeButtons = isTrainer || isClubOwner;
  const { isDownMD } = useBreakpoints();

  const getHeader = () => {
    const widthDependant = isDownMD
      ? ['Name', 'D.O.B', 'Sex', 'Belt', 'Licence']
      : ['Name', 'Surname', 'D.O.B', 'Sex', 'Belt', 'Licence'];

    const base = canSeeButtons
      ? [...widthDependant, 'Actions']
      : widthDependant;

    return multiselectEnabled
      ? [
          <Checkbox
            checked={allSelected}
            onChange={({ target: { checked } }) => {
              setAllSelected(checked);
              if (checked) {
                setSelectedJudokas(judokas.map((ju) => ju.uuid));
              } else {
                setSelectedJudokas([]);
              }
            }}
          />,
          ...base,
        ]
      : base;
  };

  const headerArr = getHeader();
  const hasLicence = (ju: IClubJudokas) =>
    ju.licence && ju.licenceNumber.length > 0;
  const getLicenceIndicator = (ju: IClubJudokas): JSX.Element => {
    if (hasLicence(ju) && canSeeButtons) {
      return (
        <div>
          <ShiaiIcon icon="Eye-On" color="green" />
        </div>
      );
    }
    if (hasLicence(ju)) {
      return <ShiaiIcon icon="Eye-On" color="green" />;
    }
    return <ShiaiIcon icon="Eye-Off" color="red" />;
  };
  return (
    <Paper elevation={0}>
      <AddJudokaModal setOpen={setAddModalOpen} open={addModalOpen} />
      <ImportJudokasModal open={importModalOpen} setOpen={setImportModalOpen} />
      <Box margin="1rem">
        <Box
          display="flex"
          marginBottom="1rem"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">
            Judokas{' '}
            {selectedJudokas.length > 0 ? `(${selectedJudokas.length})` : ''}
          </Typography>
          {canSeeButtons && (
            <Box display="flex" gap="1rem">
              <Button
                size="small"
                onClick={() => setMultiselectEnabled(!multiselectEnabled)}
                variant="text"
                color="secondary"
                startIcon={<ShiaiIcon icon="Arrow-Move-Vertical" />}
              >
                Multiselect
              </Button>
              <Button
                size="small"
                onClick={() => setImportModalOpen(!importModalOpen)}
                variant="text"
                color="secondary"
                startIcon={<ShiaiIcon icon="Cloud-Download" />}
              >
                Import
              </Button>
              <Button
                onClick={() => setAddModalOpen(!addModalOpen)}
                size="small"
                variant="text"
                color="primary"
                startIcon={<ShiaiIcon icon="Plus" />}
              >
                Add
              </Button>
            </Box>
          )}
        </Box>
        <Divider />
        <Table size="small">
          <TableHead>
            <StyledTableRow>
              {headerArr.map((st) => (
                <StyledTableCell align="center">{st}</StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {judokas.length > 0 ? (
              judokas.map((ju) => (
                <StyledTableRow key={ju.slug}>
                  {multiselectEnabled && (
                    <StyledTableCell>
                      <Checkbox
                        checked={
                          allSelected || selectedJudokas.includes(ju.slug)
                        }
                        onChange={() => {
                          const checked = selectedJudokas.includes(ju.slug);
                          if (checked) {
                            setSelectedJudokas((prev) =>
                              prev.filter((sl) => sl !== ju.slug),
                            );
                          } else {
                            setSelectedJudokas([...selectedJudokas, ju.slug]);
                          }
                        }}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        color="primary"
                      />
                    </StyledTableCell>
                  )}

                  <StyledTableCell align="center">
                    {ju.firstName} {isDownMD ? ju.lastName : ''}
                  </StyledTableCell>
                  {!isDownMD && (
                    <StyledTableCell align="center">
                      {ju.lastName}
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">
                    {ju.birthDay}
                  </StyledTableCell>
                  <StyledTableCell align="center">{ju.sex}</StyledTableCell>
                  <StyledTableCell align="center">
                    {ju?.belt?.color ?? ''}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {getLicenceIndicator(ju)}
                  </StyledTableCell>
                  {canSeeButtons && (
                    <StyledTableCell align="center">
                      <Box display="flex" justifyContent="center" gap="1rem">
                        <ShiaiIcon icon="Info" title="Extra Info" />
                        <ShiaiIcon icon="Edit-Box" title="Edit judoka" />
                        <ShiaiIcon icon="Cart-Buggy" title="Buy a licence" />
                      </Box>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={headerArr.length} align="center">
                  No judokas added
                </TableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default JudokasTable;
