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

        self._history.append({
            "type": "deposit",
            "amount": amount
        })

        self._notify(
            f"{self.owner} deposited {amount} ETB."
        )

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.__balance:
            raise ValueError("Insufficient funds.")

        self.__balance -= amount

        self._history.append({
            "type": "withdraw",
            "amount": amount
        })

        self._notify(
            f"{self.owner} withdrew {amount} ETB."
        )

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
            raise ValueError(
                "Overdraft limit exceeded."
            )

        self._change_balance(-amount)

        self._history.append({
            "type": "withdraw",
            "amount": amount
        })

        self._notify(
            f"{self.owner} withdrew {amount} ETB."
        )

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

            return SavingsAccount(
                owner,
                number,
                balance
            )

        elif kind.lower() == "current":

            return CurrentAccount(
                owner,
                number,
                balance
            )

        else:
            raise ValueError(
                "Unknown account type"
            )

class AccountRegistry:

    def __init__(self):

        self.accounts = {}

    def add(self, account):

        self.accounts[
            account.account_number
        ] = account

    def find(self, number):

        return self.accounts.get(number)

    def list_all(self):

        return list(
            self.accounts.values()
        )

sms = SMSAlert()

savings = AccountFactory.create(
    "savings",
    "Biruk",
    "001",
    1000
)

current = AccountFactory.create(
    "current",
    "Biruk",
    "002",
    500
)

savings.subscribe(sms)
current.subscribe(sms)

registry = AccountRegistry()

registry.add(savings)
registry.add(current)


account = registry.find("001")

print("Found:", account.owner)

print()

savings.deposit(500)

savings.withdraw(200)

print()

print("Current balance:", savings.balance)

print()

savings.undo_last()

print(
    "Balance after undo:",
    savings.balance
)

print()

for account in registry.list_all():

    account.statement()

    print()