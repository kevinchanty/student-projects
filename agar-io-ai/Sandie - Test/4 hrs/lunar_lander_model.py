import os
import numpy as np
import tensorflow as tf

tf.compat.v1.disable_eager_execution()

class PolicyGradientAgent(object):
    def __init__ (self, lr, gamma, n_actions=4, l1_size=64, l2_size=64,
                  input_dims=8, chkpt_dir='tmp'):
        self.lr = lr
        self.gamma = gamma
        self.n_actions = n_actions
        self.action_space = [i for i in range(n_actions)]
        self.state_memory = []
        self.action_memory = []
        self.reward_memory = []
        self.input_dims = input_dims
        self.l1_size = l1_size
        self.l2_size = l2_size
        self.sess = tf.compat.v1.Session()
        self.build_net()
        self.saver = tf.train.Saver()
        self.chkpt_file = os.path.join(chkpt_dir, 'policy.ckpt')

    def build_net(self):
        self.input = tf.compat.v1.placeholder(tf.float32, shape=[None, self.input_dims],
                                    name='input')
        self.label = tf.compat.v1.placeholder(tf.int32, shape=[None,], name='actions')
        self.G = tf.compat.v1.placeholder(tf.float32, shape=[None,], name='G')

        with tf.compat.v1.variable_scope('layers'):
            l1 = tf.compat.v1.layers.dense(input=self.input, units=self.l1_size,
                                activation=tf.nn.relu,
                kernel_initializer=tf.contrib.layers.xavier_initializer())
            l2 = tf.compat.v1.layers.dense(input=l1, units=self.l2_size,
                                activation=tf.nn.relu,
                kernel_initializer=tf.contrib.layers.xavier_initializer())
            l3 = tf.compat.v1.layers.dense(input=l2, units=self.l2_size,
                                activation=None,
                kernel_initializer=tf.contrib.layers.xavier_initializer())
            self.actions = tf.nn.softmax(l3, name='probabilities')
    
        with tf.compat.v1.variable_scope('loss'):
            neg_log_prob = tf.nn.sparse_softmax_cross_entropy_with_logits(
                        logits=l3, label=self.label)
            loss = neg_log_prob * self.G
        
        with tf.compat.v1.variable_scope('train'):
            self.train_op = tf.train.AdamOptimizer(self.lr).minimize(loss)

    def choose_action(self, state):
        state = state[np.newaxis, :]
        probabilities = self.sess.run(self.actions,
                                      feed_dict={self.input: state})[0]
        action = np.random.choice(self.action_space, p=probabilities)

        return action
    
    def store_transitions(self, state, action, reward):
        self.state_memory.append(state)
        self.action_memory.append(action)
        self.reward_memory.append(reward)

    def learn(self):
        state_memory = np.array(self.state_memory)
        action_memory = np.array(self.action_memory)
        reward_memory = np.array(self.reward_memory)

        G = np.zeros_like(reward_memory)
        for t in range(len(reward_memory)):
            G_sum = 0
            discount = 1
            for k in range(t, len(reward_memory)):
                G_sum += reward_memory[k] * discount
                discount *= self.gamma
            G[t] = G_sum
        mean = np.mean(G)
        std = np.std(G) if np.std(G) > 0 else 1
        G = (G-mean)/std

        _ = self.sess.run(self.train_op, feed_dict={self.input:state_memory,
                                                    self.label: action_memory,
                                                    self.G: G})
        self.state_memory = []
        self.action_memory = []
        self.reward_memory = []

    def load_checkpoint(self):
        print('loading checkpoint')
        self.saver.restore(self.sess, self.chkpt_file)

    def save_checkpoint(self):
        print('saving checkpoint')
        self.saver.save(self.sess, self.chkpt_file)