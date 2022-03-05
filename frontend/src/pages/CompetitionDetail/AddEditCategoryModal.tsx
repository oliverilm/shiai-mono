import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  styled,
} from '@mui/material';

import useCategoryAgeRange from 'hooks/useCategoryAgeRange';

import {
  ICategoryInCompetition,
  ICompetition,
  ICreateCategoryInCompetition,
} from '../../@types/api-types';
import ShiaiInput from '../../components/ShiaiInput';
import { useAppDispatch } from '../../hooks/useRedux';
import RulesMultiSelect from './RulesMultiSelect';
import { addWeightCategoryToCompetition } from '../../redux/competition/actions';
import { arrStringToArr, parseStringToFormat } from '../../scripts/utils';
import useCategories from '../../hooks/useCategories';

export interface Props {
  category?: ICategoryInCompetition;
  open: boolean;
  onSave: (cat: ICreateCategoryInCompetition) => void;
  onClose: () => void;
  competition: ICompetition;
}

const defaultCat: ICreateCategoryInCompetition = {
  menWeights: '',
  womenWeights: '',
  unisexWeights: '',
  identifier: 'g',
  amountOverAllowed: '300g',
  startingYear: '2011',
  endingYear: '2009',
  category: 1,
  competition: '',
  rules: '',
};

const WeightWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;

const StyledShiaiInput = styled(ShiaiInput)`
  min-width: 5rem;
  max-width: 5rem;
`;

const ChipWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const StyledDivider = styled(Divider)`
  background: #d4d4d4;
  margin: 0.5rem 0;
`;

const AddEditCategoryModal: React.FC<Props> = ({
  category: editCategory,
  competition,
  onClose,
  open,
}) => {
  const [cat, setCat] = useState<
    ICreateCategoryInCompetition | ICategoryInCompetition
  >(
    editCategory === undefined
      ? {
          ...defaultCat,
          competition: competition.uuid,
        }
      : editCategory,
  );

  const dispatch = useAppDispatch();
  const [weights, setWeights] = useState<{
    menWeights: string[];
    womenWeights: string[];
    unisexWeights: string[];
  }>({
    menWeights: arrStringToArr(editCategory ? editCategory.menWeights : '[]'),
    womenWeights: arrStringToArr(
      editCategory ? editCategory.womenWeights : '[]',
    ),
    unisexWeights: arrStringToArr(
      editCategory ? editCategory.unisexWeights : '[]',
    ),
  });

  const [currentValues, setCurrentValues] = useState({
    menWeights: '',
    womenWeights: '',
    unisexWeights: '',
  });
  const addToWeights =
    (name: 'menWeights' | 'womenWeights' | 'unisexWeights') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        [' ', ',', ';'].includes(e.target.value[e.target.value.length - 1]) &&
        e.target.value.trim().length > 0
      ) {
        const val = parseStringToFormat(e.target.value);
        setCurrentValues((prev) => ({ ...prev, [name]: '' }));
        setWeights((prev) => ({ ...prev, [name]: [...weights[name], val] }));
      } else {
        setCurrentValues((prev) => ({ ...prev, [name]: e.target.value }));
      }
    };

  const handleDelete = (
    name: 'menWeights' | 'womenWeights' | 'unisexWeights',
    weight: string,
  ) => {
    setWeights((prev) => ({
      ...prev,
      [name]: prev[name].filter((we) => we !== weight),
    }));
  };

  const categories = useCategories();

  const {
    value: { startingYear, endingYear },
    setEndingYear,
    setStartingYear,
  } = useCategoryAgeRange(
    cat.category,
    Number(cat.startingYear),
    Number(cat.endingYear),
  );

  const onAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: atloeast one weight group must contain weights
    if ('id' in cat) {
      // update exitsing category
    } else {
      dispatch(
        addWeightCategoryToCompetition({
          competition,
          category: {
            ...cat,
            startingYear: startingYear.toString(),
            endingYear: endingYear.toString(),
            menWeights: JSON.stringify(weights.menWeights),
            womenWeights: JSON.stringify(weights.womenWeights),
            unisexWeights: JSON.stringify(weights.unisexWeights),
          },
        }),
      );
    }
    onClose();
  };
  const noWeights = 'No weights added';
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onAdd}>
        <DialogTitle>
          {editCategory !== undefined ? 'Edit Category' : 'Add category'}
        </DialogTitle>

        <DialogContent>
          <Box
            display="flex"
            justifyContent="space-between"
            gap="1rem"
            marginTop=".5rem"
          >
            <ShiaiInput
              value={cat.category}
              required
              onChange={(e) => {
                setCat((prev) => ({
                  ...prev,
                  category: Number(e.target.value),
                }));
              }}
              helperText="Age category for the weights"
              select
            >
              {categories.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.value}
                </MenuItem>
              ))}
            </ShiaiInput>
            <Box display="flex">
              <ShiaiInput
                required
                type="number"
                label="Starting year"
                sx={{ width: '8rem' }}
                value={startingYear}
                onChange={(e) => setStartingYear(Number(e.target.value))}
              />
              <ShiaiInput
                sx={{ width: '8rem' }}
                type="number"
                required
                label="Ending year"
                value={endingYear}
                onChange={(e) => setEndingYear(Number(e.target.value))}
              />
            </Box>
          </Box>
          <StyledDivider />

          <WeightWrapper>
            <StyledShiaiInput
              value={currentValues.menWeights}
              onChange={addToWeights('menWeights')}
              placeholder="-81kg"
              label="Men"
            />
            <ChipWrapper>
              {weights.menWeights.length === 0
                ? noWeights
                : weights.menWeights.map((weight) => (
                    <Chip
                      label={weight}
                      variant="outlined"
                      size="small"
                      onDelete={() => handleDelete('menWeights', weight)}
                    />
                  ))}
            </ChipWrapper>
          </WeightWrapper>
          <StyledDivider />

          <WeightWrapper>
            <StyledShiaiInput
              value={currentValues.womenWeights}
              onChange={addToWeights('womenWeights')}
              placeholder="-42kg"
              label="Women"
            />
            <ChipWrapper>
              {weights.womenWeights.length === 0
                ? noWeights
                : weights.womenWeights.map((weight) => (
                    <Chip
                      label={weight}
                      variant="outlined"
                      size="small"
                      onDelete={() => handleDelete('womenWeights', weight)}
                    />
                  ))}
            </ChipWrapper>
          </WeightWrapper>
          <StyledDivider />
          <WeightWrapper>
            <StyledShiaiInput
              value={currentValues.unisexWeights}
              onChange={addToWeights('unisexWeights')}
              placeholder="-40kg"
              label="Unisex"
            />
            <ChipWrapper>
              {weights.unisexWeights.length === 0
                ? noWeights
                : weights.unisexWeights.map((weight) => (
                    <Chip
                      label={weight}
                      variant="outlined"
                      size="small"
                      onDelete={() => handleDelete('unisexWeights', weight)}
                    />
                  ))}
            </ChipWrapper>
          </WeightWrapper>
          <StyledDivider />

          <Box marginTop="1rem">
            <ShiaiInput
              required
              value={cat.amountOverAllowed}
              onChange={(e) =>
                setCat((prev) => ({
                  ...prev,
                  amountOverAllowed: e.target.value,
                }))
              }
              label="Allowed overweight"
            />
          </Box>

          <StyledDivider />

          <Box marginTop="1rem">
            <RulesMultiSelect
              preSelected={arrStringToArr(cat.rules)}
              onChange={(arr) =>
                setCat((prev) => ({ ...prev, rules: JSON.stringify(arr) }))
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">
            {editCategory === undefined ? 'Add' : 'Edit'} category
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEditCategoryModal;
