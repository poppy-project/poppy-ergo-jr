# coding: utf-8
__author__="thibault desprez"
"thibault.desprez@gmail.com"
'''
# Comment créer et manipuler les primitives de pypot pour les robots poppy ?

## Exemple appliquer : le mode demo du Poppy ErgoJr

pré-requis:
connaitre l'utiilsation de:
my_robot.motors
my_robot.mX.compliant
my_robot.mX.goto_position
my_robot.mX.led
my_robot.mX.present_position
my_robot.posture_is

+ avoir quelque notion des class et objet en python

'''
'''
Tout d'abord quelque import
'''

import time
import random
import cv2
import numpy as np

from pypot.primitive import Primitive, LoopPrimitive

'''
On apprend dans le fichier ~/poppy_src/pypot/primitive/primitive.py que:
- les primitives sont des 'objet'
- qu'elle hérite leurs attribue, méthode et propriéte de la class Primitives
- qu'il suiffit de compléter la fonction run()
- que la commande pour lancer la primitive est: name_of_my_primitive.start()
- que la commande pour lancer la primitive est: name_of_my_primitive.stop()
- mais qu'il faut d'abord "l'attacher au robot" via la commande: my_robot.attach_primitive(MyPrimitive(self.robot), 'name_of_my_primitive')

## Exemple la primitives Tinsel (girlande):
'''


class Tinsel(Primitive): #on crée un nouvelle class Tinsel qui hérite de la class Primitive
    '''
    ici on veut que l'ergo glignote, qu'on puisse lui spécifier les couleurs et la vitesse (en Hz)

    - Toute les fonctions qui ne sont pas rédéfinit ici sont hérité de la class Primitive
    - La fonction __init__() est exécute des que la class est instancier
    - Ici nous souhaitons ajouter deux variables non définit dans la class Primitive: les couleurs et la vitesse
    '''
    def __init__(self,robot,colors=['green','red','yellow','blue','pink','cyan','white','off'],freq=2):
        #on redéfinit la fonction __init__() hérité de Primitive, et lui ajoute deux parametre: colors et freq
        Primitive.__init__(self,robot)
        #on appel la fonction __init__() de la class Primitive (pour que les autres variables et parametre de celle-ci s'initie correctement)
        self.colors=colors
        self.freq=freq
        #on définit l'attribut self.colors et self.freq (qui peuvent être vue comme des variables) qui contiennent respectivement les couleurs spécifier dans le parametre colors et la vitesse spécifier dans le parametre freq passer lors l'instanciation de la primitive

    def run(self):
        #on définit la fonction run()
        while not self.should_stop():
            #tant que l'on ne demande pas d'arréter la primitive
            for color in self.colors:
                #pour chacune des couleurs
                if not self.should_stop():
                    #si l'on ne demande pas d'arréter la primitives
                    if self.should_pause(): self.wait_to_resume()
                    #si on me demande pause, j'attend jusqu'a reprise
                    for m in self.robot.motors: m.led = color
                    #pour chaque moteurs, mettre la led en la couleur
                    for i in range(5):
                        if not self.should_stop():
                            if self.should_pause(): self.wait_to_resume()
                            time.sleep((1./self.freq)/5)
                    #je vérife dix foi par période si l'on ne demande pas d'arréter la primitives

'''
###Testons la primitives:
'''
'''
from pypot.creatures import PoppyErgoJr
poppy= PoppyErgoJr()
poppy.attach_primitive(Tinsel(poppy,['yellow','white'],2), 'girlande')
girlande.start()
time.sleep(5)
girlande.stop()
'''

'''
## Maintenant je souhaite créer plusieurs primitives qui ont des points commun.
Je vais créer une class mère (héritant de primitive) qui contiendras ces points commun.

dans le fichier ~/poppy_src/pypot/primitive/primitive.py , j'ai également appris que la class primitive exploiter la lib "thread". On apprend que chacune des primitives à un setup() (phase de lancement) un teardown() (phase d'extinction) et un run()

'''


class BaseDemo(LoopPrimitive):
    #je définit ma class BaseDemo, fille de la class Primitive, et futur mère ;)
    def __init__(self, robot):
        #je définit ma fonction __init__()
        Primitive.__init__(self, robot)
        #j'apel la fonction __init__ de ma class mère

        self.defaut_posture = [0, -45, 25, 0, 45, -25]
        #je définit un nouveau attribue

    def posture_is(self, posture, error=2, motors='all'):
        if motors == 'all' : motors= self.robot.motors
        for i in range(len(motors)):
            if abs( motors[i].present_position - posture[i] ) > error : return False
        return True

    def distance_with(self, posture, motors='all'):
        #retourne une liste contenant la difference en degres (pour chaque moteur) entre la position actuelle du robot et une position donnee
        if motors == 'all': motors= self.robot.motors
        output= [ abs( motors[i].present_position - posture[i] ) for i in range(len(motors)) ]
        '''
        autre ecriture:
        output=[]
        for i in range(len(motors)):
            output.append( abs( motors[i].present_position - posture[i] )
        '''
        return output

    def sleep_except_should_stop(self, time_seconde):
        for i in range (int(time_seconde*10)):
            if not self.should_stop(): time.sleep(time_seconde/(time_seconde*10))
            #si l'on ne demande pas d'arréter la primitive, on attend

    def countdown(self, time_seconde):
        for i in range(int(time_seconde+time_seconde*0.2)):

            if not self.should_stop():
                #si l'on ne demande pas d'arréter la primitive
                if self.should_pause(): self.wait_to_resume()
                #si on me demande pause, j'attend jusqu'a reprise

                for m in self.robot.motors: m.led="off"
                time.sleep( 0.5- (0.3/(time_seconde+time_seconde*0.2) *i ))
                for m in self.robot.motors: m.led="green"
                time.sleep(0.5)
        #je créer une sorte de compte a reboug lumineux

    def setup(self):
        #je définit la fonction setup()
        duration= int( max( self.distance_with( self.defaut_posture ) ) ) /100.
        #temps en fonction de la distance maximal actuel ; soit une distance max (thèorique) de 180° exécuter en un temps de 1,8 seconde ; connaissance ma position_défaut la distance max est 150° (avec m2) donnant un temps max de 1,5 secondes pour reprendre sa positon. on à donc le temps qui varie en fonction de la distance, c'est donc la vitesse qui est fixe. V=D/T ; 150/1,5=100 ; le moteur le plus éloigner de sa postion defaut se déplace à 100°/sec ; les autre moteurs ajuste leur vitesse (ralentissent) pour arriver à leur position defaut en même temps que le moteur le plus éloigné.
        for m in self.robot.motors:
            m.compliant=False
            m.goto_position( self.defaut_posture[m.id-1] , duration )
        time.sleep( duration + 0.2 )
        #déplacer les moteurs vers leur position defaut (définit dans self.__init__)
        for m in self.robot.motors:
            m.compliant=True
            m.led='off'
        time.sleep(0.1)
        #mettre tout les moteurs en "souple" et éteindre les led

    def run(self):
        pass
    #je ne définit pas de fonction run() ; elle sera définit dans mes class filles

    def teardown(self):
        #je définit la fonction teardown()
        BaseDemo.setup(self)
        #j'appel BaseDemo.setup() : le robot éffectue la même action qu'au démarage


'''
### Maintenant je vais créer une nouvelle primitive qui héritera de la class BaseDemo et de la class Primitive.
'''


class Tetu(BaseDemo, Primitive):
    '''
    Ici, je veux créer un comportemant "de type tétu" autrement dit, quelqu'un qui revient toujours sur ses potitions. Le comportement est définit comme suit:
    - si je suis dans ma position de départ, je me met en vert et attend
    - si je ne suis plus dans ma position de départ, je devient rouge et reprend ma position

    Quelque subtilité, sont ajouter ensuite pour affiner le comportement
    '''

    #je n'est pas besoin de définir d'autre chose durant initialisation, je ne définit pas la fonction __init__()
    #la fonction BaseDemo.__init__() sera la fonction exécuté par défaut

    def setup(self):
        #je définit la fonction setup()
        BaseDemo.setup(self)
        #j'apel la fonction setup() de ma class mère

        sleep=5
        for i in range(int(sleep+(sleep/5))):

            if not self.should_stop():
                #si l'on ne demande pas d'arréter la primitive
                if self.should_pause(): self.wait_to_resume()
                #si on me demande pause, j'attend jusqu'a reprise
                for m in self.robot.motors: m.led="off"
                time.sleep(0.5-((0.5/sleep)*i))
                for m in self.robot.motors: m.led="green"
                time.sleep(0.5)
        #je créer une sorte de compte a reboug lumineux

        self.start_pos= [round(m.present_position) for m in self.robot.motors]
        #je sauvegarde la position de départ choisie.

    def run(self):
        #on définit la fonction run
        while not self.should_stop():
            #si l'on ne demande pas d'arréter la primitive
            if self.should_pause(): self.wait_to_resume()
            #si on me demande pause, j'attend jusqu'a reprise

            if not (self.posture_is(self.start_pos,6)) :
                #si ma position n'est pas ma position de départ

                for m in self.robot.motors: m.led = 'yellow'
                #je deviens jaune

                for t in range(10):
                        if not self.should_stop():
                            if self.should_pause(): self.wait_to_resume()
                            time.sleep(0.1)
                #j'attend 1 secondes sauf si l'on ne demande pas d'arréter la primitive

                t=0
                while self.posture_is(self.start_pos,45) and t<200 and not(self.should_stop()):
                    if self.should_pause(): self.wait_to_resume()
                    time.sleep(0.01)
                    t+=1
                #tant que ma position n'est pas trop éloigner de ma position de départ, et qu'il s'est écoulé moins de 2 secondes, et que l'on ne demande pas d'arréter la primitive (ou de mettre en pause) ; j'attend

                if not self.should_stop():
                    #si l'on ne demande pas d'arréter la primitive
                    if self.should_pause(): self.wait_to_resume()
                    #si on me demande pause, j'attend jusqu'a reprise

                    if not (self.posture_is(self.start_pos,6)):
                        #si on ne ma pas remis dans la bonne position alors...

                        for m in self.robot.motors:
                            m.led = 'red'
                            m.compliant=False
                            m.goto_position(self.start_pos[m.id-1],0.5)
                        #...je reprend ma postion de départ en mallumant en rouge et...

                        for t in range(15):
                            if not self.should_stop():
                                if self.should_pause(): self.wait_to_resume()
                                time.sleep(0.1)
                        #... j'attend 1,5 secondes sauf si l'on ne demande pas d'arréter la primitive, puis...

                    for m in self.robot.motors:
                        m.led = 'green'
                        m.compliant=True
                    #...je redeviens vert et manipulable.

            time.sleep(0.01)
            #je vérifie tout les 0.01 seconde si j'ai bouger

'''
### Maintenant je vais créer une nouvelle primitive qui héritera de la class BaseDemo et de la class Primitive.
'''

class Poule(BaseDemo, Primitive):

    def test(self):
        return "ok"

    def setup(self):
        BaseDemo.setup(self)

        self.latence=0.5
        self.local_time=0
        for m in self.robot.tip:
            m.led='red'
            m.compliant=False
        for m in self.robot.base:
            m.led='green'
            m.compliant=True

    def run(self):
        while not self.should_stop():
            if self.should_pause(): self.wait_to_resume()

            #self.local_time=time.time()
            #for i in range(3): self.robot.motors[i+3].goto_position(-(self.robot.motors[i].present_position),self.latence)
            for i in range(3): self.robot.motors[i+3].goto_position(-(self.robot.motors[i].present_position),0)
            #self.latence=  ( ( (time.time()-self.local_time) +0.001 ) + self.latence )/2.
            #self.latence=   ( (time.time()-self.local_time) + self.latence )/2.
            time.sleep(0.01)

'''
d'autre exemples
'''

class PouleInv(BaseDemo, Primitive):

    def setup(self):
        BaseDemo.setup(self)

        self.latence=0.5
        self.local_time=0
        for m in self.robot.base:
            m.led='red'
            m.compliant=False
        for m in self.robot.tip:
            m.led='green'
            m.compliant=True

    def run(self):
        while not self.should_stop():
            if self.should_pause(): self.wait_to_resume()

            self.local_time=time.time()
            for i in range(3): self.robot.motors[i].goto_position(-(self.robot.motors[i+3].present_position),self.latence)
            #self.latence= ( ( (time.time()-self.local_time) +0.001 ) + self.latence )/2.
            self.latence= ( (time.time()-self.local_time) + self.latence )/2.
            time.sleep(0.001)

'''
### Maintenant nous parler du "primitive_manager"
lorsque plusieurs primitives s'éxécute en même temps, il combine les différent input pour produire un unique output vers le robot.
un certaine ordre héracchique est produit lorsque que l'on appelle une primitive depuis une primitive:
ici, nous allons utilise les primitives MoveRecorder et MovePlayer. Lors de leur utilisation il faudras déangager notre primitive du "primitive_manager" au profit des primitives MoveRecorder et MovePlayer.
'''
from pypot.primitive.move import MoveRecorder
from pypot.primitive.move import MovePlayer

class ProgByDemo(BaseDemo, Primitive):

    def __init__(self, robot, record_time=10):
        BaseDemo.__init__(self, robot)
        self.robot.attach_primitive(Tinsel(self.robot), 'tinsel')
        self.record_time=record_time # en seconde

    def run(self):
        while not self.should_stop():
            if self.should_pause(): self.wait_to_resume()

            while not(self.posture_is(self.defaut_posture)): time.sleep(0.1)
            for m in self.robot.motors:
                m.led="green"
                m.compliant=True

            my_record = MoveRecorder(self.robot, 50, self.robot.motors)
            my_record.start()

            sleep = int(self.record_time+(self.record_time/5.))
            for i in range(sleep):
                if not self.should_stop():
                    if self.should_pause(): self.wait_to_resume()
                    for m in self.robot.motors: m.led="green"
                    time.sleep(0.5)
                    for m in self.robot.motors: m.led="off"
                    time.sleep(0.5-((0.5/sleep)*i))

            my_record.stop()
            #my_record.wait_to_stop()

            if not self.should_stop():
                if self.should_pause(): self.wait_to_resume()

                self.robot.tinsel.colors=['red']
                self.robot.tinsel.freq=1
                self.robot.tinsel.start()

                self.robot._primitive_manager.remove(self)
                # patch pour passer des fake moteurs de la primitive ProgByDemo aux moteurs reel de l ergo

                my_play = MovePlayer(self.robot, my_record.move)
                my_play.start()

                for t in range(self.record_time*2):
                    if not self.should_stop():
                        if self.should_pause(): self.wait_to_resume()
                        time.sleep(0.5)

                if my_play.is_alive(): my_play.stop()

                self.robot.tinsel.stop()

                self.robot._primitive_manager.add(self) # on redonne le control des moteurs a la primitive ProgByDemo

                duration= int( max( self.distance_with( self.defaut_posture ) ) )/100.
                for m in self.robot.motors:
                    m.compliant=False
                    m.goto_position(self.defaut_posture[m.id-1],duration)
                time.sleep(duration)

'''
### Maintenant parlons jeux
Nous allons créer des méthode suplémentaire pour facilité l'interaction
Ici, nous fabriquon une sorte de Puzzel
'''

class Puzzel(BaseDemo, Primitive):

    methods = ['start', 'stop', 'pause', 'resume',
               'level_veryeasy', 'level_easy','level_noramle','level_hard','level_veryhard','level_growing',
               'precision_easy','precision_normal','precision_hard']

    def __init__(self, robot, level=0, precision=20):
        BaseDemo.__init__(self, robot)
        self.level=level
        self.precision=precision
        self.set_manual=False
        self.fig=[]


    def level_growing(self):
        self.set_manual=False
        self.level=0
    def level_veryeasy(self):
        self.set_manual=True
        self.level=1
    def level_easy(self):
        self.set_manual=True
        self.level=2
    def level_normal(self):
        self.set_manual=True
        self.level=3
    def level_hard(self):
        self.set_manual=True
        self.level=4
    def level_veryhard(self):
        self.set_manual=True
        self.level=5

    def precision_easy(self): self.precision=20
    def precision_normal(self): self.precision=10
    def precision_hard(self): self.precision=5

    def new_fig(self,level=0):
        var=[-75, -45, 0, 0, 45, 75]
        m1=m4=m6=0
        fig=[
            [m1, 0, -90, m4, 45, m6],
            [m1, 0, 90, m4, -45, m6],
            [m1, 0, 0, m4, -90, m6],
            [m1, 0, 0, m4, 90, m6],
            [m1, 45, -90, m4, 0, m6],
            [m1, 45, -90, m4, 90, m6],
            [m1, -45, 90, m4, 0, m6],
            [m1, -45, 90, m4, -90, m6]]

        if level==0:
            fig=fig[0]
        elif level==1:
            fig=fig[0]
            m = random.sample(var,1)[0]
            fig[0]=m
            fig[3]=m
            fig[5]=m
        elif level==2:
            fig=random.sample(fig,1)[0]
            m = random.sample(var,1)[0]
            fig[0]=m
            fig[3]=m
            fig[5]=m
        elif level==3:
            fig=random.sample(fig,1)[0]
            m = random.sample(var,2)
            fig[0]=m[0]
            fig[3]=m[1]
            fig[5]=m[0]
        elif level==4:
            fig=random.sample(fig,1)[0]
            m = random.sample(var,3)
            fig[0]=m[0]
            fig[3]=m[1]
            fig[5]=m[2]
        else:
            fig=random.sample(fig,1)[0]
            m = [ random.randrange(-75,75) for i in range(3) ]
            fig[0]=m[0]
            fig[3]=m[1]
            fig[5]=m[2]
        return fig

    def run(self):
        while not self.should_stop():
            if self.should_pause(): self.wait_to_resume()

            if self.set_manual==True: self.fig.append(self.new_fig(self.level))
            else: self.fig.append(self.new_fig(len(self.fig)))

            duration= int( max( self.distance_with( self.fig[-1] ) ) )/100.
            for m in self.robot.motors:
                m.led='red'
                m.compliant=False
                m.goto_position(self.fig[-1][m.id-1],duration)

            for i in range(10): #time to show 5sec
                if not self.should_stop():
                    if self.should_pause(): self.wait_to_resume()
                    time.sleep(0.5)

            for m in self.robot.motors: m.goto_position(self.defaut_posture[m.id-1],1)
            while not(self.posture_is(self.defaut_posture)): time.sleep(0.1)

            for m in self.robot.motors:
                m.compliant=True
                m.led='green'

            time_search=10
            sleep = int(time_search+(time_search/5.))
            for i in range(sleep):
                if not self.should_stop():
                    if self.should_pause(): self.wait_to_resume()
                    for m in self.robot.motors: m.led="green"
                    time.sleep(0.5)
                    for m in self.robot.motors: m.led="off"
                    time.sleep(0.5-((0.5/sleep)*i))

            if not self.should_stop():
                if self.should_pause(): self.wait_to_resume()

                if self.posture_is(self.fig[-1],self.precision):
                    for m in self.robot.motors: m.led='green'
                    time.sleep(0.5)
                    for m in self.robot.motors: m.led='off'
                    for i in range(len(self.fig)):
                        self.robot.motors[i].led='green'
                        time.sleep(0.25)
                else:
                    for m in self.robot.motors:
                        m.led='red'
                        m.compliant=False
                        m.goto_position(self.fig[-1][m.id-1],1)
                    for i in range(4): #time to show 2sec
                        if not self.should_stop():
                            if self.should_pause(): self.wait_to_resume()
                            time.sleep(0.5)
                    self.fig=[]

                if len(self.fig)==6:
                    for m in self.robot.motors: m.led='off'
                    for i in range(len(self.fig)):
                        if not self.should_stop():
                            if self.should_pause(): self.wait_to_resume()
                            duration= int( max( self.distance_with( self.fig[i] ) ) )/100.
                            for m in self.robot.motors:
                                m.compliant=False
                                m.goto_position(self.fig[i][m.id-1],duration)
                            for l in range(i): self.robot.motors[i].led='green'
                            time.sleep(duration)

                    self.robot._primitive_manager.remove(self)
                    # patch pour passer des fake moteurs de la primitive ProgByDemo aux moteurs reel de l ergo
                    self.robot.dance.start()

                    for i in range(10): #time to dance 5sec
                        if not self.should_stop():
                            if self.should_pause(): self.wait_to_resume()
                            time.sleep(0.5)
                    self.robot.dance.stop()
                    self.robot.dance.wait_to_stop()

                    self.robot._primitive_manager.add(self)
                    # patch pour passer des fake moteurs de la primitive ProgByDemo aux moteurs reel de l ergo
                    self.fig=[]

                for m in self.robot.motors:
                    m.compliant=False
                    m.led='off'
                    m.goto_position(self.defaut_posture[m.id-1],1)
                while not(self.posture_is(self.defaut_posture)): time.sleep(0.1)

'''
Enfin, regroupons notre travail
'''

class Demos(BaseDemo, Primitive):
    methods = ['start', 'stop', 'pause', 'resume', 'press_button']
    def __init__(self, robot):
        BaseDemo.__init__(self, robot)

        self.robot.attach_primitive(Tetu(self.robot), 'tetu')
        self.robot.attach_primitive(Poule(self.robot), 'poule')
        self.robot.attach_primitive(PouleInv(self.robot), 'poule_inv')
        self.robot.attach_primitive(ProgByDemo(self.robot), 'prog_by_demo')
        self.robot.attach_primitive(Puzzel(self.robot), 'puzzel')

        self.robot.attach_primitive(Tournesol(self.robot), 'tournesol')

        self.match={'white':self.robot.tetu,
                    'blue':self.robot.poule,
                    'cyan':self.robot.poule_inv, # a remplacer par tracking octave
                    'yellow':self.robot.puzzel, # a remplacer par tournesol
                   'pink':self.robot.prog_by_demo
                   }
        """
        prefer use:
        red color for not_compliant_motors
        green color for compliant_motors
        """
        self.robot.attach_primitive(Tinsel(self.robot), 'tinsel')
        self.robot.tinsel.colors= [key for key in self.match.keys()]
        random.shuffle(self.robot.tinsel.colors)
        self.robot.tinsel.freq= 1

        self.button=0

    def press_button(self):
        self.button+=1
        return 'have press '+str(self.button)+'x'

    def reset_button(self):
        self.button=0
        return 'reset button'

    def run(self):
        while not self.should_stop():
            if self.should_pause(): self.wait_to_resume()

            old_b_val=self.button
            self.robot.tinsel.colors= [key for key in self.match.keys()]
            random.shuffle(self.robot.tinsel.colors)
            self.robot.tinsel.freq= 1

            self.robot.tinsel.start()
            while self.button==old_b_val and not self.should_stop():
                if self.should_pause(): self.wait_to_resume()
                time.sleep(0.01)

            color=self.robot.motors[0].led
            self.robot.tinsel.stop()

            old_b_val=self.button
            if not self.should_stop():

                self.robot._primitive_manager.remove(self)

                self.match[color].start()
                while self.button==old_b_val and not self.should_stop():
                    if self.should_pause(): self.wait_to_resume()
                    time.sleep(0.01)
                self.match[color].stop()

                self.robot._primitive_manager.add(self)


'''
ADD demo tournesol
'''
class Tournesol(BaseDemo, Primitive):
    '''
    Ici, je veux créer un comportemant "de type ...
    '''
    #je n'est pas besoin de définir d'autre chose durant initialisation, je ne définit pas la fonction __init__()
    #la fonction BaseDemo.__init__() sera la fonction exécuté par défaut

    def setup(self):
        #je définit la fonction setup()
        BaseDemo.setup(self)
        #j'apel la fonction setup() de ma class mère
        for m in self.robot.motors:
            m.led='white'
            m.compliant=False
            self.robot.m1.goto_position(0,1)
            self.robot.m4.goto_position(0,1)

    def run(self):
        #on définit la fonction run
        while not self.should_stop():
            #si l'on ne demande pas d'arréter la primitive
            if self.should_pause(): self.wait_to_resume()
            #si on me demande pause, j'attend jusqu'a reprise

            for i in range(5):
                alpha=[]
                img = self.robot.camera.frame
                gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                hist = cv2.calcHist([gray],[0],None,[256],[0,256])
                #lum.append(((sum(hist[90:150])/10000)))
                #plt.hist(gray.ravel(),256,[0,256])
                #plt.title('Histogram for gray scale picture')
                #plt.show()
                alpha.append((sum([np.percentile(hist,i)/1000 for i in range(90,100)])-30)/55)
                time.sleep(0.1)

            alpha= np.mean(alpha)
            self.robot.m2.goto_position(-5-alpha*10,0.5)
            self.robot.m3.goto_position(-45+alpha*20,0.5)
            self.robot.m5.goto_position(0+alpha*90,0.5)
            self.robot.m6.goto_position(-45+alpha*80,0.5)

            alpha=int(alpha*4)
            if alpha == 4:
                for m in self.robot.motors: m.led='white'
            else:
                for m in self.robot.motors[:3]: m.led='green'
            if alpha == 3:
                for m in self.robot.motors[3:]: m.led='green'
            elif alpha == 2:
                for m in self.robot.motors[3:]: m.led='yellow'
            elif alpha == 1:
                for m in self.robot.motors[4:]: m.led='pink'
                self.robot.m4.led='yellow'
            elif alpha == 0:
                self.robot.m4.led='yellow'
                self.robot.m5.led='pink'
                self.robot.m6.led='red'
