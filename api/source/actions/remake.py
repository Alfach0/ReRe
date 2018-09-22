from base import Constant
from models import Answer, Effect, Task
from .mixins import Crypto, FSingle, Identify, Registration, Score


class Remake(Identify, Registration, FSingle, Crypto, Score):
    CONNECTION_LIMIT = Constant.RIGID_CONNECTION_LIMIT
    CACHE_EXPIRE = None

    def _process(self, request):
        db = self._application.db
        datetime = self._application.datetime
        c_hash = self._application.hash
        random = self._application.random
        settings = self._application.settings

        self._calculate(-settings[Constant.SETTING_SMALL_SCORE_UNIT])

        effects = Effect.query \
            .order_by(db.func.random()) \
            .limit(settings[Constant.SETTING_EFFECT_COUNT]).all()
        label = c_hash.hex(
            c_hash.VIEW_DIGEST,
            datetime.timestamp(),
            random.salt(),
            self._task.subject.id,
            (option.id for option in self._task.options),
            (effect.id for effect in effects),
        )
        task = Task(
            label=label,
            subject_id=self._task.subject_id,
        )
        task.options = self._task.options
        task.effects = effects
        db.session.add(task)
        db.session.commit()
        return super()._registrate(task, False)

    def _calculate(self, unit):
        db = self._application.db
        answer = Answer(
            result=False,
            task_id=self._task.id,
            option_id=None,
            session_id=self._session.id,
        )
        db.session.add(answer)
        super()._calculate(unit, True)
