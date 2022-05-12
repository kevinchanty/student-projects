# Environment Setup

import gym 
import random

from tensorflow.python.keras import metrics

env = gym.make('CartPole-v0')
states = env.observation_space.shape[0]
actions = env.action_space.n

episodes = 10
for episode in range(1, episodes+1):
  state = env.reset()
  done = False
  score = 0

  while not done:
    env.render()
    action = random.choice([0, 1])
    n_state, reward, done, info = env.step(action)
    score += reward
  print('Episode: {}, Score: {}'. format(episodes, score))

# Building the neural network model

import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.optimizers import Adam


# the neural network action with states as input and action as output
def build_model(states, actions):
  model = Sequential()
  model.add(Flatten(input_shape=(1, states)))
  model.add(Dense(24, activation="relu"))
  model.add(Dense(24, activation="relu"))
  model.add(Dense(actions, activation='linear'))
  return model

model = build_model(states, actions)

print(model.summary())
del model

# Build the Agent with RL

from rl.agents import DQNAgent
from rl.policy import BoltzmannQPolicy
from rl.memory import SequentialMemory

model = build_model(states, actions)


def build_agent(model, actions):
  policy = BoltzmannQPolicy()
  memory = SequentialMemory(limit=50000, window_length=1)
  dqn = DQNAgent(model=model, memory=memory, policy=policy, nb_actions=actions, nb_steps_warmup=10, target_model_update=1e-2)
  return dqn

dqn = build_agent(model, actions)
dqn.compile(Adam(lr=1e-3), metrics=['mae'])
dqn.fit(env, nb_steps=50000, visualize=False, verbose=1)


scores = dqn.test(env, nb_episodes=100, visualize=False)
print(np.mean(scores.history['episode_reward']))

# saving the model
dqn.save_weights('dqn_weights.h5f', overwrite=True)

del model
del dqn
del env

env = gym.make('CartPole-v0')
actions = env.action_space.n
states = env.observation_space.shape[0]
model = build_model(states, actions)
dqn = build_agent(model, actions)
dqn.compile(Adam(lr=1e-3), metrics=['mae'])

dqn.load_weights('dqn_weights.h5f')

_ = dqn.test(env, nb_episodes=5, visualize=True)