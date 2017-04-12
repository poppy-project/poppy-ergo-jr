# Poppy Ergo Jr

[![PyPI](https://img.shields.io/pypi/v/poppy-ergo-jr.svg)](https://pypi.python.org/pypi/poppy-ergo-jr/)

Poppy Ergo Jr robot is a small and low cost 6-degree-of-freedom robot arm. It consists of very simple shapes which can be easily 3D printed with FDM printers.

It works with Dynamixel XL-320 motors, and a Raspberry Pi for control.

![jump](doc/img/ergo_jump.gif)

It comes with three tools:
* a lampshade
* a grasper
* a pen holder

![](doc/img/ergo_tools.gif)


The Poppy Ergo Jr is ideal to start manipulating robots and learn robotic without difficulties.

It is particularly well suited for educational purposes (cheap, simple to assemble, and easily controllable) or can be a very nice desk decoration for geeks and makers...

Documentation about Poppy Ergo Jr as every projects of the Poppy platform is located at [docs.poppy-project.org](http://docs.poppy-project.org/en/).

## Build your own Poppy Ergo Jr

* You can find the complete list of material needed on the **[Bill Of Material](doc/bom.md)**, and a [list of suppliers](doc/suppliers.md).
![](doc/img/assembly/steps/ErgoJr_assembly.gif)

* Look at the [hardware folder](hardware) for the mechanical and electronics parts.

* Then you can follow the assembly instructions presented [on the global poppy project documentation](http://docs.poppy-project.org/en/assembly-guides/ergo-jr/index.html) to guide you trough the process of transforming a bunch of parts in a magnificent robot !

* Once you have a ready-to-use Poppy Ergo Jr, you can take a look at [code samples](https://github.com/poppy-project/poppy-ergo-jr/tree/master/software/samples) for ideas

## Setup your Raspberry Pi board

Poppy Ergo Jr is based on the [Raspberry Pi 2 board](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/) but also works with [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/). We provide our own [image](https://github.com/poppy-project/poppy-ergo-jr/releases/download/1.0.0-gm/2017-02-21-poppy-ergo-jr.img.zip) (based on Raspbian) that can be directly copied to the SD-card. You can refer to the [documentation](http://docs.poppy-project.org/en/installation/burn-an-image-file.html) for more details. *Note that if you buy it as a kit from one of the reseller you will also get a pre-installed SD-card.*

You can also use our setup script directly on a Raspberry Pi based on Raspbian. **Be aware tough that it takes some time and some good knowledge of Linux.** We use the [Raspoppy scripts](https://github.com/poppy-project/raspoppy) to setup the Raspberry Pi to match our needs (custom Python, setup serial communication, setup the web interface, a Poppy user...).

It a two steps process:

*   Make sure you have enough space on the SD-card (at least 8GB). You can expand your partition if needed via:

  ```bash
  sudo raspi-config --expand-rootfs
  ```

  You will need to reboot afterwards.

*   Run the installation commands:

    ```bash
    curl -L https://raw.githubusercontent.com/poppy-project/raspoppy/master/raspoppyfication.sh -o /tmp/raspoppyfication.sh
    chmod +x /tmp/raspoppyfication.sh
    sudo /tmp/raspoppyfication.sh
    ```

You can refer to the [documentation](http://docs.poppy-project.org/en/installation/install-a-poppy-board.html) for more details.

## Contributing

You can share your experience, new design, ideas or questions on the [Poppy project forum](https://forum.poppy-project.org/).

To contribute to this repository, you can [fork it](https://help.github.com/articles/fork-a-repo/) and propose a [pull request](https://help.github.com/articles/using-pull-requests/) *([Another useful link](https://gun.io/blog/how-to-github-fork-branch-and-pull-request/))*

## License

All the technological development work made in the Poppy project is freely available under open source licenses. Only the name usage *"Poppy"* is restricted and protected as an international trademark, please contact us if you want to use it or have more information.

|   License     |     Hardware    |   Software      |
| ------------- | :-------------: | :-------------: |
| Title  | [Creative Commons BY-SA](http://creativecommons.org/licenses/by-sa/4.0/)  |[GPL v3](http://www.gnu.org/licenses/gpl.html)  |
| Logo  | [![Creative Commons BY-SA](https://i.creativecommons.org/l/by-sa/4.0/88x31.png) ](http://creativecommons.org/licenses/by-sa/4.0/)  |[![GPL V3](https://www.gnu.org/graphics/gplv3-88x31.png)](http://www.gnu.org/licenses/gpl.html)  |


## The Poppy project history

The Poppy project was born in 2012 in the [Flowers laboratory](https://flowers.inria.fr/) at [Inria Bordeaux Sud-Ouest](http://www.inria.fr/en/centre/bordeaux).
It was initiated during [Matthieu Lapeyre](https://github.com/matthieu-lapeyre)'s PhD Thesis surpervised by [Pierre Yves Oudeyer](http://www.pyoudeyer.com/). At the beginning, the development team was composed by [Matthieu Lapeyre](https://github.com/matthieu-lapeyre) (mechanics & design), [Pierre Rouanet](https://github.com/pierre-rouanet) (software) and [Jonathan Grizou](http://jgrizou.com/) (electronics).

This project is initially a fundamental research project financed by [ERC Grant Explorer](http://erc.europa.eu/) to explore the role of embodiement and morphology properties on cognition and especially on the learning of sensori-motor tasks.


## More on the project

- [Website](https://www.poppy-project.org)
- [Forum](https://forum.poppy-project.org)
- [Youtube](https://www.youtube.com/channel/UC3iVGSr-vMgnFlIfPBH2p7Q)
- [Twitter](https://twitter.com/poppy_project)
- [Facebook](https://www.facebook.com/poppycommunity/)
- [Flickr](https://www.flickr.com/photos/poppy-project)
- [Vimeo](https://vimeo.com/poppyproject)
- [Thingiverse](http://www.thingiverse.com/poppy_project/)
