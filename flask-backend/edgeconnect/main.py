import os
import cv2
import random
import numpy as np
import torch
import argparse
from shutil import copyfile
from edgeconnect.src.config import Config
from edgeconnect.src.edge_connect import EdgeConnect


def main(checkpoint_path, input_path, mask_path, output_path, mode=2):
    r"""starts the model

    Args:
        mode (int): 1: train, 2: test, 3: eval, reads from config file if not specified
    """

    config = load_config(checkpoint_path, input_path,
                         mask_path, output_path, mode=mode)

    # cuda visble devices
    os.environ['CUDA_VISIBLE_DEVICES'] = ','.join(str(e) for e in config.GPU)

    # init device
    if torch.cuda.is_available():
        config.DEVICE = torch.device("cuda")
        torch.backends.cudnn.benchmark = True   # cudnn auto-tuner
    else:
        config.DEVICE = torch.device("cpu")

    # set cv2 running threads to 1 (prevents deadlocks with pytorch dataloader)
    cv2.setNumThreads(0)

    # initialize random seed
    torch.manual_seed(config.SEED)
    torch.cuda.manual_seed_all(config.SEED)
    np.random.seed(config.SEED)
    random.seed(config.SEED)

    # build the model and initialize
    model = EdgeConnect(config)
    model.load()

    # model training
    if config.MODE == 1:
        config.print()
        print('\nstart training...\n')
        model.train()

    # model test
    elif config.MODE == 2:
        print('\nstart testing...\n')
        model.test()

    # eval mode
    else:
        print('\nstart eval...\n')
        model.eval()


def load_config(checkpoint_path, input_path, mask_path, output_path, edge_path=None, mode=None):
    r"""loads model config

    Args:
        mode (int): 1: train, 2: test, 3: eval, reads from config file if not specified
        model (int): 1: edge model, 2: inpaint model, 3: edge-inpaint model, 4: joint model
    """

    config_path = os.path.join(checkpoint_path, 'config.yml')

    args_model = 2

    # create checkpoints path if does't exist
    if not os.path.exists(checkpoint_path):
        os.makedirs(checkpoint_path)

    # copy config template if does't exist
    if not os.path.exists(config_path):
        copyfile('./config.yml.example', config_path)

    # load config file
    config = Config(config_path)

    # train mode
    if mode == 1:
        config.MODE = 1
        if args_model:
            config.MODEL = args_model

    # test mode
    elif mode == 2:
        config.MODE = 2
        config.MODEL = args_model if args_model is not None else 3
        config.INPUT_SIZE = 0

        if input_path is not None:
            config.TEST_FLIST = input_path

        if mask_path is not None:
            config.TEST_MASK_FLIST = mask_path

        if edge_path is not None:
            config.TEST_EDGE_FLIST = edge_path

        if output_path is not None:
            config.RESULTS = output_path

    # eval mode
    elif mode == 3:
        config.MODE = 3
        config.MODEL = args_model if args_model is not None else 3

    return config


if __name__ == "__main__":
    main()
