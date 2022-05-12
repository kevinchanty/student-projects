# start 19:16
# %%
import os
import gym
from stable_baselines3 import PPO
from stable_baselines3.common import callbacks
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy
from stable_baselines3.common.callbacks import EvalCallback, StopTrainingOnRewardThreshold

# %%
env = gym.make('CartPole-v0')
env = DummyVecEnv([lambda: env])
# %%
log_path = os.path.join('Training', 'logs')
PPO_Path = os.path.join('Training','Saved Models', 'PPO_Model_Cartpole')
save_path = os.path.join('Training', 'Saved Models')

# %%
stop_callback = StopTrainingOnRewardThreshold(reward_threshold=200, verbose=1)
eval_callback = EvalCallback(env,
                            callback_on_new_best=stop_callback,
                            eval_freq=10000,
                            best_model_save_path=save_path,
                            verbose=1)

# %%
net_arch = [dict(pi=[128,128,128,128], vf=[128,128,128,128])]
# %%
model = PPO('MlpPolicy', env, verbose=1, tensorboard_log=log_path, policy_kwargs={'net_arch':net_arch})

# %%
model.learn(total_timesteps=20000, callback=eval_callback)

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
