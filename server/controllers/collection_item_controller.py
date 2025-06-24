from .core_controller import CoreController, CoreControllerOne
from ..models import CollectionItem

class CollectionItemController(CoreController):
    def __init__(self):
        super().__init__(CollectionItem)

class CollectionItemControllerOne(CoreControllerOne):
    def __init__(self):
        super().__init__(CollectionItem)