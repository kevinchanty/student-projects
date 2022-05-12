# Import Dependencies
import gym
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy
import os

# Test Environment
environment_name = 'CarRacing-v0'
env = gym.make(environment_name)

# env.reset()
# env.action_space
# env.observation_space

# Train Model
env = gym.make(environment_name)
env = DummyVecEnv([lambda: env])

log_path = os.path.join('Training', 'Logs')
model = PPO('CnnPolicy', env, verbose=1, tensorboard_log=log_path)

# model.learn(total_timesteps=2000000)

# Save Model
ppo_path = os.path.join('Training', 'Save Models', 'PPO_Driving_Model')
model.save(ppo_path)
del model
model = PPO.load(ppo_path, env)

# Evaluate and Test
evaluate_policy(model, env,n_eval_episodes=5, render=True)

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

# %%
