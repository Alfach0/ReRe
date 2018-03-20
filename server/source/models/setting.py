from base import Alchemy


class Setting(Alchemy.Model):
    __tablename__ = 'setting'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    name = Alchemy.Column(
        Alchemy.String,
        nullable=False,
        unique=True,
    )
    value = Alchemy.Column(
        Alchemy.String,
        default=None,
        server_default=Alchemy.text('null'),
    )