import time

from pypot.primitive import LoopPrimitive
from pypot.primitive.utils import Sinus

class Dance(LoopPrimitive):
    def __init__(self, robot):
        LoopPrimitive.__init__(self, robot, 1.)

    def setup(self):
        for m in self.robot.motors:
            m.compliant = False
            m.moving_speed = 0.

        self.sinus = [
            Sinus(self.robot, 50., [self.robot.m1], amp=90., freq=0.25),
            Sinus(self.robot, 50., [self.robot.m4], amp=90., freq=0.25, phase=180.),

            Sinus(self.robot, 50., [self.robot.m5], amp=30, freq=.8),
            Sinus(self.robot, 50., [self.robot.m6], amp=30, freq=.8, phase=180),

            Sinus(self.robot, 50., self.robot.motors, amp=10, freq=.1)
        ]

        [s.start() for s in self.sinus]

    def update(self):
        pass

    def teardown(self):
        [s.stop() for s in self.sinus]
