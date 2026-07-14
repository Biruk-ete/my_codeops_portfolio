# • Read stock.txt (one item,quantity per line) into a dictionary, inside a try / except for a missing file.
# • Add a function that increases or decreases an item's quantity by a given amount.
# • Use a comprehension or loop to print every item where the quantity is below 10 (low stock).
# • Write the updated dictionary back to stock.txt so the changes persist.
stock = {}
try:
    with open("stock.txt") as f:
        for line in f:
            item, qty = line.strip().split(",")
            stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet — starting empty")

def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount

low = [item for item, qty in stock.items() if qty < 10]
print("Low stock:", low)

adjust("Vitamin", 25)
adjust("Syringes", 3)
adjust("Amoxicillin", 12)
adjust("Paracetamol", 2)

with open("stock.txt", "w") as f:
     for item, qty in stock.items():
         f.write(f"{item},{qty}\n")