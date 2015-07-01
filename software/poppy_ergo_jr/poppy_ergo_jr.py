from poppy.creatures import AbstractPoppyCreature

from .jump import Jump
from .dance import Dance

class PoppyErgoJr(AbstractPoppyCreature):
    @classmethod
    def setup(cls, robot):
        robot.attach_primitive(Dance(robot), 'dance')
        robot.attach_primitive(Jump(robot), 'jump')
