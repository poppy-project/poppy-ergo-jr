import cv2
import time

from pypot.primitive import Primitive, LoopPrimitive


rgb_ranges = {
    'blue': ((50, 0, 0), (255, 75, 25)),
    'green': ((0, 100, 0), (100, 255, 100)),
    'red': ((0, 0, 50), (50, 50, 255)),
}


class ColorBallDetection(Primitive):
    def crop(self, image):
        return image  # [100:300, 250:450]

    def mean_color(self, image):
        return image.mean(axis=(0, 1))

    def get_color(self):
        img = self.robot.camera.frame

        score = {}

        for color, (lower, upper) in rgb_ranges.items():
            mask = cv2.inRange(img, lower, upper)
            mask = cv2.erode(mask, None, iterations=4)

            score[color] = mask.sum()

        return max(score, key=score.get)


class ColoredBallsDetection(LoopPrimitive):
    def setup(self):
        params = cv2.SimpleBlobDetector_Params()

        params.filterByArea = True
        params.minArea = 5000
        params.maxArea = 50000

        params.filterByCircularity = True
        params.minCircularity = 0.25
        params.maxCircularity = 1.0

        params.filterByColor = False

        params.filterByConvexity = True
        params.minConvexity = 0.25
        params.maxConvexity = 1.0

        params.filterByInertia = False

        self.detector = cv2.SimpleBlobDetector_create(params)

        self.last_detection = []
        self.best_detection = []
        self.last_timestamp = 0
        self.history = 30  # in sec.

        self.led_motors = [self.robot.m2, self.robot.m3, self.robot.m4]

    def update(self):
        balls = self.detect_balls(self.robot.camera.frame)
        colors = self.color_from_detected_balls(balls)

        if colors:
            self.last_timestamp = time.time()

        for c, m in zip(colors + ['off'] * (3 - len(colors)),
                        self.led_motors):
            m.led = c

        self.last_detection = colors

        if len(colors) >= len(self.best_detection):
            # for c, m in zip(colors, self.led_motors):
            #     m.led = c
            self.best_detection = colors

        if time.time() - self.last_timestamp > self.history:
            # for m in self.led_motors:
            #     m.led = 'off'
            self.best_detection = []

    def detect_balls(self, img):
        balls = {}

        for color, (lower, upper) in rgb_ranges.items():
            mask = cv2.inRange(img, lower, upper)
            mask = cv2.dilate(mask, None, iterations=2)
            mask = cv2.erode(mask, None, iterations=5)

            kp = self.detector.detect(mask)
            balls[color] = kp

        return balls

    def color_from_detected_balls(self, balls):
        colors = []

        for b, kp in balls.items():
            for _ in range(len(kp)):
                colors.append(b)

        return colors

    @property
    def json_balls(self):
        return ';'.join(self.best_detection)
