from pypot.primitive.utils import SimplePosture


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
