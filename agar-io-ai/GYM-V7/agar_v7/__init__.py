from gym.envs.registration import register

register(
    id='agar-v7',
    entry_point='agar_v7.envs:agarv7',

)


# The id variable we enter here is what we will pass into gym.make() to call our environment.