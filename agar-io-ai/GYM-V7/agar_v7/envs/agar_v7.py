# %%
import math
import numpy as np
from gym import Env
from gym import spaces
from playwright.sync_api import sync_playwright
import pandas as pd
from math import sqrt


def Pythagorean(x1, y1, x2, y2):
    a = x1 - x2
    b = y1 - y2
    return sqrt(a*a + b*b)


class agarv7(Env):

    def __init__(self):
        # GYM Environment Essentials
        self.score = 9
        self.reward = 0
        self.total_reward = 0
        self.__counter = 0
        self.__step_delay = 500
        # url placeholder
        self.__url = "https://google.com"
        self.__server = "https://google.com"
        self.__verbose_n = 0

        # setting up the settings in the game with playwright, will be executed in reset()
        self.__checkbox = {
            'check': [
                '#showColor'
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
                '#showGrid',
                '#backgroundSectors',
                '#jellyPhysics',
                '#showBorder'
            ]
        }

        # Screen Settings and Default
        self.__screen = [500, 500]
        self.__screen_split = [3, 3]
        self.p = sync_playwright().start()

        # defining the output of the env
        # observation space will be changed in config NOT THE CASE ANYMORE after image resize
        self.action_space = spaces.Box(
            low=0, high=1, shape=(2,), dtype=float
        )

        self.observation_space = spaces.Box(
            low=np.finfo(np.float32).min, high=np.finfo(np.float32).max, shape=(37,), dtype=np.float32
        )

        # For __observe, Dataframe of Zones
        self.zone = {
            'key': [str(x) + "_" + str(y) for x in range(5) for y in range(5)]
        }
        self.df_zone = pd.DataFrame(self.zone)

        self.top3_placeholder = {
            'nx': [0],
            'ny': [0],
            'd': [0],
            'ns': [0]
        }
        self.df_top3_placeholder = pd.DataFrame(self.top3_placeholder)

        self.__vision_distance = 1000

        print('init')

    def config(self, screen_size, screen_split, url, max_step, step_delay, vision_distance, server, verbose_n=0):
        self.__screen = screen_size
        self.__screen_split = screen_split
        self.__url = url
        self.__server = server
        self.__max_step = max_step
        self.__step_delay = step_delay
        self.__cal_action()
        self.__vision_distance = vision_distance
        self.__vision_limit = self.__vision_distance / 2
        self.__vision_grid_size = self.__vision_distance / 5
        self.__verbose_n = verbose_n
        print("View game at:{}".format(url))

    def reset(self):
        # PlayWright Start Up
        self.score = 9
        self.total_reward = 0
        self.browser = self.p.firefox.launch(headless=True)
        self.page = self.browser.new_page()
        self.page.set_viewport_size(
            {"width": self.__screen[0], "height": self.__screen[1]})
        self.page.goto(self.__url)
        js = 'window.setserver("{}")'.format(self.__server)
        self.page.evaluate(js)

        # checking the settings
        self.__counter = 0
        for box in self.__checkbox['check']:
            self.page.check(box)
        for box in self.__checkbox['uncheck']:
            self.page.uncheck(box)

        self.page.click('#play-btn')
        # need to wait until the cells.list is not none
        self.page.wait_for_timeout(500)

        self.state = self.__observe()

        return self.state

    def step(self, target):
        info = {}
        # actual action that alter the state
        if self.__counter <= self.__max_step + 1:
            self.page.mouse.move(
                target[0]*self.__screen[0], target[1]*self.__screen[0])
            self.page.wait_for_timeout(self.__step_delay)
            self.__counter += 1
            self.state = self.__observe()

        # calculate the reward
        if self.page.evaluate("isNaN(stats.score)"):
            self.reward = 0
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
        print('step:', self.__counter, 'current score:', new_score,
              'reward this step:', self.reward, 'total reward:', self.total_reward)

        if self.__verbose_n:
            if self.__counter % self.__verbose_n == 0:
                print(self.state)
                print(target*self.__screen[0])

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

    def __observe(self):

        self.new_score = self.page.evaluate("stats.score")
        list = self.page.evaluate('drawList')
        score = self.page.evaluate('stats.score')

        df = pd.DataFrame(list)
        agent_info = (list[len(list)-1])
        agent = [agent_info['nx'], agent_info['ny']]

        # Get nx and ny columns, reset by own's coordinates
        df_reset = df[['nx', 'ny']] - df.iloc[-1][['nx', 'ny']]
        # Filter out x > 500 or y > 500, remove last role, add 500 to remove negative value
        df_temp = df_reset[df_reset < self.__vision_limit][df_reset > -
                                                           self.__vision_limit].dropna().head(-1) + self.__vision_limit
        # Zone values
        df_temp2 = (df_temp / self.__vision_grid_size).apply(np.floor)

        df_processed = df_temp2.groupby(['nx', 'ny']).size().reset_index(
            name='counts')  # get counts of each zone
        df_processed['key'] = (df_processed['nx'].astype(
            str) + '_' + df_processed['ny'].astype(str))  # Create Key column for matching
        # merge with Zone, because zones with 0 count is not in the list df.
        df_merged = self.df_zone.merge(
            df_processed[['key', 'counts']], 'left', 'key').fillna(0)
        arr = df_merged['counts'].to_numpy().astype(int)

        # Top 3
        df_top3 = df[['nx', 'ny', 'ns']] - df.iloc[-1][['nx', 'ny', 'ns']]
        df_top3['d'] = np.sqrt(pd.to_numeric(
            (np.square(df_top3['nx']) + np.square(df_top3['ny']))))
        df_top3 = df_top3.head(-1).sort_values('d').head(3)
        while len(df_top3) < 3:
            df_top3 = pd.concat([df_top3, self.df_top3_placeholder])
        df_top3 = df_top3[['nx', 'ny', 'd', 'ns']]
        arr2 = df_top3.to_numpy().flatten()

        output = np.concatenate((arr, arr2))

        return output

    def close(self):
        print('close')
        self.browser.close()
        self.p.stop()
