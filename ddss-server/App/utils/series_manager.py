import pandas as pd
from pathlib import Path
import requests
import os
import pydicom
from pydicom.pixel_data_handlers.util import apply_voi_lut
import numpy as np
from PIL import Image
from io import BytesIO

class SeriesManager:
    def __init__(self):
        self.series: pd.DataFrame = None
        self.config = None

    def set_config(self, config):
        self.config = config

    def get_base_url(self, route: str, params: list = []) -> str:  
        base = self.config["base_url"]
        
        if route == "getSeries" and len(params) == 1:
            return base + "getSeries?Collection=" + params[0]
        elif route == "getSingleImage" and len(params) == 2:
            return base + "getSingleImage?SeriesInstanceUID=" + params[0] + "&SOPInstanceUID=" + params[1]
        elif route == "getSOPInstanceUIDs" and len(params) == 1:
            return base + "getSOPInstanceUIDs?SeriesInstanceUID=" + params[0]
        elif route == "getImage" and len(params) == 1:
            return base + "getImage?NewFileNames=Yes&SeriesInstanceUID=" + params[0]
        return base

    def load_series(self, path=None):
        import pandas as pd
        print("📁 Entered load_series")
        # אם לא התקבל path מבחוץ – לקחת מ־config
        if path is None:
            path = self.config.get("vindr_file_path", "data/vindr.csv")

        print(f"📁 Loading series from: {path}")

        df = pd.read_csv(path)
        # קטע בדיקה: כמה מטופלות ייחודיות יש וכמה שורות לכל אחת
        print("📊 Unique study_id count:", df["study_id"].nunique())
        print("📊 Rows per study_id:\n", df["study_id"].value_counts())

        df["SOPInstanceUID"] = df["image_id"].apply(lambda x: x.split("/")[-1].replace(".dcm", ""))
        df["SeriesInstanceUID"] = df["series_id"]
        df["StudyInstanceUID"] = df["study_id"]
        df["SeriesDescription"] = df["view_position"]
        df["PatientID"] = df["study_id"]

        print("✅ df columns:", df.columns)
        print("✅ df shape:", df.shape)
        print("✅ series sample:", df.head())

        self.series = df[[
            "image_id",
            "study_id",
            "series_id",
            "patients_age",
            "view_position",
            "image_laterality",
            "breast_birads",
            "breast_density",
            "finding_categories",
            "finding_birads",
            "SOPInstanceUID",
            "SeriesInstanceUID",
            "StudyInstanceUID",
            "SeriesDescription"
        ]]

        print("✅ self.series is now:")
        print(self.series.head())

    def get_series(self, image_format: str):
        return self.series

    def get_patient_series_instance_uids(self, patient_id: str, image_format: str):
        patients_series = self.get_series(image_format)
        patient_series = patients_series[patients_series["study_id"].str.contains(patient_id)]
        unique_series = patient_series.drop_duplicates(subset="SeriesInstanceUID")

        return list(unique_series["SeriesInstanceUID"])

    def get_sop_uids(self, uid: str):
        response = requests.get(self.get_base_url(route="getSOPInstanceUIDs", params=[uid]), timeout=10)
        if not response or response.status_code != 200:
            return None
        
        response = response.json()
        result = []
        for item in response:
            result.append(item["SOPInstanceUID"])
        return result

    def get_image_metadata(self, uid: str):
        patient_id = self.series[self.series["SeriesInstanceUID"] == uid]["PatientID"].values[0]
        sop_uids = self.series[self.series["SeriesInstanceUID"] == uid]["SOPInstanceUID"].tolist()

        # ניקח את ה־view וה־side של השורה הראשונה כי הן זהות לכל הסדרה
        view = self.series[self.series["SeriesInstanceUID"] == uid]["SeriesDescription"].values[0]
        side = self.series[self.series["SeriesInstanceUID"] == uid]["image_laterality"].values[0]

        metadata = {
            "uid": uid,
            "sopUIDs": sop_uids,
            "imageFormat": "full",
            "view_position": view,
            "image_laterality": side,
        }

        response = {
            "imagesMetadata": [metadata],
            "imageCount": len(sop_uids)
        }

        return response

    def get_image_by_uids(self, uid: str, sop_uid: str):
        # נאתר את ה־study_id המתאים ל־series_uid (uid)
        study_id = self.series[self.series["SeriesInstanceUID"] == uid]["StudyInstanceUID"].values[0]

        root_dir = os.path.dirname(os.path.abspath(__file__))
        image_path = os.path.join(root_dir, '..', '..', 'data', 'vindr-images', study_id, f"{sop_uid}.dicom")

        if not os.path.exists(image_path):
            print("❌ Image not found at:", image_path)
            return "Image not found", 404

        dcm = pydicom.dcmread(image_path)
        image = apply_voi_lut(dcm.pixel_array, dcm)

        image = image - np.min(image)
        image = (image / np.max(image) * 255).astype(np.uint8)

        pil_image = Image.fromarray(image)

        img_io = BytesIO()
        pil_image.save(img_io, 'JPEG')
        img_io.seek(0)
        return img_io

    def start(self, config):
        self.set_config(config)
        self.load_series(self.config["vindr_file_path"])
