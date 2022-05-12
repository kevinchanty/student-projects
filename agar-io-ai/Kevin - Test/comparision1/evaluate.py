import gym
import agar_v5
from stable_baselines3 import PPO
import os

env = gym.make('agar-v5')
save_path = "C:\\Users\\Kevin-Desk\\Documents\\group-project-ii\\models\\comparison1\\v5_vision_updated.zip"

env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000/", max_step=300, step_delay=500,server='gs.spinningcat.xyz',vision_distance=2000,verbose_n=10)

# env.config(screen_size= [500,500], screen_split = [3,3], url="http://localhost:3000", max_step=300, step_delay=500)



model = PPO.load(save_path,env)

episodes = 3
record = []

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
    record.append(score)

print(record)