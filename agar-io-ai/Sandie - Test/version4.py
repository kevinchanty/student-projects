import gym
import agar_v4
from stable_baselines3 import PPO
from stable_baselines3.common.callbacks import CheckpointCallback
import os


env = gym.make('agar-v4')

env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=300, step_delay=500)
# state = env.reset()
# print(state)


POLICY = 'MlpPolicy'
save_name  ='sandie2'
autosave_name  ='sandie_auto2'
current_path = os.path.dirname(os.path.abspath(__file__))
log_path = os.path.join('/Users/sandieng/Desktop/group-project-2/group-project-ii/models/Sandie/logs')
save_path = os.path.join('/Users/sandieng/Desktop/group-project-2/group-project-ii/models/Sandie/',save_name)
autosave_path = os.path.join('/Users/sandieng/Desktop/group-project-2/group-project-ii/models/auto/Sandie/')

callback = CheckpointCallback(save_freq=3000,save_path=autosave_path, name_prefix=autosave_name)
lr = 0.005
n_steps = 300
total_timesteps = 15000
model = PPO(POLICY, env, verbose=1,n_steps=n_steps, tensorboard_log=log_path, learning_rate=lr)

model.learn(total_timesteps=total_timesteps,callback=callback)
print('finish learning')
env.close()
model.save(save_path)
print('finish saving')