import cv2
import time

from pypot.primitive import Primitive, LoopPrimitive


rgb_ranges = {
    'blue': ((65, 0, 0), (255, 110, 110)),
    'green': ((0, 80, 0), (120, 255, 120)),
    'red': ((0, 0, 90), (100, 100, 255)),
}

better_rgb_ranges = {
    'blue': ((50, 0, 0), (255, 75, 25)),
    'green': ((0, 100, 0), (100, 255, 100)),
    'red': ((0, 0, 50), (50, 50, 255)),
}

hsv_min, hsv_max = ((0, 75, 75), (255, 255, 255))


class ColorBallDetection(Primitive):
    def crop(self, image):
        return image

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

    def get_centroid(self, color=None, threshold=3000):
        img = self.robot.camera.frame
        score = {}
        masks = {}
        if color is not None:
            mask = cv2.inRange(img, rgb_ranges[color][0], rgb_ranges[color][1])
        else:
            for _color, (lower, upper) in rgb_ranges.items():
                masks[_color] = cv2.inRange(img, lower, upper)
                masks[_color] = cv2.erode(masks[_color], None, iterations=4)
                score[_color] = masks[_color].sum()
            color = max(score, key=score.get)
            mask = masks[color]
        if score[color] < threshold:
            return "0;0"
        else:
            moments = cv2.moments(mask, True)
            cx = moments['m10'] / moments['m00']
            cy = moments['m01'] / moments['m00']
            return "%s;%s" % (cx * 100 / img.shape[1], cy * 100 / img.shape[0])


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
        self.history = 15  # in sec.

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
            self.best_detection = colors

        if time.time() - self.last_timestamp > self.history:
            self.best_detection = []

    def detect_balls(self, img):
        balls = {}

        # hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        # hsv_mask = cv2.inRange(hsv, hsv_min, hsv_max)
        #
        # img[hsv_mask < 255] = (0, 0, 0)

        for color, (lower, upper) in better_rgb_ranges.items():
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
