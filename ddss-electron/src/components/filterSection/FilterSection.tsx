import React, { useState, useMemo, useCallback, useEffect } from 'react';
import FilterMenu from '../filterMenu/FilterMenu';
import Button from '../button/Button';
import { GeneralFiltersMenuHeaders, ClinicalFiltersMenuHeaders } from '../../constants/filter.constant';
import { BoxFilterMenuStyled, FilterColumn } from './style';  // ✅ ייבוא FilterColumn שנוסף
import QuerySaveDialog from '../querySaveDialog/QuerySaveDialog';
import { CHANNELS } from '../../constants/common';
import { FilterSectionProps } from '../../types/filter';

const { DDSM_AGENT } = window;

export default function FilterSection(props: FilterSectionProps) {
  const {
    filtersMenuOptions,
    patientIdsFilterMenuOptions,
    handleFilterApply,
    initialFilters,
  } = props;

  const [filtersMenu, setFiltersMenu] = useState({ options: {}, selected: {} });
  const [patientIdsFilterMenu, setPatientIdsFilterMenu] = useState({
    options: {},
    selected: {},
  });
  const [isSaveQueryPopupOpen, setIsSaveQueryPopupOpen] = useState(false);

  useEffect(() => {
    setFiltersMenu({ options: filtersMenuOptions, selected: initialFilters?.filterOptions || {} });
    setPatientIdsFilterMenu({ options: patientIdsFilterMenuOptions, selected: initialFilters?.patientIds || {} });
  }, [filtersMenuOptions, patientIdsFilterMenuOptions, initialFilters]);

  const handleFilterChange = useCallback((menu, value) => {
    const menus = {
      filters: setFiltersMenu,
      patientsIds: setPatientIdsFilterMenu,
    };
    menus[menu]((prev) => {
      const options = prev.options;
      return {
        options: options,
        selected: !value || Object.keys(value).length === 0 ? null : value,
      };
    });
  }, []);

  const onApply = useCallback(async () => {
    const filters = {
      filterOptions: filtersMenu.selected || {},
      patientIds: patientIdsFilterMenu.selected || {},
    };
    handleFilterApply(filters);
  }, [filtersMenu.selected, patientIdsFilterMenu.selected]);

  const onReset = useCallback(async () => {
    setFiltersMenu({ options: filtersMenuOptions, selected: {} });
    setPatientIdsFilterMenu({ options: patientIdsFilterMenuOptions, selected: {} });
    handleFilterApply({});
  }, [filtersMenuOptions, patientIdsFilterMenuOptions]);

  const onQuerySave = useCallback(
    async (queryName: string) => {
      const filters = {
        filterOptions: filtersMenu.selected || {},
        patientIds: patientIdsFilterMenu.selected || {},
      };

      if (queryName) {
        const response = await DDSM_AGENT.send(CHANNELS.SAVE_QUERY, { queryName, filters });
        if (response === 'success') {
          alert(`Query saved successfully as "${queryName}.json" in the "savedQueries" folder.`);
        } else {
          alert('Saving query was canceled.');
        }
      }
    },
    [filtersMenu.selected, patientIdsFilterMenu.selected]
  );

  const isDisabled = useMemo(() => {
    const filterEmpty = !filtersMenu.selected || Object.keys(filtersMenu.selected).length === 0;
    const patientIdsEmpty = !patientIdsFilterMenu.selected || Object.keys(patientIdsFilterMenu.selected).length === 0;
    return filterEmpty && patientIdsEmpty;
  }, [filtersMenu.selected, patientIdsFilterMenu.selected]);

  return (
    <>
      <BoxFilterMenuStyled id="filter-menu-filter-section">
        <FilterColumn>
          <FilterMenu
            title="General Info"
            headers={GeneralFiltersMenuHeaders}
            options={filtersMenu.options}
            values={filtersMenu.selected}
            onChange={(value) => handleFilterChange('filters', value)}
          />
        </FilterColumn>

        <FilterColumn>
          <FilterMenu
            title="Clinical Details"
            headers={ClinicalFiltersMenuHeaders}
            options={filtersMenu.options}
            values={filtersMenu.selected}
            onChange={(value) => handleFilterChange('filters', value)}
          />
        </FilterColumn>
      </BoxFilterMenuStyled>

      <BoxFilterMenuStyled id="other-filter-menu-filter-section">
        <Button
          variant="contained"
          size="small"
          title="Apply"
          disabled={isDisabled}
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 1 }}
          onClick={onApply}
        />
        <Button
          variant="outlined"
          size="small"
          title="Reset"
          disabled={isDisabled}
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 1 }}
          onClick={onReset}
        />
        <Button
          variant="outlined"
          size="small"
          title="Save Query"
          disabled={isDisabled}
          sx={{ marginRight: 2, marginLeft: 2, marginBottom: 1 }}
          onClick={() => setIsSaveQueryPopupOpen(true)}
        />
      </BoxFilterMenuStyled>

      <QuerySaveDialog
        open={isSaveQueryPopupOpen}
        onClose={() => setIsSaveQueryPopupOpen(false)}
        onSave={onQuerySave}
      />
    </>
  );
}
