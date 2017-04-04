#!/usr/bin/env python

import re
import sys

from setuptools import setup, find_packages


def version():
    with open('poppy_ergo_jr/_version.py') as f:
        return re.search(r"^__version__ = ['\"]([^'\"]*)['\"]", f.read()).group(1)

extra = {}
if sys.version_info >= (3,):
    extra['use_2to3'] = True

setup(name='poppy-ergo-jr',
      version=version(),
      packages=find_packages(),

      install_requires=['pypot >= 3', 'hampy'],

      include_package_data=True,
      exclude_package_data={'': ['README', '.gitignore']},

      zip_safe=False,

      author='https://github.com/poppy-project/poppy-ergo-jr/graphs/contributors',
      author_email='pierre.rouanet@gmail.com',
      description='Poppy Ergo Jr Software Library',
      url='https://github.com/poppy-project/poppy-ergo-jr',
      license='GNU GENERAL PUBLIC LICENSE Version 3',

      **extra
      )
