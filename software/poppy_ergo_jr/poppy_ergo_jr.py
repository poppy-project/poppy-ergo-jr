from numpy import sum
from functools import partial

from poppy.creatures import AbstractPoppyCreature
from poppy.creatures.ik import IKChain

from .primitives.dance import Dance
from .primitives.postures import (BasePosture, RestPosture,
                                  CuriousPosture, TetrisPosture,
                                  SafePowerUp)

from .primitives.ball_color_detection import (ColorBallDetection,
                                              ColoredBallsDetection)


class PoppyErgoJr(AbstractPoppyCreature):
    @classmethod
    def setup(cls, robot):
        robot._primitive_manager._filter = partial(sum, axis=0)

        robot.attach_primitive(SafePowerUp(robot), 'safe_power_up')

        robot.attach_primitive(Dance(robot), 'dance')

        robot.attach_primitive(BasePosture(robot, 2.), 'base_posture')
        robot.attach_primitive(RestPosture(robot, 2.), 'rest_posture')
        robot.attach_primitive(CuriousPosture(robot, 2.), 'curious_posture')
        robot.attach_primitive(TetrisPosture(robot, 2.), 'tetris_posture')

        for m in robot.motors:
            m.pid = (4, 2, 0)
            m.torque_limit = 70.
            m.led = 'off'

        robot.attach_primitive(ColoredBallsDetection(robot, 2),
                               'colored_balls_detection')

        robot.attach_primitive(ColorBallDetection(robot, 3),
                               'color_ball_detection')
