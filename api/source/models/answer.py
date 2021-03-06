from datetime import datetime

from base import Alchemy


class Answer(Alchemy.Model):
    __tablename__ = 'answer'

    id = Alchemy.Column(
        Alchemy.Integer,
        nullable=False,
        primary_key=True,
    )
    result = Alchemy.Column(
        Alchemy.Boolean,
        nullable=False,
        index=True,
    )
    time_stamp = Alchemy.Column(
        Alchemy.DateTime,
        nullable=False,
        default=datetime.utcnow,
        server_default=Alchemy.func.now(),
        index=True,
    )
    task_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('task.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )
    option_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('option.id', ondelete='cascade'),
        index=True,
    )
    session_id = Alchemy.Column(
        Alchemy.Integer,
        Alchemy.ForeignKey('session.id', ondelete='cascade'),
        nullable=False,
        index=True,
    )
