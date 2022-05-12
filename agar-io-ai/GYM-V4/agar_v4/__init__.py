from gym.envs.registration import register

register(
    id='agar-v4',
    entry_point='agar_v4.envs:agarv4',

)


# The id variable we enter here is what we will pass into gym.make() to call our environment.