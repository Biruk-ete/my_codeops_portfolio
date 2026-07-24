class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


class SMSAlert:
    def update(self, message):
        print(f"[SMS] {message}")


class AuditLog:
    def update(self, message):
        print(f"[AUDIT] {message}")


class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observers = []

    @property
    def balance(self):
        return self.__balance

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.update(message)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self.__balance += amount
        self._notify(f"{self.owner} deposited {amount} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.__balance:
            raise ValueError("Insufficient funds.")

        self.__balance -= amount
        self._notify(f"{self.owner} withdrew {amount} ETB")

    def statement(self):
        print("Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")


class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = config.interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print("Savings Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance:.2f} ETB")
        print(f"Interest Rate: {self.rate * 100:.1f}%")


class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft = config.overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        if amount > self.balance + self.overdraft:
            raise ValueError("Overdraft limit exceeded.")

        self._Account__balance -= amount
        self._notify(f"{self.owner} withdrew {amount} ETB")

    def statement(self):
        print("Current Account")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance:.2f} ETB")
        print(f"Overdraft Limit: {self.overdraft} ETB")


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)

        else:
            raise ValueError("Unknown account type.")

sms = SMSAlert()
audit = AuditLog()

savings = AccountFactory.create("savings", "Biruk", "001", 1000)
current = AccountFactory.create("current", "Biruk", "002", 500)

savings.subscribe(sms)
savings.subscribe(audit)

current.subscribe(sms)
current.subscribe(audit)

savings.deposit(500)
savings.add_interest()

current.withdraw(1200)

print()

savings.statement()

print()

current.statement()