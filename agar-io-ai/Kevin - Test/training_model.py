# %%
import gym
import gym_sample
from stable_baselines3 import PPO, A2C, DQN
from stable_baselines3.common.env_checker import check_env
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.env_util import make_vec_env
from stable_baselines3.common.vec_env import DummyVecEnv, vec_transpose
from stable_baselines3.common.callbacks import EvalCallback, StopTrainingOnRewardThreshold
import os



# %% 
env = gym.make('agar-v0')
env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:4000", max_step=100, step_delay=250)
env = DummyVecEnv([lambda: env])
eval_env = vec_transpose.VecTransposeImage(env)

lr = 0.0035
n_steps = 100
total_timesteps = 100
count = total_timesteps / n_steps
policy = 'CnnPolicy'


current_path = os.path.dirname(os.path.abspath(__file__))
log_path = os.path.join(current_path,'Training', 'logs')
save_path = os.path.join(current_path,'Training', 'Saved Models', '{} Model {} times({}, lr={})'.format(policy,count,policy,lr))
auto_save_path = os.path.join(current_path,'Training', 'Auto Saved Models', '${} Model ${} times(${}, lr=${})'.format(policy,count,policy,lr))

# model = PPO(policy, env, verbose=1,n_steps=n_steps, tensorboard_log=log_path, learning_rate=lr)

# model.learn(total_timesteps=total_timesteps)
# print('finish learning')
# env.close()

# model.save(save_path)
# print('finish saving')


for episode in range(1, 11):
    model = PPO(policy, env, verbose=1,n_steps=n_steps, tensorboard_log=log_path, learning_rate=lr)
    model = PPO.load(save_path,env)
    model.learn(total_timesteps=total_timesteps)
    print('finish learning')
    model.save(save_path)
    env.reset()
    print('finish saving')
    


# evaluation = evaluate_policy(model, env, n_eval_episodes=1, render=False)
# print(evaluation)
