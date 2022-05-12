
import os
import gym
import gym_sample
from stable_baselines3 import PPO
from stable_baselines3.common import callbacks
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.callbacks import EvalCallback, StopTrainingOnRewardThreshold

current_path = os.path.dirname(os.path.abspath(__file__))
log_path = os.path.join(current_path,'Training', 'logs')
save_path = os.path.join(current_path,'Training', 'Saved_Models')

for i in range(10):
    env = gym.make('agar-v0')
    env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=100, step_delay=500)
    env = DummyVecEnv([lambda: env])
    model = PPO('CnnPolicy', env, verbose=1, tensorboard_log=log_path)
    model.load(save_path)
    model.learn(total_timesteps=200)
    model.save(save_path)
    env.close()
