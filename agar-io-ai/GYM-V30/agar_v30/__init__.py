from gym.envs.registration import register

register(
    id='agar-v30',
    entry_point='agar_v30.envs:agarv30',

)


# The id variable we enter here is what we will pass into gym.make() to call our environment.