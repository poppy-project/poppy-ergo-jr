from poppy.creatures import AbstractPoppyCreature

from .jump import Jump


class PoppyErgoJr(AbstractPoppyCreature):
    @classmethod
    def setup(cls, robot):
        robot.attach_primitive(Jump(robot), 'jump')
