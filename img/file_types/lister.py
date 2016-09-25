import os
items = os.listdir(os.getcwd())
items.remove(__file__.split(os.path.sep)[-1]) 
print(repr(items).replace("'", '"').replace('.svg', ''))