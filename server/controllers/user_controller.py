from .core_controller import CoreController, CoreControllerOne
from ..models import User

class UserController(CoreController):
    def __init__(self):
        super().__init__(User)

class UserControllerOne(CoreControllerOne):
    def __init__(self):
        super().__init__(User)