from pypot.primitive import Primitive


class SimplePosture(Primitive):
    def __init__(self, robot, duration):
        Primitive.__init__(self, robot)

        self.duration = duration

    def run(self):
        if not hasattr(self, 'target_position'):
            raise NotImplementedError('You have to define "target_position" first!')

        for m in self.robot.motors:
            m.compliant = False

        self.robot.goto_position(self.target_position, self.duration, wait=True)


class BasePosture(SimplePosture):
    @property
    def target_position(self):
        return dict([(m.name, 0.) for m in self.robot.motors])


class RestPosture(SimplePosture):
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
