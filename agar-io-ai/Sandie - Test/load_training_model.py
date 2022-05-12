import gym
import gym_sample
from stable_baselines3 import PPO, A2C, DQN
from stable_baselines3.common.env_checker import check_env
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.env_util import make_vec_env
import os

env = gym.make('agar-v0')

env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=100, step_delay=500)

lr = 0.0035
n_steps = 300
total_timesteps = 30000
count = total_timesteps / n_steps
log_path = os.path.join('Training', 'Logs')
policy = 'MlpPolicy'
model = PPO(policy, env, verbose=1,n_steps=n_steps, tensorboard_log=log_path, learning_rate=lr)

# model.learn(total_timesteps=total_timesteps)
# print('finish learning')
# env.close()
save_path = os.path.join('Training', 'Saved Model', '{} Model {} times({}, lr={})'.format(policy,count,policy,lr))
model.save(save_path)
del model
model = PPO.load(save_path, env)
# print('finish saving')

episodes = 5
for episode in range(1, episodes+1):
    obs = env.reset()
    done = False
    score = 0

    while not done:
        action, _ = model.predict(obs)
        obs, reward, done, info = env.step(action)
        score += reward
env.close()