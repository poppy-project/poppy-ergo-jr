from pypot.primitive import LoopPrimitive


class HeadFollow(LoopPrimitive):
    def __init__(self, robot, freq, detector, tracked_id):
        LoopPrimitive.__init__(self, robot, freq)

        self.dx, self.dy = 60, 50

        def get_marker_pos():
            marker = [m.position for m in getattr(detector, 'markers')
                      if m.id == tracked_id]

            if len(marker) == 1:
                return marker[0]

            return None

        self.get_marker_pos = get_marker_pos

    def setup(self):
        self.robot.rest_posture.start()
        self.robot.rest_posture.wait_to_stop()

        self.rest_pos = {m.name: m.present_position for m in self.robot.motors}
        for m in [self.robot.m1, self.robot.m2]:
            m.moving_speed = 50.

    def update(self):
        c = self.get_marker_pos()

        if c is not None:
            x, y = c

            self.robot.m1.goal_position = self.rest_pos['m1'] - x * self.dx
            self.robot.m2.goal_position = self.rest_pos['m2'] + y * self.dy

    def teardown(self):
        self.robot.rest_posture.start()
        self.robot.rest_posture.wait_to_stop()
