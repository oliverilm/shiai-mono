import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const rules: string[] = [
  'NO SHIME-WAZA',
  'NO MA-SUTEMI-WAZA',
  'NO KANSETSU-WAZA',
  'SHIME-WAZA ALLOWED',
  'KANSETSU-WAZA ALLOWED',
  'MA-SUTEMI-WAZA ALLOWED',
];

const RulesMultiSelect: React.FC<{
  preSelected?: string[] | undefined;
  onChange: (arr: string[]) => void;
}> = ({ onChange, preSelected = [] }) => {
  const [rulesArr, setRules] = React.useState<string[]>(preSelected);

  const handleChange = (event: SelectChangeEvent<typeof rulesArr>) => {
    const {
      target: { value },
    } = event;
    setRules(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );

    onChange(rules);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel>Rules for weight category</InputLabel>
      <Select
        multiple
        value={rulesArr}
        onChange={handleChange}
        input={<OutlinedInput label="Rules for weight category" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {rules.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={rulesArr.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default RulesMultiSelect;
