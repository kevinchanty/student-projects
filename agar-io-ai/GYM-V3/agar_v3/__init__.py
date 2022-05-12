from gym.envs.registration import register

register(
    id='agar-v3',
    entry_point='agar_v3.envs:agarv3',

)


# The id variable we enter here is what we will pass into gym.make() to call our environment.