from pypot.primitive import LoopPrimitive


class FaceTracking(LoopPrimitive):
    def __init__(self, robot, freq, face_detector):
        LoopPrimitive.__init__(self, robot, freq)

        self.face_detector = face_detector

        self.dx, self.dy = 60, 50
        self._tracked_face = None

    def setup(self):
        self.robot.rest_posture.start()
        self.robot.rest_posture.wait_to_stop()

        for m in self.robot._robot.motors:
            m.led = 'yellow'

        self.rest_pos = {m.name: m.present_position for m in self.robot.motors}
        for m in [self.robot.m1, self.robot.m5]:
            m.moving_speed = 50.

        # TODO: That's a really nasty way to circumvent prim sandboxing
        # How should we do that in a more elegant way?
        img = getattr(self.face_detector._robot,
                      self.face_detector._names[0]).frame
        self.img_size = tuple(reversed(img.shape[:2]))

    def update(self):
        faces = self.face_detector.faces

        # use filter to keep only closest faces to preivoulsy tracked one

        if faces:
            x, y = faces[0].center
            x = (float(x) / self.img_size[0]) * 2 - 1
            y = (float(y) / self.img_size[1]) * 2 - 1

            self.robot.m1.goal_position = self.rest_pos['m1'] -x * self.dx
            self.robot.m5.goal_position = self.rest_pos['m5'] + y * self.dy

    def teardown(self):
        for m in self.robot._robot.motors:
            m.led = 'off'
