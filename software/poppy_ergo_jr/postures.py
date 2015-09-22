from pypot.primitive import Primitive, LoopPrimitive
from pypot.primitive.utils import SimplePosture, Sinus


class BasePosture(SimplePosture):
    @property
    def target_position(self):
        return dict([(m.name, 0.) for m in self.robot.motors])


class RestPosture(SimplePosture):
    @property
    def leds(self):
        return {m: 'blue' for m in self.robot.motors}

    @property
    def target_position(self):
        return {
            'm1': 0.,
            'm2': -65.,
            'm3': 55.,
            'm4': 0.,
            'm5': -20.,
            'm6': 20.,
        }


class IdlePosture(SimplePosture):
    @property
    def target_position(self):
        return {
            'm1': 0.0,
            'm2': -110.,
            'm3': 65.0,
            'm4': 0.0,
            'm5': 34.0,
            'm6': 20.0,
        }

    @property
    def leds(self):
        return {m: 'blue' for m in self.robot.motors}

class IdleBreathing(LoopPrimitive):
    def setup(self):
        self.idle = IdlePosture(self.robot, 1.0)
        self.idle.start()
        self.idle.wait_to_stop()

        self.sinus = [
            Sinus(self.robot, 10., [self.robot.m3, ], amp=5, freq=.1,
                  offset=self.robot.m3.present_position),
            Sinus(self.robot, 10., [self.robot.m5], amp=10, freq=.1,
                  offset=self.robot.m5.present_position, phase=3.14),
        ]
        import time
        time.sleep(2)
        [s.start() for s in self.sinus]

        for m in self.robot.motors:
            m.led = 'blue'

    def update(self):
        pass

    def teardown(self):
        for m in self.robot.motors:
            m.led = 'off'
        [s.stop() for s in self.sinus]

        self.idle.start()
        self.idle.wait_to_stop()


class SafePowerUp(Primitive):
    def run(self):
        idle_prim = IdlePosture(self.robot, 3.0)
        idle_prim.start()
        idle_prim.wait_to_stop()

    def teardown(self):
        for m in self.robot.motors:
            m.moving_speed = 0.
