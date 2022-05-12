import gym
import agar_v3
from stable_baselines3 import PPO
import os

env = gym.make('agar-v3')
env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=300, step_delay=500)


policy = 'MlpPolicy'
current_path = os.path.dirname(os.path.abspath(__file__))
save_path = os.path.join(current_path,'PPO_snake_no_self_8food', 'Saved Model', '{} Model'.format(policy))

model = PPO.load(save_path,env)

episodes = 5

for episode in range(1,episodes + 1):
    state = env.reset()
    done = False
    score = 0
    while not done:
        action, _ = model.predict(state)
        state, rewards, done, info = env.step(action)
        score += rewards
    print("""#################
    {} Ends
    Score: {}
    #################""".format(episode,score))
