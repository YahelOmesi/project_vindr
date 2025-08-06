import pandas as pd
import re
import json

FILTER_KEY_TO_DF_COLUMN = {
    "viewPosition": "view_position",
    "imageLaterality": "image_laterality",
    "breastBirads": "breast_birads",
    "breastDensity": "breast_density",
    "findingCategories": "finding_categories",
    "findingBirads": "finding_birads",
    "patientsAge": "patients_age",
    "studyId": "study_id"
}
DF_COLUMN_TO_FILTER_KEY = {v: k for k, v in FILTER_KEY_TO_DF_COLUMN.items()}

class DataManager:
    def __init__(self):
        self.calc_df: pd.DataFrame = None
        self.mass_df: pd.DataFrame = None
        self.df: pd.DataFrame = None
        self.config = None

    def set_config(self, config):
        self.config = config

    @staticmethod
    def get_df(file_path):
        return pd.read_csv(file_path)

    @staticmethod
    def convert_key_format(key, keys_format = "camel"):
        """
        Convert key to the specified format.

        Parameters
        ----------
        key: str
            The key to convert
        keys_format: str
            The format to convert the key to. Options are "camel", "snake", "camel_space", "upper-snake"

        Returns
        -------
        str
            The converted key
        """
        if keys_format == 'camel':
            return re.sub(r'_([a-z])', lambda x: x.group(1).upper(), key)
        elif keys_format == 'snake':
            return re.sub(r'([A-Z])', lambda x: '_' + x.group(1).lower(), key)
        elif keys_format == 'camel_space':
            return re.sub(r'_([a-z])', lambda x: ' ' + x.group(1).upper(), key)
        elif keys_format == 'upper-snake':
            return re.sub(r'([A-Z])', lambda x: '_' + x.group(1), key).upper()
        else:
            raise ValueError("Invalid keys_format. Options are 'camel', 'snake', 'camel_space', 'upper-snake'")

    def set_calc_df(self):
        self.calc_df = self.get_df(self.config["calc_file_path"])

    def set_mass_df(self):
        self.mass_df = self.get_df(self.config["mass_file_path"])

    # def set_df(self):
    #    self.df = pd.merge(self.calc_df, self.mass_df, how="outer")

    def set_df(self):
        vindr_file_path = self.config["vindr_file_path"]
        self.df = self.get_df(vindr_file_path)

    def set_vindr_df(self, config):
        import pandas as pd

        print("📁 Loading vindr.csv into DataManager...")
        df = self.get_df(config["vindr_file_path"])

        print("✅ df loaded. Columns:", df.columns)
        self.df = df

    def get_columns(self, collection: str, include_file_path: bool = False):
        if self.df is None:
            raise ValueError("DataFrame (self.df) is not initialized.")

        all_columns = set(self.df.columns)

        if collection == "common":
            # רק העמודות שרלוונטיות לפילטרים שלך
            columns = {
                          "study_id",
                          "patients_age",
                          "view_position",
                          "image_laterality",
                          "breast_birads",
                          "breast_density",
                          "finding_categories",
                          "finding_birads"
                      } & all_columns  # נוודא שהן באמת קיימות
        elif collection == "distinct":
            # במידת הצורך, אפשר לשנות כאן אם רוצים עמודות אחרות
            columns = set()
        else:
            columns = set()

        if not include_file_path:
            columns = [col for col in columns if "file_path" not in col.lower()]

        return sorted(columns)

    def get_unique_values(self, mode="common"):
        """
        Get unique values for filtering options.

        Parameters
        ----------
        mode : str
            "common" - return common filters (non-abnormality)
            "distinct" - return only abnormality-related filters

        Returns
        -------
        dict
            Keys are in camelCase (for frontend), values are lists of unique values.
        """
        result = {}

        if mode == "common":
            for df_column in self.get_columns("common"):
                if df_column in self.df.columns:
                    values = self.df[df_column].dropna().unique().tolist()
                    camel_case_key = DF_COLUMN_TO_FILTER_KEY.get(df_column, df_column)
                    result[camel_case_key] = values
                    print(f"🟢 Filter option: {camel_case_key} → {values}")
                else:
                    print(f"⚠️ Column '{df_column}' not found in DataFrame")

        elif mode == "distinct":
            if "finding_categories" in self.df.columns:
                values = self.df["finding_categories"].dropna().unique().tolist()
                result["findingCategories"] = values
                print(f"🟢 Abnormality filter: findingCategories → {values}")
            else:
                print("⚠️ 'finding_categories' column missing in DataFrame")

        else:
            print(f"⚠️ Unknown mode '{mode}'")

        print(f"🔍 Unique values for filters: {result}")
        print("📤 JSON response to frontend:")
        print(json.dumps(result, indent=2))
        return result

    def get_patient_ids(self):
        if self.df is None:
            raise ValueError("DataFrame (self.df) is not initialized.")

        return self.df["study_id"].unique().tolist()
        
    def get_patients_data(self, keys_format: str = "camel", include_file_path : bool = False, patient_id = None):
        """
        Get data for all patients

        Parameters
        ----------
        keys_format: str
            The format of the keys in the data. Options are "camel", "snake", "camel_space", "upper-snake"
        include_file_path: bool
            Whether to include the file path columns in the data
        patient_id: str
            The patient id to get data for. If None, data for all patients is returned
        
        Returns
        -------
        dict
            The data for all patients
        """

        patients_data = self.df

        if patient_id:
            patients_data = patients_data[patients_data["study_id"] == patient_id]

        if not include_file_path:
            patients_data = patients_data[[col for col in patients_data.columns if "file_path" not in col]]
        
        patients_data = patients_data.dropna(axis=1, how="any")
        patients_data = patients_data.rename(columns={col: self.convert_key_format(col, keys_format) for col in self.df.columns})

        patients_dict = {}
        grouped = patients_data.groupby(self.convert_key_format('study_id', keys_format))

        for p_id, group in grouped:
            patient_list = [
                {k: v for k, v in row.items() if pd.notnull(v) and k != self.convert_key_format('study_id', keys_format)}
                for row in group.to_dict(orient='records')
            ]
            patients_dict[p_id] = patient_list

        return patients_dict

    def filter_patients(self, filters):
        """
        Filter patients data

        Parameters
        ----------
        filters: dict
            The filters to apply to the data

        Returns
        -------
        list
            The filtered study IDs (patient IDs)
        """
        filtered_df = self.df
        filter_options = filters.get("filterOptions", {})
        print("📌 filterOptions received:", filter_options)

        merged_filters = {}

        for filter_key, values in filter_options.items():
            df_column = FILTER_KEY_TO_DF_COLUMN.get(filter_key)
            if df_column:
                merged_filters[df_column] = values
                print(f"✅ Mapping '{filter_key}' → '{df_column}' with values: {values}")
            else:
                print(f"⚠️ No mapping found for: '{filter_key}' — skipping")

        if not merged_filters:
            print("⚠️ No valid filters applied, returning all patient IDs.")
            return self.get_patient_ids()

        for column, values in merged_filters.items():
            if column in filtered_df.columns:
                before = len(filtered_df)
                filtered_df = filtered_df[filtered_df[column].isin(values)]
                after = len(filtered_df)
                print(f"✅ Filtered by '{column}': {before} → {after} rows")
            else:
                print(f"❌ Column '{column}' not found in DataFrame")

        result_ids = filtered_df["image_id"].unique().tolist()
        print(f"✅ Returning {len(result_ids)} patientIds: {result_ids}")
        return result_ids

    def get_patients_data_for_ids(self, ids: list, keys_format: str = "camel", include_file_path: bool = False):
        """
        Get patients data for a list of study IDs
        """
        patients_data = self.df[self.df["study_id"].isin(ids)]

        if not include_file_path:
            patients_data = patients_data[[col for col in patients_data.columns if "file_path" not in col]]

        patients_data = patients_data.dropna(axis=1, how="any")
        patients_data = patients_data.rename(
            columns={col: self.convert_key_format(col, keys_format) for col in self.df.columns})

        patients_dict = {}
        grouped = patients_data.groupby(self.convert_key_format('study_id', keys_format))

        for p_id, group in grouped:
            patient_list = [
                {k: v for k, v in row.items() if
                 pd.notnull(v) and k != self.convert_key_format('study_id', keys_format)}
                for row in group.to_dict(orient='records')
            ]
            patients_dict[p_id] = patient_list

        return patients_dict

    def start(self, config):
        self.set_config(config)
        # self.set_calc_df()
        # self.set_mass_df()
        self.set_df()