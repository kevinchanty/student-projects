import gym_sample
import gym
import matplotlib.pyplot as plt

env = gym.make('agar-v0')

env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:4000", max_step=100, step_delay=500)
env.reset()

state, reward, done, info = env.step(5)

imgplot = plt.imshow(state)
plt.show()

env.close