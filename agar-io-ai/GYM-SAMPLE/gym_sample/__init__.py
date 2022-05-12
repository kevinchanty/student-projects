from gym.envs.registration import register

register(
    id='agar-v0',
    entry_point='gym_sample.envs:agarv0',

)


# The id variable we enter here is what we will pass into gym.make() to call our environment.