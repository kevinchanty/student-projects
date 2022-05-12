# stable_baselines3.common.env_checker.check_env(

from stable_baselines3.common.env_checker import check_env
import gym_sample
import gym

env = gym.make('agar-v0')
check_env(env)
