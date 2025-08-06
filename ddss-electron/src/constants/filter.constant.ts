export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const FilterMenuStyleProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export const GeneralFiltersMenuHeaders = {
  studyId: 'Study ID',
  patientsAge: "Patient's Age",
  viewPosition: 'View Position',
  imageLaterality: 'Image Laterality',
};

export const ClinicalFiltersMenuHeaders = {
  breastBirads: 'Breast BIRADS',
  breastDensity: 'Breast Density',
  findingCategories: 'Finding Categories',
  findingBirads: 'Finding BIRADS',
};

