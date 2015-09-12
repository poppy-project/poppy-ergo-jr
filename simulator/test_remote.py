from poppy.creatures import PoppyErgoJr

jr = PoppyErgoJr(simulator='threejs', use_http=True)

# Magie Python pour lancer le server web en background
from threading import Thread
t = Thread(target=jr.http.run)
t.daemon = True
t.start()

jr.dance.start()
