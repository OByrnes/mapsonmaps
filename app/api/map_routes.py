from flask import Blueprint, jsonify
from app.models import Marker
from app.config import Config

map_routes = Blueprint("maps", __name__)


@map_routes.route("/markers")
def getMarkers():
    markers = Marker.query.all()
    return {"markers": [marker.to_dict() for marker in markers], "k":Config.REACT_APP_GOOGLE_MAPS_API}
