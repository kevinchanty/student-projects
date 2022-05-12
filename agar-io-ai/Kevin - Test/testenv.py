import gym
import agar_v5

env = gym.make('agar-v5')

env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=300, step_delay=500,server='localhost:8080',vision_distance=2000,verbose_n=10)

env.reset()
input()
for _ in range(20):
    state, rewards, done, info = env.step(1)
# print(state)
# print(info)
env.close()