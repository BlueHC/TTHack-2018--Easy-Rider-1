import time
import datetime
import random

def create_tid(secret):
    time_now = datetime.datetime.now()
    random.seed(time_now.year * secret)
    tid_parts = []
    random.seed(time_now.minute * secret)
    tid_min_part = random.randint(0, 999)
    tid_parts.append(random.randint(0, 999) * tid_min_part )
    random.seed(time_now.month * secret)
    tid_parts.append(random.randint(0, 999) * tid_min_part )
    random.seed(time_now.day * secret)
    tid_parts.append(random.randint(0, 999) * tid_min_part )
    random.seed(time_now.hour * secret)
    tid_parts.append(random.randint(0, 999) * tid_min_part )
    tid_parts.append(tid_min_part * tid_min_part)
    tid = ""
    for tid_part in tid_parts:
        tid += str(tid_part)
    return tid
    