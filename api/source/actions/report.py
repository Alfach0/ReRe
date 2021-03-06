from errors import Request
from .mixins import Identify


class Report(Identify):
    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        self.__message = self._get(request, 'message', '').strip()

        if validator.isempty(self.__message):
            raise Request('message', self.__message)

    def _process(self, request):
        storage = self._application.storage
        mail = self._application.mail

        token = self._session.token
        task_id = self._task.id
        subject = f'Report from {token} about task #{task_id}'
        mail.send(subject, self.__message)
        storage.push(
            self._session.account.uuid,
            '''
                Thank you for leaving report
                We're working on your issue
            ''',
        )
