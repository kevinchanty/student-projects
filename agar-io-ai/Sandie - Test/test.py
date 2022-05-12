import os
import gym
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy

environment_name = 'CartPole-v0'
env = gym.make(environment_name)

PPO_Path = os.path.join('Training','Saved Models','PPO_Model_Cartpole')
model = PPO.load(PPO_Path, env=env)
# model.learn(total_timesteps=10000)

# Evaluation

evaluate_policy(model, env, n_eval_episodes=10, render=False)
