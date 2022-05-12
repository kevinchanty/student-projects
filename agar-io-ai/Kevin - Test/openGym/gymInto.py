# %%
import gym
env = gym.make('CartPole-v0')

# %%
for i_episode in range(20):
    observation = env.reset()
    for t in range(100):
        env.render()
        print(observation)
        action = env.action_space.sample()
        observation, reward, done, info = env.step(action)
        if done:
            print("Episode finished after {} timesteps".format(t+1))
            break
env.close()

# %%
print(env.action_space)
print(env.observation_space)
# %%
print(type(env.action_space)) #gym.spaces.discrete.Discrete
print(type(env.observation_space)) #gym.spaces.box.Box
# %%
