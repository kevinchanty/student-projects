
import os
import gym
import agar_v3
from stable_baselines3 import PPO


env = gym.make('agar-v3')
env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=300, step_delay=500)


lr = 0.005
n_steps = 300
total_timesteps = 3000
count = total_timesteps / n_steps
current_path = os.path.dirname(os.path.abspath(__file__))
log_path = os.path.join(current_path,'Training', 'Logs')
policy = 'MlpPolicy'
load_path = os.path.join(current_path,'Training', 'Saved Model', '{} Model {} times(lr={})'.format(policy, count, lr))
save_path = os.path.join(current_path,'Saved', '{} Model {} times(lr={})'.format(policy, count, lr))
model = PPO.load(load_path,env)

model.learn(total_timesteps=300)
print('finish learning')
env.close()


model.save(save_path)
print('finish saving')


# PPO22
# 23