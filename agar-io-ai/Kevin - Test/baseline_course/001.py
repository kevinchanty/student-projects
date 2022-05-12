# start 19:16
# %%
import os
import gym
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy

# %%
env = gym.make('CartPole-v0')

# %%
log_path = os.path.join('Training', 'logs')

# %%
env = DummyVecEnv([lambda: env])
model = PPO('MlpPolicy', env, verbose=1, tensorboard_log=log_path)

# %%
model.learn(total_timesteps=20000)

# %%
PPO_Path = os.path.join('Training','Saved Models', 'PPO_Model_Cartpole')

# %%
model.save(PPO_Path)
# %%
model = PPO.load(PPO_Path,env)
# %%
evaluate_policy(model, env, n_eval_episodes=10, render=True)

# %%
episodes = 5
for episode in range(1, episodes + 1):
    obs = env.reset()
    done = False
    score = 0

    while not done:
        env.render() 
        action, _ = model.predict(obs)
        obs, reward, done, info = env.step(action)
        score += reward
    print('Episode:{} Score:{}'.format(episode, score))
# env.close()
# %%
