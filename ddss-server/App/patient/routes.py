import json
from flask import Blueprint, abort, jsonify, request
from App import data_mng

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/', methods=['GET'])
def patients():
    response = data_mng.get_patients_data()
    return jsonify(response), 200

@patients_bp.route('/<patient_id>', methods=['GET'])
def patient(patient_id):
    response = data_mng.get_patients_data("camel", False,patient_id)
    return jsonify(response), 200


@patients_bp.route('/filter', methods=['GET'])
def filter_patients():
    filters = request.args.get('filters')
    if not filters:
        return abort(400, description="Missing filters")

    filters_dict = json.loads(filters)
    study_ids = data_mng.filter_patients(filters_dict)
    print("📥 Received filters:", filters_dict)
    print("🎯 Total study_ids after filter:", len(study_ids), study_ids)

    df = data_mng.df
    print("🧾 Total df rows:", len(df))
    print("📋 Unique study_ids in df:", df["study_id"].unique().tolist())

    study_ids_filtered = df[df["study_id"].isin(study_ids)]["study_id"].unique().tolist()
    print("🖼️ Total study_ids returned:", len(study_ids_filtered), study_ids_filtered)

    return jsonify({"patientsIds": study_ids_filtered}), 200


