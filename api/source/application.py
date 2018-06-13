import os
import time
import flask
import flask_limiter
import flask_cache
import flask_cors
import flask_mobility
import flask_mail
import functools
import werkzeug
import click
import logging
import logging.handlers

import base
import models
import actions
import components
import commands


class Application:
    def __init__(self, instance):
        self.__init(instance)
        self.__bind(instance)
        self.instance = instance

    def __getattr__(self, component):
        if component in self.__components:
            return self.__components[component]
        return None

    def call(self, action, request):
        if action in self.__actions:
            return self.__actions[action](request)
        return None

    def action(self, action, instance):
        try:
            return flask.jsonify(action(flask.request))
        except Exception as exception:
            if instance.debug:
                raise exception
            elif not isinstance(exception, base.Error):
                instance.logger.exception(exception)
            return flask.jsonify({})

    def before(self):
        pass

    def after(self, response):
        return response

    def __init(self, instance):
        instance.config.from_envvar('FLASK_SETTING')
        self.settings = instance.config

        with instance.app_context():
            for _ in range(0, self.settings['MAX_RECONNECTION_TRY']):
                try:
                    self.db = base.Alchemy
                    self.db.init_app(instance)
                    self.db.create_all()
                    self.db.session.commit()
                    break
                except Exception as exception:
                    time.sleep(self.settings['DEFAULT_SLEEP_TIME'])

            flask_cors.CORS(instance)
            flask_mobility.Mobility(instance)

            self.extensions = {}
            self.extensions['mail'] = flask_mail.Mail()
            self.extensions['mail'].init_app(instance)
            remote = flask_limiter.util.get_remote_address
            self.extensions['limiter'] = flask_limiter.Limiter(key_func=remote)
            self.extensions['limiter'].init_app(instance)
            self.extensions['cache'] = flask_cache.Cache(with_jinja2_ext=False)
            self.extensions['cache'].init_app(instance)

        if not instance.debug:
            for name, exception in werkzeug.exceptions.__dict__.items():
                if isinstance(exception, type):
                    if issubclass(exception, Exception):
                        instance.register_error_handler(
                            exception,
                            lambda exception: flask.jsonify({}),
                        )

        self.__components = {}
        for name, component in components.__dict__.items():
            if isinstance(component, type):
                if issubclass(component, base.Component):
                    self.__components[name.lower()] = component(self)

        self.__actions = {}
        for name, action in actions.__dict__.items():
            if isinstance(action, type):
                if issubclass(action, base.Action):
                    self.__actions[name.lower()] = action(self)

        for name, command in commands.__dict__.items():
            if isinstance(command, type):
                if issubclass(command, base.Command):
                    cmd = functools.partial(command.execute, command(self))
                    cmd.__name__ = command.NAME
                    cmd = click.command()(cmd)
                    cmd.short_help = command.DESCRIPTION
                    instance.cli.add_command(cmd)

        if not instance.debug:
            instance.logger.addHandler(
                logging.handlers.RotatingFileHandler('/var/logs/rectio.log'),
            )

    def __bind(self, instance):
        before = functools.partial(Application.before, self)
        after = functools.partial(Application.after, self)
        instance.before_request(before)
        instance.after_request(after)

        for alias, action in self.__actions.items():
            expire = action.CACHE_EXPIRE if not instance.debug else None
            bound = functools.partial(
                Application.action,
                self,
                action,
                instance,
            )
            bound.__name__ = alias
            bound.__module__ = action.__module__
            if not instance.debug:
                if action.CONNECTION_LIMIT is not None:
                    limiter = self.extensions['limiter']
                    bound = limiter.limit(action.CONNECTION_LIMIT)(bound)
                if action.CACHE_EXPIRE is not None:
                    cache = self.extensions['cache']
                    bound = cache.cached(action.CACHE_EXPIRE)(bound)
            rule = f'/{alias}'
            method = ['GET', 'POST'] if instance.debug else ['POST']
            instance.add_url_rule(view_func=bound, rule=rule, methods=method)


_ = Application(flask.Flask(__name__)).instance