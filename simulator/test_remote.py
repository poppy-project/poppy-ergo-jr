import time
import signal
import sys

from poppy.creatures import PoppyErgoJr
from threading import Thread

jr = PoppyErgoJr(simulator='threejs', use_http=True)

t = Thread(target=jr.http.run)
t.daemon = True
t.start()

print('PoppyErgoJr simulation started')

jr.dance.start()


def signal_handler(signal, frame):
    print('\nExiting viewer')
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)
print('Press Ctrl+c to quit')
signal.pause()
