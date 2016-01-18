import time

from poppy.creatures import PoppyErgoJr
from threading import Thread

jr = PoppyErgoJr(simulator='threejs', use_http=True)

# Magie Python pour lancer le server web en background

t = Thread(target=jr.http.run)
t.daemon = True
t.start()

jr.dance.start()

while True:
    time.sleep(1000)
