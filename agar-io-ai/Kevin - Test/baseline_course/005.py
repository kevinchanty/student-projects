# %%
import gym
from stable_baselines3 import A2C
from stable_baselines3.common.vec_env import VecFrameStack
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.env_util import make_atari_env
import os

# %%
env = gym.make('Breakout-v0')
env.reset()

# %%
env.action_space
# %%
env.observation_space
# %%
episodes = 5
for episode in range(1, episodes + 1):
    obs = env.reset()
    done = False
    score = 0

    while not done:
        env.render()
        action = env.action_space.sample()
        obx, reward, done, info = env.step(action)
        score+=reward
    print('Episode:{} Score:{}'.format(episode, score))
# %%
env = make_atari_env('Breakout-v0', n_envs=4, seed=0)
env = VecFrameStack(env, n_stack=4)
# %%
log_path = os.path.join('Training', 'Logs')
model = A2C('CnnPolicy',env,verbose=1, tensorboard_log=log_path)
# %%
model.learn(total_timesteps=10000)
# %%
a2c_path = os.path.join('Training', 'Saved Models', 'A2C_Breakout_model')
model.save(a2c_path)
# %%
env = make_atari_env('Breakout-v0', n_envs=1, seed=0)
env = VecFrameStack(env, n_stack=4)
evaluate_policy(model, env, n_eval_episodes=10, render=True)
# %%
