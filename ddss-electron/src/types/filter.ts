export type FilterMenu = {
  title: string;
  items: string[];
  value: string[];
  onChange: (event) => void;
};

export type FilterMenuProps = {
  title: string;
  headers: any;
  options: any;
  values: any;
  onChange: (value: string[]) => void;
};

export interface FilterObject {
  leftOrRightBreast: string[];
  imageView: string[];
  abnormalityId: string[];
  abnormalityType: string[];
  breastDensity: string[];
  subtlety: string[];
  assessment: string[];
  pathology: string[];
}

export interface AbnormalityFilterObject {
  calcType: string[];
  calcDistribution: string[];
  massShape: string[];
  massMargins: string[];
}

export interface PatientFilterObject {
  patientsIds: string[];
}

export type FilterSectionProps = {
  filtersMenuOptions: FilterObject;
  abnormalityFilterMenuOptions: AbnormalityFilterObject;
  patientIdsFilterMenuOptions: PatientFilterObject;
  handleFilterApply: (filters) => void;
  initialFilters?: { filterOptions?: any; abnormalityFilter?: any; patientIds?: any };
};

export type SavedQuery = {
  queryName: string;
  filters: {
    filterOptions: any;
    abnormalityFilter: any;
    patientIds: any;
  };
};

export type SavedQueries = SavedQuery[];

export type SavedQueryProps = {
  queryName: string;
  filters: {
    filterOptions: any;
    abnormalityFilter: any;
    patientIds: any;
  };
  handleDelete: (queryName: string) => void;
  handleApply: (queryName: string) => void;
};
