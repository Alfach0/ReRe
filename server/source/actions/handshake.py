import errors
from base import Action
from models import Session, Setting


class Handshake(Action):
    CONNECTION_LIMIT = '2 per minute'

    def _validate(self, request):
        super()._validate(request)
        validator = self._application.validator
        self.__userHost = str(self._application.http.userHost(request))
        self.__userAgent = str(self._application.http.userAgent(request))
        self.__userIp = str(self._application.http.userIp(request))

        if validator.isEmpty(self.__userHost):
            raise errors.Request('user_host')

        if validator.isEmpty(self.__userAgent):
            raise errors.Request('user_agent')

        if validator.isEmpty(self.__userIp):
            raise errors.Request('user_ip')

    def _process(self, request):
        token = self._application.hash.hex(
            self._application.random.salt(),
            self.__userHost,
            self.__userAgent,
            self.__userIp,
        )
        session = Session(
            user_host=self.__userHost,
            user_agent=self.__userAgent,
            user_ip=self.__userIp,
            token=token,
        )
        self._application.db.session.add(session)
        self._application.db.session.commit()
        setting = {
            'session-expire':
                Setting
                .query
                .filter_by(name='session-expire')
                .one().value,
            'identity-expire':
                Setting
                .query
                .filter_by(name='identity-expire')
                .one().value,
        }

        return {
            'token': token,
            'settings': setting,
        }