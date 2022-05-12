from gym.envs.registration import register

register(
    id='agar-v5',
    entry_point='agar_v5.envs:agarv5',

)


# The id variable we enter here is what we will pass into gym.make() to call our environment.