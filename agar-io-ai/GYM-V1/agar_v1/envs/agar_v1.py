# %%
import math
import numpy as np
import gym
from gym import Env
from gym import spaces
from playwright.sync_api import sync_playwright
import io
from PIL import Image


# %%
def screenshot(page):
    screenshot_buffer = page.screenshot()  # reduce the resolution of the screenshot
    image = Image.open(io.BytesIO(screenshot_buffer))
    # Reduce RGBA to RGB
    image_rgb = Image.new("RGB", image.size, (255, 255, 255))
    image_rgb.paste(image, mask=image.split()[3])

    image_rgb = image_rgb.resize((150, 150))  # resize the screenshots

    state = np.asarray(image_rgb)
    """  Removed because "CnnPolicy will automatically normalized images."""

    ######################################s######################
    # used to see the actual screenshot that provided to the AI
    # test = page.screenshot(path='testing_image.jpeg', quality=90, type='jpeg')
    # remove_red = np.array(Image.open('testing_image.jpeg'))
    # for pixel_in_height in range(remove_red.shape[0]):
    #     for pixel_in_width in range(remove_red.shape[1]):
    #         r,g,b = remove_red[pixel_in_height,pixel_in_width]
    #         remove_red[pixel_in_height,pixel_in_width] = 0,g,b
    # test = Image.fromarray(state * 255)
    # # test.save('remove_red.jpeg')
    # # test = image.resize((50,50))
    # test = test.convert('L')
    # test.save('AI-vision.jpeg')
    ############################################################

    return state


# %%
class agarv1(Env):

    def __init__(self):
        # GYM Environment Essentials
        self.score = 9
        self.reward = 0
        self.__counter = 0
        self.__step_delay = 500
        self.max_episode_steps = 10  # testing, seems like it has no effect
        # url placeholder
        self.__url = "https://google.com"
        self.__server = "https://google.com"

        # setting up the settings in the game with playwright, will be executed in reset()
        self.__checkbox = {
            'check': [
                '#showColor'
            ],
            'uncheck': [
                '#showBorder',
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

        # defining the output of the env
        # observation space will be changed in config NOT THE CASE ANYMORE after image resize
        self.action_space = spaces.Discrete(9)
        #
        self.observation_space = spaces.Box(
            low=0, high=255, shape=(150, 150, 3), dtype=np.uint8
        )

        # Screen Settings and Default
        self.__screen = [500, 500]
        self.__screen_split = [3, 3]
        self.p = sync_playwright().start()

        print('init')

    def config(self, screen_size, screen_split, url, max_step, step_delay, server):
        self.__screen = screen_size
        self.__screen_split = screen_split
        self.__url = url
        self.__server = server
        self.__max_step = max_step
        self.__step_delay = step_delay
        self.__cal_action()

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

        self.__counter = 0
        for box in self.__checkbox['check']:
            self.page.check(box)
        for box in self.__checkbox['uncheck']:
            self.page.uncheck(box)

        self.page.click('#play-btn')

        self.state = screenshot(self.page)

        print('reset')
        return self.state

    def step(self, target):
        info = {}
        # actual action that alter the state
        if self.__counter <= self.__max_step + 1:
            self.page.mouse.move(
                self.__action_map[target][0], self.__action_map[target][1])
            self.page.wait_for_timeout(self.__step_delay)
            self.__counter += 1
            self.state = screenshot(self.page)

        # calculate the reward
        if self.page.evaluate("isNaN(stats.score)"):
            self.reward = 0
        else:
            self.new_score = self.page.evaluate("stats.score")
            reward_for_eating = max((self.new_score - self.score), 0)
            self.score = self.new_score
            punishment_for_idling = -0.01
            self.reward = reward_for_eating + punishment_for_idling
            self.total_reward += self.reward

        # check status
        if self.page.evaluate("isNaN(stats.score)") or self.__counter >= self.__max_step:
            self.browser.close()
            done = True
        else:
            done = False
        print('step:', self.__counter, 'current score:', self.new_score,
              'reward this step:', self.reward, 'total reward:', self.total_reward)

        return self.state, self.reward, done, info

    # Render the correct action map base on user's input
    def __cal_action(self):
        screenX = self.__screen[0]
        screenY = self.__screen[1]
        splitX = self.__screen_split[0]
        splitY = self.__screen_split[1]
        self.__action_map = {}
        self.action_space = spaces.Discrete(splitX * splitY)

        m = int(screenX / splitX)
        n = int(screenY / splitY)

        for i in range(splitX * splitY):
            self.__action_map[i] = [
                (i % splitX)*(m)+m/2, math.floor(i/splitX) * n + n/2]

    def close(self):
        print('close')
        self.browser.close()
        self.p.stop()
