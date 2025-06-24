from .core_controller import CoreController, CoreControllerOne
from ..models import Piece

class PieceController(CoreController):
    def __init__(self):
        super().__init__(Piece)

class PieceControllerOne(CoreControllerOne):
    def __init__(self):
        super().__init__(Piece)