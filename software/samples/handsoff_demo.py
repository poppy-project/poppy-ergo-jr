#!/usr/bin/env python

import cv2
import sys
import time

from contextlib import closing
from collections import deque

from poppy.creatures import PoppyErgoJr
from pypot.primitive import LoopPrimitive
from poppy_ergo_jr.postures import IdleBreathing


RETRY = 5.0


def make_jr_or_die_trying():
    while True:
        try:
            jr = PoppyErgoJr()
            break
        except (IndexError, ValueError, OSError):
            print('Tries to connect to the ErgoJr failed!'
                  ' Retry in {}s...'.format(RETRY))
            time.sleep(RETRY)
        # except (EnvironmentError):
            # print('You most likely have to unplug/replug your ErgoJr!')
            # sys.exit(1)

    print('Sucessfully connected to the ErgoJr!')
    return jr


class DemoMode(LoopPrimitive):
    def setup(self):
        self.dance_marker = 233511930
        self.state = 'breathing'
        self._seen_faces = deque([], 30)

        self.breathing = IdleBreathing(self.robot, 1.)
        self.breathing.start()

    def update(self):
        self._seen_faces.append(len(self.robot.face_detector.faces) > 0)

        if self.state == 'breathing':
            marker = [m for m in self.robot.marker_detector.markers
                      if m.id == self.dance_marker]

            if marker:
                self.breathing.stop()

                self.state = 'dancing'
                self.robot.dance.start()

            if sum(self._seen_faces) > .75 * self._seen_faces.maxlen:
                self.state = 'tracking'
                self.breathing.stop()
                self.robot.face_tracking.start()

        elif self.state == 'dancing':
            if self.robot.dance.elapsed_time > 10:
                self.robot.dance.stop()

                self.state = 'breathing'
                self._seen_faces.clear()
                self.breathing.start()

        elif self.state == 'tracking':
            if sum(self._seen_faces) < .25 * self._seen_faces.maxlen:
                self.robot.face_tracking.stop()
                self._seen_faces.clear()

                self.state = 'breathing'
                self.breathing.start()

        img = self.robot.camera.frame
        for face in self.robot.face_detector.faces:
            face.draw(img)
        cv2.imshow('live', img)
        cv2.waitKey(10)

    def teardown(self):
        self.breathing.stop()


if __name__ == '__main__':
    with closing(make_jr_or_die_trying()) as jr:
        demo = DemoMode(jr, 5.)

        print('Slowly raising...')
        jr.safe_power_up.start()
        jr.safe_power_up.wait_to_stop()

        print('Starting the demo mode!')
        demo.start()

        try:
            while True:
                time.sleep(1000)
        except KeyboardInterrupt:
            print('Stopping demo and leaving.')
            demo.stop()
