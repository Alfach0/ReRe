from hashlib import blake2b

from base import Component


class Hash(Component):
    def hex(self, *args):
        hexHash = blake2b()
        for arg in args:
            hexHash.update(str(arg).encode('utf-8'))
        return hexHash.hexdigest()
