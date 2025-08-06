import React from 'react';
import { Box, Collapse, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SavedQueryProps } from '../../types/filter';
import { ListItemButtonStyled } from './style';
import { GeneralFiltersMenuHeaders, ClinicalFiltersMenuHeaders } from '../../constants/filter.constant';
import Button from '../button/Button';

export default function Query(props: SavedQueryProps) {
  const { queryName, filters, handleDelete, handleApply } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const formatKey = (key: string) => {
      return (
        GeneralFiltersMenuHeaders[key] ||
        ClinicalFiltersMenuHeaders[key] ||
        key
      );
  };

  return (
    <Box key={queryName}>
      <ListItemButtonStyled key={queryName} onClick={handleToggle}>
        <ListItemText primary={queryName} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButtonStyled>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {filters?.filterOptions && Object.keys(filters?.filterOptions).length > 0 && (
          <>
            <Typography variant="h6">Filter Options</Typography>
            {Object.keys(filters?.filterOptions).map((key) => (
              <Typography variant="body2" key={key}>
                {formatKey(key)}: {filters?.filterOptions[key].join(', ')}
              </Typography>
            ))}
          </>
        )}
        {filters?.abnormalityFilter && Object.keys(filters?.abnormalityFilter).length > 0 && (
          <>
            <Typography variant="h6">Abnormality Filter</Typography>
            {Object.keys(filters?.abnormalityFilter).map((key) => (
              <Typography variant="body2" key={key}>
                {formatKey(key)}: {filters?.abnormalityFilter[key].join(', ')}
              </Typography>
            ))}
          </>
        )}
        {filters?.patientIds && Object.keys(filters?.patientIds).length > 0 && (
          <>
            <Typography variant="h6">Patient Ids</Typography>
            {Object.keys(filters?.patientIds).map((key) => (
              <Typography variant="body2" key={key}>
                {filters?.patientIds[key].join(', ')}
              </Typography>
            ))}
          </>
        )}
        <Button
          variant="contained"
          size="small"
          title="Delete"
          disabled={false}
          sx={{ margin: '10px' }}
          onClick={() => handleDelete(queryName)}
        />
        <Button
          variant="contained"
          size="small"
          title="Apply"
          disabled={false}
          sx={{ margin: '10px' }}
          onClick={() => handleApply(queryName)}
        />
      </Collapse>
    </Box>
  );
}
