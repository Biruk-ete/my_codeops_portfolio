from collections import deque

class AlertService:
    def send(self, message):
        print(f"Alert: {message}")

class SMSAlert(AlertService):
    def send(self, message):
        print(f"[SMS] {message}")

class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observers = []
        self._history = []

    @property
    def balance(self):
        return self.__balance

    def _change_balance(self, amount):
        self.__balance += amount

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.send(message)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self.__balance += amount

        self._history.append({"type": "deposit", "amount": amount})

        self._notify(f"{self.owner} deposited {amount} ETB.")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.__balance:
            raise ValueError("Insufficient funds.")

        self.__balance -= amount

        self._history.append({"type": "withdraw", "amount": amount})

        self._notify(f"{self.owner} withdrew {amount} ETB.")

    def undo_last(self):
        if len(self._history) == 0:
            raise ValueError("No transactions to undo.")

        transaction = self._history.pop()

        if transaction["type"] == "deposit":
            self.__balance -= transaction["amount"]

        elif transaction["type"] == "withdraw":
            self.__balance += transaction["amount"]

        print(
            f"Undo successful: "
            f"{transaction['type']} "
            f"{transaction['amount']} ETB"
        )

    def statement(self):
        print("Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")

class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print("Savings Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")
        print(f"Interest Rate: {self.rate * 100}%")

class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0, overdraft=1000):
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.balance + self.overdraft:
            raise ValueError("Overdraft limit exceeded.")

        self._change_balance(-amount)

        self._history.append({"type": "withdraw", "amount": amount})

        self._notify(
            f"{self.owner} withdrew {amount} ETB.")

    def statement(self):
        print("Current Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")
        print(f"Overdraft Limit: {self.overdraft} ETB")

class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind.lower() == "savings":
            return SavingsAccount( owner, number, balance)

        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)

        else:
            raise ValueError("Unknown account type")

def binary_search(numbers, target):
    low = 0
    high = len(numbers) - 1

    while low <= high:
        mid = (low + high) // 2

        if numbers[mid] == target:
            return mid

        elif numbers[mid] < target:
            low = mid + 1
            
        else:
            high = mid - 1
    return -1

class AccountRegistry:
    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.account_number] = account

    def list_all(self):
        return list(self.accounts.values())

    def top_by_balance(self, n=5):
        accounts = sorted(self.accounts.values(), key=lambda a: a.balance, reverse=True)
        return accounts[:n]

    def find_by_number(self, number):
        numbers = sorted(self.accounts)

        index = binary_search(numbers, number)

        if index >= 0:
            return self.accounts[numbers[index]]
        return None

    def total_transactions(self, number):
        account = self.find_by_number(number)

        if account is None:
            raise ValueError("Account not found")
        history = account._history

        def calculate(index):

            if index == len(history):
                return 0

            return (
                history[index]["amount"]
                +
                calculate(index + 1)
            )
        return calculate(0)

class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_branch(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        total = sum(account.balance for account in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total

def bfs(transfers, start):
    visited = set()
    queue = deque([start])

    while queue:
        account = queue.popleft()
        if account not in visited:
            visited.add(account)
            for receiver in transfers.get(account, []):
                if receiver not in visited:
                    queue.append(receiver)
    return visited

sms = SMSAlert()

savings = AccountFactory.create("savings", "Biruk", "001", 1000)

current = AccountFactory.create("current", "Abebe", "002", 500)

savings.subscribe(sms)
current.subscribe(sms)
registry = AccountRegistry()
registry.add(savings)
registry.add(current)

print("------ Account Search ------")

account = registry.find_by_number("001")

print("Found:", account.owner)

print()

savings.deposit(500)
savings.withdraw(200)

print()

print("Current balance:", savings.balance)

print()

savings.undo_last()

print("Balance after undo:", savings.balance)

print("\n------ Statements ------")

for account in registry.list_all():
    account.statement()
    print()

print("\n------ Leaderboard ------")
leaders = registry.top_by_balance(2)

for account in leaders:
    print(account.owner, account.balance, "ETB")

print("\n------ Binary Search ------")

found = registry.find_by_number("002")

if found:
    print("Found:", found.owner)

else:
    print("Not found")

print("\n------ Recursive Transaction Total ------")

total = registry.total_transactions("001")

print("Total transactions:", total, "ETB")

print("\n------ Branch Tree ------")
head_office = Branch("Head Office")
north_region = Branch("North Region")
south_region = Branch("South Region")
addis_branch = Branch("Addis Branch")
bahir_branch = Branch("Bahir Dar Branch")
hawassa_branch = Branch("Hawassa Branch")

head_office.add_branch(north_region)
head_office.add_branch(south_region)
north_region.add_branch(addis_branch)
north_region.add_branch(bahir_branch)
south_region.add_branch(hawassa_branch)
addis_branch.add_account(savings)
bahir_branch.add_account(current)

print("Total Head Office Balance:", head_office.total_balance(), "ETB")

print("\n------ Transfers Graph ------")

transfers = {
    "001": ["002"],
    "002": ["003", "004"],
    "003": ["005"],
    "004": [],
    "005": ["006"],
    "006": []
}

reachable = bfs(transfers,"001")

print("Accounts reachable from 001:")

for account in reachable:
    print(account)