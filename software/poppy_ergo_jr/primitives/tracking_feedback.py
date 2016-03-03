from collections import deque

from pypot.primitive import LoopPrimitive


class TrackingFeedback(LoopPrimitive):
    def setup(self):
        self._old = False

    def update(self):
        if not hasattr(self, 'q'):
            self.q = deque([], 6)

        self.q.append(len(self.robot.marker_detector.markers) > 0)
        tracking = any(self.q)

        if tracking != self._old:
            for m in self.robot.tip:
                self.affect_once(m, 'led', 'green' if tracking else 'off')

            self._old = tracking

    def teardown(self):
        for m in self.robot.motors:
            m.led = 'off'
