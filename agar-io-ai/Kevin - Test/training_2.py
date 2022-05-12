import gym
import agar_v3
from stable_baselines3 import PPO, A2C, DQN
import os



env = gym.make('agar-v3')

env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=300, step_delay=500)
# state = env.reset()
# print(state)


lr = 0.005
n_steps = 300
total_timesteps = 30000
current_path = os.path.dirname(os.path.abspath(__file__))
log_path = os.path.join(current_path,'Training', 'Logs')
policy = 'MlpPolicy'
model = PPO(policy, env, verbose=1,n_steps=n_steps, tensorboard_log=log_path, learning_rate=lr)

model.learn(total_timesteps=total_timesteps)
print('finish learning')
env.close()
save_path = os.path.join(current_path,'PPO_snake_no_self_8food', 'Saved Model', '{} Model'.format(policy))
model.save(save_path)
print('finish saving')