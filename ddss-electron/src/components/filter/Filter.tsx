import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FilterMenu } from '../../types/filter';
import { FilterMenuStyleProps } from '../../constants/filter.constant';
import { InputLabelStyled, FormControlStyled } from './style';
import { Tooltip, Typography } from '@mui/material';

export default function Filter(props: FilterMenu) {
  const { title, items, value, onChange } = props;

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    onChange(value as string[]);
  };

  return (
    <FormControlStyled
      key={title.toLocaleLowerCase().replace(' ', '-')}
      id={title.toLocaleLowerCase().replace(' ', '-')}>
      <InputLabelStyled shrink id="demo-multiple-checkbox-label" variant="outlined" style={{ margin: 6 }}>
        {title}
      </InputLabelStyled>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        style={{ width: '100%' }}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput notched label={title} id="outlined-age-native-simple" />}
       renderValue={(selected) => (
          <Tooltip title={(selected as string[]).join(', ')} placement="top">
            <div
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              {(selected as string[]).join(', ')}
            </div>
          </Tooltip>
        )}

        MenuProps={FilterMenuStyleProps}>
        {items &&
          items?.map((item) => (
            <MenuItem key={item} value={item} sx={{ fontSize: 4 }}>
              <Checkbox checked={value?.indexOf(item) > -1} size="small" />
              <ListItemText primary={item} sx={{ fontSize: 4 }} />
            </MenuItem>
          ))}
      </Select>
    </FormControlStyled>
  );
}
