import cv2
import time
import pylab
import psutil

from contextlib import closing
from numpy import mean, std

from pypot.primitive.utils import PositionWatcher
from poppy.creatures import PoppyErgoJr
from hampy import detect_markers

D = 10

cpu = []

if __name__ == '__main__':
    psutil.cpu_percent()
    time.sleep(.5)

    with closing(PoppyErgoJr()) as jr:
        jr.rest_posture.start()
        jr.rest_posture.wait_to_stop()

        traj_rec = PositionWatcher(jr, 25., jr.motors)

        jr.dance.start()
        traj_rec.start()

        t0 = time.time()
        while time.time() - t0 < D:
            cpu.append(psutil.cpu_percent())

            img = jr.camera.frame
            markers = detect_markers(img)
            for m in markers:
                m.draw_contour(img)

            time.sleep(.1)

        jr.dance.stop()
        traj_rec.stop()

        print('CPU M={}% (STD={})'.format(mean(cpu) * 4, std(cpu) * 4))

        fig = pylab.figure()
        ax = pylab.axes()
        traj_rec.plot(ax)
        pylab.show()
        fig.savefig('bench.png')
