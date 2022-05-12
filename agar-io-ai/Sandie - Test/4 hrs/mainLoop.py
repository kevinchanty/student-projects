import gym
from model import DeepQNetwork, Agent
from utils import plotLearning
import numpy as np

if __name__ == '__main__':
    env = gym.make('SpaceInvaders=v0')
    brain = Agent(gamma=0.95, epsilon=1.0,
                alpha=0.003, maxMemorySize=5000,
                replace=None)

    while brain.memCntr < brain.memSize:
        observation = env.reset()
        done = False
        while not done:
            action = env.action_space.sample()
            observation_, reward, done, info = env.step(action)
            if done and info['ale.lives'] == 0:
                reward = -100
            brain.storeTransition(np.mean(observation[15:200, 30:125], axis=2), action, reward,
                                  np.mean(observation[15:200, 30:125], axis=2))
            observation = observation_
    print('done initializing memory')

    scores = []
    epsHistory = []
    numGames = 50
    batch_size = 32

    for i in range(numGames):
        print('starting game ', i +1, 'epsilon: %.4f' % brain.EPSILON)
        done = False
        observation = env.reset()
        frames = [np.sum(observation[15:200, 30:125], axis=2)]
        score = 0
        lastAction = 0

        while not done:
            if len(frames) == 3:
                action = brain.chooseAction(frames)
                frames = []
            else:
                action = lastAction
            
            observation_, reward, done, info = env.step(action)
            score += reward
            frames.append(observation_)
            if done and info['ale.lives'] == 0:
                reward = -100
            brain.storeTransition(np.mean(observation[15:200, 30:125], axis=2), action, reward,
                                  np.mean(observation[15:200, 30:125], axis=2))
            observation = observation_
            brain.learn(batch_size)
            lastAction = action
            #env.render()
        score.append(score)
        print('score: ', score)
        x = [i + 1 for i in range(numGames)]
        fileName = 'test' + str(numGames) + '.png'
        plotLearning(x, scores, epsHistory, fileName)