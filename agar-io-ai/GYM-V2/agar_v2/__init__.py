from gym.envs.registration import register

register(
    id='agar-v2',
    entry_point='agar_v2.envs:agarv2',

)


# The id variable we enter here is what we will pass into gym.make() to call our environment.