from gym.envs.registration import register

register(
    id='agar-v1',
    entry_point='agar_v1.envs:agarv1',

)


# The id variable we enter here is what we will pass into gym.make() to call our environment.