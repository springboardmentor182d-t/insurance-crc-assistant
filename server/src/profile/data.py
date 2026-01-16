import json
from pathlib import Path

BASE_PATH = Path(__file__).resolve().parent.parent / "data"

PROFILE_FILE = BASE_PATH / "user_profile.json"
PREFS_FILE = BASE_PATH / "user_preferences.json"


def read_json(file):
    with open(file, "r") as f:
        return json.load(f)


def write_json(file, data):
    with open(file, "w") as f:
        json.dump(data, f, indent=2)


def get_profile():
    return read_json(PROFILE_FILE)


def save_profile(data):
    write_json(PROFILE_FILE, data)
    return data


# def get_preferences():
#     return read_json(PREFS_FILE)


# def save_preferences(data):
#     write_json(PREFS_FILE, data)
#     return data
