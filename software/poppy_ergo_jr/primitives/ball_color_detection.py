import numpy

from pypot.primitive import Primitive


colors = {
    'blue': numpy.array((80, 40, 10)),
    'black': numpy.array((15, 15, 15)),
    'orange': numpy.array((40, 90, 155))
}


class ColorBallDetection(Primitive):
    def crop(self, image):
        return image[300:400, 400:500]

    def mean_color(self, image):
        return image.mean(axis=(0, 1))

    def get_color(self):
        image = self.robot.camera.frame.copy()
        ball = self.crop(image)
        color = self.mean_color(ball)

        dist = {c: numpy.linalg.norm(color - d)
                for c, d in colors.items()}

        color = min(dist, key=dist.get)
        confidence = dist[color]

        if confidence > 30:
            return 'Unknown'

        return color
