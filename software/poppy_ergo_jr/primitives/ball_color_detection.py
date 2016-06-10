import numpy

colors = {
    'blue': numpy.array((80, 40, 10)),
    'black': numpy.array((15, 15, 15)),
    'orange': numpy.array((40, 90, 155))
}


def crop(image):
    return image[300:400, 400:500]


def mean_color(image):
    return image.mean(axis=(0, 1))


def get_ball_color(ergo_jr):
    image = ergo_jr.camera.frame.copy()
    ball = crop(image)
    color = mean_color(ball)

    dist = {c: numpy.linalg.norm(color - d)
            for c, d in colors.items()}

    color = min(dist, key=dist.key)
    confidence = dist[color]

    if confidence > 30:
        return 'Unknown'

    return color
