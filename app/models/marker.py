from .db import db


class Marker(db.Model):
    __tablename__ = 'markerss'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    color = db.Column(db.String(7))
    lat = db.Column(db.Numeric(scale=13, asdecimal=False))
    lng = db.Column(db.Numeric(scale=13, asdecimal=False))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "lat": self.lat,
            "lng": self.lng
            }
