import random

import base

class FetchTask(base.Action):
    def __init__(self, task, option, reference, subject):
        self.__task = task
        self.__option = option
        self.__reference = reference
        self.__subject = subject

    def _process(self, *args, **kwargs):
        return self.__fetchRandomTask()

    def __fetchRandomTask(self):
        task = {}
        options = self.__option.fetchByRandom(3)
        for option in options:
            option['references'] = self.__reference.fetchByOptionId(option['id'], 5)
        task['options'] = options

        index = random.randint(0, len(options) - 1)
        subject = self.__subject.fetchByOptionId(options[index]['id'])
        task['subject'] = subject[0]
        task['correctOption'] = index
        self.__task.push(subject[0]['id'], [option['id'] for option in options])
        return task
