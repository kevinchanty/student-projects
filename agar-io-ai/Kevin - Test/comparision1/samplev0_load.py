import gym
import gym_sample
# from supersuit import color_reduction_v0
from stable_baselines3 import PPO
from stable_baselines3.common.callbacks import CheckpointCallback
import os

print("PLEASE CHECK GAME SERVER'S CONFIG!!!")

# SB3
POLICY = 'MlpPolicy'
lr = 0.005
n_steps = 300
total_timesteps = 15000
autosave_steps = 3000

# ENV Config
max_step = 300
step_delay = 500
game_server = 'localhost:8080'

# Names, Path
save_name  ='v0-grey-150x150'
autosave_name  = save_name + "_auto"
collections = 'comparison1'
git_repo_path = "C:\\Users\\Kevin-Desk\\Documents\\group-project-ii\\"

load_path = 'C:\\Users\\Kevin-Desk\\Documents\\group-project-ii\\models\\auto\\comparison1\\v0-grey-150x150\\v0-grey-150x150_auto_15000_steps.zip'

log_path = os.path.join(git_repo_path,'models',collections,'logs')
save_path = os.path.join(git_repo_path,'models',collections,save_name)
autosave_path = os.path.join(git_repo_path,'models','auto',collections,save_name)
# current_path = os.path.dirname(os.path.abspath(__file__))

env = gym.make('agar-v0')
env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=max_step, step_delay=step_delay)

callback = CheckpointCallback(save_freq=autosave_steps,save_path=autosave_path, name_prefix=autosave_name)
model = PPO.load(load_path,env)


model.learn(total_timesteps=total_timesteps,callback=callback,tb_log_name=save_name)
print('finish learning')

env.close()

model.save(save_path)
print('finish saving')