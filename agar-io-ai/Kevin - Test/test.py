# %%
import math

# %%
def __cal_action(a,b):

        screenX = a[0]
        screenY = a[1]
        splitX = b[0]
        splitY = b[1]

        m = screenX / splitX
        n = screenY / splitY
        print (f'm{m}n{n}')

        for i in range(splitX * splitY):
            # print(i)
            # print(i%m)
            print([(i%splitX)*(m)+m/2, math.floor(i/splitX) * n + n/2])
            # self.action_space[i] = [(i%m)*(m)+m/2, math.floor(i/m) * n + n/2]
    
        k = {
            0:[83,83],
            1:[252,83],
            2:[420,83],
            3:[83,252],
            4:[252,252],
            5:[420,252],
            6:[83,420],
            7:[252,420],
            8:[420,420],
        }

# %%
__cal_action([500,500],[3,3])
# %%
