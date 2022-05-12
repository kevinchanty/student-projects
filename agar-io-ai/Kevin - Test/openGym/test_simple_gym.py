# %%
import gym
import gym_sample

# %% 
env = gym.make('agar-v0')

env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step= 360, step_delay= 50)

# %%
env.reset()


done = False

while not done:
    action = env.action_space.sample()
    observation, reward, done, info = env.step(action)
    # print(done)
    if done:
        print("Episode finished after {} timesteps".format(1))
        break
env.close()
