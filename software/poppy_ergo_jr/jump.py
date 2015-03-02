import time

from pypot.primitive import Primitive


class Jump(Primitive):
    def setup(self):
        self.up = {'m1': 0, 'm2': -10, 'm3': -20, 'm4': 0, 'm5': -35, 'm6': -35}
        self.down = {'m1': 0, 'm2': -75, 'm3': 55, 'm4': 0, 'm5': 35, 'm6': 35}

        for m in self.robot.motors:
            m.compliant = False
            m.pid = (10., 0., 0.)
            m.moving_speed = 0.

    def run(self):
        while not self.should_stop():
            if self.should_pause():
                self.wait_to_resume()

            for name, p in self.up.items():
                m = getattr(self.robot, name)
                m.moving_speed = 0
                m.goal_position = p
            time.sleep(.2)

            for name, p in self.down.items():
                m = getattr(self.robot, name)
                m.moving_speed = 250.
                m.goal_position = p
            time.sleep(.4)

    def teardown(self):
        for m in self.robot.motors:
            m.pid = (4., 0., 0.)
