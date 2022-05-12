from gym import Env
from gym.spaces import Discrete, Box
import numpy as np
import random

class ShowerEnv(Env):
    def __init__(self):
        self.action_space = Discrete(3)
        self.observation_space = Box(low=np.array([0]), high=np.array([100]))
        self.state = 38 + random.randint(-3, 3)
        self.shower_length = 60

    def step(self,action):
        self.state += action -1
        self.shower_length -= 1
        if self.state >= 37 and self.state <= 39:
            reward = 1
        else:
            reward = -1
        if self.shower_length <= 0:
            done = True
        else:
            done = False
        self.state =+ random.randint(-1,1)

        info = {}
        return self.state, reward, done, info

    def render(self):
        pass

    def reset(self):
        self.state = 38 + random.randint(-3,3)
        self.shower_length = 60
        return self.state

env = ShowerEnv()

episodes = 10
for episode in range(1, episodes+1):
    state = env.reset()
    done = False
    score = 0

    while not done:
        env.render()
        action = env.action_space.sample()
        n_state, reward, done, info = env.step(action)
        score += reward
    print('Episode:{} Score:{}'.format(episode, score))

import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.optimizers import Adam

states = env.observation_space.shape
actions = env.action_space.n

def build_model(states, actions):
    model = Sequential()
    model.add(Dense(24, activation='relu', input_shape=states))
    model.add(Dense(24, activation='relu'))
    model.add(Dense(actions, activation='linear'))
    return model

model = build_model(states, actions)
print(model.summary())
del model

from rl.agents import DQNAgent
from rl.policy import BoltzmannGumbelQPolicy
from rl.memory import SequentialMemory

def build_agent(model, actions):
    policy = BoltzmannGumbelQPolicy()
    memory = SequentialMemory(limit=50000, window_length=1)
    dqn = DQNAgent(model=model, memory= memory, policy=policy,
                    nb_actions=actions, nb_steps_warmup=10, target_model_update=1e-2)
    return dqn

dqn = build_agent(model, actions)
dqn.compile(Adam(lr=1e-3), metrics=['mae'])
dqn.fit(env, nb_steps=50000, visualize=False, verbose=1)

scores = dqn.test(env,nb_episodes=100, visualize=False)
print(np.mean(scores.history['episode_reward']))