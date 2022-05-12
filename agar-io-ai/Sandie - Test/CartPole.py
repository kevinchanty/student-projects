# Import
import os
import gym
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy
from torch.functional import Tensor


# Load Environment
environment_name = 'CartPole-v0'
env = gym.make(environment_name)


episodes = 5
for episode in range(1, episodes+1):
    state = env.reset()
    done = False
    score = 0

    while not done:
        env.render()
        action = env.action_space.sample()
        n_state, reward, done, info = env.step(action)
        score += reward
    print('Episode:{} Score:{}'.format(episode, score))
env.close()

# Train an RL Model
log_path = os.path.join('Training', 'Logs') # make directories first
env = gym.make(environment_name)
env = DummyVecEnv([lambda: env])
model = PPO('MlpPolicy', env, verbose=1, tensorboard_log=log_path)

model.learn(total_timesteps=1)

# Save and Reload Model
PPO_Path = os.path.join('Training','Saved Models','PPO_Model_Cartpole1')
model.save(PPO_Path)
del model
model = PPO.load(PPO_Path, env=env)
# model.learn(total_timesteps=10000)

# Evaluation
evaluate_policy(model, env, n_eval_episodes=10, render=True)
env.close()

# Test Model
episodes = 5
for episode in range(1, episodes+1):
    obs = env.reset()
    done = False
    score = 0

    while not done:
        env.render()
        action, _ = model.predict(obs) 
        obs, reward, done, info = env.step(action)
        score += reward
    print('Episode:{} Score:{}'.format(episode, score))
env.close()

obs = env.reset()
action, _ = model.predict(obs)
env.action_space.sample()
env.step(action)

# View Logs in Tensorboard
training_log_path = os.path.join(log_path, 'PPO_2')
# !tensorboard --logdir = {training_log_path} run in terminal

# Adding a callback to the training Stage
from stable_baselines3.common.callbacks import EvalCallback, StopTrainingOnRewardThreshold
save_path = os.path.join('Training', 'Saved Models')
stop_callback = StopTrainingOnRewardThreshold(reward_threshold=200, verbose=1)
eval_callback = EvalCallback(env,
                            callback_on_new_best=stop_callback,
                            eval_freq=10000,
                            best_model_save_path=save_path,
                            verbose=1)
model = PPO('MlpPolicy',env, verbose=1, tensorboard_log=log_path)
model.learn(total_timesteps=20000, callback=eval_callback)

# Changing Policies
net_arch = [dict(pi=[128,128,128,128], vf=[128,128,128,128])]
model = PPO('MlpPolicy',env, verbose=1, tensorboard_log=log_path, policy_kwargs={'net_arch':net_arch})
model.learn(total_timesteps=20000, callback=eval_callback)

# Using an Alternate Algorithm
from stable_baselines3 import DQN
model = DQN('MlpPolicy',env, verbose=1, tensorboard_log=log_path)
model.learn(total_timesteps=20000)
DQN.load