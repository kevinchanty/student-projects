# %%
import math
import numpy as np
from gym import Env
from gym import spaces
from numpy.lib.function_base import place
from playwright.sync_api import sync_playwright
import io
from PIL import Image
from math import sqrt


def Pythagorean(x1, y1, x2, y2):
    a = x1 - x2
    b = y1 - y2
    return sqrt(a*a + b*b)


def observe(self):
    list = self.page.evaluate('drawList')

    agent_info = (list[len(list)-1])
    agent = [agent_info['nx'], agent_info['ny'], agent_info['ns']]

    visual = list[:(len(list)-1)]
    neighbor = []
    # separating the cells and agent into 2 lists
    for cell in visual:
        neighbor.append([cell['nx'], cell['ny'], cell['ns']])

    # formating the observation space
    observation = []
    for cell in neighbor:
        observation.append([agent[0] - cell[0], agent[1] - cell[1], int(
            Pythagorean(agent[0], agent[1], cell[0], cell[1])), agent[2] - cell[2]])

    arr = np.asarray(observation)

    placeholder = np.array([0, 0, 0, 0], dtype=np.float32)

    print(arr)

    observation_number = 11

    if arr.shape[0] is observation_number:
        arr = arr
    elif arr.shape[0] > observation_number:
        arr = arr[arr[:, 2].argsort()]
        arr = arr[0:observation_number]
    elif arr.shape == (0,):
        arr = np.zeros(shape=(observation_number, 4))
    elif arr.shape[0] < observation_number:
        for zero in range(observation_number-arr.shape[0]):
            arr = np.append(arr, [placeholder], axis=0)
            arr = arr[arr[:, 2].argsort()]

    return arr

# %%


class agarv2(Env):

    def __init__(self):
        # GYM Environment Essentials
        self.score = 9
        self.reward = 0
        self.total_reward = 0
        self.__counter = 0
        self.__step_delay = 500
        self.max_episode_steps = 10  # testing, seems like it has no effect
        # url placeholder
        self.__url = "https://google.com"

        # setting up the settings in the game with playwright, will be executed in reset()
        self.__checkbox = {
            'check': [
                '#showColor',
                '#showBorder'
            ],
            'uncheck': [
                '#showSkins',
                '#showBorder',
                '#showNames',
                '#darkTheme',
                '#showMass',
                '#showChat',
                '#showMinimap',
                '#showPosition',
                '#moreZoom',
                '#fillSkin',
                '#backgroundSectors',
                '#jellyPhysics',
                '#showGrid'
            ]
        }

        # defining the output of the env
        # observation space will be changed in config NOT THE CASE ANYMORE after image resize
        self.action_space = spaces.Discrete(9)
        #
        self.observation_space = spaces.Box(
            low=np.finfo(np.float32).min, high=np.finfo(np.float32).max, shape=(11, 4), dtype=np.float32
        )

        # Screen Settings and Default
        self.__screen = [500, 500]
        self.__screen_split = [3, 3]
        self.p = sync_playwright().start()

        print('init')

    def config(self, screen_size, screen_split, url, max_step, step_delay):
        self.__screen = screen_size
        self.__screen_split = screen_split
        self.__url = url
        self.__max_step = max_step
        self.__step_delay = step_delay
        self.__cal_action()

    def reset(self):
        # PlayWright Start Up
        self.score = 9
        self.browser = self.p.firefox.launch(headless=True)
        self.page = self.browser.new_page()
        self.page.set_viewport_size(
            {"width": self.__screen[0], "height": self.__screen[1]})
        self.page.goto(self.__url)

        # checking the settings
        self.__counter = 0
        for box in self.__checkbox['check']:
            self.page.check(box)
        for box in self.__checkbox['uncheck']:
            self.page.uncheck(box)

        self.page.click('#play-btn')
        # need to wait until the cells.list is not none
        self.page.wait_for_timeout(500)

        self.state = observe(self)
        return self.state

    def step(self, target):
        # actual action that alter the state
        if self.__counter <= self.__max_step + 1:
            self.page.mouse.move(
                self.__action_map[target][0], self.__action_map[target][1])
            self.page.wait_for_timeout(self.__step_delay)
            self.__counter += 1
            self.state = observe(self)

        if self.page.evaluate("isNaN(stats.score)"):
            self.reward = 0
            new_score = 0
        else:
            new_score = self.page.evaluate("stats.score")
            reward_for_eating = max((new_score - self.score), 0)
            self.score = new_score
            punishment_for_idling = -0.01
            self.reward = reward_for_eating + punishment_for_idling
            self.total_reward += self.reward

        # check status
        if self.page.evaluate("isNaN(stats.score)") or self.__counter >= self.__max_step:
            self.browser.close()
            done = True
        else:
            done = False
        info = {}
        print('step:', self.__counter, 'current score:', new_score,
              'reward this step:', self.reward, 'total reward:', self.total_reward)
        return self.state, self.reward, done, info

    # Render the correct action map base on user's input
    def __cal_action(self):
        screenX = self.__screen[0]
        screenY = self.__screen[1]
        splitX = self.__screen_split[0]
        splitY = self.__screen_split[1]
        self.__action_map = {}

        m = int(screenX / splitX)
        n = int(screenY / splitY)

        for i in range(splitX * splitY):
            self.__action_map[i] = [
                (i % splitX)*(m)+m/2, math.floor(i/splitX) * n + n/2]

    def close(self):
        print('close')
        self.browser.close()
        self.p.stop()
