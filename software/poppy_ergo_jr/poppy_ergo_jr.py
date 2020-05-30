from numpy import sum
from functools import partial
from time import sleep

from pypot.creatures import AbstractPoppyCreature
from pypot.creatures.ik import IKChain

from .primitives.dance import Dance
from .primitives.face_tracking import FaceTracking
from .primitives.tracking_feedback import TrackingFeedback
from .primitives.postures import (BasePosture, RestPosture,
                                  CuriousPosture, TetrisPosture,
                                  SafePowerUp)
from .primitives.How_to_add_primitive_FR import (Tinsel, Tetu, Poule, Puzzel)


class PoppyErgoJr(AbstractPoppyCreature):
    @classmethod
    def setup(cls, robot):
        robot._primitive_manager._filter = partial(sum, axis=0)

        c = IKChain.from_poppy_creature(robot,
                                        motors=robot.motors,
                                        passiv=[],
                                        tip=[0, 0, -0.07])

        robot.chain = c

        robot.attach_primitive(SafePowerUp(robot), 'safe_power_up')

        robot.attach_primitive(Dance(robot), 'dance')

        robot.attach_primitive(BasePosture(robot, 2.), 'base_posture')
        robot.attach_primitive(RestPosture(robot, 2.), 'rest_posture')
        robot.attach_primitive(CuriousPosture(robot, 2.), 'curious_posture')
        robot.attach_primitive(TetrisPosture(robot, 2.), 'tetris_posture')

        robot.attach_primitive(Tinsel(robot), 'tinsel_demo')
        robot.attach_primitive(Tetu(robot), 'stubborn_demo')
        robot.attach_primitive(Poule(robot), 'chicken_demo')
        robot.attach_primitive(Puzzel(robot), 'puzzel_demo')

        if not robot.simulated and hasattr(robot, 'marker_detector'):
            robot.attach_primitive(TrackingFeedback(robot, 25.),
                                   'tracking_feedback')

        for m in robot.motors:
            m.pid = (4, 2, 0)
            m.torque_limit = 70.
            m.led = 'off'

        if not robot.simulated and hasattr(robot, 'face_tracking'):
            robot.attach_primitive(FaceTracking(robot, 10,
                                                robot.face_detector),
                                   'face_tracking')

        for m in robot.motors:
            m.led = 'green'
            sleep(0.2)
            m.led = 'off'
