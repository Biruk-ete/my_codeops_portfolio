class Account():
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.account_number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError('Amount must be greater that zero')
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError('Withdraw amount must be greater than zero')
        
        if amount > self.__balance:
            raise ValueError('Insufficient balance.')
        
        self.__balance -= amount



account1 = Account("Biruk", 10101010, 8000)
account2 = Account("Mat", 20202020, 2000) 

account1.deposit(2000)
print(account1.balance)

account2.withdraw(300)
print(account2.balance)