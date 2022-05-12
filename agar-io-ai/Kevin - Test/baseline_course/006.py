# %%
import gym
from stable_baselines3 import PPO, ppo
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy
import os

# %%
env = gym.make('CarRacing-v0')
env = DummyVecEnv([lambda: env])
env.reset()

# %%
log_path = os.path.join('Training', 'Logs')
model = PPO('CnnPolicy', env, verbose=1, tensorboard_log=log_path)

# %%
model.learn(total_timesteps=10000)
# %%
ppo_path = os.path.join('Training', 'Saved Models', 'PPO_Driving_model')
model.save(ppo_path)

# %%
evaluate_policy(model,env,n_eval_episodes=1)
env.close
