"""
hmac_auth
==================

This module provides HMAC HTTP authentication for Flask routes.

:copyright: (C) 2016 by Dawid Jurkiewicz.
:license:   MIT, see LICENSE for more details.
"""

from functools import wraps
from flask import request
from little_hero_rest_api import settings
import hmac
import hashlib
import base64
from werkzeug.exceptions import Unauthorized
import time
from little_hero_rest_api.settings import ENABLE_AUTHORIZATION

__version__ = '1.0'


class HMACAuth(object):
    def protected(self, f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            # todo: regex checking if authorization header is ok
            if ENABLE_AUTHORIZATION:
                posix_time, nonce, digest = request.headers['Authorization'].split()[1].split(':', 2)
                method = request.method
                path = request.path
                message = (method + '+' + path + '+' + posix_time + '+' + nonce).encode('utf-8')
                secret_key = settings.SECRET_KEY.encode('utf-8')
                server_digest = hmac.new(secret_key, message, hashlib.sha1).digest()
                encoded_server_digest = base64.b64encode(server_digest).decode('utf-8')

                if digest != encoded_server_digest:
                    raise Unauthorized('Unauthorized access!')

                if int(time.time()) - int(posix_time) > 600:
                    raise Unauthorized('The same digest was used in the past. Warning: This could be replay attack!')

            return f(*args, **kwargs)
        return wrapper
