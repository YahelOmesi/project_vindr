from flask import Blueprint, send_file, request, abort, jsonify
from App import series_mng
from collections import OrderedDict


images_bp = Blueprint('images', __name__)


@images_bp.route('/<patient_id>/images-metadata', methods=['GET'])
def get_image_metadata(patient_id):
    image_format = request.args.get('format')
    print(f"🟡 image_format: {image_format}, patient_id: {patient_id}")

    if not image_format:
        return abort(400, description="Missing image format")

    series_instance_uids = series_mng.get_patient_series_instance_uids(patient_id, image_format)
    print(f"🟡 series_instance_uids found: {series_instance_uids}")

    images_metadata = []
    image_count = 0

    for uid in series_instance_uids:
        sop_uids = series_mng.series[
            series_mng.series["SeriesInstanceUID"] == uid
        ]["SOPInstanceUID"].tolist()

        print(f"📸 For series_UID={uid}, found sop_uids: {sop_uids}")

        metadata = {
            "uid": uid,
            "sopUIDs": sop_uids,
            "imageFormat": image_format
        }

        images_metadata.append(metadata)
        image_count += 1

    response = {
        "imagesMetadata": images_metadata,
        "imageCount": image_count
    }

    print("🟢 Returning metadata response:", response)
    return jsonify(response), 200


@images_bp.route('/full', methods=['GET'])
def get_image():
    series_UID = request.args.get('series_UID')
    sop_uid = request.args.get('sop_uid')

    print(f"🖼️ Request to load image: series_UID={series_UID}, sop_uid={sop_uid}")

    if not series_UID or not sop_uid:
        return abort(400, description="Missing UID or SOP UID")

    res = series_mng.get_image_by_uids(series_UID, sop_uid)
    if isinstance(res, tuple):
        return abort(res[1], description=res[0])

    print(f"📂 Image file path: {res}")
    return send_file(res, mimetype="image/jpeg"), 200

@images_bp.route('/series/full', methods=['GET'])
def get_all_series_with_image_ids():
    image_format = request.args.get('format', 'full')
    df = series_mng.get_series(image_format=image_format)

    result = []

    for _, row in df.iterrows():
        result.append({
            "image_id": row["image_id"],
            "study_id": row["study_id"],
            "series_id": row["series_id"],
            "patients_age": row["patients_age"],
            "view_position": row["view_position"],
            "image_laterality": row["image_laterality"],
            "breast_birads": row["breast_birads"],
            "breast_density": row["breast_density"],
            "finding_categories": row["finding_categories"],
            "finding_birads": row["finding_birads"]
        })

    return jsonify(result), 200



