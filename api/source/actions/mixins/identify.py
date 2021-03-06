from errors import Identity as _Identity_
from models import Task
from .access import Access


class Identify(Access):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        storage = self._application.storage

        identity = storage.get(self._session.token)
        if identity is None \
                or 'timestamp' not in identity \
                or not validator.isnumeric(identity['timestamp']) \
                or 'task_id' not in identity \
                or not validator.isnumeric(identity['task_id']) \
                or 'answered' not in identity \
                or not validator.isboolean(identity['answered']) \
                or 'token' not in identity \
                or self._session.token != identity['token']:
            raise _Identity_()

        self._timestamp = float(identity['timestamp'])
        self._task = Task.query.get(int(identity['task_id']))
        if self._task is None:
            raise _Identity_()
