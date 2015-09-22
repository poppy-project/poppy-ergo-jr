import cv2

from poppy.creatures import PoppyErgoJr

if __name__ == '__main__':
    jr = PoppyErgoJr()

    while True:
        img = jr.camera.frame

        for m in jr.marker_detector.markers:
            m.draw_contour(img)

        cv2.imshow('live', img)
        cv2.waitKey(100)
