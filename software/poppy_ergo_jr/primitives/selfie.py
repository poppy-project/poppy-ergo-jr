import cv2
import json
import subprocess

from pypot.primitive import Primitive


class Selfie(Primitive):
    def post(self, user):
        self.upload_cmd = (
            'twurl -H upload.twitter.com -X POST /1.1/media/upload.json '
            '--file {path} --file-field media'
        )

        self.post_cmd = (
            'twurl -H api.twitter.com -X POST '
            '/1.1/statuses/update.json?status={status}&media_ids={media_id}'
        )

        cv2.imwrite('/tmp/selfie.jpg', self.robot.camera.frame)
        cmd = self.upload_cmd.format(path='/tmp/selfie.jpg')
        s = subprocess.check_output(cmd.split(' '))
        media_id = json.loads(s)['media_id']

        cmd = self.post_cmd.format(media_id=media_id, status='XXX').split(' ')
        cmd[-1] = cmd[-1].replace('XXX', 'Un #selfie pour @{}'.format(user))
        subprocess.call(cmd)
