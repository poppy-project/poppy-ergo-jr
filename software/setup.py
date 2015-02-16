#!/usr/bin/env python

import re
import sys

from setuptools import setup, find_packages


def version():
    with open('poppy_ergo_mini/_version.py') as f:
        return re.search(r"^__version__ = ['\"]([^'\"]*)['\"]", f.read()).group(1)

extra = {}
if sys.version_info >= (3,):
    extra['use_2to3'] = True

setup(name='poppy-ergo-mini',
      version=version(),
      packages=find_packages(),

      install_requires=['pypot >= 2.2', 'poppy-creature'],

      setup_requires=['setuptools_git >= 0.3', ],

      include_package_data=True,
      exclude_package_data={'': ['README', '.gitignore']},

      zip_safe=False,

      author='Pierre Rouanet, Jonathan Grizou, Matthieu Lapeyre',
      author_email='pierre.rouanet@gmail.com',
      description=' Poppy Ergo Mini Software Library',
      url='https://github.com/poppy-project/poppy-ergo-mini',
      license='GNU GENERAL PUBLIC LICENSE Version 3',

      **extra
      )
