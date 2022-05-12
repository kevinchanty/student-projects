import os
import gym
import gym_sample

import numpy as np
import os
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.optimizers import Adam

from rl.agents import DQNAgent
from rl.policy import BoltzmannQPolicy
from rl.memory import SequentialMemory

env = gym.make('agar-v0')
env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=100, step_delay=500)

actions = env.action_space.n

def build_model(actions):
    model = Sequential()
    model.add(Flatten(input_shape=[1,50,50]))
    model.add(Dense(24, activation='relu'))
    model.add(Dense(24, activation='relu'))
    model.add(Dense(actions, activation='linear'))
    return model

model = build_model(actions)
model.summary()

def build_agent(model, actions):
    policy = BoltzmannQPolicy()
    memory = SequentialMemory(limit=50000, window_length=1)
    dqn = DQNAgent(model=model, memory=memory, policy=policy,
        nb_actions=actions, nb_steps_warmup=50, target_model_update=1e-2)
    return dqn

dqn = build_agent(model, actions)
dqn.compile(Adam(lr=1e-3), metrics=['mae'])

dqn.fit(env, nb_steps=200, visualize=False, verbose=1)

current_path = os.path.dirname(os.path.abspath(__file__))
save_path = os.path.join(current_path,'dqn_test.h5f')
dqn.save_weights(save_path,overwrite=True)
env.close()