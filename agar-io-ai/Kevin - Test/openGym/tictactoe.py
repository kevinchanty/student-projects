# %%
import gym
import gym_foo
env = gym.make('foo-v0')
# env = gym.make('CartPole-v0')


# %%
env.reset()
for _ in range(10):
    env.render()
    env.step(env.action_space.sample()) # take a random action
    # env.reset()
env.close()

# %%
env.reset()

# %%
env.render()

# %%
env.step()