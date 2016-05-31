import numpy

from collections import deque
from numpy.linalg import norm

from pypot.primitive import LoopPrimitive


class NotTooClose(LoopPrimitive):
    def setup(self):
        self.used_motors = [self.robot.m2, self.robot.m3, self.robot.m5]

        for m in self.used_motors:
            m.compliant = False
            m.moving_speed = 150

        self.d_filter = deque([], 50)

    def proximity(self, x):
        if numpy.isnan(x):
            x = 0.8

        front = numpy.array([30, -30, -35])
        rear = numpy.array([-70, 30, 40])

        delta = norm((front - rear).reshape(-1, 1), axis=1)
        delta *= [-1 if f > r else 1 for r, f in zip(rear, front)]

        pos = front + x * delta

        for m, p in zip(self.used_motors, pos):
            m.goal_position = p

    def distance(self):
        d = self.robot.sonar.distance

        if d > 1.0:
            return numpy.nan

        d = 1 - ((max(0.2, min(d, 0.5)) - 0.2) / 0.3 * 0.75)
        self.d_filter.append(d)
        return numpy.mean(self.d_filter)

    def update(self):
        self.proximity(self.distance())
