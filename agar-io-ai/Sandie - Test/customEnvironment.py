# %%
# 1. Import Dependencies
# import GYM
import gym
from gym import Env
from gym.spaces import Discrete, Box, Dict, Tuple, MultiBinary, MultiDiscrete
# import helpers
import numpy as np
import random
import os
# import stable baslines
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy

# 2. Types os Spaces
# print(Discrete(3).sample())
# print(Box(0,1, shape=(3,)).sample())
# print(Tuple((Discrete(3), Box(0,1, shape=(3,)), MultiBinary(4))).sample())
# print(Dict({'height':Discrete(2), 'speed':Box(0,100, shape=(1,)), 'color':MultiBinary(4)}).sample())
# print(MultiBinary(4).sample())
# print(MultiDiscrete([5,2,4]).sample())

# 3. Building an Environment
class ShowerEnv(Env):
    def __init__(self):
        self.action_space = Discrete(3)
        self.observation_space = Box(low=0, high=100, shape=(1,))
        self.state = 38 + random.randint(-3,3)
        self.shower_length = 60

    def step(self, action):
        # Apply temp adj
        self.state += action-1
        # Decrease shower time
        self.shower_length -= 1
        # Calculate Reward
        if self.state >= 37 and self.state <= 39:
            reward = 1
        else:
            reward = -1

        if self.shower_length <= 0:
            done = True
        else:
            done = False

        info = {}

        return self.state, reward, done, info

    def render(self):
        # Implement viz
        pass

    def reset(self):
        self.state = 4 #np.array([38 + random.randint(-3,3)]).astype(float)
        self.shower_length = 60
        return self.state

env = ShowerEnv()
env.reset()

# 4. Test Environment
episodes = 5
for episode in range(1, episodes+1):
    obs = env.reset()
    done = False
    score = 0

    while not done:
        env.render()
        action = env.action_space.sample()
        obs, reward, done, info = env.step(action)
        score += reward
    print('Episode:{} Score:{}'.format(episode, score))
env.close()

# %%
# 5. Train Model
log_path = os.path.join('Training', 'Logs')
model = PPO('MlpPolicy', env, verbose=1, tensorboard_log=log_path)

model.learn(total_timesteps=40000)

# %%
# 6. Save Model
shower_path = os.path.join('Training', 'Saved Models', 'Shower_Mode_PPO')
model.save(shower_path)
del model
model = PPO.load(shower_path, env)
# %%
evaluate_policy(model, env, n_eval_episodes=10, render=True)
# %%
